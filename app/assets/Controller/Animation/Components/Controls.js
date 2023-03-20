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

    if (mediaQueries.touch) {
        controls.enableRotate = false;

        let initialPositionX;
        let initialPositionY;
        let interval;
        let diffPosX;
        let diffPosY;



        document.getElementById("pan-circle").addEventListener("touchstart", (event) => {
            initialPositionX = event.changedTouches[0].clientX
            initialPositionY = event.changedTouches[0].clientY

            interval = setInterval(function() {
                if (diffPosX >= 0 || diffPosY >= 0 || diffPosX <= 0 || diffPosY <= 0) {
                    controls.target.x += diffPosX/25;
                    camera.position.x += diffPosX/25;
                    controls.target.y += diffPosY/25;
                    camera.position.y += diffPosY/25;
                }
            }, 50);
        })
        document.getElementById("pan-circle").addEventListener("touchmove", (event) => {
            //console.log("You moved your finger!");


            let currentPositionX = event.changedTouches[0].clientX
            let currentPositionY = event.changedTouches[0].clientY

            const angleDegRad = calcPos2AngleDegRad(initialPositionX, initialPositionY, currentPositionX, currentPositionY);
            const xyPos = getXYCoord(55,50,50, angleDegRad.degrees);
            const matrix = angleToMatrix(currentPositionY,initialPositionY, currentPositionX, initialPositionX);
            //console.log(angleDegRad.degrees)
            //--panArrowTop
            //--panArrowRight
            //--panArrowTransform
            //const attr = window.getComputedStyle(document.querySelector('#pan-circle'), ':before').getPropertyValue('transform');

            const element = document.querySelector('#pan-circle')
            element.style.setProperty('--panArrowTransform', 'matrix('+matrix.arrow+', 2.5, -5)')
            element.style.setProperty('--afterPanArrowTransform', 'matrix('+matrix.ring+', 15, -85)')
            element.style.setProperty('--panArrowRight', (100-xyPos.x)+'%')
            element.style.setProperty('--panArrowTop', xyPos.y+'%')
            element.style.setProperty('--panOpacity', '1')
            element.style.setProperty('--afterPanOpacity', '1');

            controls.enablePan = true;
            diffPosX = currentPositionX - initialPositionX;
            diffPosY = initialPositionY - currentPositionY;

        })



        document.getElementById("pan-circle").addEventListener("touchend", (event) => {
            const element = document.querySelector('#pan-circle');
            element.style.setProperty('--panOpacity', '0');
            element.style.setProperty('--afterPanOpacity', '0');
            //console.log(myInterval)
            clearInterval(interval);
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
    const angleInRadians = angleInDegrees * Math.PI / 180;
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);
    return {x, y};
}

const calcPos2AngleDegRad = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const radians = Math.atan2(deltaY, deltaX);
    const degrees = radians * 180 / Math.PI;
    return {radians, degrees, deltaX, deltaY}
}

const angleToMatrix = (y2, y1, x2, x1) => {
    let angle = Math.atan2(y2 - y1, x2 - x1);
    let cos = Math.cos(angle*(-1));
    let sin = Math.sin(angle*(-1));
    let cosRing = Math.sin(angle-1.60);
    let sinRing = Math.cos(angle-1.60);
    return {
        arrow: [[cos, -sin], [sin, cos]],
        ring: [[cosRing, -sinRing], [sinRing, cosRing]]
    };

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

