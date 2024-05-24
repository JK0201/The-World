import { DoubleSide, MeshStandardMaterial, OrthographicCamera, PlaneGeometry, Raycaster, Scene, TextureLoader, Vector2, Vector3, } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// const imgUrl: string = 'http://localhost:8080/posting/images/';
var imgUrl = '/posting/images/';
//Values
var meshes = [];
var spots = [];
var mouse = new Vector2();
var destinationPoint = new Vector3();
var cameraPosition = new Vector3(-3, 5, 5);
var menuOpen = false; //Menu controller
var soundMuted = true;
var menuLoading = false; //Menu loading in progress
var isPressed = false; //Detect character moving
var touched = false; //Detect character intersects with object
var tabClosed = false; //Take controls after close tab
var watchedDistanceX = 0;
var watchedDistanceZ = 0;
var menu = document.querySelector('.menu-btn');
var sound = document.querySelector('.menu-sound');
var menuOptions = document.querySelectorAll('.menu-option');
var sections = document.querySelectorAll('section');
var closeBtn = document.querySelectorAll('.close-btn');
var contents = document.querySelectorAll('.content');
var aboutLink = document.querySelectorAll('.about-link');
var previewImg = document.querySelector('.preview-img');
var p_type = document.querySelector('#p-type');
var p_title = document.querySelector('#p-title');
var p_count = document.querySelector('#p-count');
var p_language = document.querySelector('#p-language');
var p_langBox = document.querySelector('.p-lang-img-box');
var p_content = document.querySelector('#p-content');
var p_link = document.querySelector('#p-link');
var p_github = document.querySelector('#p-github');
var postingBtn = document.querySelector('#posting-btn');
var adminPrevBtn = document.querySelector('.prev-admin');
var adminPostingBtn = document.querySelector('#admin-posting-btn');
var adminList = document.querySelector('.admin-list');
var updateImg = document.querySelector('.update-img');
var u_type = document.querySelector('#u-type');
var u_title = document.querySelector('#u-title');
var u_count = document.querySelector('#u-count');
var u_language = document.querySelector('#u-language');
var u_langBox = document.querySelector('.u-lang-img-box');
var u_content = document.querySelector('#u-content');
var u_link = document.querySelector('#u-link');
var u_github = document.querySelector('#u-github');
var updatingBtn = document.querySelector('#updating-btn');
var adminChkBtn = document.querySelector('#admin-chk-btn');
var adminCancleBtn = document.querySelector('#admin-cancle-btn');
var p_imgSelector = document.querySelector('.p-img-selector');
var u_imgSelector = document.querySelector('.u-img-selector');
var dropDown = document.querySelector('.drop-down-btn');
var projectNavi = document.querySelector('.project-navi');
var studyNavi = document.querySelector('.study-navi');
var copyRight = document.querySelector('.copy-right');
//Getter
var getMenuOpen = function () {
    return menuOpen;
};
var getSoundMuted = function () {
    return soundMuted;
};
var getMenuLoading = function () {
    return menuLoading;
};
var getIsPressed = function () {
    return isPressed;
};
var getTouched = function () {
    return touched;
};
var getTabClosed = function () {
    return tabClosed;
};
var getWatchedDistanceX = function () {
    return watchedDistanceX;
};
var getWatchedDistanceZ = function () {
    return watchedDistanceZ;
};
//Setter
var setMenuOpen = function (value) {
    menuOpen = value;
};
var setSoundMuted = function (value) {
    soundMuted = value;
};
var setMenuLoading = function (value) {
    menuLoading = value;
};
var setIsPressed = function (value) {
    isPressed = value;
};
var setTouched = function (value) {
    touched = value;
};
var setTabClosed = function (value) {
    tabClosed = value;
};
var setWatchedDistanceX = function (value) {
    watchedDistanceX = value;
};
var setWatchedDistanceZ = function (value) {
    watchedDistanceZ = value;
};
//Canvas, 3JS, CannonJS
var cm = {
    canvas: document.querySelector('#three-canvas'),
    scene: new Scene(),
    camera: new OrthographicCamera(-(window.innerWidth / window.innerHeight), window.innerWidth / window.innerHeight, 1, -1, -1000, 1000),
    textureLoader: new TextureLoader(),
    gltfLoader: new GLTFLoader(),
    raycaster: new Raycaster(),
};
//Color
var color = {
    defaultLight: '#ffffff',
};
//Geometry
var geo = {
    floor: new PlaneGeometry(30, 30),
    background: new PlaneGeometry(100, 100),
    wall: new PlaneGeometry(30, 1),
    spot: new PlaneGeometry(2.5, 2.5),
    title: new PlaneGeometry(4, 2),
    direction: new PlaneGeometry(5, 5),
};
//Texture
var tex = {
    background: cm.textureLoader.load('../images/textures/grid.png'),
    wall: cm.textureLoader.load('../images/textures/wall.png'),
    direction0: cm.textureLoader.load('../images/textures/direction/0.png'),
    direction1: cm.textureLoader.load('../images/textures/direction/1.png'),
    direction2: cm.textureLoader.load('../images/textures/direction/2.png'),
    spot: cm.textureLoader.load('../images/textures/direction/x-mark.png'),
    noTitle: cm.textureLoader.load('../images/textures/title/no_title.png'),
    title0: cm.textureLoader.load('../images/textures/title/0.png'),
    title1: cm.textureLoader.load('../images/textures/title/1.png'),
    title2: cm.textureLoader.load('../images/textures/title/2.png'),
    title3: cm.textureLoader.load('../images/textures/title/3.png'),
    water: cm.textureLoader.load('../images/textures/doodle/water.png'),
    sky: cm.textureLoader.load('../images/textures/doodle/sky.png'),
};
//Material
var mat = {
    floor: new MeshStandardMaterial({
        opacity: 0,
        transparent: true,
    }),
    background: new MeshStandardMaterial({
        map: tex.background,
    }),
    wall: new MeshStandardMaterial({
        map: tex.wall,
        side: DoubleSide,
        transparent: true,
    }),
    direction0: new MeshStandardMaterial({
        map: tex.direction0,
        transparent: true,
    }),
    direction1: new MeshStandardMaterial({
        map: tex.direction1,
        transparent: true,
    }),
    direction2: new MeshStandardMaterial({
        map: tex.direction2,
        transparent: true,
    }),
    spot: new MeshStandardMaterial({
        map: tex.spot,
        transparent: true,
    }),
    noTitle: new MeshStandardMaterial({
        map: tex.noTitle,
        transparent: true,
    }),
    title0: new MeshStandardMaterial({
        map: tex.title0,
        transparent: true,
    }),
    title1: new MeshStandardMaterial({
        map: tex.title1,
        transparent: true,
    }),
    title2: new MeshStandardMaterial({
        map: tex.title2,
        transparent: true,
    }),
    title3: new MeshStandardMaterial({
        map: tex.title3,
        transparent: true,
    }),
    water: new MeshStandardMaterial({
        map: tex.water,
        transparent: true,
    }),
    sky: new MeshStandardMaterial({
        map: tex.sky,
        transparent: true,
    }),
};
//Models (.glb)
var model = {
    player: '../models/player.glb',
};
export { imgUrl, cm, color, geo, mat, tex, model, meshes, spots, mouse, destinationPoint, cameraPosition, getMenuOpen, getMenuLoading, getIsPressed, getTouched, getTabClosed, getWatchedDistanceX, getWatchedDistanceZ, setMenuOpen, setMenuLoading, setIsPressed, setTouched, setTabClosed, setWatchedDistanceX, setWatchedDistanceZ, sections, closeBtn, contents, menu, sound, menuOpen, menuOptions, previewImg, p_type, p_title, p_count, p_language, p_langBox, p_content, p_link, p_github, postingBtn, adminList, updateImg, u_type, u_title, u_count, u_language, u_langBox, u_content, u_link, u_github, updatingBtn, adminPrevBtn, adminPostingBtn, getSoundMuted, setSoundMuted, adminChkBtn, adminCancleBtn, p_imgSelector, u_imgSelector, aboutLink, dropDown, projectNavi, studyNavi, copyRight, };
