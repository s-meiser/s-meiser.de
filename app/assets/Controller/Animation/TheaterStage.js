import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Camera} from "./Components/Camera";
import {Helper} from "./Components/Helper";
import {Renderer, CSSRenderer} from "./Components/Renderer";
import {Controls, CSSControls} from "./Components/Controls";
import Scene from "./Components/Scene";


class TheaterStage {

    camera;
    scene;
    composer;
    bloomComposer;
    renderer;
    controls;
    clock;
    delta;
    spotLight;
    bloomLayer;
    darkMaterial;
    materials;
    params;
    CSSRenderer;
    CSSControls;
    animateContainer;

    constructor() {

        /**
         * Components
         */
        this.setCamera();
        this.setScene();
        this.setRenderer();
        this.setControls();

        /**
         * Helper
         */
        this.setHelper();

        /**
         * Add to Html
         */
        this.addToDom();

        /**
         * Call always as last function
         */
        this.animate();
        //this.render();
    }

    setCamera() {
        this.camera = Camera();
    }

    setScene() {
        this.scene = new Scene();
    }

    setRenderer() {
        this.renderer = Renderer().renderer;
        this.CSSRenderer = CSSRenderer().CSSRenderer
    }

    setControls() {
        this.controls = Controls(this.camera, this.renderer);
        this.CSSControls = CSSControls(this.camera, this.CSSRenderer);
    }

    setHelper() {
        Helper(this.camera, this.scene, this.renderer, this.bloomComposer);
    }

    addToDom() {
        document.getElementById('mainContainer').appendChild(this.CSSRenderer.domElement);
        document.getElementById('mainContainer').appendChild(this.renderer.domElement);
        document.getElementById('mainContainer').appendChild(this.CSSControls.controlsGizmo.domElement);
    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render( this.scene, this.camera );
        this.CSSRenderer.render( this.scene, this.camera );
        //let css3DTransformMatrix = this.CSSRenderer.domElement.firstChild.style.transform;

        /**
         * hack to get initial matrix
         */
        if (document.getElementsByClassName('animateContainer')[0].style.transform === '') {
            document.getElementsByClassName('animateContainer')[0].style.transform = this.CSSRenderer.domElement.firstChild.style.transform
            document.getElementsByClassName('animateContainer')[0].children[0].style.transform = document.getElementById('css3dRenderer').style.transform;
        }
    }



}

export {TheaterStage}
