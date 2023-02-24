import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import $ from 'jquery';

export default class Utility {

    constructor(camera){
        this.camera = camera;
        this.lineMultiplier = 0.5;
        this.lineWidth = (10/camera.position.z)*this.lineMultiplier;
    }

    createHexagon(){

        let angle = 1.7320508075688767;
        let h = angle * 0.5 // height of a triangle

        const hexagonShape = new THREE.Shape()
            .moveTo( h, 0.5 )
            .lineTo( 0, 1 )
            .lineTo( -h, 0.5 )
            .lineTo( -h, -0.5 )
            .lineTo( 0, -1 )
            .lineTo( h, -0.5 )
            .lineTo( h, 0.5 ); // close path

        const geometry = new THREE.ShapeGeometry(hexagonShape);
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.2,
            transparent: true,
        });
        return new THREE.Mesh(geometry, material) ;
    }

    addBorderLine(setColor) {
        let line;
        let matLine;

        const positions = [];
        const colors = [];
        const points = [];

        // Position and THREE.Color Data
        let angle = 1.7320508075688767;
        let h = angle * 0.5 // height of a triangle

        points.push( new THREE.Vector3( h, 0.5, 0 ) );
        points.push( new THREE.Vector3( 0, 1, 0 ) );
        points.push( new THREE.Vector3( -h, 0.5, 0 ) );
        points.push( new THREE.Vector3( -h, -0.5, 0 ) );
        points.push( new THREE.Vector3( 0, -1, 0 ) );
        points.push( new THREE.Vector3( h, -0.5, 0 ) );
        points.push( new THREE.Vector3( h, 0.5, 0 ) );

        const combinePoints = []
        $.each(points, function( index, value ) {
            combinePoints.push(value.x)
            combinePoints.push(value.y)
            combinePoints.push(value.z)
        });

        const spline = new THREE.CatmullRomCurve3( points );
        const divisions = Math.round( points.length );
        const point = new THREE.Vector3();
        const color = new THREE.Color(setColor);

        for ( let i = 0, l = divisions; i < l; i ++ ) {
            const t = i / l;
            spline.getPoint( t, point );

            //color.setHSL( t, 1, 0.5 );
            positions.push( point.x, point.y, point.z );
            colors.push( color.r, color.g, color.b );
        }

        const geometry = new LineGeometry();
        geometry.setPositions( combinePoints );
        geometry.setColors( colors );

        console.log(geometry)

        matLine = new LineMaterial({
            transparent: false,
            //color: 0xffffff,
            linewidth: 1/100, // in pixels
            vertexColors: true,
            //resolution:  // to be set by renderer, eventually
            dashed: false,
        });




        line = new Line2( geometry, matLine );
        return {
            line: line,
            matLine: matLine,
            positions: positions,
            points: points,
            lineGeometry: geometry,
            colors: color
        };
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
}