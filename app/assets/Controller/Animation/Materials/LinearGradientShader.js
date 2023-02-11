import * as THREE from "three";

const linearGradientShader = (angle, startHEXColor, endHEXColor) => {
    return new THREE.ShaderMaterial({
        uniforms: {
            colors: {
                value: [new THREE.Color(startHEXColor), new THREE.Color(endHEXColor)]
            }
        },
        vertexShader: `
        varying float angle; 
    
        void main() {
          angle = atan(position.y, position.x) + radians(${angle});
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: `
        uniform vec3 colors[2]; 
    
        varying float angle;
    
        void main() {
          float f = (angle + 3.14) / (2.0 * 3.14);
          f = clamp(f, 0., 1.);
          gl_FragColor = vec4(mix(colors[0], colors[1], f), 1.0);
        }
      `
    });
}


export {linearGradientShader}