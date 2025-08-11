import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import gsap from 'gsap';
import WheelIndicator from 'wheel-indicator';

import { PROJECTS } from 'src/lib/data/projects';
import currProjectStore from 'src/lib/stores/currProject';
import uiStateStore from 'src/lib/stores/uiState';
import { setWheelIndicator, turnOffWheelIndicator } from 'src/lib/stores/wheelIndicator';
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

// <<< Other variables >>>

const OBJECTS_DISTANCE = 10;
const SHIFT_DURATION = 1;
const SHIFT_DURATION_MS = SHIFT_DURATION * 1000;
const loadedProjects = []; // projects with loaded gltf obj
let currModelIdx = 0; // current model index
let isScrollAllowed; // variable for controlling scrolling possibility
let isInfoVsbl; // variable for controlling whether project info is visible or not
let isMainCanvasVsbl; // variable for checking is canvas visible on screen
uiStateStore.subscribe((state) => {
    isScrollAllowed = state.isScrollAllowed;
    isInfoVsbl = state.isInfoVsbl;
    isMainCanvasVsbl = state.isMainCanvasVsbl;
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

    const setupMatcapHelper = (target, matcapPath, ...restMaterialProps) => {
        const matcap = textureLoader.load(matcapPath);
        target.children.forEach((child) => {
            child.material = new THREE.MeshMatcapMaterial({
                matcap,
                ...restMaterialProps,
            });
        })
    }

    const setupPhysicalMatcapHelper = ({ mapTextureSrc, hdrEquirectSrc, materialOptions, target }) => {
        let mapTexture = undefined;
        let hdrEquirect = undefined;

        // material optqions sample
        // {
        //     roughness: 0.05,
        //     transmission: 0.1,
        //     thickness: 1,
        //     metalness: 0.8,
        //     envMap: zavodHdrEquirect,
        //     normalMap: zavodMapTexture,
        //     clearcoatNormalScale: zavodMapTexture,
        //     clearcoatNormalScale: new THREE.Vector2(0.3),
        // }

        if (mapTextureSrc) {
            mapTexture = textureLoader.load(mapTextureSrc);
            mapTexture.wrapS = THREE.RepeatWrapping;
            mapTexture.wrapT = THREE.RepeatWrapping;
        }

        if (hdrEquirectSrc) {
            hdrEquirect = new RGBELoader().load(hdrEquirectSrc, () => {
                hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
            });
        }

        const material = new THREE.MeshPhysicalMaterial({
            envMap: hdrEquirect,
            normalMap: mapTexture,
            clearcoatNormalScale: mapTexture,
            ...materialOptions,
        });

        target.children.forEach((child) => {
            child.material = material;
        })
    }

    // going through models

    loadedProjects.forEach((p, pIdx) => {
        const target = p.model.scene;

        switch (p.id) {
            case '669185f002e51cca45001ac8':
                // NickMikhalevPortfolio

                // const rectLight1 = new THREE.RectAreaLight(0xf018e5, 15, 5, 5);
                // rectLight1.position.set(3, 3, 0);
                // rectLight1.lookAt(0, 0, 0);
                // scene.add(rectLight1)

                // const rectLight2 = new THREE.RectAreaLight(0x9cfff0, 5, 5, 5);
                // rectLight2.position.set(-3, -3, 0);
                // rectLight2.lookAt(0, 0, 0);
                // scene.add(rectLight2)

                // const rectLightHelper1 = new RectAreaLightHelper(rectLight1);
                // rectLight1.add(rectLightHelper1);

                // const rectLightHelper2 = new RectAreaLightHelper(rectLight2);
                // rectLight2.add(rectLightHelper2);

                setupMatcapHelper(target, 'assets/matcaps/metal_7.png');

                break;
            case '6703f00ea97e742c1081427d':
                // CryptoExchange

                if (isMobileScreen()) {
                    target.scale.set(0.8, 0.8, 0.8);
                }

                setupMatcapHelper(target, 'assets/matcaps/metal_1.png');

                break;
            case '6703f018168b0fdc9fa8ade2':
                // Zavod

                target.scale.set(0.85, 0.85, 0.85);

                if (isMobileScreen()) {
                    target.scale.set(0.5, 0.5, 0.5);
                }

                setupMatcapHelper(target, 'assets/matcaps/metal_3.png');

                break;
            case '67751724f221cdc27d554560':
                // EightiesBagDrop

                target.scale.set(0.75, 0.75, 0.75);

                if (isMobileScreen()) {
                    target.scale.set(0.5, 0.5, 0.5);
                }

                setupMatcapHelper(target, 'assets/matcaps/metal_2.png');

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
            // if main canvas is not visible OR if info is visible -> disable scrolling models, enable default scroll of page
            if (!isMainCanvasVsbl || isInfoVsbl) {
                turnOffWheelIndicator();

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
        } else {
            gsap.killTweensOf(target.rotation); // prevent unexpected rotation
        }
    });

    // render scene
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
};

// <<< Resize scene >>>


const resize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    camera.aspect = viewportWidth / viewportHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(viewportWidth, viewportHeight);
};

// <<< Create scene (ROOT FUNC) >>>

export const createScene = async (canvasEl) => {
    renderer = new THREE.WebGLRenderer({
        // uncomment to make transparent bg
        // alpha: true,
        antialias: true,
        canvas: canvasEl,
    });

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