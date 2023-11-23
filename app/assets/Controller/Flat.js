import {Controller} from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    /**
     *
     */
    connect() {
    }

    /**
     *
     * @param event
     */
    navbar(event) {
        const navbarToggle = document.querySelector('.navbar-container')
        navbarToggle.classList.toggle('show');
        navbarToggle.classList.toggle('column');

        const navbarGridEffect = document.querySelector('.navbar-grid-effect')
        navbarGridEffect.classList.toggle('grid-effect-show');

        const menuButtonBar = document.querySelectorAll('.menu-button-bar')

        menuButtonBar.forEach((value, key) => {
            if (key === 0) {
                value.classList.toggle('menu-bar-0');
            }
            if (key === 1) {
                value.classList.toggle('menu-bar-1');
            }
            if (key === 2) {
                value.classList.toggle('menu-bar-2');
            }
        });
    }
}