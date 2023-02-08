import * as THREE from "three";

export default class RoundedRectShape {

    constructor(parameter) {
        this.x = parameter.x
        this.y = parameter.y
        this.width = parameter.width
        this.height = parameter.height
        this.rounded = parameter.rounded
    }

    roundedRectShape(){
        const roundedRectShape = new THREE.Shape();

        let x = this.x;
        let y = this.y;
        let width = this.width;
        let height = this.height;
        let radius = this.rounded;

        roundedRectShape.moveTo( x, y + radius );
        roundedRectShape.lineTo( x, y + height - radius );
        roundedRectShape.quadraticCurveTo( x, y + height, x + radius, y + height );
        roundedRectShape.lineTo( x + width - radius, y + height );
        roundedRectShape.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
        roundedRectShape.lineTo( x + width, y + radius );
        roundedRectShape.quadraticCurveTo( x + width, y, x + width - radius, y );
        roundedRectShape.lineTo( x + radius, y );
        roundedRectShape.quadraticCurveTo( x, y, x, y + radius );

        return roundedRectShape;

    }
}