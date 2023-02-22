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

        //basicContainer.style.width = window.innerWidth + 'px';
        //basicContainer.style.height = window.innerHeight + 'px';

        //let initCss3dContainer = document.getElementById('css3dRenderer').parentElement.parentElement
        //initCss3dContainer.style.width = '0px';
        //initCss3dContainer.style.height = '0px';



/*        document.getElementById('mainContainer').addEventListener('mousedown', function(ev) {
            let css3DInitContainer = document.getElementById('css3dRenderer').parentElement.parentElement;
            //css3DInitContainer.style.width = window.innerWidth + 'px';
            //css3DInitContainer.style.height = window.innerHeight + 'px';
        });
        document.getElementById('mainContainer').addEventListener('mouseup', function(ev) {
            console.log(ev);
        });*/

/*        CSSControls.addEventListener('change', function(ev) {

            //console.log(document.getElementById('css3dRenderer').parentElement.parentElement);

            /!**
             * hack to set transform style without flickering
             * TODO: Find out how work exactly CSS3DRenderer
             *!/
            let css3DTransform = CSSRenderer.domElement.firstChild.style.transform;
            document.getElementsByClassName('animateContainer')[0].style.transform = css3DTransform;

        });*/
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


const Controls = (camera, renderer, CSSRenderer, configuration) => {
    const config = configuration.controls
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.object.position.y = config.position.y;
    controls.target.set(config.position.x,config.position.y,config.position.z);
    controls.update();


    const htmlContainer =  document.getElementsByClassName('animateContainer')[0];
    const basicContainer =  document.getElementsByClassName('basicContainer')[0];

/*    transform-style: preserve-3d;
    pointer-events: none;
    width: 1920px;
    height: 675px;*/

    //htmlContainer.style.width = window.innerWidth + 'px';
    //htmlContainer.style.height = window.innerHeight + 'px';
    //htmlContainer.style.transformStyle = 'preserve-3d';
    //htmlContainer.style.pointerEvents = 'none';
    //htmlContainer.style.position = 'absolute';
    //htmlContainer.style.zIndex = '15';

    //basicContainer.style.width = window.innerWidth + 'px';
    //basicContainer.style.height = window.innerHeight + 'px';


/*    const html = '<div class="animateContainer">' +
        '<div draggable="false" class="row vh-100 rounded-4 content-background-color content-box-shadow test">' +
        '<div class="col-1 text-white">' +
        'Das ist ein test<br>' +
        '<a href="https://www.google.de">Google Link</a>' +
        '</div>' +
        '</div>' +
        '</div>'
    const htmlObject = document.createElement('div');
    htmlObject.classList.add("basicContainer");
    htmlObject.innerHTML = html;

    mouseMoveWhilstDown(
        htmlObject,
        function (event) {
            console.log(event)
/!*            let css3DDiv = CSSRenderer.domElement.firstChild.style.transform;
            let css3dDiv_transformStyle = CSSRenderer.domElement.firstChild.style.transformStyle
            let css3dDiv_pointerEvents = CSSRenderer.domElement.firstChild.style.pointerEvents
            let css3dDiv_width = CSSRenderer.domElement.firstChild.style.width
            let css3dDiv_height = CSSRenderer.domElement.firstChild.style.height*!/
        }
    );*/

    //document.getElementById('mainContainer').appendChild(htmlObject);


    controls.addEventListener('change', function(ev) {
/*        let camera = ev.target.object;

        /!**
         * scale() translate() matrix3d() translate()
         * defaults:
         *  let scale = 'scale(' + getFov(camera) + ')';
         *!/
        let scale = 'scale(' + getFov(camera) + ')';
        //let scale = 'scale(1)';
        let translateStart = 'translate(' + epsilon( getTxty(camera).tx ) + 'px,' + epsilon( getTxty(camera).ty ) + 'px)'
        let matrix = ev.target.object.matrixWorldInverse;

        /!**
         * matrix3d(a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, d4)
         * Here's what they're for.
         *
         * a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, d4
         * These arguments are a number that describe the linear transformation.
         * a4, b4, c4
         * These arguments are a number that describe the translation to apply.
         *!/
        let matrix3d = getCameraCSSMatrix(matrix);
        let translateEnd = 'translate(' + widthHeightHalf().widthHalf + 'px,' + widthHeightHalf().heightHalf + 'px)';

        let cssTransformAttr = scale + translateStart + matrix3d + translateEnd;
        let objectCSSMatrix = getObjectCSSMatrix(matrix);

        document.getElementsByClassName('animateContainer')[0].style.transform = cssTransformAttr;
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.transform = objectCSSMatrix*/
        /**
         * For Testing
         */
        //document.getElementsByClassName('container')[0].style.border = '1px solid'
        //document.getElementsByClassName('container')[0].firstElementChild.style.border = '1px solid red'


        /**
         * hack to set transform style without flickering
         * TODO: Find out how work exactly CSS3DRenderer
         */

/*
        let css3DDiv = CSSRenderer.domElement.firstChild.style.transform;
        let css3dDiv_transformStyle = CSSRenderer.domElement.firstChild.style.transformStyle
        let css3dDiv_pointerEvents = CSSRenderer.domElement.firstChild.style.pointerEvents
        let css3dDiv_width = CSSRenderer.domElement.firstChild.style.width
        let css3dDiv_height = CSSRenderer.domElement.firstChild.style.height

        console.log(css3DDiv)


        document.getElementsByClassName('animateContainer')[0].style.transform = css3DDiv;
        document.getElementsByClassName('animateContainer')[0].style.transformStyle = css3dDiv_transformStyle;
        document.getElementsByClassName('animateContainer')[0].style.pointerEvents = css3dDiv_pointerEvents;
        document.getElementsByClassName('animateContainer')[0].style.width = css3dDiv_width;
        document.getElementsByClassName('animateContainer')[0].style.height = css3dDiv_height;

        let css3DObject = CSSRenderer.domElement.firstChild.firstChild.style.transform
        let css3DObject_width = CSSRenderer.domElement.firstChild.firstChild.style.width
        let css3DObject_height = CSSRenderer.domElement.firstChild.firstChild.style.height
        let css3DObject_position = CSSRenderer.domElement.firstChild.firstChild.style.position
        let css3DObject_pointerEvents = CSSRenderer.domElement.firstChild.firstChild.style.pointerEvents
        let css3DObject_userSelect = CSSRenderer.domElement.firstChild.firstChild.style.userSelect

        //console.log(CSSRenderer.domElement.firstChild.firstChild.style);
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.transform = css3DObject
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.width = css3DObject_width
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.height = css3DObject_height
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.position = css3DObject_position
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.pointerEvents = css3DObject_pointerEvents
        document.getElementsByClassName('animateContainer')[0].firstElementChild.style.userSelect = css3DObject_userSelect
*/

    });

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

const mouseMoveWhilstDown =(target, whileMove) => {
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

export {Controls, CSSControls};

