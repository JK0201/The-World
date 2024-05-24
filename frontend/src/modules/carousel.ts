import gsap from 'gsap';
import { projectNavi, studyNavi } from './common';

let startX = 0;
let startY = 0;
let changedX = 0;
let changedY = 0;
let clicked = false;
let moved = false;
let slideInProgress = false;
let p_curSlide = 0;
let s_curSlide = 0;
let prevClicked = false;
let nextClicked = false;
let isTap = true;
let p_page = 1;
let s_page = 1;
let portfolioModal: boolean = false;
let portfolioModalLoading: boolean = false;

const dropDownImg = document.querySelector('.drop-down-btn-img') as HTMLImageElement;
const portfolioMenuBox = document.querySelector('.portfolio-menu-bg') as HTMLDivElement;
const portfolioMenu = document.querySelector('.portfolio-menu') as HTMLDivElement;

const p_container = document.querySelector('.flex-project') as HTMLDivElement;
const p_btn = document.querySelector('.project-fn') as HTMLDivElement;
const p_prevBtn = document.querySelector('.prev-project') as HTMLDivElement;
const p_nextBtn = document.querySelector('.next-project') as HTMLDivElement;
const p_tab = document.querySelector('#project-tab') as HTMLDivElement;
const p_current = document.querySelector('#p-current') as HTMLSpanElement;

const s_container = document.querySelector('.flex-study') as HTMLDivElement;
const s_btn = document.querySelector('.study-fn') as HTMLDivElement;
const s_prevBtn = document.querySelector('.prev-study') as HTMLDivElement;
const s_nextBtn = document.querySelector('.next-study') as HTMLDivElement;
const s_tab = document.querySelector('#study-tab') as HTMLDivElement;
const s_current = document.querySelector('#s-current') as HTMLSpanElement;

const studyTab = () => {
  p_container.style.display = 'none';
  p_btn.style.display = 'none';
  p_tab.style.cssText = 'font-weight:normal; font-size:1rem';
  p_tab.classList.remove('underline');

  s_container.style.display = 'flex';
  s_btn.style.display = 'flex';
  s_tab.style.cssText = 'font-weight:bold; font-size:1.5rem;';
  s_tab.classList.add('underline');
  naviStyle('study');
};

const projectTab = () => {
  p_container.style.display = 'flex';
  p_btn.style.display = 'flex';
  p_tab.style.cssText = 'font-weight:bold; font-size:1.5rem;';
  p_tab.classList.add('underline');

  s_container.style.display = 'none';
  s_btn.style.display = 'none';
  s_tab.style.cssText = 'font-weight:normal; font-size:1rem;';
  s_tab.classList.remove('underline');
  naviStyle('project');
};

//Move to cliked Project / Study
const moveToElement = (e: MouseEvent, type: string) => {
  if (e.target instanceof HTMLElement) {
    if (!e.target.closest('.portfolio-navi-elem')) return;

    let postingId = 0;
    if (e.target.dataset.id) postingId = parseInt(e.target.dataset.id);
    clickedFn(postingId, type);
  }
};

const clickedFn = (postingId: number, type: string) => {
  if (portfolioModalLoading) return;
  switch (type) {
    case 'project':
      p_curSlide = postingId * -100;
      p_page = postingId + 1;
      p_current.innerHTML = `${p_page}`;
      p_container.style.transform = `translateX(${p_curSlide}vw)`;
      projectTab();
      closeDropDownMenu();
      break;

    case 'study':
      s_curSlide = postingId * -100;
      s_page = postingId + 1;
      s_current.innerHTML = `${s_page}`;
      s_container.style.transform = `translateX(${s_curSlide}vw)`;
      studyTab();
      closeDropDownMenu();
      break;
  }
  naviStyle(type);
};

const naviStyle = (type: string) => {
  portfolioMenu.querySelectorAll('.portfolio-navi-elem').forEach((item) => {
    item.classList.remove('selected-elem');
  });

  switch (type) {
    case 'project':
      const projectElement = projectNavi.querySelectorAll('.portfolio-navi-elem');
      projectElement[p_page - 1].classList.add('selected-elem');
      break;

    case 'study':
      const studyElement = studyNavi.querySelectorAll('.portfolio-navi-elem');
      studyElement[s_page - 1].classList.add('selected-elem');
      break;
  }
};

//List drop-down menu
const dropDownMenu = () => {
  if (!portfolioModal && !portfolioModalLoading) {
    portfolioModal = true;
    portfolioModalLoading = true;
    portfolioMenuBox.style.cssText = 'display:block;';
    gsap.to(portfolioMenuBox, {
      duration: 0.3,
      opacity: 1,
      ease: 'none',
    });

    gsap.to(portfolioMenu, {
      duration: 0.3,
      translateY: 0,
    });

    gsap.to(dropDownImg, {
      duration: 0.3,
      rotation: 180,
      onComplete: () => {
        setTimeout(() => {
          portfolioModalLoading = false;
        }, 300);
      },
    });
  }

  if (portfolioModal && !portfolioModalLoading) {
    closeDropDownMenu();
  }
};

const closeDropDownMenu = () => {
  portfolioModal = false;
  portfolioModalLoading = true;
  gsap.to(portfolioMenuBox, {
    duration: 0.3,
    opacity: 0,
    ease: 'none',
  });

  gsap.to(portfolioMenu, {
    duration: 0.3,
    translateY: '-5vh',
  });

  gsap.to(dropDownImg, {
    duration: 0.2,
    rotation: 0,
    onComplete: () => {
      setTimeout(() => {
        portfolioMenuBox.style.display = 'none';
        portfolioModalLoading = false;
      }, 300);
    },
  });
};

//Carousel touchstart / mousedown
const carouselStart = (e: TouchEvent | MouseEvent) => {
  if (slideInProgress) return;
  clicked = true;
  isTap = true;
  if (e instanceof TouchEvent) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  } else {
    startX = e.clientX;
    startY = e.clientY;
  }
};

/**
 * @param e TouchEvent || MouseEvent
 * @param parent project-box || study-box
 * @param type project || study
 * @returns
 */
const carouselMove = (e: TouchEvent | MouseEvent, parent: Element, type: string) => {
  if (!clicked) return;
  moved = true;
  if (e instanceof TouchEvent) {
    changedX = e.touches[0].clientX - startX;
    changedY = e.touches[0].clientY - startY;
  } else {
    changedX = e.clientX - startX;
    changedY = e.clientY - startY;
  }

  if (Math.abs(changedY) > 30 || Math.abs(changedX) > 30) {
    isTap = false;
  }

  if (Math.abs(changedY) > Math.abs(changedX) - 30) {
    return;
  }

  const element = parent.querySelector(`.${type}`) as HTMLDivElement;
  switch (type) {
    case 'project':
      moveFn(p_container, p_curSlide, element);
      break;

    case 'study':
      moveFn(s_container, s_curSlide, element);
      break;
  }
};

/**
 * @param container p_container || s_container
 * @param curSlide p_curSlide || s_curSlide
 * @param element project || study
 */
const moveFn = (container: HTMLDivElement, curSlide: number, element: HTMLDivElement) => {
  let scale = 1 - Math.abs(changedX / 1000);
  container.style.transform = `translateX(calc(${curSlide}vw + ${changedX}px))`;
  element.style.cssText = `transform:scale(${scale}); opacity:${0.5}`;
};

/**
 * @param parent project-box || study-box
 * @param type project || study
 */
const carouselEnd = (parent: Element, type: string) => {
  if (!moved) return;
  clicked = false;
  slideInProgress = true;
  let box: Element[];
  let idx: number;
  let slideData = {
    curSlide: type === 'project' ? p_curSlide : s_curSlide,
    page: type === 'project' ? p_page : s_page,
  };
  const element = parent.querySelector(`.${type}`) as HTMLDivElement;

  switch (type) {
    case 'project':
      box = Array.from(p_container.querySelectorAll('.project-box'));
      idx = box.indexOf(parent);
      endFn(p_container, idx, box.length, slideData, element);
      p_curSlide = slideData.curSlide;
      p_page = slideData.page;
      p_current.innerHTML = `${p_page}`;
      break;

    case 'study':
      box = Array.from(s_container.querySelectorAll('.study-box'));
      idx = box.indexOf(parent);
      endFn(s_container, idx, box.length, slideData, element);
      s_curSlide = slideData.curSlide;
      s_page = slideData.page;
      s_current.innerHTML = `${s_page}`;
      break;
  }
  naviStyle(type);
};

/**
 * @param container p_container || s_container
 * @param idx
 * @param total box.length
 * @param slideData curSlide, curPage update용 오브젝트
 * @param item projects || studys
 * @returns clean-up timer
 */
const endFn = (
  container: HTMLDivElement,
  idx: number,
  total: number,
  slideData: { curSlide: number; page: number },
  element: HTMLDivElement
) => {
  let timer: NodeJS.Timeout;
  container.style.transition = 'all 0.3s';
  if (changedX <= -100 && idx < total - 1) {
    slideData.curSlide -= 100;
    slideData.page++;
  } else if (changedX >= 100 && idx > 0) {
    slideData.curSlide += 100;
    slideData.page--;
  } else {
    element.style.cssText = 'transform:scale(1); opacity:1;';
  }
  moved = false;
  container.style.transform = `translateX(${slideData.curSlide}vw)`;

  timer = setTimeout(() => {
    slideInProgress = false;
    setTimeout(() => {
      container.style.transition = 'none';
      element.style.cssText = 'transform:scale(1); opacity:1;';
    }, 100);
  }, 200);

  return () => {
    clearTimeout(timer);
  };
};

const prevBtn = (type: string) => {
  if (prevClicked) return;
  prevClicked = true;
  let box: Element[];
  let slideData = {
    curSlide: type === 'project' ? p_curSlide : s_curSlide,
    page: type === 'project' ? p_page : s_page,
  };
  switch (type) {
    case 'project':
      box = Array.from(p_container.querySelectorAll('.project-box'));
      prevFn(p_container, box.length, slideData);
      p_curSlide = slideData.curSlide;
      p_page = slideData.page;
      p_current.innerHTML = `${p_page}`;
      break;

    case 'study':
      box = Array.from(s_container.querySelectorAll('.study-box'));
      prevFn(s_container, box.length, slideData);
      s_curSlide = slideData.curSlide;
      s_page = slideData.page;
      s_current.innerHTML = `${s_page}`;
      break;
  }
  naviStyle(type);
};

/**
 * @param container p_container || s_container
 * @param box box.length
 * @param slideData curSlide, curPage update용 오브젝트
 * @returns
 */
const prevFn = (container: HTMLDivElement, box: number, slideData: { curSlide: number; page: number }) => {
  let timer: NodeJS.Timeout;
  container.style.transition = 'all 0.3s';
  if (slideData.curSlide == 0) {
    slideData.curSlide = -100 * (box - 1);
    slideData.page = box;
  } else {
    slideData.curSlide += 100;
    slideData.page--;
  }
  container.style.transform = `translateX(${slideData.curSlide}vw)`;

  timer = setTimeout(() => {
    container.style.transition = 'none';
    prevClicked = false;
  }, 300);

  return () => {
    clearTimeout(timer);
  };
};

const nextBtn = (type: string) => {
  if (nextClicked) return;
  nextClicked = true;
  let box: Element[];
  let slideData = {
    curSlide: type === 'project' ? p_curSlide : s_curSlide,
    page: type === 'project' ? p_page : s_page,
  };
  switch (type) {
    case 'project':
      box = Array.from(p_container.querySelectorAll('.project-box'));
      netxFn(p_container, box.length, slideData);
      p_curSlide = slideData.curSlide;
      p_page = slideData.page;
      p_current.innerHTML = `${p_page}`;
      break;

    case 'study':
      box = Array.from(s_container.querySelectorAll('.study-box'));
      netxFn(s_container, box.length, slideData);
      s_curSlide = slideData.curSlide;
      s_page = slideData.page;
      s_current.innerHTML = `${s_page}`;
      break;
  }
  naviStyle(type);
};

/**
 * @param container p_container || s_container
 * @param box box.length
 * @param slideData curSlide, curPage update용 오브젝트
 * @returns
 */
const netxFn = (container: HTMLDivElement, box: number, slideData: { curSlide: number; page: number }) => {
  let timer: NodeJS.Timeout;
  container.style.transition = 'all 0.3s';
  if (slideData.curSlide == (box - 1) * -100) {
    slideData.curSlide = 0;
    slideData.page = 1;
  } else {
    slideData.curSlide -= 100;
    slideData.page++;
  }
  container.style.transform = `translateX(${slideData.curSlide}vw)`;

  timer = setTimeout(() => {
    container.style.transition = 'none';
    nextClicked = false;
  }, 300);

  return () => {
    clearTimeout(timer);
  };
};

const openLink = (linkBtn: Element) => {
  clicked = false;
  if (!isTap && slideInProgress) {
    return;
  }

  if (linkBtn instanceof HTMLDivElement) {
    if (!linkBtn.dataset.url) return;
    window.open(linkBtn.dataset.url);
  }
};

export {
  p_container,
  s_container,
  s_tab,
  studyTab,
  p_tab,
  projectTab,
  carouselStart,
  carouselMove,
  carouselEnd,
  p_prevBtn,
  s_prevBtn,
  prevBtn,
  p_nextBtn,
  s_nextBtn,
  nextBtn,
  openLink,
  moveToElement,
  dropDownMenu,
};
