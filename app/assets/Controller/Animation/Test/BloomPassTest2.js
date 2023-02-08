import * as THREE from "three";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {UnrealBloomPass} from "../BloomPass/TransparentBackgroundFixedUnrealBloomPass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import RoundedRectShape from "../Shapes/RoundedRectShape";

const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

this.materials = {};

const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
const materials = {};


this.params = {
    exposure: 1,
    bloomStrength: 2,
    bloomRadius: 2,
    bloomThreshold: 0
};

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

//this.scene.add( new THREE.AmbientLight( 0x404040 ) );

const renderScene = new RenderPass( this.scene, this.camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = this.params.bloomThreshold;
bloomPass.strength = this.params.bloomStrength;
bloomPass.radius = this.params.bloomRadius;

const bloomComposer = new EffectComposer( this.renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial( {
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        defines: {}
    } ), 'baseTexture'
);
finalPass.needsSwap = true;

const composer = new EffectComposer( this.renderer );
composer.addPass( renderScene );
composer.addPass( finalPass );


this.scene.traverse( disposeMaterial );
this.scene.children.length = 0;


/*        let roundedRectShape = new RoundedRectShape({
            x: -600,
            y: -600,
            width: 1200,
            height: 2000,
            rounded: 20
        });
        let rectGeo = roundedRectShape.roundedRectShape();
        let shape = new THREE.ShapeGeometry(rectGeo);

        let mesh = new THREE.Mesh(shape, new THREE.MeshBasicMaterial({
            color: 0x020202,
            side: THREE.DoubleSide
        }));

        //plane.position.y = -200;
        mesh.position.set( 0, 300, 100);
        mesh.name = 'header'
        mesh.layers.enable( 1 );
        //mesh.rotation.x = Math.PI * 0.5;
        this.scene.add( mesh);


        let mesh2 = new THREE.Mesh(shape, new THREE.MeshBasicMaterial({
            color: 0xFF0000
        }));

        mesh2.position.set( 0, 0, 150);
        mesh2.name = 'header2'
        mesh2.layers.enable( 2);
        this.scene.add( mesh2 );*/


const geometry = new THREE.IcosahedronGeometry( 1, 15 );

for ( let i = 0; i < 50; i ++ ) {

    const color = new THREE.Color();
    color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 );

    const material = new THREE.MeshBasicMaterial( { color: color } );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = Math.random() * 10 - 5;
    sphere.position.y = Math.random() * 10 - 5;
    sphere.position.z = 0
    //sphere.position.normalize().multiplyScalar( Math.random() * 4.0 + 2.0 );
    //sphere.scale.setScalar( Math.random() * Math.random() + 0.5 );
    this.scene.add( sphere );

    if ( Math.random() < 0.25 ) sphere.layers.enable( BLOOM_SCENE );

}

let roundedRectShapeShadow = new RoundedRectShape({
    x: -100,
    y: -100,
    width: 200,
    height: 200,
    rounded: 20
});
let rectGeoShadow = roundedRectShapeShadow.roundedRectShape();
let shapeShadow = new THREE.ShapeGeometry(rectGeoShadow);
let meshShadow = new THREE.Mesh(shapeShadow, new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x020202,
    side: THREE.DoubleSide
}));
meshShadow.position.set( 0, 300, 100);
meshShadow.name = 'header'
meshShadow.castShadow = true; //default is false
meshShadow.receiveShadow = false; //default
meshShadow.layers.enable( 1 );
this.scene.add( meshShadow);


/*
let roundedRectShape = new RoundedRectShape({
    x: -105,
    y: -105,
    width: 210,
    height: 210,
    rounded: 20
});
let rectGeo = roundedRectShape.roundedRectShape();
let shapeShadow = new THREE.ShapeGeometry(rectGeoShadow);
let meshShadow = new THREE.Mesh(shapeShadow, new THREE.MeshPhongMaterial({
    color: 0x000000,
    emissive: 0x020202,
    side: THREE.DoubleSide
}));
meshShadow.position.set( 0, 300, 100);
meshShadow.name = 'header'
meshShadow.castShadow = true; //default is false
meshShadow.receiveShadow = false; //default
this.scene.add( meshShadow);
*/



const getScene = this.scene;

render(getScene);


function disposeMaterial( obj ) {
    if ( obj.material ) {
        obj.material.dispose();
    }
}

function render(scene) {
    requestAnimationFrame(() => { render(); });
    // render scene with bloom
    renderBloom( scene );
    // render the entire scene, then render bloom scene on top
    composer.render();

}

function renderBloom( scene ) {
    getScene.traverse( darkenNonBloomed );
    bloomComposer.render();
    getScene.traverse( restoreMaterial );
}

function darkenNonBloomed( obj ) {
    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
        materials[ obj.uuid ] = obj.material;
        obj.material = darkMaterial;
    }
}

function restoreMaterial( obj ) {
    if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
    }

}
