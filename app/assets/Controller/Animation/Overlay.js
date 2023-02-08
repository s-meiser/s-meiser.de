import * as THREE from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OrbitControlsGizmo } from './OrbitControlsGizmo';
import { ControlSettings } from './ControlSettings';

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";


export async function Overlay() {


    //const content = '<div class="row h-100 rounded-4 content-background-color content-box-shadow">' +
    const content = '<div class="row h-100 rounded-4 content-background-color content-box-shadow">' +
        '<div class="col">' +
        '<h1 class="text-white">test</h1>' +
        '</div>' +
        '</div>';


    let camera, scene, renderer, controls;

    let clock = new THREE.Clock();
    let delta = 0;

    init();
    animate();

    function init() {

        /**
         * Bootstrap Grid Breakpoints
         *
         * xs: 0
         * sm: 576px
         * md: 768px
         * lg: 992px
         * xl: 1200px
         * xxl: 1400px
         */

        /**
         * Desktop:
         * Full HD Resolution => 1920 x 1080 | 16:9
         * 2K Resolution => 2.560 x 1.440 | 16:9
         * UWQHD => 3.440 x 1.440 | 21:9
         *
         * Smartphones:
         */

        const frustumSize = 10;
        const aspect = window.innerWidth / window.innerHeight;


        camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );


        scene = new THREE.Scene();
        camera.position.set( 0, 0, -1 );
        //scene.background = new THREE.Color( 0x090d12 );
        scene.fog = new THREE.Fog( 0xe0e0e0, 20, 100 );


        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        renderer.setPixelRatio( 1 );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.domElement.id = 'threejs';



/*        cssRenderer = new CSS3DRenderer();
        let divElement = cssRenderer.domElement;

        cssRenderer.setSize(window.innerWidth, window.innerHeight);
        divElement.style.position = 'absolute';
        divElement.style.transformStyle = 'flat'
        divElement.className = 'CSS3DRenderer';
        divElement.style.top = 0;
        divElement.children[0].style.setProperty("transform-style", 'flat')*/




        //controls = new OrbitControls(camera, cssRenderer.domElement);
        controls = new OrbitControls(camera, renderer.domElement);
        //controls = new OrbitControls(camera, renderer.domElement);
        //controls.enableZoom = false;
        //controls.enablePan = false;


        /**
         * add the Obit Controls Gizmo
         */
        const controlsGizmo = new OrbitControlsGizmo(controls, {
            size: 100,
            padding: 12,
            bubbleSizePrimary: 10,
            bubbleSizeSecondary: 6,
            fontSize: "11px",
            fontFamily: "\"Roboto\", sans-serif",
            fontWeight: "500",
            fontColor: "#FFFFFF"
        });


        /**
         * set ControlsSettings
         */
        const controlsSettings = new ControlSettings(controls);
        //controlsSettings.setPolarAngle()
        //controlsSettings.setAzimuthAngle()

/*        const mouseScrollSpeed = 10;
        document.addEventListener('wheel', (event) => {
            if (Math.sign(event.deltaY) === 1) {
                cssElement.position.y += mouseScrollSpeed;
            }
            if (Math.sign(event.deltaY) === -1) {
                cssElement.position.y -= mouseScrollSpeed;
            }
        });*/


        // Instantiate a loader
        const loader = new GLTFLoader();

        // Optional: Provide a DRACOLoader instance to decode compressed mesh data
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );

        // Runtime 3D Asset Delivery - GitHub
        // Load a glTF resource
        loader.load(
            // resource URL
            'build/models/gltf/oak_trees.gltf',
            // called when the resource is loaded
            function ( gltf ) {

                gltf.scene.position.z = 10;
                scene.add( gltf.scene );
                //gltf.scene.scale.set(10, 10, 10)

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object

            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );



        const geometry = new THREE.PlaneGeometry( 1, 1 );
        const material = new THREE.MeshBasicMaterial({
            color: 0xffff00, side: THREE.DoubleSide
        });
        const plane = new THREE.Mesh( geometry, material );
        plane.position.set(0,0,10)
        scene.add( plane );


        /**
         * HELPER
         */
        const size = 10;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );

        const helper = new THREE.CameraHelper( camera );
        scene.add( helper );

        document.getElementById('mainContainer').appendChild(renderer.domElement);
        document.getElementById('mainContainer').appendChild(controlsGizmo.domElement);

    }

    function update() {

    }


    function animate(time) {
        requestAnimationFrame(animate);

        //let azimuthalAngle = ((controls.getAzimuthalAngle()*180)/Math.PI)
        //let polarAngle = ((controls.getPolarAngle()*180)/Math.PI)

/*        console.log(controls.getPolarAngle())
        console.log('p: '+ polarAngle)*/

        renderer.render(scene, camera);
        //cssRenderer.render(scene_HTML, camera);
    }
}