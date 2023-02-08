class ControlSettings {

    constructor(controls) {
        this.controls = controls;
    }

    /**
     * radians result = 65° × π / 180°
     * degrees result = 1.5 × 180° / π
     */
    setAzimuthAngle() {
        const minAzimuthAngle = -15;
        const maxAzimuthAngle = 15;
        this.controls.minAzimuthAngle = ((minAzimuthAngle * Math.PI) / 180);
        this.controls.maxAzimuthAngle = ((maxAzimuthAngle * Math.PI) / 180);
    }

    /**
     * start by 90° or 0,5π rad = 1,5707963268
     */
    setPolarAngle() {
        const minPolarAngle = 15;
        const maxPolarAngle = 15;
        this.controls.minPolarAngle = (((90 - minPolarAngle) * Math.PI) / 180);
        this.controls.maxPolarAngle = (((90 + maxPolarAngle) * Math.PI) / 180);
    }

}

export { ControlSettings }