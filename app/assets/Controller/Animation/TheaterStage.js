import * as THREE from 'three';
import {Camera} from "./Components/Camera";
import {Helper} from "./Components/Helper";
import Renderer from "./Components/Renderer";
import {Controls, ControlInstructions} from "./Components/Controls";
import Scene from "./Components/Scene";
import Configuration from "./Components/Configuration";
import {ExternalLoader} from "./Components/Loader";
import $ from "jquery";


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

    loaderStatus = 0;

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
        ExternalLoader(this.scene, this.config).then(function (response) {
            //console.log(response)
            //console.log('then2');
            //console.log(window.loaderWelcomingSign)
        });
    }

    setRenderer() {
        this.renderObjects = new Renderer(this.config, this.camera);
        this.renderer = this.renderObjects.renderer(this.camera, this.scene, this.config);
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
        this.cameraElement.style.width = window.innerWidth + 'px';
        this.cameraElement.style.height = window.innerHeight + 'px';

        this.renderer.domElement.id = 'canvasRenderer';
    }


    animate(time) {
        requestAnimationFrame(() => { this.animate(); });

        if (typeof window.resized !== 'undefined' && window.resized === true) {
            $('.loading-bar-left,.loading-bar-right').empty();
            $('.loader-container').show();
            $('#canvasRenderer,.obit-controls-gizmo,.cameraContainer').css('filter', 'blur(3px)');


            window.resized = false
            this.scene.clear();

            let config = new Configuration();

            this.camera.left = config.camera.orthographicCamera.left
            this.camera.right = config.camera.orthographicCamera.right
            this.camera.top = config.camera.orthographicCamera.top
            this.camera.bottom = config.camera.orthographicCamera.bottom
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.position.set(config.camera.position.x, config.camera.position.y, config.camera.position.z);
            this.camera.updateProjectionMatrix();

            this.controls.controls.target.set(
                config.controls.position.x,
                config.controls.position.y,
                config.controls.position.z,
            )
            this.camera.position.x = this.controls.controls.target.x
            this.camera.position.y = this.controls.controls.target.y
            this.controls.controls.update();

            this.scene = new Scene(this.camera, config);
            ExternalLoader(this.scene, this.config).then(function (response) {
                //console.log(response)
            });

            this.cameraElement = document.querySelector('.cameraContainer');
            this.cameraElement.style.width = window.innerWidth + 'px';
            this.cameraElement.style.height = window.innerHeight + 'px';

            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.render( this.scene, this.camera );
            this.renderObjects.htmlRenderer(this.scene, this.camera, this.cameraElement );
        }
        this.renderer.render( this.scene, this.camera );
        this.renderObjects.htmlRenderer(this.scene, this.camera, this.cameraElement );
    }

}

export {TheaterStage}
