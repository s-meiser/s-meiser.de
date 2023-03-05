import * as THREE from "three";
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils.js'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js'

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

const shadowShader = () => {
    return new THREE.ShaderMaterial({
        uniforms: mergeUniforms([
            UniformsLib.lights,
            UniformsLib.fog,
        ]),

            vertexShader: `
        #include <common>
        #include <fog_pars_vertex>
        #include <shadowmap_pars_vertex>
        void main() {
          #include <begin_vertex>
          #include <project_vertex>
          #include <worldpos_vertex>
          #include <shadowmap_vertex>
          #include <fog_vertex>
        }
      `,

            fragmentShader: `
        #include <common>
        #include <packing>
        #include <fog_pars_fragment>
        #include <bsdfs>
        #include <lights_pars_begin>
        #include <shadowmap_pars_fragment>
        #include <shadowmask_pars_fragment>
        #include <dithering_pars_fragment>
        void main() {
          // CHANGE THAT TO YOUR NEEDS
          // ------------------------------
          vec3 finalColor = vec3(0, 0.75, 0);
          vec3 shadowColor = vec3(0, 0, 0);
          float shadowPower = 0.5;
          // ------------------------------
          
          // it just mixes the shadow color with the frag color
          gl_FragColor = vec4( mix(finalColor, shadowColor, (1.0 - getShadowMask() ) * shadowPower), 1.0);
          #include <fog_fragment>
          #include <dithering_fragment>
        }
      `
    })
}

export {linearGradientShader, shadowShader}