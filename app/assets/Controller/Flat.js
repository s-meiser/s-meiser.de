import {Controller} from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    /**
     *
     */
    connect() {
        console.log('flat')
    }

    /**
     *
     * @param event
     */
    navbar(event) {
        console.log(event.target);
        const navbarToggle = document.querySelector('.navbar-container')
        navbarToggle.classList.toggle('show');
        navbarToggle.classList.toggle('column-4');

        const navbarGridEffect = document.querySelector('.navbar-grid-effect')
        navbarGridEffect.classList.toggle('grid-effect-show');
    }
}