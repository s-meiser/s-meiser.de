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
        console.log(event)
    }
}