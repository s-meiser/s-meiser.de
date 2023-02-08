import * as THREE from 'three';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

const Renderer = () => {

    let renderer;
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio( 1 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.id = 'threejs';
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    //



    const CSSRenderer = new CSS3DRenderer();
    CSSRenderer.setSize( window.innerWidth, window.innerHeight );

    return {renderer, CSSRenderer};

}

export {Renderer};

