import * as THREE from 'three';
import { cameraPosition, closeBtn, cm, color, p_count, getIsPressed, getMenuOpen, getTouched, p_langBox, p_language, menu, menuOptions, previewImg, setIsPressed, p_content, postingBtn, adminList, updateImg, u_count, u_language, u_langBox, u_content, updatingBtn, adminPostingBtn, adminPrevBtn, sound, adminChkBtn, adminCancleBtn, p_imgSelector, u_imgSelector, aboutLink, dropDown, projectNavi, studyNavi, copyRight, } from './modules/common';
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
var renderer;
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
var ambientLight = new THREE.AmbientLight(color.defaultLight, 1.5);
//1
var directionalLight = new THREE.DirectionalLight(color.defaultLight, 1);
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
var player = new Player({ name: 'player', y: 0.7 });
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
var clock = new THREE.Clock();
function draw() {
    var delta = clock.getDelta();
    if (player.mixer)
        player.mixer.update(delta);
    if (player.mesh) {
        if (!getTouched())
            cm.camera.lookAt(player.mesh.position);
        if (getIsPressed())
            fn.raycasting();
        //Actions
        if (player.moving && !getTouched() && !getMenuOpen()) {
            fn.isMoving(delta);
        }
        else {
            player.actions[1].stop();
            player.actions[0].play();
        }
    }
    renderer.render(cm.scene, cm.camera);
    renderer.setAnimationLoop(draw);
}
//Events
//Load
window.addEventListener('load', function () {
    fn.setViewportHeight();
    fn.setSize(renderer);
});
//Resize
window.addEventListener('resize', function () {
    fn.setViewportHeight();
    fn.setSize(renderer);
});
//Mouse & Touch
if (cm.canvas instanceof HTMLCanvasElement) {
    cm.canvas.addEventListener('mousedown', function (e) {
        setIsPressed(true);
        fn.updateCoordinates(e);
    });
    cm.canvas.addEventListener('mouseup', function () {
        setIsPressed(false);
    });
    cm.canvas.addEventListener('mousemove', function (e) {
        if (getIsPressed())
            fn.updateCoordinates(e);
    });
    cm.canvas.addEventListener('touchstart', function (e) {
        setIsPressed(true);
        fn.updateCoordinates(e.touches[0]);
    });
    cm.canvas.addEventListener('touchend', function () {
        setIsPressed(false);
    });
    cm.canvas.addEventListener('touchmove', function (e) {
        if (getIsPressed())
            fn.updateCoordinates(e.touches[0]);
    });
}
//Toggle Menu-Bar
menu.addEventListener('click', function () {
    elem.menuController();
});
//Toggle Sound
sound.addEventListener('click', function () {
    elem.soundController();
});
//Menu Selection
menuOptions.forEach(function (item, sectionNumber) {
    elem.menuSelected(item, sectionNumber);
});
//Carousel
carousel.s_tab.addEventListener('click', function () {
    carousel.studyTab();
});
carousel.p_tab.addEventListener('click', function () {
    carousel.projectTab();
});
//Portfolio drop-down menu
dropDown.addEventListener('click', function () {
    carousel.dropDownMenu();
});
projectNavi.addEventListener('click', function (e) {
    carousel.moveToElement(e, 'project');
});
studyNavi.addEventListener('click', function (e) {
    carousel.moveToElement(e, 'study');
});
//Project
var closestProjectBox = function (e) {
    return e.target.closest('.project-box');
};
carousel.p_container.addEventListener('touchstart', function (e) {
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselStart(e);
});
carousel.p_container.addEventListener('touchmove', function (e) {
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselMove(e, projectBox, 'project');
});
carousel.p_container.addEventListener('touchend', function (e) {
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselEnd(projectBox, 'project');
});
carousel.p_container.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var infoScroll = e.target.closest('.project-info');
    if (infoScroll)
        return;
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselStart(e);
});
carousel.p_container.addEventListener('mousemove', function (e) {
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselMove(e, projectBox, 'project');
});
carousel.p_container.addEventListener('mouseup', function (e) {
    var projectBox = closestProjectBox(e);
    if (projectBox)
        carousel.carouselEnd(projectBox, 'project');
});
//Study
var closestStudyBox = function (e) {
    return e.target.closest('.study-box');
};
carousel.s_container.addEventListener('touchstart', function (e) {
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselStart(e);
});
carousel.s_container.addEventListener('touchmove', function (e) {
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselMove(e, studyBox, 'study');
});
carousel.s_container.addEventListener('touchend', function (e) {
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselEnd(studyBox, 'study');
});
carousel.s_container.addEventListener('mousedown', function (e) {
    e.preventDefault();
    var infoScroll = e.target.closest('.study-info');
    if (infoScroll)
        return;
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselStart(e);
});
carousel.s_container.addEventListener('mousemove', function (e) {
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselMove(e, studyBox, 'study');
});
carousel.s_container.addEventListener('mouseup', function (e) {
    var studyBox = closestStudyBox(e);
    if (studyBox)
        carousel.carouselEnd(studyBox, 'study');
});
//Carousel Btn
carousel.p_prevBtn.addEventListener('click', function () {
    carousel.prevBtn('project');
});
carousel.s_prevBtn.addEventListener('click', function () {
    carousel.prevBtn('study');
});
carousel.p_nextBtn.addEventListener('click', function () {
    carousel.nextBtn('project');
});
carousel.s_nextBtn.addEventListener('click', function () {
    carousel.nextBtn('study');
});
//Link
aboutLink.forEach(function (item) {
    item.addEventListener('click', function () {
        elem.aboutLink(item);
    });
});
document.addEventListener('click', function (e) {
    var linkBtn = e.target.closest('.link-btn');
    if (linkBtn)
        carousel.openLink(linkBtn);
});
//Close Sections
closeBtn.forEach(function (item, sectionNumber) {
    item.addEventListener('click', function () {
        fn.closeComponent(sectionNumber);
    });
});
//Admin
//List
adminPostingBtn.addEventListener('click', function () {
    elem.posting();
});
adminPrevBtn.addEventListener('click', function () {
    elem.adminPrev();
});
adminList.addEventListener('click', function (e) {
    var deleteBtn = e.target.closest('#delete-btn');
    var updateBtn = e.target.closest('#update-btn');
    // if (deleteBtn) elem.deletePosting(deleteBtn);
    if (deleteBtn)
        elem.openAdminModal('delete', deleteBtn);
    if (updateBtn)
        elem.updatePosting(updateBtn);
});
//Posting
previewImg.addEventListener('click', function () {
    elem.selectImg('posting');
});
p_imgSelector.addEventListener('change', function (e) {
    elem.changeImg(e, 'posting');
});
p_count.addEventListener('change', function (e) {
    elem.inputCount(e, p_count);
});
p_language.addEventListener('change', function (e) {
    elem.selectLang(e, p_langBox);
});
p_langBox.addEventListener('click', function (e) {
    elem.deleteLang(e, p_langBox);
});
p_content.addEventListener('input', function (e) {
    elem.inputContent(e, 'posting');
});
postingBtn.addEventListener('click', function () {
    elem.openAdminModal('posting');
});
//Update
updateImg.addEventListener('click', function () {
    elem.selectImg('update');
});
u_imgSelector.addEventListener('change', function (e) {
    elem.changeImg(e, 'update');
});
u_count.addEventListener('change', function (e) {
    elem.inputCount(e, u_count);
});
u_language.addEventListener('change', function (e) {
    elem.selectLang(e, u_langBox);
});
u_langBox.addEventListener('click', function (e) {
    elem.deleteLang(e, u_langBox);
});
u_content.addEventListener('input', function (e) {
    elem.inputContent(e, 'update');
});
updatingBtn.addEventListener('click', function () {
    elem.openAdminModal('update');
});
//Admin password
adminChkBtn.addEventListener('click', function () {
    elem.confirmPassword();
});
elem.adminPass.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        elem.confirmPassword();
    }
});
adminCancleBtn.addEventListener('click', function () {
    elem.closeAdminModal();
});
//Copy Right
copyRight.addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=hC29Vt9u6T0');
});
draw();
export { player };
