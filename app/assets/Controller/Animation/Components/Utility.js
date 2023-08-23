import * as THREE from 'three';
import {MathUtils} from 'three';
import {MeshLine, MeshLineMaterial} from './../Mesh/THREE.MeshLine';

export default class Utility {

    constructor(camera){
        if (!camera) {
            return null;
        }
        this.camera = camera;
        this.lineMultiplier = 0.5;
        this.lineWidth = (10/camera.position.z)*this.lineMultiplier;
    }

    getHexagonMesh(color, opacity, rotation){

        const angle = Math.PI / 3; // angle between two vertices of the hexagon
        const radius = 1; // radius of the hexagon

        const rot = MathUtils.degToRad(rotation);
        const hexagonShape = new THREE.Shape();
        for (let i = 0; i < 6; i++) {
            const x = radius * Math.cos(i * angle + rot);
            const y = radius * Math.sin(i * angle + rot);
            const z = 0;
            if (i === 0) {
                hexagonShape.moveTo(x, y, z);
            } else {
                hexagonShape.lineTo(x, y, z);
            }
        }
        hexagonShape.closePath();

        // TODO: Refactor
        let opacityAdditionalOptions = {};
        if (opacity < 1) {
            opacityAdditionalOptions = {
                depthTest: false,
                transparent: true
            }
        } else {
            opacityAdditionalOptions = {
                depthTest: true,
                transparent: false
            }
        }

        const geometry = new THREE.ShapeGeometry(hexagonShape);
        const material = new THREE.MeshBasicMaterial({
            color: color,
            opacity: opacity,
            side: THREE.DoubleSide,
            depthTest: true,
            transparent: true
        });
        return new THREE.Mesh(geometry, material) ;
    }

    getHexagonBorder(color, lineWidth, opacity, rotation, meshMaterialSide) {

        const angle = Math.PI / 3; // angle between two vertices of the hexagon
        const radius = 1; // radius of the hexagon

        const rot = MathUtils.degToRad(rotation);
        const hexagonShape = new THREE.Shape();
        for (let i = 0; i < 6; i++) {
            const x = radius * Math.cos(i * angle + rot);
            const y = radius * Math.sin(i * angle + rot);
            const z = 0;
            if (i === 0) {
                hexagonShape.moveTo(x, y, z);
            } else {
                hexagonShape.lineTo(x, y, z);
            }
        }
        hexagonShape.closePath();

        const points = [];
        for (const [x, y] of hexagonShape.getPoints()) {
            points.push(new THREE.Vector3( x, y, 0 ));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new MeshLine();
        line.setGeometry(geometry);

        // TODO: Refactor
        let opacityAdditionalOptions = {};
        if (opacity < 1) {
            opacityAdditionalOptions = {
                depthTest: false,
                transparent: true
            }
        } else {
            opacityAdditionalOptions = {
                depthTest: true,
                transparent: false
            }
        }

        let setSide;
        switch (meshMaterialSide) {
            case 'front':
                setSide = THREE.FrontSide;
                break;
            case 'back': THREE.BackSide;
                break;
            case 'double':
                setSide = THREE.DoubleSide;
                break;
            default:
                setSide = THREE.FrontSide;
        }
        // https://github.com/spite/THREE.MeshLine/blob/master/README.md
        const material = new MeshLineMaterial({
            color: color,
            lineWidth: lineWidth,
            opacity: opacity,
            depthTest: true,
            transparent: true,
            side: setSide
        });
        return new THREE.Mesh(line, material);
    }

    setGeoAttribute(matLine, border) {
        let matLineBasic, line1;

        const geo = new THREE.BufferGeometry();
        geo.setAttribute( 'position', new THREE.Float32BufferAttribute( border.positions, 3 ) );
        geo.setAttribute( 'color', new THREE.Float32BufferAttribute( border.colors, 1 ) );

        matLineBasic = new THREE.LineBasicMaterial({
            vertexColors: true
        });

        line1 = new THREE.Line( geo, matLineBasic );
        line1.computeLineDistances();
        line1.visible = false;
        return line1;
    }

    addToScene(scene, array) {
        let i;
        for (i = 0; i < array.length; i++) {
            scene.add(array[i])
        }
    }

    degrees2radians(degrees)
    {
        return degrees * (Math.PI/180);
    }
    radians2degrees(radians)
    {
        return radians * 180 / Math.PI;
    }
}