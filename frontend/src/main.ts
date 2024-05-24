import * as THREE from 'three';
import {
  cameraPosition,
  closeBtn,
  cm,
  color,
  p_count,
  getIsPressed,
  getMenuOpen,
  getTouched,
  p_langBox,
  p_language,
  menu,
  menuOptions,
  previewImg,
  setIsPressed,
  p_content,
  postingBtn,
  adminList,
  updateImg,
  u_count,
  u_language,
  u_langBox,
  u_content,
  updatingBtn,
  adminPostingBtn,
  adminPrevBtn,
  sound,
  adminChkBtn,
  adminCancleBtn,
  p_imgSelector,
  u_imgSelector,
  aboutLink,
  dropDown,
  projectNavi,
  studyNavi,
  copyRight,
} from './modules/common';
import { Floor } from './modules/meshes/Floor';
import * as elem from './modules/elements';
import * as fn from './modules/functions';
import * as carousel from './modules/carousel';
import { Player } from './modules/meshes/Player';
import { Spot } from './modules/meshes/Spot';
import { Direction } from './modules/meshes/Direction';
import { Wall } from './modules/meshes/Wall';
import { Background } from './modules/meshes/Background';
import { Doodle } from './modules/meshes/Doodle';

//api test
elem.initWorld();

//Renderer
let renderer: THREE.WebGLRenderer;
if (cm.canvas instanceof HTMLCanvasElement) {
  renderer = new THREE.WebGLRenderer({
    canvas: cm.canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

//Camera
cm.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
cm.camera.zoom = 0.15;
// cm.camera.zoom = 0.05;
cm.camera.updateProjectionMatrix();

//Light;
//0.75
const ambientLight = new THREE.AmbientLight(color.defaultLight, 1.5);
//1
const directionalLight = new THREE.DirectionalLight(color.defaultLight, 1);
directionalLight.position.set(1, 2, 1);

//Shadow
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.right = 100;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.near = -100;
directionalLight.shadow.camera.far = 100;

//Mesh
new Floor({ name: 'floor', z: 10 });
new Background({ name: 'background' });
const player = new Player({ name: 'player', y: 0.7 });

new Wall({ name: 'wall', x: 0, z: -5 });
new Wall({ name: 'wall', x: 0, z: 25 });
new Wall({ name: 'wall', x: -15, z: 10, rotationY: Math.PI / 2 });
new Wall({ name: 'wall', x: 15, z: 10, rotationY: Math.PI / 2 });

//Only requires x and z coordinates for Object
new Spot({ name: '0', x: 8, z: 8 });
new Spot({ name: '1', x: 4, z: 18 });
new Spot({ name: '2', x: -4, z: 12.5 });
new Spot({ name: '3', x: -10, z: 0 });

new Direction({ name: 'direction0', x: 3.5, z: 3.5 });
new Direction({ name: 'direction1', x: 7, z: 12 });
new Direction({ name: 'direction2', x: -0.5, z: 16.5 });

new Doodle({ name: 'water', x: 2, z: 10, width: 5, height: 7 });
new Doodle({ name: 'sky', x: 10, z: -1, width: 7, height: 4 });

//Scene
cm.scene.add(cm.camera, ambientLight, directionalLight);

//Draw
const clock = new THREE.Clock();
function draw() {
  const delta = clock.getDelta();
  if (player.mixer) player.mixer.update(delta);

  if (player.mesh) {
    if (!getTouched()) cm.camera.lookAt(player.mesh.position);
    if (getIsPressed()) fn.raycasting();

    //Actions
    if (player.moving && !getTouched() && !getMenuOpen()) {
      fn.isMoving(delta);
    } else {
      player.actions[1].stop();
      player.actions[0].play();
    }
  }
  renderer.render(cm.scene, cm.camera);
  renderer.setAnimationLoop(draw);
}

//Events
//Load
window.addEventListener('load', () => {
  fn.setViewportHeight();
  fn.setSize(renderer);
});

//Resize
window.addEventListener('resize', () => {
  fn.setViewportHeight();
  fn.setSize(renderer);
});

//Mouse & Touch
if (cm.canvas instanceof HTMLCanvasElement) {
  cm.canvas.addEventListener('mousedown', (e) => {
    setIsPressed(true);
    fn.updateCoordinates(e);
  });

  cm.canvas.addEventListener('mouseup', () => {
    setIsPressed(false);
  });

  cm.canvas.addEventListener('mousemove', (e) => {
    if (getIsPressed()) fn.updateCoordinates(e);
  });

  cm.canvas.addEventListener('touchstart', (e) => {
    setIsPressed(true);
    fn.updateCoordinates(e.touches[0]);
  });

  cm.canvas.addEventListener('touchend', () => {
    setIsPressed(false);
  });

  cm.canvas.addEventListener('touchmove', (e) => {
    if (getIsPressed()) fn.updateCoordinates(e.touches[0]);
  });
}

//Toggle Menu-Bar
menu.addEventListener('click', () => {
  elem.menuController();
});

//Toggle Sound
sound.addEventListener('click', () => {
  elem.soundController();
});

//Menu Selection
menuOptions.forEach((item, sectionNumber) => {
  elem.menuSelected(item, sectionNumber);
});

//Carousel
carousel.s_tab.addEventListener('click', () => {
  carousel.studyTab();
});

carousel.p_tab.addEventListener('click', () => {
  carousel.projectTab();
});

//Portfolio drop-down menu
dropDown.addEventListener('click', () => {
  carousel.dropDownMenu();
});

projectNavi.addEventListener('click', (e) => {
  carousel.moveToElement(e, 'project');
});

studyNavi.addEventListener('click', (e) => {
  carousel.moveToElement(e, 'study');
});

//Project
const closestProjectBox = (e: TouchEvent | MouseEvent) => {
  return (e.target as HTMLDivElement).closest('.project-box');
};

carousel.p_container.addEventListener('touchstart', (e) => {
  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselStart(e);
});

carousel.p_container.addEventListener('touchmove', (e) => {
  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselMove(e, projectBox, 'project');
});

carousel.p_container.addEventListener('touchend', (e) => {
  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselEnd(projectBox, 'project');
});

carousel.p_container.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const infoScroll = (e.target as HTMLDivElement).closest('.project-info');
  if (infoScroll) return;

  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselStart(e);
});

carousel.p_container.addEventListener('mousemove', (e) => {
  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselMove(e, projectBox, 'project');
});

carousel.p_container.addEventListener('mouseup', (e) => {
  const projectBox = closestProjectBox(e);
  if (projectBox) carousel.carouselEnd(projectBox, 'project');
});

//Study
const closestStudyBox = (e: TouchEvent | MouseEvent) => {
  return (e.target as HTMLDivElement).closest('.study-box');
};

carousel.s_container.addEventListener('touchstart', (e) => {
  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselStart(e);
});

carousel.s_container.addEventListener('touchmove', (e) => {
  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselMove(e, studyBox, 'study');
});

carousel.s_container.addEventListener('touchend', (e) => {
  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselEnd(studyBox, 'study');
});

carousel.s_container.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const infoScroll = (e.target as HTMLDivElement).closest('.study-info');
  if (infoScroll) return;

  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselStart(e);
});

carousel.s_container.addEventListener('mousemove', (e) => {
  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselMove(e, studyBox, 'study');
});

carousel.s_container.addEventListener('mouseup', (e) => {
  const studyBox = closestStudyBox(e);
  if (studyBox) carousel.carouselEnd(studyBox, 'study');
});

//Carousel Btn
carousel.p_prevBtn.addEventListener('click', () => {
  carousel.prevBtn('project');
});

carousel.s_prevBtn.addEventListener('click', () => {
  carousel.prevBtn('study');
});

carousel.p_nextBtn.addEventListener('click', () => {
  carousel.nextBtn('project');
});

carousel.s_nextBtn.addEventListener('click', () => {
  carousel.nextBtn('study');
});

//Link
aboutLink.forEach((item) => {
  item.addEventListener('click', () => {
    elem.aboutLink(item);
  });
});

document.addEventListener('click', (e) => {
  const linkBtn = (e.target as HTMLDivElement).closest('.link-btn');
  if (linkBtn) carousel.openLink(linkBtn);
});

//Close Sections
closeBtn.forEach((item, sectionNumber) => {
  item.addEventListener('click', () => {
    fn.closeComponent(sectionNumber);
  });
});

//Admin
//List
adminPostingBtn.addEventListener('click', () => {
  elem.posting();
});

adminPrevBtn.addEventListener('click', () => {
  elem.adminPrev();
});

adminList.addEventListener('click', (e) => {
  const deleteBtn = (e.target as HTMLDivElement).closest('#delete-btn');
  const updateBtn = (e.target as HTMLDivElement).closest('#update-btn');
  // if (deleteBtn) elem.deletePosting(deleteBtn);
  if (deleteBtn) elem.openAdminModal('delete', deleteBtn);
  if (updateBtn) elem.updatePosting(updateBtn);
});

//Posting
previewImg.addEventListener('click', () => {
  elem.selectImg('posting');
});

p_imgSelector.addEventListener('change', (e) => {
  elem.changeImg(e, 'posting');
});

p_count.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
  elem.inputCount(e, p_count);
});

p_language.addEventListener('change', (e: Event & { target: HTMLSelectElement }) => {
  elem.selectLang(e, p_langBox);
});

p_langBox.addEventListener('click', (e: MouseEvent) => {
  elem.deleteLang(e, p_langBox);
});

p_content.addEventListener('input', (e: Event & { target: HTMLTextAreaElement }) => {
  elem.inputContent(e, 'posting');
});

postingBtn.addEventListener('click', () => {
  elem.openAdminModal('posting');
});

//Update
updateImg.addEventListener('click', () => {
  elem.selectImg('update');
});

u_imgSelector.addEventListener('change', (e) => {
  elem.changeImg(e, 'update');
});

u_count.addEventListener('change', (e: Event & { target: HTMLInputElement }) => {
  elem.inputCount(e, u_count);
});

u_language.addEventListener('change', (e: Event & { target: HTMLSelectElement }) => {
  elem.selectLang(e, u_langBox);
});

u_langBox.addEventListener('click', (e: MouseEvent) => {
  elem.deleteLang(e, u_langBox);
});

u_content.addEventListener('input', (e: Event & { target: HTMLTextAreaElement }) => {
  elem.inputContent(e, 'update');
});

updatingBtn.addEventListener('click', () => {
  elem.openAdminModal('update');
});

//Admin password
adminChkBtn.addEventListener('click', () => {
  elem.confirmPassword();
});

elem.adminPass.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    elem.confirmPassword();
  }
});

adminCancleBtn.addEventListener('click', () => {
  elem.closeAdminModal();
});

//Copy Right
copyRight.addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=hC29Vt9u6T0');
});

draw();

export { player };
