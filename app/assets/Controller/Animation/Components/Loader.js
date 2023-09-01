import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import $ from 'jquery'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import * as THREE from 'three';
import Utility from "./Utility";
import {MeshLine, MeshLineMaterial} from "../Mesh/THREE.MeshLine";

const ExternalLoader = async (scene, configuration) => {

    const mediaQueries = configuration.mediaQueries
    $('.loader-animation').width($('.loader-text').width());

    const welcomeSignUrl = 'build/models/glb/a_welcoming_sign.glb';
    const treeUrl = 'build/models/glb/treea.glb';
    const stoneUrl = 'build/models/glb/granite_stone_brown_scale_10.glb';
    const grassUrl = 'build/models/glb/grass_free_download.glb';

    const res = Promise.all([
        getFileSize(welcomeSignUrl, 'sign'),
        getFileSize(treeUrl, 'tree'),
        getFileSize(stoneUrl, 'stone'),
        getFileSize(grassUrl, 'grass'),
    ]).then(([
            welcomeSign,
            tree,
            stone,
            grass,
        ]) => ({
            welcomeSign,
            tree,
            stone,
            grass,
        }))

    Promise.resolve(res).then(function (fileInfo) {
        let totalSize = 0;
        for (const [key, value] of Object.entries(fileInfo)) {
            totalSize = totalSize + parseInt(value.size);
        }
        const $loaderDiv = $('.loader-animation');

        return Promise.all([
            AWelcomingSign(scene, mediaQueries, fileInfo.welcomeSign, $loaderDiv, totalSize),
            Grass(scene, mediaQueries, fileInfo.grass, $loaderDiv, totalSize),
            GraniteStoneBrown(scene, mediaQueries, fileInfo.stone, $loaderDiv, totalSize),
            Treea(scene, mediaQueries, fileInfo.tree, $loaderDiv, totalSize),
        ]).then((values) => {
            $('.loader-container').fadeOut(1000);
            setTimeout(function(){
                $('.loading-bar-left,.loading-bar-right').empty();
                $('#canvasRenderer,.obit-controls-gizmo,.cameraContainer').css('filter', 'blur(0px)');
            }, 1000);

        });
    });


}

const getFileSize = (url, name) => {
    return fetch(url, {
        method: 'HEAD',
    }).then(function (response) {
        return {
            name: name,
            url: url,
            size: response.headers.get('content-length')
        };
    });
}

const updateProgress = (loadedSize, fileSize, totalSize, name, divWidth) => {
    const percent = (loadedSize / totalSize) * divWidth;
    $(`.${name}`).width(percent)
};

const addSingleProgressDiv = (className) => {
    const newContent = `<div class="${className}"></div>`;
    $('.loading-bar-left').append(newContent)
    $('.loading-bar-right').append(newContent)
}

const AWelcomingSign = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new GLTFLoader();
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

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {
        loader.load(
            fileInfo.url,
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(scale, scale, scale)
                //gltf.scene.position.set(920, 290, 50)
                gltf.scene.position.set(positionLeftSide-margin, positionY, 50)
                gltf.scene.rotation.set(0.05, 500, 0)
                scene.add(gltf.scene);

                // add Credits to Scene
                // "A Welcoming Sign" (https://skfb.ly/6SN7B) by Raneman is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const Grass = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new GLTFLoader();

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

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {
        let currentAddedPercent = 0;
        loader.load(
            fileInfo.url,
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

                // add credits to scene
                // "Grass free download" (https://skfb.ly/6TQw7) by Fred Drabble is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const GraniteStoneBrown = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new GLTFLoader();

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

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {

        loader.load(
            fileInfo.url,
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(scale, scale, scale)
                gltf.scene.rotation.set(0, 850, 0)
                gltf.scene.position.set(positionLeftSide+margin, 0, 0)
                scene.add(gltf.scene);

                // add credits to scene
                // "Granite stone brown 02" (https://skfb.ly/688pC) by 3dhdscan is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

const Treea = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new GLTFLoader();

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

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {
        loader.load(
            fileInfo.url,
            function (gltf) {
                resolve(gltf);
                gltf.scene.scale.set(scale, scale, scale)
                gltf.scene.position.set(positionLeftSide+margin, positionY, 0)
                gltf.scene.rotation.set(0, 200, 0)
                scene.add(gltf.scene);
                // add credits to scene
                // "TreeA" (https://skfb.ly/6QWJM) by BotondBencsik is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
            }
        );
    });
}

export {ExternalLoader}