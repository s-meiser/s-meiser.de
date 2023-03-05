import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Camera} from "./Components/Camera";
import {Helper} from "./Components/Helper";
import Renderer from "./Components/Renderer";
import {Controls, CSSControls} from "./Components/Controls";
import Scene from "./Components/Scene";
import Configuration from "./Components/Configuration";
import {Matrix4} from "three";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import {CSSObject} from './Components/CSSObject';

class TheaterStage {

    camera;
    scene;
    renderer;
    renderObjects;
    controls;
    CSSRenderer;
    CSSControls;
    animateContainer;
    config;
    domElement = {};
    cameraElement;
    delta = 0;
    clock = new THREE.Clock();

    // helper
    composer;
    bloomComposer;

    constructor() {

        // load config
        this.config = new Configuration();

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
    }

    setCamera() {
        this.camera = Camera(this.config);
    }

    setScene() {
        this.scene = new Scene(this.camera, this.config);
    }

    setRenderer() {
        this.renderObjects = new Renderer(this.config);
        this.renderer = this.renderObjects.renderer();
    }

    setControls() {
        this.controls = Controls(this.camera, this.renderer, this.CSSRenderer, this.config);
    }

    setHelper() {
        Helper(this.camera, this.scene, this.renderer, this.bloomComposer);
    }

    addToDom() {
        document.getElementById('mainContainer').appendChild(this.renderer.domElement);
        document.getElementById('mainContainer').appendChild(this.controls.controlsGizmo.domElement);

        this.cameraElement = document.querySelector('.cameraContainer');
        this.cameraElement.style.width = window.innerWidth+'px';
        this.cameraElement.style.height = window.innerHeight+'px';

        this.renderer.domElement.id = 'canvasRenderer';
    }

    animate(time) {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render( this.scene, this.camera );
        this.renderObjects.htmlRenderer(this.scene, this.camera, this.cameraElement );
    }

}

export {TheaterStage}
