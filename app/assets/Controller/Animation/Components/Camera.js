import * as THREE from 'three';
import Configuration from "./Configuration";

const Camera = () => {
    const config = new Configuration().camera;
    const frustumSize = config.frustumSize;
    const aspect = config.aspect;

    let camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        config.near,
        config.far
    );
    camera.position.set( config.position.x, config.position.y, config.position.z );

    return camera;
}

export { Camera };