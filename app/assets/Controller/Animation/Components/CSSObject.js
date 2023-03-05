import {
    Object3D,
} from 'three';

class CSSObject extends Object3D {
    constructor( element ) {
        super();
        this.isCSSObject = true;
        this.element = element;
    }
}

export { CSSObject };