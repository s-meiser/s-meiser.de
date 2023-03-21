import * as THREE from 'three';
import {
    glowMaterial,
    glowMaterial2,
    shadowMaterial,
    bloomMaterial,
    glowMaterial3,
    linearGradientShader,
    blurMaterial
} from "../Materials/LinearGradientShader";
import RoundedRectShape from "../Shapes/RoundedRectShape";
import Utility from "./Utility";
import {CSSObject} from "./CSSObject";

export default class Scene {

    configuration;
    camera;

    newScene;
    groupMatLineHex = [];
    groupTween = [];
    groupTweenBack = [];

    groupTweenHex = [];
    groupTweenBackHex = [];

    constructor(camera, configuration) {
        this.configuration = configuration;
        this.camera = camera;
        this.newScene = this.scene();
        this.addPlane(this.newScene);
        this.spotlight(this.newScene);
        this.hexagon(this.newScene, this.camera);
        this.html(this.newScene);
        return this.newScene;
    }

    scene() {
        return new THREE.Scene();
    }

    addPlane(scene) {
        const config = this.configuration.mesh;
        const configShape = this.configuration.shapes;
        const mediaQueries = this.configuration.mediaQueries;

        /**
         * hidden Mesh to cast shadow
         * THREE.ShaderMaterial does not support casting shadows out of the box
         */
        const shadowShape = roundedRectShape(
            configShape.shadow.position.x,
            configShape.shadow.position.y,
            configShape.shadow.width,
            configShape.shadow.height,
            configShape.shadow.radius
        );
        let hiddenMesh = new THREE.Mesh(shadowShape, new THREE.MeshBasicMaterial({
            color: 0x000000,
            side: THREE.BackSide,
            transparent: true,
            opacity: configShape.shadow.opacity
        }));
        hiddenMesh.position.set(
            config.hiddenMesh.object.position.x,
            config.hiddenMesh.object.position.y,
            config.hiddenMesh.object.position.z
        );
        hiddenMesh.name = config.hiddenMesh.object.name
        hiddenMesh.castShadow = true; //default is false
        hiddenMesh.receiveShadow = false; //default
        scene.add(hiddenMesh);

        const shape = roundedRectShape(
            configShape.mainShape.position.x,
            configShape.mainShape.position.y,
            configShape.mainShape.width,
            configShape.mainShape.height,
            configShape.mainShape.radius
        );
        let mat = linearGradientShader('-120.0', '#253f42', '#000000');
        let mesh = new THREE.Mesh(shape, mat);
        mesh.position.set(config.mesh.object.position.x, config.mesh.object.position.y, 0);
        mesh.name = config.mesh.object.name
        scene.add(mesh);

        /**
         * xs: 0 (max-width: 576px)
         * sm: 576px (min-width: 576px) and (max-width: 768px)
         * md: 768px (min-width: 768px) and (max-width: 992px)
         * lg: 992px (min-width: 992px) and (max-width: 1200px)
         * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
         * xxl: 1400px (min-width: 1400px)
         */
        const positionLeftSide = (window.innerWidth/-2);

        let margin = 460;
        let width = 1200;
        let height = 800;
        let posY = 200;

        if (mediaQueries.xs.matches) {
            margin = 100;
            width = 400;
            height = 700;
        }
        if (mediaQueries.sm.matches) {
            margin = 200;
            width = 500;
            height = 700;
        }

        const shadowGeometry = new THREE.PlaneGeometry(width, height, 1 );
        let shadowMat = shadowMaterial();
        let shadowMesh = new THREE.Mesh(shadowGeometry, shadowMat);
        // shadowMesh.position.set(-500,200,-5);
        shadowMesh.position.set(positionLeftSide+margin,posY,-5);
        scene.add(shadowMesh);
    }

    spotlight(scene) {
        const config = this.configuration.light;
        const mediaQueries = this.configuration.mediaQueries


        /**
         * xs: 0 (max-width: 576px)
         * sm: 576px (min-width: 576px) and (max-width: 768px)
         * md: 768px (min-width: 768px) and (max-width: 992px)
         * lg: 992px (min-width: 992px) and (max-width: 1200px)
         * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
         * xxl: 1400px (min-width: 1400px)
         */
        let lightIntensity = 100;
        if (mediaQueries.xs.matches) {
            lightIntensity = 40;
        }
        if (mediaQueries.sm.matches) {
            lightIntensity = 50;
        }
        if (mediaQueries.md.matches) {
            lightIntensity = 50;
        }
        if (mediaQueries.lg.matches) {
            lightIntensity = 50;
        }
        if (mediaQueries.xl.matches) {
            lightIntensity = 60;
        }

        const light = new THREE.SpotLight(0xffffff);
        light.castShadow = true; // default false
        light.position.set(config.light.position.x, config.light.position.y, 1500);
        light.intensity = lightIntensity;
        light.distance = 2000;
        light.angle = config.light.angle

        light.shadow.mapSize.width = config.shadow.mapSize.width; // default
        light.shadow.mapSize.height = config.shadow.mapSize.height; // default
        light.shadow.camera.near = config.shadow.camera.near; // default
        light.shadow.camera.far = config.shadow.camera.far; // default
        light.shadow.camera.aspect = config.shadow.camera.aspect;
        light.shadow.focus = config.shadow.focus; // default

        scene.add(light);
        scene.add(light.target );
        const sphereSize = 1;
        const pointLightHelper = new THREE.SpotLightHelper( light, sphereSize, '#FF0000' );
        //scene.add( pointLightHelper );

        light.target.position.x = config.target.position.x;
        light.target.position.y = config.target.position.y;
        light.target.position.z = config.target.position.z;
    }

    hexagon(scene, camera) {


        let utility = new Utility(camera);
        const mediaQueries = this.configuration.mediaQueries


        let margin = 0;
        if (mediaQueries.xs.matches) {
            margin = 50;
        }

        const planeGeometry = new THREE.PlaneGeometry(
            1720,
            800
        );
        const material = new THREE.ShadowMaterial({
            color: 0x000000
        });
        material.opacity = 0.75;
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.receiveShadow = true;
        plane.position.y = 800;
        plane.position.z = 20;
        //scene.add(plane);


        // 93278f << lila
        // 29abe2 << blau
        const positionLeftSide = (window.innerWidth/-2)+110;

        let hexagonTopLeft = utility.getHexagonBorder(0xFFFFFF, 3, 0.5,20, 'double');
        hexagonTopLeft.scale.set(125,125,0)
        hexagonTopLeft.position.set(positionLeftSide-margin,800,10)
        hexagonTopLeft.rotation.set(50,-60,100)
        hexagonTopLeft.castShadow = true; //default is false
        hexagonTopLeft.receiveShadow = true; //default
        hexagonTopLeft.name = 'hexagonTopLeft';
        scene.add(hexagonTopLeft);

        let hexagonMesh = utility.getHexagonMesh(0xF1F1E6, 0.5, 20, 'double');
        hexagonMesh.scale.set(125,125,0)
        hexagonMesh.position.set(positionLeftSide-margin,800,10)
        hexagonMesh.rotation.set(50,-60,100)
        hexagonMesh.castShadow = true; //default is false
        hexagonMesh.receiveShadow = true; //default
        hexagonMesh.name = 'hexagonMesh';
        scene.add(hexagonMesh);
    }

    html(scene) {

        let menuHtml = document.querySelector('.content-menu')
        let firstDom001 = document.querySelector('.content-1')
        let antoherDom002 = document.querySelector('.content-2')

        const objContent1 = new CSSObject( firstDom001 )
        objContent1.position.x = 100;
        objContent1.position.y = 200;
        objContent1.position.z = -300;
        objContent1.rotation.x = 100;
        objContent1.rotation.y = 200;
        objContent1.rotation.z = 300;

        const objContent2 = new CSSObject( antoherDom002 )
        objContent2.position.x = 0;
        objContent2.position.y = 500;
        objContent2.position.z = 0;
        objContent2.rotation.x = 0;
        objContent2.rotation.y = 0;
        objContent2.rotation.z = 0;


        const menu = new CSSObject( menuHtml )
        menu.position.x = 0;
        menu.position.y = 500;
        menu.position.z = 0;


        //scene.add(objContent1);
        scene.add(menu);
        //scene.add(objContent2);
    }

}



/**
 * rounded rect shape
 */
const roundedRectShape = (x,y,width,height,radius) => {
    let roundedRectShape = new RoundedRectShape({
        x: x,
        y: y,
        width: width,
        height: height,
        rounded: radius
    });
    let rectGeo = roundedRectShape.roundedRectShape();
    return new THREE.ShapeGeometry(rectGeo);
}

