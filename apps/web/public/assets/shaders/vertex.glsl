precision mediump float;

uniform sampler2D base;
uniform float time;
uniform sampler2D _texture;
varying vec2 vUv;
varying vec3 vposO;
varying vec3 vposW;
varying vec3 vposW1;
varying vec3 vNormalW;

void main(void){
    vUv = uv;

    vposO = position.xyz;
    vposW1 = (modelViewMatrix * vec4(vposO, 1.)).xyz;
    vposW = vec3( vec4( position, 1.0 ) * modelMatrix);

    vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));

    gl_Position = projectionMatrix * modelViewMatrix * vec4( vposO, 1.0 );
}