export default class Configuration {

    constructor() {
        return this.responsiveDesign();
    }

    /**
     *
     */
    camera(borderContentMargin) {
        //const calcFrustumSizeToWindowResolution =

        /**
         * frustum is the space between near and far clipping plan
         */
        return {
            frustumSize: 1000,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 10000,
            position: {
                x: 0,
                y: 0,
                z: 1000
            }
        };
    }

    controls(shapeHeight, marginTop = null) {
        marginTop = window.innerHeight * 0.053333333;
        //set viewpoint to top of shape
        const topPoint = shapeHeight - (window.innerHeight / 2);
        //set and add margin from top
        const startTopPoint = topPoint + marginTop;

        return {
            position: {
                x: 0,
                y: startTopPoint,
                z: 0
            }
        }
    }

    initialCss3DObjectForRef() {
        /**
         * window.innerWidth  == 1920
         * window.innerHeight == 660
         * x: -708, y: 2170, z: doesn't matter
         *
         * window.innerWidth  == 1920
         * window.innerHeight == 1080
         * x: -708, y: 1960, z: doesn't matter
         */


        return {
            object: {
                position: {
                    x: -708,
                    y: 1960,
                    z: 0
                }
            }
        }
    }

    mesh() {
        return {
            hiddenMesh: {
                object: {
                    position: {
                        x: 0,
                        y: 0,
                        z: 110
                    },
                    name: 'hiddenMesh'
                }
            },
            mesh: {
                object: {
                    position: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    name: 'mainMesh'
                }
            }
        }
    }

    shapes() {

        return {
            shadow: {
                width: 1400,
                height: 600,
                radius: 20,
                position: {
                    x: -700,
                    y: -500
                },
                opacity: 0
            },
            mainShape: {
                width: 1600,
                height: 800,
                radius: 20,
                position: {
                    x: -800,
                    y: 0
                }
            }
        }
    }

    shadowPlane() {
        return {
            geometry: {
                width: 10000,
                height: 10000,
            },
            mesh: {
                position: {
                    y: 400,
                    z: -10
                }
            }
        }
    }

    light() {
        return {
            light: {
                position: {
                    x: 0,
                    y: 0,
                    z: 1200
                },
                angle: 0.698
            },
            shadow: {
                mapSize: {
                    width: 256,
                    height: 256
                },
                camera: {
                    near: 1,
                    far: 1500,
                    aspect: 500
                },
                focus: 2.3
            },
            target: {
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
            }
        }
    }

    responsiveDesign() {
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
         * https://gs.statcounter.com/screen-resolution-stats
         * last status: => 12 Feb 2023
         *
         * Desktop:
         * 1920x1080 => 24.01%
         * 1366x768 => 16.22%
         * 1536x864 => 10.98%
         * 1280x720 => 6.11%
         * 1440x900 => 5.96%
         * 1600x900 => 3.36%
         *
         * Smartphones:
         * 360x800 => 11,34%
         * 390x844 => 6,74
         * 414x896 => 5.89%
         * 412x915 => 5.56%
         * 393x873 => 4.77%
         * 360x780 => 4.27%
         *
         * Tablet:
         * 768x1024 => 28.65%
         * 810x1080 => 8.06%
         * 1280x800 => 6.89%
         * 800x1280 => 6.48%
         * 601x962 => 4.75%
         * 820x1180 => 3.26%
         */

        /**
            |---------------|   margin-left/right => same distance to the browser window
            |    -------    |   in relation to the resolution of the device/browser
            |   |       |   |
            |   |       |   |   Camera Pan spacing fix to top by xx pixel
            |    -------    |
            |---------------|
         */

        const browserWidth = window.innerWidth;
        const browserHeight = window.innerHeight

        // spacing between border and content
        const borderContentSpacing = 8.33333333; // Percent
        console.log()
        const borderContentMargin  = Math.ceil(window.innerWidth * (borderContentSpacing / 100));
        //console.log(borderContentMargin)

        const camera = this.camera(borderContentMargin);
        const initialCss3DObjectForRef = this.initialCss3DObjectForRef();
        const mesh = this.mesh();
        const shadowPlane = this.shadowPlane()
        const light = this.light();
        const shapes = this.shapes();
        const controls = this.controls(shapes.mainShape.height);

        return {
            initialCss3DObjectForRef,
            controls,
            camera,
            mesh,
            shadowPlane,
            light,
            shapes
        }
    }

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
    mediaQueries() {
        const landscapeMQ = window.matchMedia("(orientation: landscape)");
        const portraitMQ = window.matchMedia("(orientation: portrait)");

        window.matchMedia('(min-width: 992px)')

        const xs = window.matchMedia('(max-width: 576px)')
        const sm = window.matchMedia('(min-width: 576px) and (max-width: 768px)')
        const md = window.matchMedia('(min-width: 768px) and (max-width: 992px)')
        const lg = window.matchMedia('(min-width: 992px) and (max-width: 1200px)')
        const xl = window.matchMedia('(min-width: 1200px) and (max-width: 1400px)')
        const xxl = window.matchMedia('(min-width: 1400px)')
    }
}
