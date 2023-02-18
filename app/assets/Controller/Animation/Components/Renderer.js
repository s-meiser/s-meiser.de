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





    return {renderer};

}

const CSSRenderer = () => {
    const CSSRenderer = new CSS3DRenderer();
    CSSRenderer.setSize( window.innerWidth, window.innerHeight );
    CSSRenderer.domElement.style.position = 'fixed'
    CSSRenderer.domElement.style.top = '0'
/*    CSSRenderer.domElement.style.width = '0px';
    CSSRenderer.domElement.style.height = '0px';*/
    console.log(CSSRenderer)
    return {CSSRenderer};
}

export {Renderer, CSSRenderer};

