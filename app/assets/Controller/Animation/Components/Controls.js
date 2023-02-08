import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OrbitControlsGizmo} from "../OrbitControlsGizmo";
import {ControlSettings} from "../ControlSettings";

const Controls = (camera, renderer, CSSRenderer) => {

    let controls = new OrbitControls(camera, renderer.domElement);
    let CSSControls = new OrbitControls(camera, CSSRenderer.domElement);
    //controls.enableZoom = false;
    //controls.enablePan = false;
    controls.object.position.y = 1700;
    controls.target.set(0,1700,0);
    controls.update();

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



/*    const mouseScrollSpeed = 10;
    document.addEventListener('wheel', (event) => {
        if (Math.sign(event.deltaY) === 1) {
            cssElement.position.y += mouseScrollSpeed;
        }
        if (Math.sign(event.deltaY) === -1) {
            cssElement.position.y -= mouseScrollSpeed;
        }
    });*/

    controls.addEventListener('change', function(ev) {
        //console.log(ev.target.object)

        let camera = ev.target.object;

        /**
         * scale() translate() matrix3d() translate()
         */
        let scale = 'scale(' + getFov(camera) + ')';
        let translateStart = 'translate(' + epsilon( getTxty(camera).tx ) + 'px,' + epsilon( getTxty(camera).ty ) + 'px)'
        let matrix = ev.target.object.matrixWorldInverse;

        /**
         * matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, d4)
         * Here's what they're for.
         *
         * a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, d4
         * These arguments are a number that describe the linear transformation.
         * a4, b4, c4
         * These arguments are a number that describe the translation to apply.
         */
        let matrix3d = getCameraCSSMatrix(matrix);
        let translateEnd = 'translate(' + widthHeightHalf().widthHalf + 'px,' + widthHeightHalf().heightHalf + 'px)';

        let cssTransformAttr = scale + translateStart + matrix3d + translateEnd
        document.getElementsByClassName('container')[0].style.transform = cssTransformAttr;
        //console.log(cssTransformAttr)
        //console.log(matrix3d)
    });

    return {controls, controlsGizmo, CSSControls}
}

const getTxty = (camera) => {
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

export {Controls};

