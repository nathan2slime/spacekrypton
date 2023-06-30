uniform sampler2D base;
uniform sampler2D _texture;
uniform vec3 color;

varying vec2 vUv;

varying vec3 vposO;
varying vec3 vposW;
varying vec3 vNormalW;
void main(void){

    vec4 tex = texture2D(_texture, vUv);
    float hologram = sin(vposO.y * 600.);
    
    vec3 viewDirectionW = normalize(cameraPosition - vposW);
    
    float fresnelTerm = dot(viewDirectionW, vNormalW) * 1.1;
    fresnelTerm = clamp(.6 - fresnelTerm, 0., 1.);
    float alpha = tex.r * hologram * fresnelTerm;

    if(alpha < .1)
        discard;

    // vec3 c =  vec3(0., 242., 235.) / 255.;
    vec3 c =  color / 255.;

    float alpha1 = smoothstep(0., 1.05-fresnelTerm, .4);
    gl_FragColor = vec4(tex.rgb * c, tex.r * .2);
    gl_FragColor = vec4(c, tex.r * alpha1 * (1.05-fresnelTerm)) ;
}