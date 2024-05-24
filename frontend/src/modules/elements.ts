import gsap from 'gsap';
import { player } from '../main';
import * as api from './api';
import * as component from './components/components';
import {
  adminList,
  adminPostingBtn,
  adminPrevBtn,
  cameraPosition,
  cm,
  getMenuLoading,
  getMenuOpen,
  getSoundMuted,
  getTouched,
  imgUrl,
  p_content,
  p_count,
  p_github,
  p_link,
  p_title,
  p_type,
  previewImg,
  projectNavi,
  setMenuLoading,
  setMenuOpen,
  setSoundMuted,
  spots,
  studyNavi,
  u_content,
  u_count,
  u_github,
  u_langBox,
  u_link,
  u_title,
  u_type,
  updateImg,
} from './common';
import { p_container, s_container } from './carousel';
import { PostingType } from '../types';

const bgSound = new Audio();
let firstPlay = true;
const menuBar = document.querySelector('.menu-bar') as HTMLDivElement;
const menuBtnBar1 = document.querySelector('.menu-btn-bar-1') as HTMLDivElement;
const menuBtnBar2 = document.querySelector('.menu-btn-bar-2') as HTMLDivElement;
const menuBtnBar3 = document.querySelector('.menu-btn-bar-3') as HTMLDivElement;
const soundBar = document.querySelector('.menu-sound') as HTMLDivElement;
const soundImg = document.querySelector('.menu-sound-img') as HTMLImageElement;
const soundBar1 = document.querySelector('.menu-sound-bar-1') as HTMLImageElement;
const soundBar2 = document.querySelector('.menu-sound-bar-2') as HTMLImageElement;
const loadingScreen = document.querySelector('.loading-screen') as HTMLDivElement;
const loadingMain = document.querySelector('.loading-main') as HTMLDivElement;
const loadingBox = document.querySelector('.loading-box') as HTMLDivElement;
const loadingBar = document.querySelector('.loading-bar') as HTMLDivElement;
const p_imgSelector = document.querySelector('.p-img-selector') as HTMLInputElement;
const p_previewText = document.querySelector('.p-preview-text') as HTMLDivElement;
const p_contentLength = document.querySelector('#p-content-length') as HTMLSpanElement;
const p_total = document.querySelector('#p-total') as HTMLSpanElement;
const s_total = document.querySelector('#s-total') as HTMLSpanElement;
const posting_id = document.querySelector('.posting-id') as HTMLInputElement;
const u_imgSelector = document.querySelector('.u-img-selector') as HTMLInputElement;
const u_previewText = document.querySelector('.u-preview-text') as HTMLDivElement;
const u_contentLength = document.querySelector('#u-content-length') as HTMLSpanElement;
const adminPosting = document.querySelector('.admin-posting') as HTMLDivElement;
const adminUpdate = document.querySelector('.admin-update') as HTMLDivElement;
const adminChkBox = document.querySelector('.admin-check-box') as HTMLDListElement;
const adminChk = document.querySelector('.admin-check') as HTMLDivElement;
const adminPass = document.querySelector('#admin-pass') as HTMLInputElement;

let loading: boolean = false;
let password: string;
let postingData: PostingType[] = [];
let postingId: number;
let image: File | undefined;
let type: string;
let title: string;
let count: number = 1;
let langs: string[] = [];
let content: string;
let link: string = '';
let github: string;
let updateData: PostingType;
let p_langs_backup: string[] = [];
let adminType: string;
let adminParent: HTMLDivElement;

const resetValues = () => {
  image = undefined;
  type = '';
  title = '';
  count = 1;
  langs = [];
  content = '';
  link = '';
  github = '';
};

const initWorld = async () => {
  postingData = await api.init();
  if (!postingData) {
    alert('서버에 연결에 실패했습니다\n잠시후 다시 시도해주세요');
    return;
  }

  let projectCount = 0;
  let studyCount = 0;
  postingData.forEach((item, idx) => {
    if (item.type === 'project') {
      const project = component.project(item);
      const projectList = component.projectList(item, projectCount);
      p_container.insertAdjacentHTML('beforeend', project);
      projectNavi.insertAdjacentHTML('beforeend', projectList);
      projectCount++;
    } else {
      const study = component.study(item);
      const studyList = component.studyList(item, studyCount);
      s_container.insertAdjacentHTML('beforeend', study);
      studyNavi.insertAdjacentHTML('beforeend', studyList);
      studyCount++;
    }

    //Admin List
    const list = component.list(item);
    adminList.insertAdjacentHTML('beforeend', list);
  });

  p_container.style.width = `calc(100vw * ${projectCount})`;
  p_total.innerHTML = `${projectCount}`;
  s_container.style.width = `calc(100vw * ${studyCount})`;
  s_total.innerHTML = `${studyCount}`;

  loading = true;
  let loadingProgression: number = 0;
  if (loading) {
    const timer = setInterval(() => {
      loadingProgression++;
      loadingBar.style.width = `${loadingProgression}%`;
      if (loadingProgression >= 100) {
        clearInterval(timer);
        loadingMain.innerHTML = 'COMPLETE!';
        loadingComplete();
      }
    }, 10);
  }
};

const loadingComplete = () => {
  const timer = setTimeout(() => {
    gsap.to(loadingScreen, {
      duration: 0.5,
      opacity: 0,
      onComplete: () => {
        loadingScreen.style.display = 'none';
        loadingBar.style.display = 'none';
        loadingBox.style.display = 'none';
        loadingMain.innerHTML = 'LOADING...';
      },
    });
  }, 1000);

  return () => {
    clearTimeout(timer);
  };
};

//Sounds
const playBgSound = () => {
  if (getTouched()) return;
  bgSound.src = '../sounds/Background.mp3';
  bgSound.loop = true;
  bgSound.play();
  firstPlay = false;
};

const muteSounds = () => {
  bgSound.muted = true;
};

const unMuteSounds = () => {
  bgSound.muted = false;
};

//Menu toggle controller
const menuController = () => {
  if (getTouched()) return;

  //Open Menu
  if (!getMenuOpen() && !getMenuLoading()) {
    menuBtnBar1.style.transform = 'translate(0px, 11px) rotate(45deg)';
    menuBtnBar2.style.opacity = '0';
    menuBtnBar3.style.transform = 'translate(0px, -11px) rotate(-45deg)';
    player.moving = false;
    setMenuOpen(true);
    player.mesh.quaternion.y = 0;
    menuBar.style.display = 'block';
    gsap.to(cm.camera, {
      duration: 0.5,
      zoom: 0.3,
      onUpdate: () => {
        cm.camera.updateProjectionMatrix();
      },
      onComplete: () => {
        menuBar.classList.add('show-menu');
        setTimeout(() => {
          setMenuLoading(true);
        }, 300);
      },
    });
  }

  //Close Menu
  if (getMenuOpen() && getMenuLoading()) {
    menuBtnBar1.style.transform = 'none';
    menuBtnBar2.style.opacity = '1';
    menuBtnBar3.style.transform = 'none';
    setMenuLoading(false);
    menuBar.classList.remove('show-menu');
    gsap.to(cm.camera, {
      duration: 0.5,
      zoom: 0.15,
      onUpdate: () => {
        cm.camera.updateProjectionMatrix();
      },
      onComplete: () => {
        menuBar.style.display = 'none';
        setTimeout(() => {
          setMenuOpen(false);
        }, 300);
      },
    });
  }
};

//Sound toggle controller
const soundController = () => {
  if (getTouched()) return;
  if (getSoundMuted()) {
    soundImg.style.transform = 'translateX(0)';
    gsap.to(soundBar, {
      duration: 0.1,
      backgroundColor: '#222',
      onComplete: () => {
        gsap.to(soundBar1, {
          duration: 0.1,
          opacity: 1,
          onComplete: () => {
            soundBar2.style.opacity = '1';
            if (firstPlay) {
              playBgSound();
            } else {
              unMuteSounds();
            }
            setTimeout(() => {
              setSoundMuted(false);
            }, 400);
          },
        });
      },
    });
  } else {
    soundBar2.style.opacity = '0';
    gsap.to(soundBar1, {
      duration: 0.1,
      opacity: 0,
      onComplete: () => {
        soundImg.style.transform = 'translateX(7px)';
        gsap.to(soundBar, {
          duration: 0.1,
          backgroundColor: '#999',
          onComplete: () => {
            muteSounds();
            setTimeout(() => {
              setSoundMuted(true);
            }, 400);
          },
        });
      },
    });
  }
};

/**
 * @param item
 * @param sectionNumber
 * Menu-Option selected
 */
const menuSelected = (item: Element, sectionNumber: number) => {
  item.addEventListener('click', () => {
    menuController();
    let spotPosition = spots[sectionNumber].mesh.position;

    loadingScreen.style.display = 'block';
    gsap.to(loadingScreen.style, {
      duration: 0.5,
      opacity: 1,
      onComplete: () => {
        player.mesh.position.x = spotPosition.x - 1;
        player.mesh.position.z = spotPosition.z - 1;
        cm.camera.position.x = cameraPosition.x + player.mesh.position.x;
        cm.camera.position.z = cameraPosition.z + player.mesh.position.z;
      },
    });
    setTimeout(() => {
      gsap.to(loadingScreen.style, {
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          loadingScreen.style.display = 'none';
        },
      });
    }, 1000);
  });
};

const posting = () => {
  adminPrevBtn.style.visibility = 'visible';
  adminPostingBtn.style.visibility = 'hidden';
  adminList.style.display = 'none';
  adminPosting.style.display = 'block';
  image = p_imgSelector.files ? p_imgSelector.files[0] : undefined;
  langs = p_langs_backup;
};

const adminPrev = () => {
  adminPrevBtn.style.visibility = 'hidden';
  adminPostingBtn.style.visibility = 'visible';
  adminList.style.display = 'block';
  adminPosting.style.display = 'none';
  adminUpdate.style.display = 'none';
};

const selectImg = (type: string) => {
  if (type === 'posting') {
    p_imgSelector.click();
  } else {
    u_imgSelector.click();
  }
};

/**
 * @param e
 * @returns when null || e.target.files.length === 0
 *
 * File change event
 */
const changeImg = (e: Event, type: string) => {
  if (!(e.target instanceof HTMLInputElement)) return;
  if (!e.target.files || e.target.files.length === 0) {
    return;
  }

  if (e.target.files[0].size > 1024 * 1024 * 3) {
    alert('3MB이하 사진만 업로드 가능합니다');
    return;
  }

  let ext = e.target.files[0].name.split('.').pop()?.toLowerCase();
  if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
    alert('이미지만 업로드 가능합니다  (jpg , jpeg , png)');
    return;
  }
  image = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: ProgressEvent<FileReader> & { target: FileReader }) => {
    if (!e.target.result) return;
    if (type === 'posting') {
      p_previewText.style.display = 'none';
      previewImg.style.padding = '0';
      previewImg.innerHTML = `<img src=${e.target.result} />`;
    } else {
      u_previewText.style.display = 'none';
      updateImg.style.padding = '0';
      updateImg.innerHTML = `<img src=${e.target.result} />`;
    }
  };
  reader.readAsDataURL(image);
};

const inputCount = (e: Event & { target: HTMLInputElement }, type: HTMLInputElement) => {
  count = parseInt(e.target.value);
  if (isNaN(count)) {
    type.value = '1';
    count = 1;
  }

  if (count <= 0) {
    type.value = '1';
    count = 1;
  }

  if (count > 99) {
    type.value = '99';
    count = 99;
  }
};

const selectLang = (e: Event & { target: HTMLSelectElement }, langBox: HTMLDivElement) => {
  let dupeChk = langs.indexOf(e.target.value);
  if (langs.length >= 5 || dupeChk >= 0) return;

  langs.push(e.target.value);
  langBox.innerHTML = '';
  langs.forEach((item) => {
    langBox.insertAdjacentHTML('beforeend', `<img class="lang-img" src='/images/langs/${item}.svg' />`);
  });

  if (langBox.classList.contains('p-lang-img-box')) p_langs_backup = langs;
};

const deleteLang = (e: MouseEvent, langBox: HTMLDivElement) => {
  const target = e.target as HTMLDivElement;
  if (target.classList.contains('lang-img')) {
    const elements = Array.from(langBox.getElementsByClassName('lang-img'));
    const idx = elements.indexOf(target);

    langs.splice(idx, 1);
    langBox.innerHTML = '';
    langs.forEach((item) => {
      langBox.insertAdjacentHTML('beforeend', `<img class="lang-img" src='/images/langs/${item}.svg' />`);
    });
  }

  if (langBox.classList.contains('p-lang-img-box')) p_langs_backup = langs;
};

const inputContent = (e: Event & { target: HTMLTextAreaElement }, type: string) => {
  content = e.target.value.trim();
  if (type === 'posting') p_contentLength.innerText = content.length.toString();
  if (type === 'update') u_contentLength.innerText = content.length.toString();
};

const inputLink = (e: Event & { target: HTMLTextAreaElement }) => {
  link = e.target.value.trim();
};

const inputGithub = (e: Event & { target: HTMLTextAreaElement }) => {
  github = e.target.value.trim();
};

//Admin password
const openAdminModal = (type: string, parent: Element | void) => {
  adminChkBox.style.cssText = 'opacity: 1; visibility: visible';
  adminChk.style.cssText = 'opacity: 1; transform: translateY(0)';
  adminType = type;
  if (parent instanceof HTMLDivElement) adminParent = parent;
};

const closeAdminModal = () => {
  password = '';
  adminPass.value = '';
  adminChkBox.style.cssText = 'opacity: 0; visibility: hidden';
  adminChk.style.cssText = 'opacity: 0; transform: translateY(-5vh)';
};

const confirmPassword = () => {
  if (!adminPass.value) {
    alert('비밀번호를 입력해주세요');
    return;
  }

  password = adminPass.value;
  switch (adminType) {
    case 'delete':
      deletePosting(adminParent);
      break;

    default:
      submit(adminType);
  }
};

//Submit
const submit = async (req: string) => {
  switch (req) {
    case 'posting':
      type = p_type.value;
      title = p_title.value.trim();
      count = parseInt(p_count.value.trim());
      content = p_content.value.trim();
      link = p_link.value.trim();
      github = p_github.value.trim();
      break;

    case 'update':
      postingId = parseInt(posting_id.value);
      type = u_type.value;
      title = u_title.value.trim();
      count = parseInt(u_count.value.trim());
      content = u_content.value.trim();
      link = u_link.value.trim();
      github = u_github.value.trim();
  }

  if (!type || !title || !count || langs.length === 0 || !content || !github) {
    closeAdminModal();
    alert('모든 입력란을 작성 해주세요');
    return;
  }

  if (title.length > 14) {
    closeAdminModal();
    alert('제목은 최대 14자까지 입니다');
    return;
  }

  if (content.length > 1000) {
    closeAdminModal();
    alert('내용은 최대 1000자까지 입니다');
    return;
  }

  const formData = new FormData();
  formData.append('password', password);
  formData.append('type', type);
  formData.append('title', title);
  formData.append('count', count.toString());
  formData.append('langs', JSON.stringify(langs));
  formData.append('content', content);
  formData.append('link', link);
  formData.append('github', github);
  if (image instanceof File) formData.append('image', image);

  if (req === 'posting') api.postItem(formData);
  if (req === 'update') api.updateItem(postingId, formData);
};

const deletePosting = async (deleteBtn: HTMLDivElement) => {
  const id = deleteBtn.dataset.id;
  if (id) {
    api.deleteItem(parseInt(id), password);
  } else {
    return;
  }
};

const updatePosting = (updateBtn: Element) => {
  resetValues();
  adminPostingBtn.style.visibility = 'hidden';
  adminPrevBtn.style.visibility = 'visible';
  adminList.style.display = 'none';
  adminUpdate.style.display = 'block';

  if (updateBtn instanceof HTMLDivElement) {
    const postingId = updateBtn.dataset.id;
    if (postingId) {
      posting_id.value = postingId;
      postingData.forEach((item) => {
        if (item.id == parseInt(postingId)) {
          updateData = item;
          return;
        }
      });
    }
  }

  //Admin Update
  if (updateData.image) {
    updateImg.style.padding = '0';
    updateImg.innerHTML = `<img src="${imgUrl + updateData.image}" />`;
  } else {
    updateImg.style.padding = '2rem';
    updateImg.innerHTML = `
    <div class="p-preview-text">
      <div>+</div>
      <div>사진 추가하기</div>
    </div>
    `;
  }

  const options = u_type.querySelectorAll('option');
  options.forEach((item) => {
    if (item.value === updateData.type) {
      item.selected = true;
    }
  });

  langs = JSON.parse(updateData.langs);
  u_langBox.innerHTML = '';
  langs.forEach((item: string) => {
    u_langBox.insertAdjacentHTML('beforeend', `<img class="lang-img" src='/images/langs/${item}.svg' />`);
  });
  u_title.value = updateData.title;
  u_count.value = updateData.count.toString();
  u_content.value = updateData.content;
  u_contentLength.innerText = updateData.content.replace(/\r\n/g, '\n').length.toString();
  u_link.value = updateData.link;
  u_github.value = updateData.github;
};

//Open Link
const aboutLink = (item: Element) => {
  if (item instanceof HTMLDivElement) {
    window.open(item.dataset.url);
  }
};

export {
  initWorld,
  menuController,
  soundController,
  menuSelected,
  posting,
  adminPrev,
  selectImg,
  inputCount,
  selectLang,
  deleteLang,
  inputContent,
  inputLink,
  inputGithub,
  submit,
  deletePosting,
  updatePosting,
  openAdminModal,
  confirmPassword,
  closeAdminModal,
  adminPass,
  changeImg,
  aboutLink,
};
