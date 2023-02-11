import {Controller} from '@hotwired/stimulus';
import {TheaterStage} from "./Animation/TheaterStage";

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static targets = [];

    connect() {
        const stage = new TheaterStage();
    }

}