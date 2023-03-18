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
                vec2 borderSize = vec2(0.5); 

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

const shadowMaterial = () => {
    return new THREE.ShaderMaterial({
        uniforms: {
            shadowColor: { value: new THREE.Color(0x090d12) },
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
            uniform vec3 shadowColor;
            varying vec2 v_uv;
            void main(){              
                vec2 uv = v_uv;
                // Zooms out by a factor of 2.0
                uv *= 2.0;
                // Shifts every axis by -1.0
                uv -= 1.0;

                // Base color for the effect
                vec3 color = shadowColor;

                // specify size of border. 0.0 - no border, 1.0 - border occupies the entire space
                vec2 borderSize = vec2(0.8); 

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


const bloomMaterial = () => {
    return new THREE.ShaderMaterial({
        defines: {
            "RESOLUTION": "vec2(" + window.innerWidth.toFixed(1) + ", " + window.innerHeight.toFixed(1) + ")"
        },
        uniforms: {
            "tDiffuse": { value: null },
            "resolution": { value: new THREE.Vector2() },
            "bloomStrength": { value: 1.0 },
            "bloomRadius": { value: 0.1 },
            "bloomThreshold": { value: 0.8 },
            "color": { value: new THREE.Color(0xff00dd) },
        },
        vertexShader: `
            varying vec2 vUv;
        
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform vec2 resolution;
            uniform float bloomStrength;
            uniform float bloomRadius;
            uniform float bloomThreshold;
            uniform vec3 color;
        
            varying vec2 vUv;
        
            void main() {
              vec4 texel = texture2D(tDiffuse, vUv);
              vec4 bloomColor = vec4(0.0);
              float brightness = max(max(texel.r, texel.g), texel.b);
        
              if (brightness > bloomThreshold) {
                vec2 bloomUV = vUv - vec2(0.5);
                bloomUV *= resolution;
                bloomUV *= bloomRadius;
                bloomUV += vec2(0.5);
        
                bloomColor = texture2D(tDiffuse, bloomUV);
                bloomColor *= bloomStrength * (brightness - bloomThreshold);
              }
        
              gl_FragColor = mix(texel, bloomColor + texel, 1.0);
            }
        `,
        transparent: false,
        depthWrite: false,
        side: THREE.DoubleSide
    });
}


const blurMaterial = () => {
    return new THREE.ShaderMaterial({
        uniforms: {
            "tDiffuse": { value: null },
            "resolution": { value: new THREE.Vector2() },
            "bloomStrength": { value: 1.0 },
            "bloomRadius": { value: 0.1 },
            "bloomThreshold": { value: 0.8 },
            "color": { value: new THREE.Color(0xff00dd) },
        },
        vertexShader: `
            varying vec2 vUv;
        
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec2 gamma;
            uniform sampler2D positionTexture;
            uniform sampler2D colorTexture;
            uniform sampler2D noiseTexture;
            uniform sampler2D depthOfFieldTexture;
            uniform sampler2D fogTexture;
            uniform vec2 nearFar;
            uniform vec2 enabled;
                
            void main() {
              float minSeparation = 1.0;
              float maxSeparation = 1.0;
              float minDistance   = 1.5;
              float maxDistance   = 2.0;
              float noiseScale    = 1.0;
              int   size          = 1;
              vec3  colorModifier = vec3(0.522, 0.431, 0.349);
            
              colorModifier = pow(colorModifier, vec3(gamma.x));
            
              float near = nearFar.x;
              float far  = nearFar.y;
            
              vec2 fragCoord = gl_FragCoord.xy;
            
              vec2 texSize   = textureSize(colorTexture, 0);
              vec2 texCoord  = fragCoord / texSize;
            
              vec4  color        = texture2D(colorTexture,        texCoord);
              float depthOfField = texture2D(depthOfFieldTexture, texCoord).r;
              float fog          = texture2D(fogTexture,          texCoord).a;
            
              if (enabled.x != 1.0) { gl_FragColor = color; return; }
            
              vec4 fragColor = vec4(0.0);
            
              vec2 noise  = texture2D(noiseTexture, fragCoord / textureSize(noiseTexture, 0)).rg;
                   noise  = noise * 2.0 - 1.0;
                   noise *= noiseScale;
            
              texCoord = (fragCoord - noise) / texSize;
            
              vec4 position     = texture2D(positionTexture, texCoord);
              vec4 positionTemp = position;
            
              if (position.a <= 0.0) { position.y = far; }
            
              float depth =
                clamp
                  (   1.0
                    - ( (far - position.y)
                      / (far - near)
                      )
                  , 0.0
                  , 1.0
                  );
            
              float separation = mix(maxSeparation, minSeparation, depth);
              float count      = 1.0;
              float mx         = 0.0;
            
              for (int i = -size; i <= size; ++i) {
                for (int j = -size; j <= size; ++j) {
                  texCoord =
                      (vec2(i, j) * separation + (fragCoord + noise))
                    / texSize;
            
                  positionTemp =
                    texture2D
                      ( positionTexture
                      , texCoord
                      );
            
                  if (positionTemp.y <= 0.0) { positionTemp.y = far; }
            
                  mx = max(mx, abs(position.y - positionTemp.y));
            
                  depthOfField =
                    max
                      ( texture2D
                          ( depthOfFieldTexture
                          , texCoord
                          ).r
                      , depthOfField
                      );
            
                  fog +=
                    texture2D
                      ( fogTexture
                      , texCoord
                      ).a;
            
                  count += 1.0;
                }
              }
            
              depthOfField = 1.0 - clamp(depthOfField, 0.0, 1.0);
              fog          = 1.0 - clamp(fog / count,  0.0, 1.0);
              float diff   = smoothstep(minDistance, maxDistance, mx) * depthOfField * fog;
            
              texCoord = fragCoord / texSize;
            
              vec3 lineColor  = texture(colorTexture, texCoord).rgb;
                   lineColor *= colorModifier;
            
              fragColor.rgb = mix(color.rgb, lineColor, clamp(diff, 0.0, 1.0));
              fragColor.a   = 1.0;
            }
        `,
        transparent: false,
        depthWrite: false,
        side: THREE.DoubleSide
    });
}
export {
    linearGradientShader,
    shadowShader,
    glowMaterial,
    glowMaterial2,
    glowMaterial3,
    shadowMaterial,
    bloomMaterial,
    blurMaterial
}