import * as THREE from 'three';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

export default class Renderer {

    configuration;

    constructor(configuration) {
        console.log(configuration)
        this.configuration = configuration;
    }

    renderer() {
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

        return renderer;
    }

    cssRenderer() {
        const CSSRenderer = new CSS3DRenderer();
        CSSRenderer.setSize( window.innerWidth, window.innerHeight );
        CSSRenderer.domElement.style.position = 'absolute'
        return CSSRenderer;
    }

    htmlRenderer(scene, camera, domElement, cameraElement) {
        const fov = getFov(camera);

        if ( cache.camera.fov !== fov ) {
            domElement.style.perspective = camera.isPerspectiveCamera ? fov + 'px' : '';
            cache.camera.fov = fov;
        }

        if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();
        if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

        const style = 'scale('+fov+')' + 'translate('+ epsilon( getTxTy(camera).tx ) + 'px,' + epsilon( getTxTy(camera).ty ) + 'px)' + getCameraCSSMatrix( camera.matrixWorldInverse ) + 'translate(' + window.innerWidth/2 + 'px,' + window.innerHeight/2 + 'px)'

        if ( cache.camera.style !== style ) {
            cameraElement.style.transform = style;
            cache.camera.style = style;

            // TODO: x,y,z für domElement
            //                                                x    y    z
            // matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 111, 222, 333, 1)
            domElement.style.transform = 'translate(-50%, -50%) matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, -800, 800, 0, 1)'
        }
    }
}

const cache = {
    camera: { fov: 0, style: '' },
    objects: new WeakMap()
};

const getTxTy = (camera) => {
    let tx = - ( camera.right + camera.left ) / 2;
    let ty = ( camera.top + camera.bottom ) / 2;

    return {tx, ty}
}
const widthHeightHalf = () => {
    let heightHalf = window.innerHeight / 2;
    let widthHalf = window.innerWidth / 2;
    return {widthHalf, heightHalf}
}
const getFov = (camera) => {
    return camera.projectionMatrix.elements[ 5 ] * widthHeightHalf().heightHalf;
}
const epsilon = (value) => {
    return Math.abs(value) < 1e-10 ? 0 : value;
}
const getCameraCSSMatrix = (matrix) => {
    const elements = matrix.elements;
    return 'matrix3d(' +
        epsilon( elements[ 0 ] ) + ',' +
        epsilon( - elements[ 1 ] ) + ',' +
        epsilon( elements[ 2 ] ) + ',' +
        epsilon( elements[ 3 ] ) + ',' +
        epsilon( elements[ 4 ] ) + ',' +
        epsilon( - elements[ 5 ] ) + ',' +
        epsilon( elements[ 6 ] ) + ',' +
        epsilon( elements[ 7 ] ) + ',' +
        epsilon( elements[ 8 ] ) + ',' +
        epsilon( - elements[ 9 ] ) + ',' +
        epsilon( elements[ 10 ] ) + ',' +
        epsilon( elements[ 11 ] ) + ',' +
        epsilon( elements[ 12 ] ) + ',' +
        epsilon( - elements[ 13 ] ) + ',' +
        epsilon( elements[ 14 ] ) + ',' +
        epsilon( elements[ 15 ] ) +
        ')';
}

const getObjectCSSMatrix = (matrix) => {

    const elements = matrix.elements;
    const matrix3d = 'matrix3d(' +
        epsilon( elements[ 0 ] ) + ',' +
        epsilon( elements[ 1 ] ) + ',' +
        epsilon( elements[ 2 ] ) + ',' +
        epsilon( elements[ 3 ] ) + ',' +
        epsilon( - elements[ 4 ] ) + ',' +
        epsilon( - elements[ 5 ] ) + ',' +
        epsilon( - elements[ 6 ] ) + ',' +
        epsilon( - elements[ 7 ] ) + ',' +
        epsilon( elements[ 8 ] ) + ',' +
        epsilon( elements[ 9 ] ) + ',' +
        epsilon( elements[ 10 ] ) + ',' +
        epsilon( elements[ 11 ] ) + ',' +
        epsilon( elements[ 12 ] ) + ',' +
        epsilon( elements[ 13 ] ) + ',' +
        epsilon( elements[ 14 ] ) + ',' +
        epsilon( elements[ 15 ] ) +
        ')';

    return 'translate(-50%,-50%)' + matrix3d;

}

