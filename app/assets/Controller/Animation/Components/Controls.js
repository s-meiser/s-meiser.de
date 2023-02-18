import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OrbitControlsGizmo} from "./OrbitControlsGizmo.js";
import {ControlSettings} from "./ControlSettings.js";


const CSSControls = (camera, CSSRenderer, configuration) => {
    const config = configuration.controls

    let CSSControls = new OrbitControls(camera, CSSRenderer.domElement);
    //console.log(CSSRenderer.domElement.outerHTML)
    CSSControls.object.position.y = config.position.y;
    CSSControls.target.set(config.position.x,config.position.y,config.position.z);
    CSSControls.update();

    const htmlContainer =  document.getElementsByClassName('animateContainer')[0];
    const basicContainer =  document.getElementsByClassName('basicContainer')[0];

    if (typeof htmlContainer !== 'undefined') {

        /*        htmlContainer.style.width = window.innerWidth + 'px';
        htmlContainer.style.height = window.innerHeight + 'px';
        htmlContainer.style.transformStyle = 'preserve-3d';
        htmlContainer.style.position = 'absolute';
        htmlContainer.style.zIndex = '15';*/

        basicContainer.style.width = window.innerWidth + 'px';
        basicContainer.style.height = window.innerHeight + 'px';

        //let initCss3dContainer = document.getElementById('css3dRenderer').parentElement.parentElement
        //initCss3dContainer.style.width = '0px';
        //initCss3dContainer.style.height = '0px';



        document.getElementById('mainContainer').addEventListener('mousedown', function(ev) {
            let css3DInitContainer = document.getElementById('css3dRenderer').parentElement.parentElement;
            //css3DInitContainer.style.width = window.innerWidth + 'px';
            //css3DInitContainer.style.height = window.innerHeight + 'px';
        });
        document.getElementById('mainContainer').addEventListener('mouseup', function(ev) {
            console.log(ev);
        });

        CSSControls.addEventListener('change', function(ev) {

            //console.log(document.getElementById('css3dRenderer').parentElement.parentElement);

            /**
             * hack to set transform style without flickering
             * TODO: Find out how work exactly CSS3DRenderer
             */
            let css3DTransform = CSSRenderer.domElement.firstChild.style.transform;
            document.getElementsByClassName('animateContainer')[0].style.transform = css3DTransform;

        });
    }

    /**
     * add the Obit Controls Gizmo
     */
    const controlsGizmo = new OrbitControlsGizmo(CSSControls, {
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
    const controlsSettings = new ControlSettings(CSSControls);
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

    return {CSSControls, controlsGizmo}
}
const Controls = (camera, renderer) => {

    let controls = new OrbitControls(camera, renderer.domElement);
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

    return {controls, controlsGizmo}
}

const getInitialMatrix = (camera) => {
    let scale = 'scale(' + getFov(camera) + ')';
    let translateStart = 'translate(' + epsilon( getTxty(camera).tx ) + 'px,' + epsilon( getTxty(camera).ty ) + 'px)'
    //console.log(camera)
    let matrix = camera.matrix;
    let matrix3d = getCameraCSSMatrix(matrix);
    let translateEnd = 'translate(' + widthHeightHalf().widthHalf + 'px,' + widthHeightHalf().heightHalf + 'px)';
    return scale + translateStart + matrix3d + translateEnd;
}

const getInitialObjectMatrix = (camera) => {
    return getObjectCSSMatrix(camera.matrix);
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
        //epsilon( - elements[ 13 ] - 1700 ) + ',' +
        //0 + ',' +
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
        //epsilon( elements[ 13 ] + 1700 ) + ',' +
        //0 + ',' +
        epsilon( elements[ 14 ] ) + ',' +
        epsilon( elements[ 15 ] ) +
        ')';

    return 'translate(-50%,-50%)' + matrix3d;

}

export {Controls, CSSControls};

