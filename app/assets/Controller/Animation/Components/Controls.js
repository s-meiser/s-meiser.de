import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OrbitControlsGizmo} from "./OrbitControlsGizmo.js";
import {ControlSettings} from "./ControlSettings.js";
import $ from "jquery";

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
    //controlsSettings.setPolarAngle()
    //controlsSettings.setAzimuthAngle()
    //controls.enableZoom = false;
    //controls.enablePan = false;

    if (mediaQueries.touch) {
        controls.enableRotate = true;
        controls.enableZoom = true;
        controls.enablePan = true;

        let initialPanPositionX;
        let initialPanPositionY;
        let panInterval;
        let diffPanPosX;
        let diffPanPosY;

        //show mobile controls

        const mobileControls = document.querySelector('.mobileControls');
        mobileControls.style.display = 'block';

        document.getElementById("pan-circle").addEventListener("touchstart", (event) => {
            initialPanPositionX = event.changedTouches[0].clientX
            initialPanPositionY = event.changedTouches[0].clientY

            panInterval = setInterval(function() {
                if (diffPanPosX >= 0 || diffPanPosY >= 0 || diffPanPosX <= 0 || diffPanPosY <= 0) {
                    controls.target.x += diffPanPosX/25;
                    camera.position.x += diffPanPosX/25;
                    controls.target.y += diffPanPosY/25;
                    camera.position.y += diffPanPosY/25;
                }
            }, 50);
        })

        document.getElementById("pan-circle").addEventListener("touchmove", (event) => {

            let currentPositionX = event.changedTouches[0].clientX
            let currentPositionY = event.changedTouches[0].clientY

            const angleDegRad = calcPos2AngleDegRad(initialPanPositionX, initialPanPositionY, currentPositionX, currentPositionY);
            const xyPos = getXYCoord(55,50,50, angleDegRad.degrees);
            const matrix = angleToMatrix(currentPositionY,initialPanPositionY, currentPositionX, initialPanPositionX);
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
            diffPanPosX = currentPositionX - initialPanPositionX;
            diffPanPosY = initialPanPositionY - currentPositionY;
        })

        document.getElementById("pan-circle").addEventListener("touchend", (event) => {
            const element = document.querySelector('#pan-circle');
            element.style.setProperty('--panOpacity', '0');
            element.style.setProperty('--afterPanOpacity', '0');
            clearInterval(panInterval);
        })

        ControlInstructions();

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

const ControlInstructions = () => {
    //deleteCookie("controlInstructions");
    const controlInstructionsPan = document.querySelector('.panning');
    // Check if a cookie with name "username" exists
    if (!hasCookieName("controlInstructions")) {
        $('.control-instructions').show();
        $('.panning').show();

        document.getElementById("pan-circle").addEventListener("touchmove", (event) => {
            createCookie("controlInstructions", true, 180);
            $(".panning").fadeOut();
            $('.control-instructions').addClass('transition-to-transparent step-1');
        });

        isElementLoaded('.step-1').then((selector) => {
            setTimeout(() => {
                $('.control-instructions').hide();
            }, 1000);
        });
    }
    // Create a cookie with name "username" and value "johndoe" that expires in 7 days
    //createCookie("username", "johndoe", 7);

    // Read the value of the "username" cookie
    //let username = readCookie("username");

    // Update the value of the "username" cookie to "janedoe" and extend its expiration by 7 days
    //updateCookie("username", "janedoe", 7);

    // Delete the "username" cookie
    //deleteCookie("username");
}

const isElementLoaded = async selector => {
    while ( document.querySelector(selector) === null) {
        await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
};

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


// Create a cookie with a name, value, and expiration time in days
const createCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Read a cookie with a given name
const readCookie = (name) => {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Update a cookie with a given name, value, and expiration time in days
const updateCookie = (name, value, days) => {
    createCookie(name, value, days);
}

// Delete a cookie with a given name
const deleteCookie = (name) => {
    createCookie(name, "", -1);
}

// Check if a cookie with a given name exists
const hasCookieName = (name) => {
    let cookies = document.cookie.split(";").map(cookie => cookie.trim());
    return cookies.some(cookie => cookie.startsWith(`${name}=`));
}

export {Controls, ControlInstructions};

