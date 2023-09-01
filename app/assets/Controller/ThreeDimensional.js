import {Controller} from '@hotwired/stimulus';
import {TheaterStage} from "./Animation/TheaterStage";
import * as bootstrap from 'bootstrap'

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static targets = [];

    connect() {
        const stage = new TheaterStage();

        //show toast overlay
        const toastID = document.getElementById('versionNotification');
        const toast = new bootstrap.Toast(toastID);
        toast.show()
    }
}