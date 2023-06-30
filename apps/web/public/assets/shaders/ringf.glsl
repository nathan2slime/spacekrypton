uniform vec3 color;

void main(void){
    // vec3 c =  vec3(1., 242., 235.) / 255.;
    vec3 c =  color / 255.;

    gl_FragColor = vec4(c,1.);
}