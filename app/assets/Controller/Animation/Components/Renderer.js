import * as THREE from 'three';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {Matrix4, Quaternion, Vector3} from "three";

export default class Renderer {

    configuration;
    cssObjectStyle;

    _matrix = new Matrix4();
    _matrix2 = new Matrix4();
    _position = new Vector3();
    _quaternion = new Quaternion();
    _scale = new Vector3();

    constructor(configuration) {
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

    htmlRenderer(scene, camera, cameraElement) {
        const fov = getFov(camera);

        if ( cache.camera.fov !== fov ) {
            cameraElement.style.perspective = camera.isPerspectiveCamera ? fov + 'px' : '';
            cache.camera.fov = fov;
        }

        if ( scene.matrixWorldAutoUpdate === true ) scene.updateMatrixWorld();
        if ( camera.parent === null && camera.matrixWorldAutoUpdate === true ) camera.updateMatrixWorld();

        const style = 'scale('+fov+')' + 'translate('+ epsilon( getTxTy(camera).tx ) + 'px,' + epsilon( getTxTy(camera).ty ) + 'px)' + getCameraCSSMatrix( camera.matrixWorldInverse ) + 'translate(' + window.innerWidth/2 + 'px,' + window.innerHeight/2 + 'px)'

        if ( cache.camera.style !== style ) {
            cameraElement.style.transform = style;
            cache.camera.style = style;
        }
        this.renderObject( scene, scene, camera, style );
    }

    renderObject(CSSObjects, scene, camera, cameraCSSMatrix) {
        for (const [key, value] of Object.entries(CSSObjects.children)) {
            if(value.isCSSObject) {
                let style;

                const visible = (value.visible === true ) && (value.layers.test( camera.layers ) === true);
                value.element.style.display = ( visible === true ) ? '' : 'none';

                let cssObjectStyle = getObjectCSSMatrix(value.matrixWorld);

                const cachedObject = cache.objects.get(value.element);
                if (cachedObject === undefined || cachedObject.style !== style) {
                    value.element.style.transform = cssObjectStyle;
                    const objectData = { style: style };
                    cache.objects.set( value, objectData );
                }
            }
            this.renderObject( value, scene, camera, cameraCSSMatrix );
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

