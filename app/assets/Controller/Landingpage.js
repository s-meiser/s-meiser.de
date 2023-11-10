import {Controller} from '@hotwired/stimulus';
import {Toast} from 'bootstrap';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    connect() {

        const animateDiv = document.getElementById('animateDiv')
        const divHeight = animateDiv.offsetHeight;
        const divWidth = animateDiv.offsetWidth;
        const maxDeg = 13;

        animateDiv.addEventListener("mouseleave", (event) => {
            document.getElementById('animateDiv').style.transition =
                "all 0.3s ease-in-out";
            document.getElementById('animateDiv').style.transform =
                "perspective(700px) rotateX(0deg) rotateY(0deg)";
        });
        animateDiv.addEventListener("mouseenter", (event) => {
            document.getElementById('animateDiv').style.removeProperty('transition');
        });
        animateDiv.addEventListener("mousemove", (event) => {
            this.setTransformRotation(event, divWidth, divHeight, maxDeg)
        });

    }


    setTransformRotation(event, width, height, maxDeg) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Get the position of the div
        const divRect= event.target.getBoundingClientRect();
        const divX= mouseX - divRect.left;
        const divY= mouseY - divRect.top;
        const divXCenter= divX-(width/2);
        const divYCenter= divY-(height/2);

        let divXInPercent=  (((divX-(width/2))*100)/width)*2
        let divYInPercent=  (((divY-(height/2))*100)/height)*2

        //max 13 degrees
        let rotX = parseFloat((divXInPercent*maxDeg)/100).toFixed(2);
        let rotY = parseFloat((divYInPercent*maxDeg)/100).toFixed(2);

        // transform: perspective(700px) rotateX(0deg) rotateY(0deg);
        document.getElementById('animateDiv').style.transform =
            "perspective(700px) rotateX("+rotX+"deg) rotateY("+rotY+"deg)";
    }
}