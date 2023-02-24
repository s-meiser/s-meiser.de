import * as THREE from 'three';
import {linearGradientShader} from "../Materials/LinearGradientShader";
import RoundedRectShape from "../Shapes/RoundedRectShape";
import Utility from "./Utility";
import {MathUtils} from "three";
import {TWEEN} from "three/examples/jsm/libs/tween.module.min";

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

    constructor(camera, configuration) {
        this.configuration = configuration;
        this.camera = camera;

        this.newScene = this.scene();
        this.addPlane(this.newScene);
        this.shadowPlane(this.newScene);
        this.spotlight(this.newScene);
        this.hexagon(this.camera);

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
        let mat = linearGradientShader('27.0', '#090d12', '#1c2f35')
        let mesh = new THREE.Mesh(shape, mat);
        mesh.position.set(config.mesh.object.position.x, config.mesh.object.position.y, config.mesh.object.position.z);
        mesh.name = config.mesh.object.name
        scene.add(mesh);
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

        scene.add(light);
        scene.add(light.target );

        light.target.position.x = config.target.position.x;
        light.target.position.y = config.target.position.y;
        light.target.position.z = config.target.position.z;
    }

    hexagon(camera) {
        let utility = new Utility(camera);

        let margin = 1.1;

        // 93278f << lila
        // 29abe2 << blau

        let borderHex1 = utility.addBorderLine(0xFFDC00);
        this.groupMatLineHex.push(borderHex1.matLine);
        let geoAttributeHex1 = utility.setGeoAttribute(borderHex1.matLine, borderHex1);

        const lineWidth = 1000/camera.position.z*utility.lineMultiplier;
        const scale = (camera.position.z/1000)*lineWidth+300;

        borderHex1.line.scale.set(scale, scale, 0);
        borderHex1.line.position.set(0, 0, 30);
        borderHex1.line.rotateZ(MathUtils.degToRad(30));
        //borderHex1.matLine.opacity = 0.2;

/*        let tween1 = new TWEEN.Tween(borderHex1.matLine)
            .to({opacity: 0.8}, 1000)
            .onUpdate()

        let tweenBack1 = new TWEEN.Tween(borderHex1.matLine)
            .to({opacity: 0.2}, 1000)
            .onUpdate()
            .onComplete(() => setTimeout(() => this.groupTween[0].start(), 4000))

        this.groupTween.push(tween1);
        this.groupTweenBack.push(tweenBack1);

        this.groupTween[0].chain(this.groupTweenBack[0]);

        this.groupTween[0].start();
*/
        utility.addToScene(this.newScene, [
            borderHex1.line,
            geoAttributeHex1
        ]);


/*        let hex1 = utility.createHexagon();
        hex1.position.set(0, -10*margin, 30);
        hex1.scale.set(300, 300, 0);
        hex1.rotateZ(MathUtils.degToRad(30));
        this.newScene.add(hex1);

        let tween1Hex = new TWEEN.Tween(hex1.material)
            .to({opacity: 0.8}, 1000)
            .onUpdate()

        let tweenBack1Hex = new TWEEN.Tween(hex1.material)
            .to({opacity: 0.2}, 1000)
            .onUpdate()
            .onComplete(() => setTimeout(() => this.groupTweenHex[0].start(), 4000))

        this.groupTweenHex.push(tween1Hex);
        this.groupTweenBackHex.push(tweenBack1Hex);

        this.groupTweenHex[0].chain(this.groupTweenBackHex[0]);

        this.groupTweenHex[0].start();*/

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

