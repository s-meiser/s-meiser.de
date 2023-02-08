import * as THREE from 'three';

const Camera = () => {

    const frustumSize = 1000;
    const aspect = window.innerWidth / window.innerHeight;

    let camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        1,
        10000
    );
    camera.position.set( 0, 0, 1000 );

/*    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 200 );
    camera.position.set( 0, 0, 20 );
    camera.lookAt( 0, 0, 0 );*/

    // camera.matrixWorldInverse
    camera.addEventListener('change', function(ev) {
        // Transformationsdaten aus dem DOM-Element extrahieren

        console.log(ev);
        //var transform = this.style.transform;

        // Verwenden Sie die Transformationsdaten für Ihre eigenen Div-Boxen
        // ...
    });


    return camera;
}

export { Camera };