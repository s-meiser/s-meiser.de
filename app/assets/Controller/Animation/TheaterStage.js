import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Camera} from "./Components/Camera";
import {Helper} from "./Components/Helper";
import Renderer from "./Components/Renderer";
import {Controls, CSSControls} from "./Components/Controls";
import Scene from "./Components/Scene";
import Configuration from "./Components/Configuration";
import {Matrix4} from "three";


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
    domElement;
    cameraElement;

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
        this.scene = new Scene(this.config);
    }

    setRenderer() {
        this.renderObjects = new Renderer(this.config);
        this.renderer = this.renderObjects.renderer();
        //this.CSSRenderer = this.renderObjects.cssRenderer()
    }

    setControls() {
        this.controls = Controls(this.camera, this.renderer, this.CSSRenderer, this.config);
        //this.CSSControls = CSSControls(this.camera, this.CSSRenderer, this.config);
    }

    setHelper() {
        Helper(this.camera, this.scene, this.renderer, this.bloomComposer);
    }

    addToDom() {
        //document.getElementById('mainContainer').appendChild(this.CSSRenderer.domElement);
        document.getElementById('mainContainer').appendChild(this.renderer.domElement);
        document.getElementById('mainContainer').appendChild(this.controls.controlsGizmo.domElement);

        this.cameraElement = document.querySelector('.cameraContainer')
        this.domElement = document.querySelector('.domContainer')

        this.cameraElement.style.width = window.innerWidth+'px';
        this.cameraElement.style.height = window.innerHeight+'px';
    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render( this.scene, this.camera );
        this.renderObjects.htmlRenderer(this.scene, this.camera, this.domElement, this.cameraElement );
        //this.CSSRenderer.render( this.scene, this.camera );
    }

}

export {TheaterStage}
