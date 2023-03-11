import * as THREE from "three";
import { mergeUniforms } from 'three/src/renderers/shaders/UniformsUtils.js'
import { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js'
import {Vector3} from "three";

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

const glowMaterial = () => {
    const shader = new THREE.ShaderMaterial({
        uniforms: {
            coefficient: { value: 1/10  },
            color: { value: new THREE.Color(0xff00dd) },
            power: { value: 2 },
        },
        vertexShader: `
            varying vec3 vVertexWorldPosition;
            varying vec3 vVertexNormal;
            
            void main() {
                vVertexNormal = normalize(normalMatrix * normal);
                vec4 worldPosition = modelViewMatrix * vec4(position, 1.0);
                vVertexWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * worldPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float coefficient;
            uniform float power;
            varying vec3 vVertexNormal;
            varying vec3 vVertexWorldPosition;
    
            void main() {
                vec3 worldCameraToVertex = vVertexWorldPosition + cameraPosition;
                vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
                viewCameraToVertex = normalize(viewCameraToVertex);
                float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
                gl_FragColor = vec4(color, intensity);
            }
        `,
        transparent: true,
        depthWrite: false,
    });

    console.log(shader)
    return shader;
}

const glowMaterial2 = () => {
    const shader = new THREE.ShaderMaterial({
        uniforms: {
            coefficient: { value: 1/100  },
            glowColor: { value: new THREE.Color(0xff00dd) },
            power: { value: 10 },
        },
        vertexShader: `
            varying vec3 vVertexWorldPosition;
            varying vec3 vVertexNormal;

            void main(){
                vVertexNormal = normalize(normalMatrix * normal);
                vVertexWorldPosition  = (modelMatrix * vec4(position, 1.0)).xyz;
                vec4 mvPosition = modelViewMatrix * vec4(position.x, position.y + 400.0, position.z, 1.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(mvPosition.xyz, 1.0);
         }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            uniform float coefficient;
            uniform float power;
        
            varying vec3 vVertexNormal;
            varying vec3 vVertexWorldPosition;
                   
            void main(){
                vec3 worldCameraToVertex = cameraPosition - vVertexWorldPosition;
                vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
                viewCameraToVertex = normalize(viewCameraToVertex);
                float intensity = pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);
                gl_FragColor = vec4(glowColor, intensity);
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    return shader;
}


const glowMaterial3 = () => {
    const shader = new THREE.ShaderMaterial({
        uniforms: {
            glowColor: { value: new THREE.Color(0xff00dd) },
        },
        vertexShader: `
            varying vec2 v_uv;
            void main(){
                v_uv = uv;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
         }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying vec2 v_uv;
            void main(){              
                vec2 uv = v_uv;
                // Zooms out by a factor of 2.0
                uv *= 2.0;
                // Shifts every axis by -1.0
                uv -= 1.0;

                // Base color for the effect
                vec3 color = glowColor;

                // specify size of border. 0.0 - no border, 1.0 - border occupies the entire space
                vec2 borderSize = vec2(0.1); 

                // size of rectangle in terms of uv 
                vec2 rectangleSize = vec2(1.0) - borderSize; 

                // distance field, 0.0 - point is inside rectangle, 1.0 point is on the far edge of the border.
                float distanceField = length(max(abs(uv)-rectangleSize,0.0) / borderSize);

                // calculate alpha accordingly to the value of the distance field
                float alpha = 1.0 - distanceField;

                gl_FragColor = vec4(color, alpha); 
            }
        `,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide
    });

    return shader;
}
const shadowShader = () => {
    return new THREE.ShaderMaterial( {
        lights: true,
        uniforms: THREE.UniformsUtils.merge([
            // THREE.UniformsLib["shadowmap"],
            THREE.UniformsLib["lights"],
            {
                lightPosition: {type: 'v3', value: new Vector3()},
                time: {type: 'f', value: 0}
            }
        ]),
        vertexShader:
            [
                'attribute vec3 offset;',
                'attribute vec4 orientation;',
                'attribute vec3 color;',

                'varying vec3 pos;',
                'varying vec3 vNormal;',
                'varying vec3 vWorldPosition;',
                'varying vec3 vColor;',
                'varying vec3 vLightDir;',

                'uniform vec3 lightPosition;',

                'vec3 applyQuaternionToVector( vec4 q, vec3 v ){',
                    'return v + 2.0 * cross( q.xyz, cross( q.xyz, v ) + q.w * v );',
                '}',

                THREE.ShaderChunk["common"],
                THREE.ShaderChunk["shadowmap_pars_vertex"],

                'void main() {',
                    'vColor = color;',

                    'vec3 vPosition = applyQuaternionToVector( orientation, position );',
                    'pos = vPosition + offset;',

                    'vNormal = normalMatrix * vec3(normal + normalize(offset) * 0.3);',

                    'vec4 worldPosition = modelMatrix * vec4(pos, 1.0);',
                    'vWorldPosition = worldPosition.xyz;',

                    'vLightDir = mat3(viewMatrix) * (lightPosition - vWorldPosition);',

                    'gl_Position = projectionMatrix * viewMatrix * worldPosition;',
                    THREE.ShaderChunk["shadowmap_vertex"],
                '}'
            ].join('\n')
        ,
        fragmentShader:
            [
                THREE.ShaderChunk['common'],
                THREE.ShaderChunk['packing'],
                'varying vec3 pos;',
                'varying vec3 vNormal;',
                'varying vec3 vWorldPosition;',
                'varying vec3 vColor;',
                'varying vec3 vLightDir;',

                THREE.ShaderChunk['shadowmap_pars_fragment'],
                'void main() {',
                'vec3 lightDirection = normalize(vLightDir);',

                'float c = max(0.0, dot(vNormal, lightDirection)) * 2.;',
                // 'gl_FragColor = vec4(vColor.r + c , vColor.g + c , vColor.b + c , 1.);',
                'gl_FragColor = vec4(.3+c , .3+c , .3+c , 1.);',
                THREE.ShaderChunk['shadowmap_fragment'],
                '}'
            ].join('\n')
    });
}

export {linearGradientShader, shadowShader, glowMaterial, glowMaterial2, glowMaterial3}