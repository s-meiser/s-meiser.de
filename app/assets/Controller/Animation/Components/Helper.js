import * as THREE from "three";
import {GUI} from "three/examples/jsm/libs/lil-gui.module.min";
import RoundedRectShape from "../Shapes/RoundedRectShape";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {UnrealBloomPass} from "../BloomPass/TransparentBackgroundFixedUnrealBloomPass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {linearGradientMesh, Scene, setGradient} from "./Scene";
import {linearGradientShader} from "../Materials/LinearGradientShader";

const Helper = (camera, scene, renderer, bloomComposer) => {

    const size = 1000;
    const divisions = 50;
    const gridHelper = new THREE.GridHelper( size, divisions );
    //scene.add( gridHelper );

/*
    const helper = new THREE.CameraHelper( camera );
    scene.add( helper );
*/

/*    const light2 = new THREE.AmbientLight( 0xFF0000FF ); // soft white light
    scene.add( light2 );*/

    //const pointLight = new THREE.PointLight( 0xffffff );
    //camera.add( pointLight );

/*    const light = new THREE.SpotLight(0xffffff);
    light.castShadow = true; // default false
    light.position.set( 0, 0, 1200 );
    //light.position.z = 1200;
    //light.position.y = 0;
    light.intensity = 0;
    //light.angle = Math.PI / 5;
    light.angle = 0.698

    //light.position.set( 0, 600, 800 );
    //light.castShadow = true;


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
    light.target.position.z = 0*/


/*
    const sphereSize = 1;
    const pointLightHelper = new THREE.SpotLightHelper( light, sphereSize, '#FF0000' );
    scene.add( pointLightHelper );
*/

/*    const planeGeometry = new THREE.PlaneGeometry(
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
    scene.add(plane);*/


/*    const box = new THREE.BoxHelper( plane, 0xffff00 );
    scene.add( box );*/

/*    const geometry = new THREE.CircleGeometry( 250, 32 );
    const material2 = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh( geometry, material2 );
    circle.position.y = 550;
    circle.position.z = 55;
    circle.castShadow = true; //default is false
    circle.receiveShadow = false; //default
    //scene.add( circle );*/

    /**
     * ShadowPlane
     * @type {RoundedRectShapeShadow}
     */
/*
    let roundedRectShapeShadow = new RoundedRectShape({
        x: -250,
        y: -250,
        width: 450,
        height: 450,
        rounded: 20
    });
    let rectGeoShadow = roundedRectShapeShadow.roundedRectShape();
    let shapeShadow = new THREE.ShapeGeometry(rectGeoShadow);

    let meshShadow = new THREE.Mesh(shapeShadow, new THREE.MeshPhongMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
    }));

    //plane.position.y = -200;
    meshShadow.position.set( 0, 600, 100);
    meshShadow.name = 'header'
    meshShadow.castShadow = true; //default is false
    meshShadow.receiveShadow = false; //default
    //mesh.rotation.x = Math.PI * 0.5;
    scene.add(meshShadow);
*/

    /**
     * ShadowPlane
     */
/*    const geometryShadow = new THREE.SphereGeometry( 400, 32, 16 );
    const materialShadow = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
    });
    const sphere = new THREE.Mesh( geometryShadow, materialShadow );
    sphere.position.set( -350, 1600, 0);
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    scene.add( sphere );*/


    /**
     * ColorPlane
     * @type {RoundedRectShape}
     */
/*    let roundedRectShape = new RoundedRectShape({
        x: -700,
        y: -100,
        width: 1400,
        height: 800,
        rounded: 20
    });
    let rectGeo = roundedRectShape.roundedRectShape();
    let shape = new THREE.ShapeGeometry(rectGeo);*/

/*    let hiddenMesh = new THREE.Mesh(shape, new THREE.MeshPhongMaterial({
        color: 0x000000,
        emissive: 0x29abe2,
        side: THREE.DoubleSide,
        opacity: 0
    }));
    hiddenMesh.position.set( 0, 1800, 99);
    hiddenMesh.name = 'hiddenMesh'
    hiddenMesh.castShadow = true; //default is false
    hiddenMesh.receiveShadow = false; //default
    scene.add(hiddenMesh);*/


/*    let mat = linearGradientShader('27.0', '#090d12', '#1c2f35')
    let mesh = new THREE.Mesh(shape, mat);
    mesh.position.set( 0, 1800, 100);
    mesh.name = 'header'
    mesh.castShadow = true; //default is false
    mesh.receiveShadow = true; //default
    scene.add(mesh);*/

    //var mesh2 = new THREE.Mesh(geometry, material2);
    //scene.add(mesh2);

    // GUI
/*
    const gui = new GUI();

    const params = {
        color: light.color.getHex(),
        PosX: light.position.x,
        PosZ: light.position.z,
        PosY: light.position.y,
        intensity: light.intensity,
        distance: light.distance,
        angle: light.angle,
        penumbra: light.penumbra,
        decay: light.decay,
        focus: light.shadow.focus,
        CamNear: light.shadow.camera.near,
        CamFar: light.shadow.camera.far,
        cameraFov:light.shadow.camera.fov,
        LightPosX: light.target.position.x,
        LightPosY: light.target.position.y,
        LightPosZ: light.target.position.z,
        shadows: true
    };
*/




/*    gui.add( params, 'LightPosX', -1000, 1000 ).onChange( function ( val ) {
        light.target.position.x = val;
        console.log(light.target.position);
    } );

    gui.add( params, 'LightPosY', -1000, 1000 ).onChange( function ( val ) {
        light.target.position.y =  val;
        console.log(light.target.position);
    } );
    gui.add( params, 'LightPosZ', -1000, 1000 ).onChange( function ( val ) {
        light.target.position.z =  val;
        console.log(light.target.position);
    } );


    gui.add( params, 'PosX', 0, 4000 ).onChange( function ( val ) {
        light.position.x =  val;
    } );

    gui.add( params, 'PosZ', 0, 4000 ).onChange( function ( val ) {
        light.position.z =  val;
    } );

    gui.add( params, 'PosY', -2000, 4000  ).onChange( function ( val ) {
        light.position.y =  val;
    } );

    gui.add( params, 'CamNear', 1, 4000  ).onChange( function ( val ) {
        light.shadow.camera.near =  val;
    } );

    gui.add( params, 'CamFar', 1, 4000  ).onChange( function ( val ) {
        light.shadow.camera.far =  val;
    } );

    gui.add( params, 'cameraFov', 0, 200  ).onChange( function ( val ) {
        light.shadow.camera.fov =  val;
    } );

    gui.addColor( params, 'color' ).onChange( function ( val ) {
        light.color.setHex( val );
    } );

    gui.add( params, 'intensity', 0, 10 ).onChange( function ( val ) {
        light.intensity = val;
    } );


    gui.add( params, 'distance', 0, 200 ).onChange( function ( val ) {
        light.distance = val;
    } );

    gui.add( params, 'angle', 0, 2 ).onChange( function ( val ) {
        light.angle = val;
    } );

    gui.add( params, 'penumbra', 0, 1 ).onChange( function ( val ) {
        light.penumbra = val;
    } );

    gui.add( params, 'decay', 1, 2 ).onChange( function ( val ) {
        light.decay = val;
    } );

    gui.add( params, 'focus', 0, 10 ).onChange( function ( val ) {
        light.shadow.focus = val;
    } );


    gui.add( params, 'shadows' ).onChange( function ( val ) {
        renderer.shadowMap.enabled = val;
        scene.traverse( function ( child ) {
            if ( child.material ) {
                child.material.needsUpdate = true;
            }
        } );
    } );

    gui.open();*/
}

export {Helper};

