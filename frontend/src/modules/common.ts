import {
  DoubleSide,
  MeshStandardMaterial,
  Object3D,
  OrthographicCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Spot } from './meshes/Spot';
import { MatType } from '../types';

// const imgUrl: string = 'http://localhost:8080/posting/images/';
const imgUrl: string = '/posting/images/';

//Values
const meshes: Object3D[] = [];
const spots: Spot[] = [];
const mouse = new Vector2();
const destinationPoint = new Vector3();
const cameraPosition = new Vector3(-3, 5, 5);
let menuOpen: boolean = false; //Menu controller
let soundMuted: boolean = true;
let menuLoading: boolean = false; //Menu loading in progress
let isPressed: boolean = false; //Detect character moving
let touched: boolean = false; //Detect character intersects with object
let tabClosed: boolean = false; //Take controls after close tab
let watchedDistanceX: number = 0;
let watchedDistanceZ: number = 0;
const menu = document.querySelector('.menu-btn') as HTMLDivElement;
const sound = document.querySelector('.menu-sound') as HTMLDivElement;
const menuOptions = document.querySelectorAll('.menu-option');
const sections = document.querySelectorAll('section');
const closeBtn = document.querySelectorAll('.close-btn');
const contents = document.querySelectorAll('.content');
const aboutLink = document.querySelectorAll('.about-link');
const previewImg = document.querySelector('.preview-img') as HTMLDivElement;
const p_type = document.querySelector('#p-type') as HTMLSelectElement;
const p_title = document.querySelector('#p-title') as HTMLInputElement;
const p_count = document.querySelector('#p-count') as HTMLInputElement;
const p_language = document.querySelector('#p-language') as HTMLSelectElement;
const p_langBox = document.querySelector('.p-lang-img-box') as HTMLDivElement;
const p_content = document.querySelector('#p-content') as HTMLTextAreaElement;
const p_link = document.querySelector('#p-link') as HTMLInputElement;
const p_github = document.querySelector('#p-github') as HTMLInputElement;
const postingBtn = document.querySelector('#posting-btn') as HTMLDivElement;
const adminPrevBtn = document.querySelector('.prev-admin') as HTMLDivElement;
const adminPostingBtn = document.querySelector('#admin-posting-btn') as HTMLDivElement;
const adminList = document.querySelector('.admin-list') as HTMLDivElement;
const updateImg = document.querySelector('.update-img') as HTMLDListElement;
const u_type = document.querySelector('#u-type') as HTMLSelectElement;
const u_title = document.querySelector('#u-title') as HTMLInputElement;
const u_count = document.querySelector('#u-count') as HTMLInputElement;
const u_language = document.querySelector('#u-language') as HTMLSelectElement;
const u_langBox = document.querySelector('.u-lang-img-box') as HTMLDivElement;
const u_content = document.querySelector('#u-content') as HTMLTextAreaElement;
const u_link = document.querySelector('#u-link') as HTMLInputElement;
const u_github = document.querySelector('#u-github') as HTMLInputElement;
const updatingBtn = document.querySelector('#updating-btn') as HTMLDivElement;
const adminChkBtn = document.querySelector('#admin-chk-btn') as HTMLDivElement;
const adminCancleBtn = document.querySelector('#admin-cancle-btn') as HTMLDivElement;
const p_imgSelector = document.querySelector('.p-img-selector') as HTMLInputElement;
const u_imgSelector = document.querySelector('.u-img-selector') as HTMLInputElement;
const dropDown = document.querySelector('.drop-down-btn') as HTMLDivElement;
const projectNavi = document.querySelector('.project-navi') as HTMLDivElement;
const studyNavi = document.querySelector('.study-navi') as HTMLDivElement;
const copyRight = document.querySelector('.copy-right') as HTMLElement;

//Getter
const getMenuOpen = () => {
  return menuOpen;
};

const getSoundMuted = () => {
  return soundMuted;
};

const getMenuLoading = () => {
  return menuLoading;
};

const getIsPressed = () => {
  return isPressed;
};

const getTouched = () => {
  return touched;
};

const getTabClosed = () => {
  return tabClosed;
};

const getWatchedDistanceX = () => {
  return watchedDistanceX;
};

const getWatchedDistanceZ = () => {
  return watchedDistanceZ;
};

//Setter
const setMenuOpen = (value: boolean) => {
  menuOpen = value;
};

const setSoundMuted = (value: boolean) => {
  soundMuted = value;
};

const setMenuLoading = (value: boolean) => {
  menuLoading = value;
};

const setIsPressed = (value: boolean) => {
  isPressed = value;
};

const setTouched = (value: boolean) => {
  touched = value;
};

const setTabClosed = (value: boolean) => {
  tabClosed = value;
};

const setWatchedDistanceX = (value: number) => {
  watchedDistanceX = value;
};

const setWatchedDistanceZ = (value: number) => {
  watchedDistanceZ = value;
};

//Canvas, 3JS, CannonJS
const cm = {
  canvas: document.querySelector('#three-canvas'),
  scene: new Scene(),
  camera: new OrthographicCamera(
    -(window.innerWidth / window.innerHeight),
    window.innerWidth / window.innerHeight,
    1,
    -1,
    -1000,
    1000
  ),
  textureLoader: new TextureLoader(),
  gltfLoader: new GLTFLoader(),
  raycaster: new Raycaster(),
};

//Color
const color = {
  defaultLight: '#ffffff',
};

//Geometry
const geo = {
  floor: new PlaneGeometry(30, 30),
  background: new PlaneGeometry(100, 100),
  wall: new PlaneGeometry(30, 1),
  spot: new PlaneGeometry(2.5, 2.5),
  title: new PlaneGeometry(4, 2),
  direction: new PlaneGeometry(5, 5),
};

//Texture
const tex = {
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
const mat: MatType = {
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
const model = {
  player: '../models/player.glb',
};

export {
  imgUrl,
  cm,
  color,
  geo,
  mat,
  tex,
  model,
  meshes,
  spots,
  mouse,
  destinationPoint,
  cameraPosition,
  getMenuOpen,
  getMenuLoading,
  getIsPressed,
  getTouched,
  getTabClosed,
  getWatchedDistanceX,
  getWatchedDistanceZ,
  setMenuOpen,
  setMenuLoading,
  setIsPressed,
  setTouched,
  setTabClosed,
  setWatchedDistanceX,
  setWatchedDistanceZ,
  sections,
  closeBtn,
  contents,
  menu,
  sound,
  menuOpen,
  menuOptions,
  previewImg,
  p_type,
  p_title,
  p_count,
  p_language,
  p_langBox,
  p_content,
  p_link,
  p_github,
  postingBtn,
  adminList,
  updateImg,
  u_type,
  u_title,
  u_count,
  u_language,
  u_langBox,
  u_content,
  u_link,
  u_github,
  updatingBtn,
  adminPrevBtn,
  adminPostingBtn,
  getSoundMuted,
  setSoundMuted,
  adminChkBtn,
  adminCancleBtn,
  p_imgSelector,
  u_imgSelector,
  aboutLink,
  dropDown,
  projectNavi,
  studyNavi,
  copyRight,
};
