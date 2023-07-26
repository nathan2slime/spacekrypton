uniform sampler2D base;
uniform sampler2D _texture;
uniform vec3 strokeColor;
uniform vec3 atmosphereColor;
uniform float alpha;
uniform float ballDensity;
uniform float radius;

//GUI INTERFACE
uniform float fresn;

in vec2 vuv;

in vec3 pO;
in vec3 pW;
in vec3 nO;
in vec3 nW;
in vec3 viewDir;

out vec4 fg;

float size = .18;

float points(vec2 uv){
    return distance(uv, vec2(0.5));
}
float triplanar(){

    vec2 uvTop = (vec2(pO.x, pO.z) ) * size; 
    vec2 uvFront = (vec2(pO.x, pO.y)) * size;
    vec2 uvSide = (vec2(pO.z, pO.y)) * size;

   
    float nTop = points(fract(uvTop * ballDensity));
    nTop = step(nTop, radius);

    float nFront = points(fract(uvFront * ballDensity));
    nFront = step(nFront, radius);

    float nSide = points(fract(uvSide * ballDensity));
    nSide = step(nSide, radius);

    float top = (nO.y);
    top = abs(top);
    float p = .32;
    top = smoothstep(p, 1., top) * nTop;

    float side = abs(nO.x);
    side = smoothstep(p, 1., side) * nSide;
    
    float front = abs(nO.z);
    front = smoothstep(p, 1., front) * nFront;
    
    return front + side + top;
    // return side + front + top;
}

void main()
{
    vec2 newUv = vec2(vuv.x, 1. - vuv.y);
    vec4 stroke = texture2D(base, newUv);
    vec4 mapMask = texture2D(_texture, newUv);
    
    // FRESNEL
    float fresnelTerm = dot(viewDir, nW) * fresn;
    fresnelTerm = 1. - fresnelTerm;
    fresnelTerm = clamp(fresnelTerm, 0. , 1.);

    float strokeMin = 1. - step(stroke.g, .85);

    float res = triplanar();

    float ballMask = mapMask.g * res;

    fg = vec4((strokeColor * strokeMin * 2.) + (fresnelTerm * atmosphereColor) + (ballMask * atmosphereColor * 2.), alpha);
}
