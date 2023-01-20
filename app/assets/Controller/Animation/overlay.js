import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import Utility from './Utility.js';
import $ from 'jquery';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function overlay(){

    var content = '<div class="row h-100 rounded-4 content-background-color content-box-shadow"></div>';

/*    var content = '<div>' +
        '<h1>This is an H1 Element.</h1>' +
        '<span class="large">Hello Three.js cookbook</span>' +
        '<textarea> And this is a textarea</textarea>' +
        '</div>';*/

    let camera, scene, renderer;

    let scene2, renderer2;

    const frustumSize = 500;

    let clock = new THREE.Clock();
    let delta = 0;

    init();
    animate();

    function init() {

        const aspect = window.innerWidth / window.innerHeight;
        camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );

        camera.position.set( - 200, 200, 200 );

        scene = new THREE.Scene();


        scene2 = new THREE.Scene();

        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            wireframeLinewidth: 1,
            side: THREE.DoubleSide
        });


        // bottom



        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

/*        renderer.setPixelRatio( 1 );
        renderer.setSize( 1920, 1080 );
        document.body.appendChild( renderer.domElement );*/

        renderer2 = new CSS3DRenderer();
        renderer2.setSize( window.innerWidth, window.innerHeight );
        renderer2.domElement.style.position = 'absolute';
        renderer2.domElement.style.top = 0;
        document.body.appendChild( renderer2.domElement );

        const controls = new OrbitControls( camera, renderer2.domElement );
        controls.minZoom = 0.5;
        controls.maxZoom = 2;

        const cssElement = createCSS3DObject(content);


        function createCSS3DObject(content)
        {
            // convert the string to dome elements
            const wrapper = document.createElement('div');
            wrapper.innerHTML = content;
            const div = wrapper.firstChild;

            // set some values on the div to style it.
            // normally you do this directly in HTML and
            // CSS files.
            div.style.width = '370px';
            div.style.height = '370px';
            //div.style.background = new THREE.Color(Math.random() * 0xffffff).getStyle();

            // create a CSS3Dobject and return it.
            //var object = new CSS3DObject(div);
            //return object;

            const object = new CSS3DObject( div );
            scene2.add( object );


        }

        function createPlane( width, height, cssColor, pos, rot ) {

            const element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = 0.75;
            element.style.background = cssColor;

            const object = new CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            scene2.add( object );

            const geometry = new THREE.PlaneGeometry( width, height );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.copy( object.position );
            mesh.rotation.copy( object.rotation );
            scene.add( mesh );

        }

        window.addEventListener( 'resize', onWindowResize );

    }

    function update() {

    }

    function onWindowResize() {

        camera.aspect = 1920 / 1080;
        camera.updateProjectionMatrix();
        renderer.setSize( 1920, 1080 );

    }

    function animate(time) {

        requestAnimationFrame( animate );

        renderer.render( scene, camera );
        renderer2.render( scene2, camera );

    }
}