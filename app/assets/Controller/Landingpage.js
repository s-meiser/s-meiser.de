import {Controller} from '@hotwired/stimulus';
import {overlay} from "./Animation/overlay"

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static targets = [];

    connect() {
        overlay();
    }

}