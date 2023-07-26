precision mediump float;

uniform sampler2D _texture;
uniform sampler2D base;
uniform float time;

out vec2 vuv;
out vec3 pO;
out vec3 pW;
out vec3 nW;
out vec3 nO;
out vec3 viewDir;


void main(void){
    viewDir = normalize(cameraPosition - position);
    vuv = uv;

    pO = position;
    pW = (modelViewMatrix * vec4(pO, 1.)).xyz;

    nW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ));
    nO = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pO, 1.0 );
}