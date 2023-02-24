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

    controls.addEventListener('change', function(ev) {

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



export {Controls, CSSControls};

