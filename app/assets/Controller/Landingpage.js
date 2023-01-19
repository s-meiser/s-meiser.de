import {Controller} from '@hotwired/stimulus';
import {overlayTopRight} from "./Animation/overlay-top-right"

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static targets = [];

    connect() {
        overlayTopRight();
    }

}