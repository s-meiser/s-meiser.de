import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OrbitControlsGizmo} from "./OrbitControlsGizmo.js";
import {ControlSettings} from "./ControlSettings.js";

const Controls = (camera, renderer, CSSRenderer, configuration) => {
    const config = configuration.controls
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



export {Controls};

