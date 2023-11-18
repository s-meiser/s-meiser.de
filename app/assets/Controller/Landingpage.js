import {Controller} from '@hotwired/stimulus';
import {Toast} from 'bootstrap';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    maxDegrees = 10;
    connect() {

        const animateDiv = document.querySelectorAll('#animateDiv')

        animateDiv.forEach((div) => {
            const divHeight = div.offsetHeight;
            const divWidth = div.offsetWidth;

            div.addEventListener("mouseleave", (event) => {
                div.style.transition =
                    "all 0.3s ease-in-out";
                div.style.transform =
                    "perspective(338px) rotateX(0deg) rotateY(0deg)";
            });
            div.addEventListener("mouseenter", (event) => {
                div.style.removeProperty('transition');
            });
            div.addEventListener("mousemove", (mouseEvent) => {
                this.setTransformRotation(mouseEvent, div, divWidth, divHeight)
            });
        });
    }


    setTransformRotation = (mouseEvent, div, width, height) => {
        const mouseX = mouseEvent.clientX;
        const mouseY = mouseEvent.clientY;

        // Get the position of the div
        const divRect= mouseEvent.target.getBoundingClientRect();
        const divX= mouseX - divRect.left;
        const divY= mouseY - divRect.top;

        let divXInPercent = (((divX - (width / 2)) * 100) / width) * 2;
        let divYInPercent = (((divY - (height / 2)) * 100) / height) * 2;

        let rotX, rotY;

        if (divXInPercent < 0) {
            rotY = this.convertToDegrees(divXInPercent * -1);
        } else if (divXInPercent > 0) {
            rotY = this.convertToDegrees(divXInPercent * -1);
        } else {
            rotY = 0;
        }

        if (divYInPercent < 0) {
            rotX = this.convertToDegrees(divYInPercent);
        } else if (divYInPercent > 0) {
            rotX = this.convertToDegrees(divYInPercent);
        } else {
            rotX = 0;
        }

        this.setCSSTransform(div, rotX, rotY);

    }

    convertToDegrees = (percent) => {
        return parseFloat((percent*this.maxDegrees)/100).toFixed(2);
    }

    setCSSTransform = (div, rotX, rotY) => {
        div.style.transform =
            "perspective(435px) rotateX("+rotX+"deg) rotateY("+rotY+"deg)";
    }
}