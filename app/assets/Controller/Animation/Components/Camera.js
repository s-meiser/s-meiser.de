import * as THREE from 'three';
import Configuration from "./Configuration";

const Camera = (configuration) => {
    const config = configuration.camera;

    const frustumSize = config.frustumSize;
    const aspect = config.aspect;
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    // left/right -960 bzw. 960 bei 1920px width
    let camera = new THREE.OrthographicCamera(
        -960,
        960,
        window.innerHeight / 2,
        window.innerHeight / -2,
        config.near,
        config.far
    );
    camera.position.set( config.position.x, config.position.y, config.position.z );

    return camera;
}

export { Camera };