
uniform vec3 atmAtmosphereColor;
uniform float atmFresn;
uniform float time;
uniform float atmAlpha;
uniform float radius;
uniform sampler2D base;
uniform sampler2D _texture;

in vec3 viewDir;
in vec2 vuv;
in vec3 pO;
in vec3 pW;
in vec3 nO;
in vec3 nW;


out vec4 fg;
void main(){
    // FRESNEL
    float fresnelTerm = dot(viewDir, nW) * atmFresn;
    fresnelTerm = 1. - fresnelTerm;
    fresnelTerm = clamp(fresnelTerm, 0. , 1.);
    vec4 map = texture2D(_texture, vec2(vuv.x, ( 1. - vuv.y)));
    float l = sin((pO.y + time * -.02 )* 300.);
    fg = vec4( fresnelTerm * atmAtmosphereColor * map.g, atmAlpha * fresnelTerm * l );
}