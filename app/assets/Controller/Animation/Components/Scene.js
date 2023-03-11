import * as THREE from 'three';
import {glowMaterial, glowMaterial2, glowMaterial3, linearGradientShader} from "../Materials/LinearGradientShader";
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

    clock = new THREE.Clock();

    bloomScene;

    constructor(camera, configuration) {
        this.configuration = configuration;
        this.camera = camera;
        //this.bloomScene = bloomScene;

        this.newScene = this.scene();
        this.addPlane(this.newScene);
        //this.testMesh(this.newScene);
        //this.shadowPlane(this.newScene);
        //this.spotlight(this.newScene);
        //this.spotlight2(this.newScene);
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
        let mat = linearGradientShader('27.0', '#090d12', '#1c2f35');
        let mesh = new THREE.Mesh(shape, mat);
        mesh.position.set(config.mesh.object.position.x, config.mesh.object.position.y, 0);
        mesh.name = config.mesh.object.name
        scene.add(mesh);
        //mesh.layers.enable( 0 );
        //outer glow

        const glowShape = roundedRectShape(
            -5000,
            -5000,
            10000,
            10000,
            configShape.shadow.radius
        );

        const testGeometry = new THREE.PlaneGeometry( 2000, 1000, 1 );
        //const boxgeometry = new THREE.BoxGeometry( 100, 100, 100 );
        //const orgMaterial = new THREE.MeshBasicMaterial({color: 0xff00dd});
        //const orgMesh = new THREE.Mesh( testGeometry, orgMaterial );
        //const glowGeo = this.createGlowGeometry(orgMesh.geometry, 100)
        let glowMat = glowMaterial3();
        //glowMat.side = THREE.DoubleSide;
        let glowMesh = new THREE.Mesh(testGeometry, glowMat);
        //glowMesh.scale.set(2,2,1)
        glowMesh.position.set(0,400,-5);
        scene.add(glowMesh);
    }

    createGlowGeometry(geometry, size) {
        // Gather vertexNormals from geometry.attributes.normal
        const glowGeometry = geometry.clone();
        const vertexNormals = glowGeometry.attributes.normal.array;
        //console.log(vertexNormals)
        // Modify the vertices according to vertexNormal
        for (let i = 0; i < vertexNormals.length; i += 3) {

            const x = vertexNormals[i];
            const y = vertexNormals[i + 1];
            const z = vertexNormals[i + 2];

            const vertex = new THREE.Vector3(x, y, z);
            vertex.multiplyScalar(size);
            const float32Array = glowGeometry.attributes.position.array.slice(i, i + 3)
            //console.log(glowGeometry.attributes.position.array.slice(i, i + 3))
            vertex.add(new THREE.Vector3(float32Array[0], float32Array[1], float32Array[2]));
            glowGeometry.attributes.position.setXYZ(i / 3, vertex.x, vertex.y, vertex.z);
        }

        return glowGeometry;
    }

    /**
     * plane to display shadow from objects like planes or 3D models
     */
    shadowPlane(scene) {
        const config = this.configuration.shadowPlane;

        const planeGeometry = new THREE.PlaneGeometry(
            config.geometry.width,
            config.geometry.height
        );
        const material = new THREE.ShadowMaterial({
            color: 0x000000
        });
        material.opacity = 0.75;
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.receiveShadow = true;
        plane.position.y = config.mesh.position.y;
        plane.position.z = config.mesh.position.z;
        scene.add(plane);
    }

    spotlight(scene) {
        const config = this.configuration.light;

        const light = new THREE.SpotLight(0xffffff);
        light.castShadow = true; // default false
        light.position.set(config.light.position.x, config.light.position.y, config.light.position.z);
        light.intensity = 0;
        light.angle = config.light.angle

        light.shadow.mapSize.width = config.shadow.mapSize.width; // default
        light.shadow.mapSize.height = config.shadow.mapSize.height; // default
        light.shadow.camera.near = config.shadow.camera.near; // default
        light.shadow.camera.far = config.shadow.camera.far; // default
        light.shadow.camera.aspect = config.shadow.camera.aspect;
        light.shadow.focus = config.shadow.focus; // default

        //scene.add(light);
        //scene.add(light.target );

        light.target.position.x = config.target.position.x;
        light.target.position.y = config.target.position.y;
        light.target.position.z = config.target.position.z;
    }

    spotlight2(scene) {
        const light = new THREE.SpotLight(0xffffff, 1/100);
        light.castShadow = true;

        light.rotation.set(100,-425,0)
        light.position.set(-950,800,1500)
        light.angle = 3
        light.intensity = 0.0001
        light.distance = 2000;
        light.decay = 2;
        //console.log(light.position)
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;

        //light.shadow.camera.near = 500;
        //light.shadow.camera.far = 4000;
        //light.shadow.camera.fov = 30;
        //light.shadow.focus = 1; // default
        //light.shadow.camera.fov = 30;

        //light.target.rotation.set(0,0,0)
        light.target.position.set( 500, 400, 500 );
        light.add( light.target );
        //console.log(light)
        //scene.add(light);

        const sphereSize = 10;
        const pointLightHelper = new THREE.SpotLightHelper( light, sphereSize, '#FF0000' );
        //scene.add( pointLightHelper );

    }

    hexagon(scene, camera) {
        let utility = new Utility(camera);


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

        let hexagonTopLeft = utility.getHexagonBorder(0xFFFFFF, 3, 0.5,20, 'double');
        hexagonTopLeft.scale.set(125,125,0)
        hexagonTopLeft.position.set(-850,800,10)
        hexagonTopLeft.rotation.set(50,-60,100)
        hexagonTopLeft.castShadow = true; //default is false
        hexagonTopLeft.receiveShadow = true; //default
        scene.add(hexagonTopLeft);

        let hexagonMesh = utility.getHexagonMesh(0xF1F1E6, 0.5, 20, 'double');
        hexagonMesh.scale.set(125,125,0)
        hexagonMesh.position.set(-850,800,10)
        hexagonMesh.rotation.set(50,-60,100)
        hexagonMesh.castShadow = true; //default is false
        hexagonMesh.receiveShadow = true; //default
        scene.add(hexagonMesh);

    }

    html(scene) {

        let firstDom001 = document.querySelector('.content-1')
        let antoherDom002 = document.querySelector('.content-2')

        const objContent1 = new CSSObject( firstDom001 )
        objContent1.position.x = 100;
        objContent1.position.y = 200;
        objContent1.position.z = 300;
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


        scene.add(objContent1);
        scene.add(objContent2);
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

