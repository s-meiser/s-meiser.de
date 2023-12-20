import {Controller} from '@hotwired/stimulus';
import {TheaterStage} from "./Animation/TheaterStage";
import * as bootstrap from 'bootstrap'

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    connect() {
        const stage = new TheaterStage();

        // Show toast overlay
        const toastID = document.getElementById('versionNotification');
        const toast = new bootstrap.Toast(toastID);
        toast.show();

        // Disable right-click context menu
        document.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    }
}