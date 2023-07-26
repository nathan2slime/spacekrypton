import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Viewer {
  renderer: THREE.WebGLRenderer;
  container: HTMLElement | Element;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  aspectRatio: number;
  composer: any;

  constructor(container: HTMLElement | Element) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.composer = new EffectComposer(this.renderer);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.renderer.setSize(
      innerWidth,
      innerHeight,
    );
    this.composer.setSize(
      innerWidth,
      innerHeight,
    );
    // this.renderer.autoClear = false;

    this.container.appendChild(this.renderer.domElement);
    this.aspectRatio = innerWidth / innerHeight;

    //camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbfe3dd);

    this.scene.fog = new THREE.Fog(0xffffff, 0.25, 3);

    this.camera = new THREE.PerspectiveCamera(45, this.aspectRatio, 0.01, 100);
    this.camera.position.set(0, 0, 10);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = true;
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 0);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = .5;
    
  }
  update() {
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
    this.controls.update();
  }
}
