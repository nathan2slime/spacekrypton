uniform sampler2D base;
uniform sampler2D _texture;
uniform vec3 color;

varying vec2 vUv;

varying vec3 vposO;
varying vec3 vposW;
varying vec3 vposW1;
varying vec3 vNormalW;


void main(void){
    vec4 g = texture2D(base, vUv);
    vec4 base0 = texture2D(_texture, vUv);

    float g1 = sin(vposW1.z - 1.5);
    vec3 c =  color / 255.;

    vec2 st = fract(vUv * 200.);
    float d = distance(vec2(.5), st);
    d = step(.1, d);

    vec3 balls = (vec3(1.-d) * base0.rgb);

    vec3 viewDirectionW = normalize(cameraPosition - vposW);
    float fresnelTerm = dot(viewDirectionW, vNormalW) * 1.5;
    fresnelTerm = clamp(1. - fresnelTerm, 0., 1.);
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(100. * (balls + g.rgb) *g1 * (fresnelTerm +.95) * c, (balls.g + g.g) * base0.r);
    gl_FragColor = vec4(c,  (balls.g + g.g) * base0.r);
}