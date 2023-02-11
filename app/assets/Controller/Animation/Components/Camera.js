import * as THREE from 'three';

const Camera = () => {

    /**
     * Bootstrap Grid Breakpoints
     *
     * xs: 0
     * sm: 576px
     * md: 768px
     * lg: 992px
     * xl: 1200px
     * xxl: 1400px
     */

    /**
     * Desktop:
     * Full HD Resolution => 1920 x 1080 | 16:9
     * 2K Resolution => 2.560 x 1.440 | 16:9
     * UWQHD => 3.440 x 1.440 | 21:9
     *
     * Smartphones:
     */


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

    return camera;
}

export { Camera };