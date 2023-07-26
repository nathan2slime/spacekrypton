
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Viewer } from '../init';
import { Vector2 } from 'three';


function PostScene(viewer: Viewer) {
    //render pass
    const renderScene = new RenderPass(viewer.scene, viewer.camera);
    const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);

    bloomPass.threshold = .35;
    bloomPass.strength = 1.5;
    bloomPass.radius = 1.;

    viewer.composer.addPass(renderScene);
    viewer.composer.addPass(bloomPass);
}

export { PostScene }