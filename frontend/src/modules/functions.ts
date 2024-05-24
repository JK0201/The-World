import { Object3D, WebGLRenderer } from 'three';
import {
  cameraPosition,
  cm,
  contents,
  destinationPoint,
  getMenuOpen,
  getTabClosed,
  getTouched,
  getWatchedDistanceX,
  getWatchedDistanceZ,
  meshes,
  mouse,
  sections,
  setTabClosed,
  setTouched,
  setWatchedDistanceX,
  setWatchedDistanceZ,
  spots,
} from './common';
import { player } from '../main';
import gsap from 'gsap';

/**
 * @param renderer
 * Resize (depends on browser size)
 */
const setViewportHeight = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const setSize = (renderer: WebGLRenderer) => {
  cm.camera.left = -(window.innerWidth / window.innerHeight);
  cm.camera.right = window.innerWidth / window.innerHeight;
  cm.camera.top = 1;
  cm.camera.bottom = -1;

  cm.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(cm.scene, cm.camera);
};

/**
 * @param e
 * Update Coodinates
 */
const updateCoordinates = (e: MouseEvent | Touch) => {
  if (cm.canvas instanceof HTMLCanvasElement) {
    mouse.x = (e.clientX / cm.canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / cm.canvas.clientHeight) * 2 - 1);
  }
};

/**
 * Raycasting
 */
const raycasting = () => {
  cm.raycaster.setFromCamera(mouse, cm.camera);
  const intersects = cm.raycaster.intersectObjects(meshes);
  for (const item of intersects) {
    if (item.object.name === 'floor') {
      destinationPoint.x = item.point.x;
      destinationPoint.y = 0.7;
      destinationPoint.z = item.point.z;

      if (!getTouched() && !getMenuOpen()) {
        player.mesh.lookAt(destinationPoint);
        player.moving = true;
      }
    }
    break;
  }
};

//Actions
/**
 * Moving
 */
const isMoving = (delta: number) => {
  let speedX: number;
  let speedZ: number;
  let walkDistanceX = destinationPoint.x - player.mesh.position.x;
  let walkDistanceZ = destinationPoint.z - player.mesh.position.z;
  let angle = Math.atan2(walkDistanceZ, walkDistanceX);
  let cameraX = cameraPosition.x + player.mesh.position.x;
  let cameraZ = cameraPosition.z + player.mesh.position.z;

  if (delta < 0.012) {
    speedX = Math.cos(angle) * 0.05;
    speedZ = Math.sin(angle) * 0.05;
  } else {
    speedX = Math.cos(angle) * 0.13;
    speedZ = Math.sin(angle) * 0.13;
  }

  player.mesh.position.x += speedX;
  player.mesh.position.z += speedZ;
  cm.camera.position.set(cameraX, cm.camera.position.y, cameraZ);

  player.actions[0].stop();
  player.actions[1].play();

  if (Math.abs(walkDistanceX) < 0.05 && Math.abs(walkDistanceZ) < 0.05) {
    player.moving = false;
  }

  detectObject();
};

/**
 * Detecting Object
 */
const detectObject = () => {
  spots.forEach((item) => {
    let spotDistanceX = item.mesh.position.x - player.mesh.position.x;
    let spotDistanceZ = item.mesh.position.z - player.mesh.position.z;
    let resetDistanceX = getWatchedDistanceX() - player.mesh.position.x;
    let resetDistanceZ = getWatchedDistanceZ() - player.mesh.position.z;
    let spotObject = item.spotObject.mesh;

    if (getTabClosed()) {
      if (Math.abs(resetDistanceX) > 0.5 && Math.abs(resetDistanceZ) > 0.5) setTabClosed(false);
      return;
    }

    if (Math.abs(spotDistanceX) < 0.5 && Math.abs(spotDistanceZ) < 0.5) {
      player.moving = false;
      setTouched(true);
      gsap.to(cm.camera.position, {
        duration: 1,
        x: spotObject.position.x,
        y: spotObject.position.y,
        z: spotObject.position.z,
      });
      player.mesh.lookAt(spotObject.position.x, player.mesh.position.y, spotObject.position.z);
      setWatchedDistanceX(item.mesh.position.x);
      setWatchedDistanceZ(item.mesh.position.z);

      const sectionNumber: number = parseInt(item.name);
      sections[sectionNumber].style.display = 'block';
      if (!item.touchdown) {
        item.touchdown = true;
        firstTouchDown(spotObject, sectionNumber);
      } else {
        setTimeout(() => {
          showComponent(sectionNumber);
        }, 1000);
      }
    }
  });
};

/**
 * @param spotObject
 * @param name
 * First touchdown on spot + object
 */
const firstTouchDown = (spotObject: Object3D, sectionNumber: number) => {
  setTimeout(() => {
    spotObject.visible = true;
    gsap.to(spotObject.position, {
      duration: 1,
      y: -spotObject.position.y,
      ease: 'Bounce.easeOut',
      onComplete: () => {
        showComponent(sectionNumber);
      },
    });
  }, 1000);
};

/**
 * @param name
 * Show components (HTML sections)
 */
const showComponent = (sectionNumber: number) => {
  sections[sectionNumber].classList.add('show');
  setTimeout(() => {
    contents[sectionNumber].classList.add('show-content');
  }, 300);
};

/**
 * @param item
 * @param sectionNumber
 * Close components (HTML sectoins)
 */
const closeComponent = (sectionNumber: number) => {
  setTabClosed(true);
  gsap.to(cm.camera.position, {
    duration: 1,
    x: cameraPosition.x + player.mesh.position.x,
    y: cameraPosition.y,
    z: cameraPosition.z + player.mesh.position.z,
  });
  player.mesh.lookAt(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z);
  contents[sectionNumber].classList.remove('show-content');
  sections[sectionNumber].classList.remove('show');
  setTimeout(() => {
    sections[sectionNumber].scrollTop = 0;
    sections[sectionNumber].style.display = 'none';
    setTouched(false);
  }, 1000);
};

export { setViewportHeight, setSize, updateCoordinates, raycasting, isMoving, closeComponent };
