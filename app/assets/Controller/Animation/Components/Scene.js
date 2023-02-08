import * as THREE from 'three';
import RoundedRectShape from "./../Shapes/RoundedRectShape";

const Scene = () => {

    let scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x090d12 );
    //scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );
    return scene;
}

const addPlane = (scene) => {

/*
    const light = new THREE.SpotLight( 0xffffff );
    light.castShadow = true; // default false
    light.position.z = 1000;
    light.position.y = 600;
    light.intensity = 1;
    light.distance = 1000;
    light.angle = 1;
    light.power = 1;

    //light.position.set( 0, 600, 800 );
    //light.castShadow = true;

    light.shadow.mapSize.width = 1024; // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 1; // default
    light.shadow.camera.far = 1500; // default
    light.shadow.focus = 1; // default
    //light.shadow.camera.fov = 150;
    scene.add(light);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( light, sphereSize, '#FF0000' );
    scene.add( pointLightHelper );


    const planeGeometry = new THREE.PlaneGeometry(
        5000,
        1000,
    );

    const material = new THREE.ShadowMaterial();
    material.opacity = 1;

    const plane = new THREE.Mesh(planeGeometry, material);
    plane.receiveShadow = true;
    plane.position.y = 0;
    plane.position.z = -10;

    scene.add(plane);


    let roundedRectShape = new RoundedRectShape({
        x: -600,
        y: -60,
        width: 1200,
        height: 120,
        rounded: 20
    });
    let rectGeo = roundedRectShape.roundedRectShape();
    let shape = new THREE.ShapeGeometry(rectGeo);

    let mesh = new THREE.Mesh(shape, new THREE.MeshPhongMaterial({
        color: 0x000000,
        emissive: 0x29abe2,
        side: THREE.DoubleSide
    }));
    mesh.position.set( 0, 0, 0);
    mesh.name = 'header'
    mesh.castShadow = true; //default is false
    mesh.receiveShadow = false; //default
    //mesh.rotation.x = Math.PI * 0.5;
    scene.add( mesh);*/

}

export {Scene, addPlane};

