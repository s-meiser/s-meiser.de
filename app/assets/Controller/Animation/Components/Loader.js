import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const ExternalLoader = async (scene, configuration) => {

    const mediaQueries = configuration.mediaQueries

    return Promise.all([
        //Tree(scene),
        //House(scene)
        //WoodStick(scene),
        //OakTree(scene),
        Treea(scene, mediaQueries),
        GraniteStoneBrown(scene, mediaQueries),
        Grass(scene, mediaQueries),
        AWelcomingSign(scene, mediaQueries),
    ]).then((values) => {
        return values;
    });
}


const AWelcomingSign = async(scene, mediaQueries) => {
    const loader = new GLTFLoader();

    /**
     * xs: 0 (max-width: 576px)
     * sm: 576px (min-width: 576px) and (max-width: 768px)
     * md: 768px (min-width: 768px) and (max-width: 992px)
     * lg: 992px (min-width: 992px) and (max-width: 1200px)
     * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
     * xxl: 1400px (min-width: 1400px)
     */
    const positionLeftSide = (window.innerWidth/2);

    let margin = 40;
    let scale = 150;
    let positionY = 290;

    if (mediaQueries.xs.matches) {
        margin = 0;
        scale = 75;
        positionY = 145;
    }
    if (mediaQueries.sm.matches) {
        margin = 75;
        scale = 75;
        positionY = 145;
    }
    if (mediaQueries.md.matches) {
        margin = 65;
        scale = 90;
        positionY = 175;
    }
    if (mediaQueries.lg.matches) {
        margin = 65;
        scale = 90;
        positionY = 175;
    }
    if (mediaQueries.xl.matches) {
        margin = 60;
        scale = 110;
        positionY = 210;
    }

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    //loader.setDRACOLoader(dracoLoader);

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/a_welcoming_sign.glb',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(scale, scale, scale)
                //gltf.scene.position.set(920, 290, 50)
                gltf.scene.position.set(positionLeftSide-margin, positionY, 50)
                gltf.scene.rotation.set(0.05, 500, 0)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const Grass = async(scene, mediaQueries) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    //loader.setDRACOLoader(dracoLoader);

    /**
     * xs: 0 (max-width: 576px)
     * sm: 576px (min-width: 576px) and (max-width: 768px)
     * md: 768px (min-width: 768px) and (max-width: 992px)
     * lg: 992px (min-width: 992px) and (max-width: 1200px)
     * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
     * xxl: 1400px (min-width: 1400px)
     */
    const positionLeftSide = (window.innerWidth/-2);

    let grass1_margin = 110;
    let grass1_scale = 1;
    let grass1_posZ = 0

    let grass2_margin = 20;
    let grass2_scale = 1.2;
    let grass2_posY = -20
    let grass2_posZ = 80

    if (mediaQueries.xs.matches) {
        grass1_margin = 30;
        grass1_scale = 0.5;
        grass1_posZ = 0

        grass2_margin = -10;
        grass2_scale = 0.6;
        grass2_posY = -10
        grass2_posZ = 40
    }
    if (mediaQueries.sm.matches) {
        grass1_margin = 100;
        grass1_scale = 0.5;
        grass1_posZ = 0

        grass2_margin = 55;
        grass2_scale = 0.6;
        grass2_posY = -10
        grass2_posZ = 40
    }
    if (mediaQueries.md.matches) {
        grass1_margin = 105;
        grass1_scale = 0.75;
        grass1_posZ = 0

        grass2_margin = 40;
        grass2_scale = 0.9;
        grass2_posY = -15
        grass2_posZ = 60
    }
    if (mediaQueries.lg.matches) {
        grass1_margin = 105;
        grass1_scale = 0.75;
        grass1_posZ = 0

        grass2_margin = 40;
        grass2_scale = 0.9;
        grass2_posY = -15
        grass2_posZ = 60
    }
    if (mediaQueries.xl.matches) {
        grass1_margin = 110;
        grass1_scale = 0.75;
        grass1_posZ = 0

        grass2_margin = 35;
        grass2_scale = 1.02;
        grass2_posY = -15
        grass2_posZ = 70
    }

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/grass_free_download.glb',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(grass1_scale, grass1_scale, grass1_scale)
                gltf.scene.position.set(positionLeftSide+grass1_margin, 0, grass1_posZ)
                scene.add(gltf.scene);
                const grass2 = gltf.scene.clone();
                grass2.scale.set(grass2_scale, grass2_scale, grass2_scale)
                //-940
                grass2.position.set(positionLeftSide+grass2_margin, grass2_posY, grass2_posZ)
                scene.add(grass2);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const GraniteStoneBrown = async(scene, mediaQueries) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    loader.setDRACOLoader(dracoLoader);


    /**
     * xs: 0 (max-width: 576px)
     * sm: 576px (min-width: 576px) and (max-width: 768px)
     * md: 768px (min-width: 768px) and (max-width: 992px)
     * lg: 992px (min-width: 992px) and (max-width: 1200px)
     * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
     * xxl: 1400px (min-width: 1400px)
     */
    const positionLeftSide = (window.innerWidth/-2);

    let margin = 90;
    let scale = 1;
    let positionY = 290;

    if (mediaQueries.xs.matches) {
        margin = 20;
        scale = 0.50;
    }
    if (mediaQueries.sm.matches) {
        margin = 90;
        scale = 0.50;
    }
    if (mediaQueries.md.matches) {
        margin = 90;
        scale = 0.75;
    }
    if (mediaQueries.lg.matches) {
        margin = 90;
        scale = 0.75;
    }
    if (mediaQueries.xl.matches) {
        margin = 90;
        scale = 0.85;
    }

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/granite_stone_brown_scale_10.glb',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(scale, scale, scale)
                gltf.scene.rotation.set(0, 850, 0)
                gltf.scene.position.set(positionLeftSide+margin, 0, 0)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const Treea = async(scene, mediaQueries) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    loader.setDRACOLoader(dracoLoader);


    /**
     * xs: 0 (max-width: 576px)
     * sm: 576px (min-width: 576px) and (max-width: 768px)
     * md: 768px (min-width: 768px) and (max-width: 992px)
     * lg: 992px (min-width: 992px) and (max-width: 1200px)
     * xl: 1200px (min-width: 1200px) and (max-width: 1400px)
     * xxl: 1400px (min-width: 1400px)
     */
    const positionLeftSide = (window.innerWidth/-2);

    let margin = 50;
    let scale = 700;
    let positionY = 0;

    if (mediaQueries.xs.matches) {
        margin = 0;
        scale = 350;
    }
    if (mediaQueries.sm.matches) {
        margin = 70;
        scale = 350;
    }
    if (mediaQueries.md.matches) {
        margin = 60;
        scale = 525;
    }
    if (mediaQueries.lg.matches) {
        margin = 60;
        scale = 525;
    }
    if (mediaQueries.xl.matches) {
        margin = 60;
        scale = 595;
    }


    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/treea.glb',
            function (gltf) {
                resolve(gltf);

                gltf.scene.scale.set(scale, scale, scale)
                gltf.scene.position.set(positionLeftSide+margin, positionY, 0)
                gltf.scene.rotation.set(0, 200, 0)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const OakTree = async(scene) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    loader.setDRACOLoader(dracoLoader);

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/gltf/oak_trees.gltf',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(200, 200, 200)
                gltf.scene.position.set(-500, 0, 50)
                gltf.scene.rotation.set(0, 900, 0)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const WoodStick = async(scene) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    loader.setDRACOLoader(dracoLoader);

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/wood_stick_01.glb',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(2000, 2000, 2000)
                gltf.scene.position.set(-2100, -2900, 4400)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });
}


const Tree = async(scene) => {
    const loader = new GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/build/models/gltf/textures/');
    loader.setDRACOLoader(dracoLoader);

    return new Promise(async (resolve, reject) => {
        loader.load(
            'build/models/glb/japanese_maple_tree.glb',
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(100, 100, 100)
                scene.add(gltf.scene);

            },
            // called while loading is progressing
            function (xhr) {

                //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        );
    });

};

export {ExternalLoader}