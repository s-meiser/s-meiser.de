import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Camera} from "./Components/Camera";
import {addPlane, Scene} from "./Components/Scene";
import {Helper} from "./Components/Helper";
import {Renderer} from "./Components/Renderer";
import {Controls} from "./Components/Controls";


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
        this.scene = Scene();
        addPlane(this.scene);
    }

    setRenderer() {
        this.renderer = Renderer().renderer;
        this.CSSRenderer = Renderer().CSSRenderer
    }

    setControls() {
        this.controls = Controls(this.camera, this.renderer, this.CSSRenderer);

    }

    setHelper() {
        Helper(this.camera, this.scene, this.renderer, this.bloomComposer);
    }

    addToDom() {
        document.getElementById('mainContainer').appendChild(this.renderer.domElement);
        document.getElementById('mainContainer').appendChild(this.controls.controlsGizmo.domElement);
        document.getElementById( 'mainContainer').appendChild( this.CSSRenderer.domElement );

        let content = '<div>' +
            '<h1>This is an H1 Element.</h1>' +
            '<span class="large">Hello Three.js cookbook</span>' +
            '<textarea> And this is a textarea</textarea>' +
            '</div>';

        //let cssElement = createCSS3DObject(content);


        // convert the string to dome elements
        let wrapper = document.createElement('div');
        wrapper.innerHTML = content;
        let div = wrapper.firstChild;

        // set some values on the div to style it.
        // normally you do this directly in HTML and
        // CSS files.
        div.style.width = '370px';
        div.id = 'testdiv'
        div.style.height = '370px';
        div.style.opacity = 0.7;
        div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

        // create a CSS3Dobject and return it.
        let obj =  new CSS3DObject(div);
        this.scene.add(obj);





    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render( this.scene, this.camera );
        //this.CSSRenderer.render( this.scene, this.camera );

    }



}

export {TheaterStage}
