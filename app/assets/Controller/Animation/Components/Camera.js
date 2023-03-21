import * as THREE from 'three';

const Camera = (configuration) => {
    const config = configuration.camera;

    let camera = new THREE.OrthographicCamera(
        config.orthographicCamera.left,
        config.orthographicCamera.right,
        config.orthographicCamera.top,
        config.orthographicCamera.bottom,
        config.orthographicCamera.near,
        config.orthographicCamera.far
    );
    camera.position.set( config.position.x, config.position.y, config.position.z );

    return camera;
}

export { Camera };