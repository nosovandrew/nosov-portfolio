import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import gsap from 'gsap';
import WheelIndicator from 'wheel-indicator';

// bloom effect code
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';
// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

import { PROJECTS } from 'src/lib/data/projects';
import currProjectStore from 'src/lib/stores/currProject';
import uiStateStore from 'src/lib/stores/uiState';
import { setWheelIndicator } from 'src/lib/stores/wheelIndicator';
import { isMobileScreen } from 'src/lib/helpers/getScreenSize';

// <<< Create main players >>>

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
let renderer;

// bloom effect code
// let composer;
// let bloomPass;

// <<< Other variables >>>

const OBJECTS_DISTANCE = 10;
const SHIFT_DURATION = 1;
const SHIFT_DURATION_MS = SHIFT_DURATION * 1000;
const loadedProjects = []; // projects with loaded gltf obj
let currModelIdx = 0; // current model index
let isScrollAllowed; // variable for controlling scrolling possibility
let isInfoVsbl; // variable for controlling whether project info is visible or not
uiStateStore.subscribe((state) => {
    isScrollAllowed = state.isScrollAllowed
    isInfoVsbl = state.isInfoVsbl
}); // sinc with store

// <<< Set camera on default position >>>

const defaultCameraPosition = {
    x: 0,
    y: 0.5,
    z: 6,
};

camera.position.x = defaultCameraPosition.x;
camera.position.y = defaultCameraPosition.y;
camera.position.z = defaultCameraPosition.z;

// <<< Set up bg of scene >>>

const addBgColor = () => {
    scene.background = new THREE.Color(0x000000);
};

// <<< Load models >>>

const loadProjectModels = async (projects) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);
    // load models
    const [...loaded] = await Promise.all(
        // return project with gltf here
        projects.map(async (item) => ({
            ...item,
            model: await loader.loadAsync(item.modelPath),
        })),
    );

    // add latest project in view
    currProjectStore.set(loaded[0]);

    // save projects with loaded gltf obj in variable   
    loadedProjects.push(...loaded);
};

// <<< Add models to the scene >>>

const addModelsToScene = () => {

    // this function hard code additional settings to loaded models then add them to scene

    // init common code

    const loadMatcapHelper = (target, matcapPath, ...restMaterialProps) => {
        const matcap = textureLoader.load(matcapPath);
        target.children.forEach((child) => {
            child.material = new THREE.MeshMatcapMaterial({
                matcap,
                ...restMaterialProps,
            });
        })
    }

    const rotateModelHelper = (target, anglesArray) => {
        target.rotateX(anglesArray[0]);
        target.rotateY(anglesArray[1]);
        target.rotateZ(anglesArray[2]);
    }

    const placeModelHelper = (target, coordsArray) => {
        target.position.x = coordsArray[0];
        target.position.y = coordsArray[1];
        target.position.z = coordsArray[2];
    }

    // going through models

    loadedProjects.forEach((p, pIdx) => {
        const target = p.model.scene;

        switch (p.id) {
            case '669185f002e51cca45001ac8':
                // lego
                loadMatcapHelper(target, 'assets/matcaps/mix512.png');

                break;
            case '6703f00ea97e742c1081427d':
                // ethereum
                loadMatcapHelper(target, 'assets/matcaps/chromium512.png');
                rotateModelHelper(target, [0.15, 0, 0]);

                break;
            case '6703f018168b0fdc9fa8ade2':
                // zavod

                if (isMobileScreen()) {
                    target.scale.set(0.5, 0.5, 0.5);
                }

                const zavodMapTexture = textureLoader.load('assets/normals/concreteNormal512.jpg');
                zavodMapTexture.wrapS = THREE.RepeatWrapping;
                zavodMapTexture.wrapT = THREE.RepeatWrapping;
                // zavodMapTexture.repeat.set(2, 2);

                const zavodHdrEquirect = new RGBELoader().load(
                    "assets/envs/aircraft_workshop_01_1k.hdr",
                    () => {
                        zavodHdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
                    }
                );

                const zavodMaterial = new THREE.MeshPhysicalMaterial({
                    roughness: 0.05,
                    transmission: 0.1,
                    thickness: 1,
                    metalness: 0.8,
                    envMap: zavodHdrEquirect,
                    normalMap: zavodMapTexture,
                    clearcoatNormalScale: zavodMapTexture,
                    clearcoatNormalScale: new THREE.Vector2(0.3),
                });

                target.children.forEach((child) => {
                    child.material = zavodMaterial;
                })

                break;
            default:
                console.log(`Project with id ${p.id} not handled by addModelsToScene function.`)
                break;
        }

        // place at a distance along the z axis
        target.position.z = -OBJECTS_DISTANCE * pIdx;

        // set initial opacity
        p.model.scene.traverse((object) => {
            if (object.material) {
                object.material.transparent = true;
                object.material.opacity = pIdx === currModelIdx ? 1 : 0;
            }
        });

        scene.add(target);
    });
};

// <<< Add base light >>>

const addLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
};

// <<< Handle interaction with models >>>

// disabele scroll/swipe models
const disableScroll = () => {
    uiStateStore.set('isScrollAllowed', false);
};

// enable scroll/swipe models
const enableScroll = () => {
    uiStateStore.set('isScrollAllowed', true);
};

// check if bound is crossed
const checkBound = (idx) => {
    if (idx > loadedProjects.length - 1) {
        return 1; // upper bound
    } else if (idx < 0) {
        return -1; // lower bound
    } else {
        return false; // not crossed
    }
};

const shiftModels = (direction, currIdx) => {
    if (!direction) return; // don't shift if no scroll event

    // moving models
    loadedProjects.forEach((p, pIdx) => {
        // position
        gsap.to(p.model.scene.position, {
            z: `${direction > 0 ? '-' : '+'}=${OBJECTS_DISTANCE}`,
            duration: SHIFT_DURATION,
        });

        // change opacity only for curr and next models
        if (pIdx === currIdx || pIdx === currIdx + direction) {

            p.model.scene.traverse((object) => {
                if (object.material) {
                    gsap.to(object.material, {
                        // transparent: pIdx === currIdx ? false : true,
                        opacity: pIdx === currIdx ? 1 : 0,
                        duration: SHIFT_DURATION / 4,
                    });
                }
            });
        }
    });

    // upd current project ui
    currProjectStore.set(loadedProjects[currIdx]);

    // wait for shifting are complete, then allow scrolling
    setTimeout(() => {
        enableScroll();
    }, SHIFT_DURATION_MS);
};

const handleScroll = (sd) => {
    // sd — Scroll Direction
    if (sd && isScrollAllowed) {
        const nextModelIdx = sd > 0 ? currModelIdx - 1 : currModelIdx + 1; // get next model idx
        // don't shift if bound is reached
        const bound = checkBound(nextModelIdx);
        if (bound) {
            return;
        }
        currModelIdx = nextModelIdx; // upd current model idx
        disableScroll(); // disable scrolling models
        shiftModels(sd, currModelIdx); // animated scroll to next model
    }
};

const attachScrollHandler = (canvasEl) => {

    // desktop scroll

    /**
     * here there is an issue with inertia scrolling on macos
     * usefull link: https://stackoverflow.com/questions/26326958/stopping-mousewheel-event-from-happening-twice-in-osx/26453611
     */

    const wi = new WheelIndicator({
        elem: window,
        callback: (e) => {
            // if info is visible -> disable scrolling models, enable default scroll of page
            if (isInfoVsbl) {
                wi.turnOff();

                return;
            }

            if (!isScrollAllowed) {
                return;
            }

            const sd = e.direction === 'up' ? 1 : -1;
            handleScroll(sd);
        },
    });

    setWheelIndicator(wi); // save wi in store for managing from outside 

    // mobile scroll

    let ts; // variable for touch start coords
    window.addEventListener('touchstart', (e) => {
        if (!isScrollAllowed) {
            return;
        }
        ts = e.changedTouches[0].clientY; // get touch start coords
    });

    window.addEventListener('touchend', (e) => {
        if (!isScrollAllowed) {
            return;
        }
        const te = e.changedTouches[0].clientY; // get touch end coords
        const delta = te - ts; // calc delta for detecting direction
        if (delta === 0) {
            return;
        } else if (delta > 0) {
            // Swiping to prev
            handleScroll(1);
        } else {
            // Swiping to next
            handleScroll(-1);
        }
    });
};

// <<< Animate scene >>>

const animate = () => {
    // permanent rotation for model on screen

    const elapsedTime = clock.getElapsedTime(); // time of viewport in scope

    loadedProjects.forEach((p, pIdx) => {
        const target = p.model.scene;

        if (pIdx === currModelIdx) {
            gsap.to(target.rotation, {
                delay: 0,
                duration: 25,
                // x: '+=' + Math.sin(elapsedTime) * 0.5,
                y: '+=' + Math.cos(elapsedTime) * 0.5,
            });
        }
    });

    // render scene
    renderer.render(scene, camera);
    // bloom effect code
    // composer.render();

    requestAnimationFrame(animate);
};

// <<< Resize scene >>>


const resize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);

    // bloom effect code
    // bloomPass.resolution.set(viewportWidth, viewportHeight);
    // composer.setPixelRatio(viewportWidth / viewportHeight);
    // composer.setSize(viewportWidth, viewportHeight);
};

// <<< Create scene (ROOT FUNC) >>>

export const createScene = async (canvasEl) => {
    renderer = new THREE.WebGLRenderer({
        // uncomment to make transparent bg
        // alpha: true,
        antialias: true,
        canvas: canvasEl,
    });

    // bloom effect code
    // const renderPass = new RenderPass(scene, camera);
    // bloomPass = new UnrealBloomPass(
    //     new THREE.Vector2(window.innerWidth, window.innerHeight),
    //     0.25,
    //     0.1,
    //     0.5
    // );
    // composer = new EffectComposer(renderer);
    // composer.addPass(renderPass);
    // composer.addPass(bloomPass);

    resize();
    await loadProjectModels(PROJECTS);
    addModelsToScene();
    addBgColor();
    addLight();
    attachScrollHandler(canvasEl);
    animate();

    // handle resize only for desktops
    if (!isMobileScreen()) {
        // sync scene size with window
        window.addEventListener('resize', resize);
    }
};

// <<< 3D effects >>>

export const moveCameraForProjectInfo = (position) => {
    if (!position) {
        gsap.to(camera.position, {
            ...defaultCameraPosition,
            duration: 0.5,
        });
    } else {
        gsap.to(camera.position, {
            ...position,
            duration: 0.5,
        });
    }
};