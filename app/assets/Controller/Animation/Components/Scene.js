import * as THREE from 'three';
import {CSS3DObject} from "three/examples/jsm/renderers/CSS3DRenderer";
import {linearGradientShader} from "../Materials/LinearGradientShader";
import RoundedRectShape from "../Shapes/RoundedRectShape";

const Scene = () => {
    let scene = new THREE.Scene();
    const initialCss3DObjectForRef = addInitialCss3DObjectForRef();
    scene.add(initialCss3DObjectForRef);
    return scene;
}

const addInitialCss3DObjectForRef = () => {
    let content = '<div></div>';
    let wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    let div = wrapper.firstChild;
    div.id = 'css3dRenderer'
    let obj =  new CSS3DObject(div);
    /**
     * set initial Position
     */
    obj.position.set( -600, 2000, 110);
    return obj;
}



const addPlane = (scene) => {
    /**
     * hidden Mesh to cast shadow
     * THREE.ShaderMaterial does not support casting shadows out of the box
     */
    const shadowShape = roundedRectShape(-700,-500,1400,600,20);
    let hiddenMesh = new THREE.Mesh(shadowShape, new THREE.MeshBasicMaterial({
        color: 0x000000,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0
    }));
    hiddenMesh.position.set( 0, 1800, 110);
    hiddenMesh.name = 'hiddenMesh'
    hiddenMesh.castShadow = true; //default is false
    hiddenMesh.receiveShadow = false; //default
    scene.add(hiddenMesh);

    const shape = roundedRectShape(-700,-100,1400,800,20);
    let mat = linearGradientShader('27.0', '#090d12', '#1c2f35')
    let mesh = new THREE.Mesh(shape, mat);
    mesh.position.set( 0, 1800, 100);
    mesh.name = 'header'
    scene.add(mesh);
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

/**
 * plane to display shadow from objects like planes or 3D models
 */
const shadowPlane = (scene) => {
    const planeGeometry = new THREE.PlaneGeometry(
        10000,
        10000
    );
    const material = new THREE.ShadowMaterial({
        color: 0x000000
    });
    material.opacity = 0.75;
    const plane = new THREE.Mesh(planeGeometry, material);
    plane.receiveShadow = true;
    plane.position.y = 400;
    plane.position.z = -10;
    scene.add(plane);
}

const spotlight = (scene) => {
    const light = new THREE.SpotLight(0xffffff);
    light.castShadow = true; // default false
    light.position.set( 0, 0, 1200 );
    light.intensity = 0;
    light.angle = 0.698

    light.shadow.mapSize.width = 256; // default
    light.shadow.mapSize.height = 256; // default
    light.shadow.camera.near = 1; // default
    light.shadow.camera.far = 1500; // default
    light.shadow.camera.aspect = 500;
    light.shadow.focus = 2.3; // default

    scene.add(light);
    scene.add(light.target );

    light.target.position.x = 0
    light.target.position.y = 0
    light.target.position.z = 0
}
export {Scene, addPlane, shadowPlane, spotlight};

