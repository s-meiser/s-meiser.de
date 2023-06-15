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
    const svgLogoCss3 = 'build/images/logos/CSS3.svg';
    const svgLogoHtml5 = 'build/images/logos/HTML5.svg';
    const svgLogoSymfony = 'build/images/logos/Symfony.svg';
    const svgLogoThreeJS = 'build/images/logos/ThreeJS.svg';

    const res = Promise.all([
        getFileSize(welcomeSignUrl, 'sign'),
        getFileSize(treeUrl, 'tree'),
        getFileSize(stoneUrl, 'stone'),
        getFileSize(grassUrl, 'grass'),
        getFileSize(svgLogoCss3, 'svgLogoCss3'),
        getFileSize(svgLogoHtml5, 'svgLogoHtml5'),
        getFileSize(svgLogoSymfony, 'svgLogoSymfony'),
        getFileSize(svgLogoThreeJS, 'svgLogoThreeJS')
    ]).then(([
            welcomeSign,
            tree,
            stone,
            grass,
            svgLogoCss3,
            svgLogoHtml5,
            svgLogoSymfony,
            svgLogoThreeJS
        ]) => ({
            welcomeSign,
            tree,
            stone,
            grass,
            svgLogoCss3,
            svgLogoHtml5,
            svgLogoSymfony,
            svgLogoThreeJS
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
            SvgLogoCss3(scene, mediaQueries, fileInfo.svgLogoCss3, $loaderDiv, totalSize),
            //SvgLogoHtml5(scene, mediaQueries, fileInfo.svgLogoHtml5, $loaderDiv, totalSize),
            //SvgLogoSymfony(scene, mediaQueries, fileInfo.svgLogoSymfony, $loaderDiv, totalSize),
            SvgLogoThreeJS(scene, mediaQueries, fileInfo.svgLogoThreeJS, $loaderDiv, totalSize),
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

const svgGroups = (paths, strokes, strokeColor, strokeWidth) => {
    const group = new THREE.Group();

    const lineMaterial = new MeshLineMaterial({
        color: strokeColor,
        lineWidth: strokeWidth,
        side: THREE.FrontSide,
        opacity: 1,
        depthTest: true,
        transparent: false,
        useAlphaMap: 0
    });

    for (let i = 0; i < paths.length; i++) {

        const path = paths[i];

        const material = new THREE.MeshBasicMaterial({
            color: path.color,
            side: THREE.DoubleSide,
            depthWrite: false,
            transparent: true
        });

        const shapes = SVGLoader.createShapes( path );

        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[ j ];

            const geometry = new THREE.ShapeGeometry( shape );
            // flip SVG
            geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))
            const mesh = new THREE.Mesh(geometry, material);
            if (strokes) {
                let shape3d = new THREE.BufferGeometry().setFromPoints(shapes[ j ].getPoints());
                // flip SVG
                shape3d.applyMatrix4(new THREE.Matrix4().makeScale(1, -1, 1))
                const line = new MeshLine();
                line.setGeometry(shape3d);
                const lineMesh = new THREE.Mesh(line, lineMaterial);
                lineMesh.position.setZ(1)
                group.add(mesh, lineMesh);
            } else {
                group.add(mesh);
            }
        }
    }
    return group;
}

function degrees2radians(degrees)
{
    return degrees * (Math.PI/180);
}
function radians2degrees(radians)
{
    return radians * 180 / Math.PI;
}

const SvgLogoThreeJS = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new SVGLoader();

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {
        // load a SVG resource
        loader.load(
            // resource URL
            fileInfo.url,
            // called when the resource is loaded
            function (data) {
                resolve(data);
                const svg = svgGroups(data.paths, true, 0x000000, 1)
                const fitLogoIntoHexagon = 0;
                const rotationFactorX = 0
                const rotationFactorY = 0
                const rotationFactorZ = -0.325

                svg.scale.set(0.14,0.14)
                svg.position.set(-910,845,20)
                svg.rotation.set(50,6+rotationFactorY,0+rotationFactorZ)

                let utility = new Utility();
                const hexagon =  utility.getHexagonBorder(0xFFFFFF, 1.5, 0.5,20, 'double');
                hexagon.scale.set(45,45,1)
                hexagon.position.set(-900,810,30);
                hexagon.rotation.set(50,6+rotationFactorY,19+rotationFactorZ)
                hexagon.castShadow = true; //default is false
                hexagon.receiveShadow = true; //default

                const group = new THREE.Group();
                group.add(hexagon);
                group.add(svg);
                //group.position.set(-200,-150,0);
                group.rotation.set(0,0,0)
                scene.add(group);

            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
            });
    });
}

const SvgLogoCss3 = async(scene, mediaQueries, fileInfo, loaderDiv, totalSize) => {
    const loader = new SVGLoader();

    addSingleProgressDiv(fileInfo.name);
    const divWidth = loaderDiv.width() / 2;

    return new Promise(async (resolve, reject) => {
        // load a SVG resource
        loader.load(
            // resource URL
            fileInfo.url,
            // called when the resource is loaded
            function (data) {
                resolve(data);
                const svg = svgGroups(data.paths)
                const fitLogoIntoHexagon = 0;
                const rotationFactorX = 0
                const rotationFactorY = 0
                const rotationFactorZ = -0.325

                svg.scale.set(0.14,0.14)
                svg.position.set(-910,845,20)
                svg.rotation.set(50,6+rotationFactorY,0+rotationFactorZ)

                let utility = new Utility();
                const hexagon =  utility.getHexagonBorder(0xFFFFFF, 1.5, 0.5,20, 'double');
                hexagon.scale.set(45,45,1)
                hexagon.position.set(-900,810,30);
                hexagon.rotation.set(50,6+rotationFactorY,19+rotationFactorZ)
                hexagon.castShadow = true; //default is false
                hexagon.receiveShadow = true; //default

                const group = new THREE.Group();
                group.add(hexagon);
                group.add(svg);
                //group.position.set(-200,-150,0);
                group.rotation.set(0,0,0)
                scene.add(group);

            },
            function (xhr) {
                updateProgress(xhr.loaded, fileInfo.size, totalSize, fileInfo.name, divWidth);
            },
            function (error) {
                console.log('An error happened');
        });
    });
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