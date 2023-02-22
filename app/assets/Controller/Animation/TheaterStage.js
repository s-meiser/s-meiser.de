import * as THREE from 'three';
import {CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {Camera} from "./Components/Camera";
import {Helper} from "./Components/Helper";
import {Renderer, CSSRenderer} from "./Components/Renderer";
import {Controls, CSSControls} from "./Components/Controls";
import Scene from "./Components/Scene";
import Configuration from "./Components/Configuration";
import {Matrix4} from "three";


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
    config;
    htmlObject;


    _width;
    _height;
    _widthHalf;
    _heightHalf;
    _this;
    domElement;
    cameraElement;

    cache = {
        camera: { fov: 0, style: '' },
        objects: new WeakMap()
    };

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
        //this.render();
    }

    setCamera() {
        this.camera = Camera(this.config);
    }

    setScene() {
        this.scene = new Scene(this.config);
    }

    setRenderer() {
        this.renderer = Renderer().renderer;
        this.CSSRenderer = CSSRenderer().CSSRenderer
    }

    setControls() {
        this.controls = Controls(this.camera, this.renderer, this.CSSRenderer, this.config);
        this.CSSControls = CSSControls(this.camera, this.CSSRenderer, this.config);
    }

    setHelper() {
        Helper(this.camera, this.scene, this.renderer, this.bloomComposer);
    }

    addToDom() {

        //document.getElementById('mainContainer').appendChild(this.CSSControls.controlsGizmo.domElement);



/*        const html = '<div class="animateContainer">' +
            '<div class="rounded-4 content-background-color content-box-shadow test">' +
            '<div class="text-white">' +
            'Das ist ein test<br>' +
            '<a href="https://www.google.de">Google Link</a>' +
            '</div>' +
            '</div>' +
            '</div>'
        const htmlElement = document.createElement('div');
        htmlElement.classList.add("basicContainer");
        htmlElement.innerHTML = html;

       this.mouseMoveWhilstDown(
           htmlElement,
            function (event) {
               console.log();
                //this.animate();
           }
        );


        this.htmlObject = new CSS3DObject(htmlElement);
        this.htmlObject.position.set(0, 150, 150);
        //console.log(object)
        this.scene.add(this.htmlObject);*/
        //console.log(this.CSSRenderer.domElement)
        //document.getElementById('mainContainer').appendChild(htmlElement);

        //document.getElementById('mainContainer').appendChild(this.CSSRenderer.domElement);
        document.getElementById('mainContainer').appendChild(this.renderer.domElement);
        document.getElementById('mainContainer').appendChild(this.controls.controlsGizmo.domElement);



/*        this._this = this;

        let domElement = document.createElement('div');

        domElement.style.overflow = 'hidden';

        this.domElement = domElement;

        let cameraElement = document.createElement( 'div' );

        cameraElement.style.transformStyle = 'preserve-3d';
        cameraElement.style.pointerEvents = 'none';
        this.cameraElement = cameraElement
        this.domElement.appendChild( cameraElement );*/


        this.cameraElement = document.querySelector('.basicContainer')
        this.domElement = document.querySelector('.animateContainer')

        //this.domElement.style.left = 0 + 'px';
        //this.domElement.style.height = window.innerHeight + 'px';

        //this.cameraElement.style.width = window.innerWidth + 'px';
        //this.cameraElement.style.height = window.innerHeight + 'px';
    }

    mouseMoveWhilstDown(target, whileMove) {
        const endMove = function () {
            window.removeEventListener('mousemove', whileMove);
            window.removeEventListener('mouseup', endMove);
        };

        target.addEventListener('mousedown', function (event) {
            event.stopPropagation(); // remove if you do want it to propagate ..
            window.addEventListener('mousemove', whileMove);
            window.addEventListener('mouseup', endMove);
        });
    }

    animate() {
        requestAnimationFrame(() => { this.animate(); });
        this.renderer.render( this.scene, this.camera );
        this.animateHtml(this.scene, this.camera)
    }





    animateHtml(scene, camera) {

        const fov = camera.projectionMatrix.elements[ 5 ] * window.innerHeight / 2;

        if ( this.cache.camera.fov !== fov ) {
            this.domElement.style.perspective = camera.isPerspectiveCamera ? fov + 'px' : '';
            this.cache.camera.fov = fov;
        }

        if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();
        if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

        let tx, ty;

        if ( camera.isOrthographicCamera ) {

            tx = - ( camera.right + camera.left ) / 2;
            ty = ( camera.top + camera.bottom ) / 2;

        }
        console.log(( camera.top ))
        const cameraCSSMatrix = 'scale(1)' + 'translate(' + window.innerWidth / -2 + 'px,' + 0 + 'px)' + this.getCameraCSSMatrix( camera.matrixWorldInverse )


        const style = cameraCSSMatrix + 'translate(' + window.innerWidth / 2 + 'px,' + window.innerHeight / 2 + 'px)';

        if ( this.cache.camera.style !== style ) {

            this.cameraElement.style.transform = style;

            this.cache.camera.style = style;

            this.domElement.style.transform = 'translate(-50%, -50%) matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1)'

        }

        //console.log(cameraCSSMatrix)

        //this.renderObject( scene, scene, camera, cameraCSSMatrix );
    }

    epsilon( value ) {

        return Math.abs( value ) < 1e-10 ? 0 : value;

    }

    getCameraCSSMatrix( matrix ) {

        const elements = matrix.elements;

        return 'matrix3d(' +
            this.epsilon( elements[ 0 ] ) + ',' +
            this.epsilon( - elements[ 1 ] ) + ',' +
            this.epsilon( elements[ 2 ] ) + ',' +
            this.epsilon( elements[ 3 ] ) + ',' +
            this.epsilon( elements[ 4 ] ) + ',' +
            this.epsilon( - elements[ 5 ] ) + ',' +
            this.epsilon( elements[ 6 ] ) + ',' +
            this.epsilon( elements[ 7 ] ) + ',' +
            this.epsilon( elements[ 8 ] ) + ',' +
            this.epsilon( - elements[ 9 ] ) + ',' +
            this.epsilon( elements[ 10 ] ) + ',' +
            this.epsilon( elements[ 11 ] ) + ',' +
            this.epsilon( elements[ 12 ] ) + ',' +
            this.epsilon( - elements[ 13 ] ) + ',' +
            this.epsilon( elements[ 14 ] ) + ',' +
            this.epsilon( elements[ 15 ] ) +
            ')';

    }

    getObjectCSSMatrix( matrix ) {

        const elements = matrix.elements;
        const matrix3d = 'matrix3d(' +
            this.epsilon( elements[ 0 ] ) + ',' +
            this.epsilon( elements[ 1 ] ) + ',' +
            this.epsilon( elements[ 2 ] ) + ',' +
            this.epsilon( elements[ 3 ] ) + ',' +
            this.epsilon( - elements[ 4 ] ) + ',' +
            this.epsilon( - elements[ 5 ] ) + ',' +
            this.epsilon( - elements[ 6 ] ) + ',' +
            this.epsilon( - elements[ 7 ] ) + ',' +
            this.epsilon( elements[ 8 ] ) + ',' +
            this.epsilon( elements[ 9 ] ) + ',' +
            this.epsilon( elements[ 10 ] ) + ',' +
            this.epsilon( elements[ 11 ] ) + ',' +
            this.epsilon( elements[ 12 ] ) + ',' +
            this.epsilon( elements[ 13 ] ) + ',' +
            this.epsilon( elements[ 14 ] ) + ',' +
            this.epsilon( elements[ 15 ] ) +
            ')';

        return 'translate(-50%,-50%)' + matrix3d;

    }

    _matrix = new Matrix4();
    _matrix2 = new Matrix4();

    renderObject(object, scene, camera, cameraCSSMatrix) {

        console.log(object.element.style)
            const visible = ( object.visible === true ) && ( object.layers.test( camera.layers ) === true );
            object.element.style.display = ( visible === true ) ? '' : 'none';

            if ( visible === true ) {

                object.onBeforeRender( this._this, scene, camera );

                let style;

                if ( object.isCSS3DSprite ) {

                    // http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

                    _matrix.copy( camera.matrixWorldInverse );
                    _matrix.transpose();

                    if ( object.rotation2D !== 0 ) _matrix.multiply( _matrix2.makeRotationZ( object.rotation2D ) );

                    object.matrixWorld.decompose( _position, _quaternion, _scale );
                    _matrix.setPosition( _position );
                    _matrix.scale( _scale );

                    _matrix.elements[ 3 ] = 0;
                    _matrix.elements[ 7 ] = 0;
                    _matrix.elements[ 11 ] = 0;
                    _matrix.elements[ 15 ] = 1;

                    style = this.getObjectCSSMatrix( _matrix );

                } else {

                    style = this.getObjectCSSMatrix( object.matrixWorld );

                }

                const element = object.element;

                const cachedObject = this.cache.objects.get( object );

                if ( cachedObject === undefined || cachedObject.style !== style ) {

                    element.style.transform = style;

                    const objectData = { style: style };
                    this.cache.objects.set( object, objectData );

                }

                if ( element.parentNode !== this.cameraElement ) {
                    this.cameraElement.appendChild( element );
                }

                object.onAfterRender( this._this, scene, camera );

            }



        for ( let i = 0, l = object.children.length; i < l; i ++ ) {
            //console.log(object)
            this.renderObject( object.children[ i ], scene, camera, cameraCSSMatrix );

        }
    }



}

export {TheaterStage}
