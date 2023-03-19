import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OrbitControlsGizmo} from "./OrbitControlsGizmo.js";
import {ControlSettings} from "./ControlSettings.js";

const CSSControls = (camera, CSSRenderer, configuration) => {
    const config = configuration.controls
    let CSSControls = new OrbitControls(camera, CSSRenderer.domElement);
    //console.log(CSSRenderer.domElement.outerHTML)
    CSSControls.object.position.y = config.position.y;
    //CSSControls.target.set(config.position.x, config.position.y, config.position.z);
    //CSSControls.update();
}

const Controls = (camera, renderer, CSSRenderer, configuration) => {
    const config = configuration.controls
    const mediaQueries = configuration.mediaQueries;

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.object.position.y = config.position.y;
    controls.target.set(config.position.x,config.position.y,config.position.z);
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
    controlsSettings.setPolarAngle()
    controlsSettings.setAzimuthAngle()
    controls.enableZoom = false;
    controls.enablePan = false;





    document.addEventListener('mousemove', (event) => {
        //camera.rotation.set(0, 0, 0)
        //console.log(camera.rotation);
    });
    if (mediaQueries.touch) {
        controls.enableRotate = false;

        let initialPositionX;
        let initialPositionY;
        //let currentPositionX;
        //let currentPositionY;

        document.getElementById("pan-circle").addEventListener("touchstart", (event) => {
            //console.log("You touched the screen!");
            initialPositionX = event.changedTouches[0].clientX
            initialPositionY = event.changedTouches[0].clientY
        })
        document.getElementById("pan-circle").addEventListener("touchmove", (event) => {
            //console.log("You moved your finger!");
            let currentPositionX = event.changedTouches[0].clientX
            let currentPositionY = event.changedTouches[0].clientY

            const atan2 = getAtan2(initialPositionX, initialPositionY, currentPositionX, currentPositionY);

            console.log(`angle is ${atan2.degrees} degrees`);
            //console.log(`The angle between the two points is ${atan2.radians} radians`);
            //console.log(`atan2 deltaX deltaY - ${atan2.deltaX} - ${atan2.deltaY}`);


            const xy = getXYCoord(50,50,50,atan2.degrees);
            //console.log(`The point on the circle with angle 45 is (${xy.x}, ${xy.y})`);

            const matrix = angleToMatrix(atan2.degrees);
            console.log(`Matrix angle is (${matrix})`);

            const element = document.querySelector('#pan-circle')

            //--panArrowTop
            //--panArrowRight
            //--panArrowTransform
            const attr = window.getComputedStyle(document.querySelector('#pan-circle'), ':before').getPropertyValue('transform');
            console.log(attr)
            //element.style.setProperty('--panArrowTransform', 'matrix('+atan2.radians+', '+atan2.radians+', '+atan2.radians*(-1)+', '+atan2.radians+', 2.5, -5)')

            //console.log(circleAttr)


            //console.log(event.changedTouches[0]);
        })
        document.getElementById("pan-circle").addEventListener("touchend", (event) => {
            //console.log("You removed your finger from the screen!");
        })

    }

    if (!mediaQueries.touch) {
        const mouseScrollSpeed = 10;
        document.addEventListener('wheel', (event) => {
            if (Math.sign(event.deltaY) === 1) {
                controls.target.y -= mouseScrollSpeed;
                camera.position.y -= mouseScrollSpeed;
                controls.update();
            }
            if (Math.sign(event.deltaY) === -1) {
                controls.target.y += mouseScrollSpeed;
                camera.position.y += mouseScrollSpeed;
                controls.update();
            }
        });
    }

    return {controls, controlsGizmo}
}

const getXYCoord = (radius, centerX, centerY, angleInDegrees) => {
/*    const radius = 50;
    const centerX = 50;
    const centerY = 50;
    const angleInDegrees = 45;*/
    const angleInRadians = angleInDegrees * Math.PI / 180;
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);
    return {x,y};
}

const getAtan2 = (x1, y1, x2, y2) => {
/*    const x1 = 35;
    const y1 = 75;
    const x2 = 165;
    const y2 = 17;*/

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const radians = Math.atan2(deltaY, deltaX);
    const degrees = radians * 180 / Math.PI;

    return {radians, degrees, deltaX, deltaY}
}

const angleToMatrix = (angle) => {
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    return [[cos, -sin], [sin, cos]];
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



export {Controls, CSSControls};

