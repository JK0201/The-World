import gsap from 'gsap';
import { projectNavi, studyNavi } from './common';
var startX = 0;
var startY = 0;
var changedX = 0;
var changedY = 0;
var clicked = false;
var moved = false;
var slideInProgress = false;
var p_curSlide = 0;
var s_curSlide = 0;
var prevClicked = false;
var nextClicked = false;
var isTap = true;
var p_page = 1;
var s_page = 1;
var portfolioModal = false;
var portfolioModalLoading = false;
var dropDownImg = document.querySelector('.drop-down-btn-img');
var portfolioMenuBox = document.querySelector('.portfolio-menu-bg');
var portfolioMenu = document.querySelector('.portfolio-menu');
var p_container = document.querySelector('.flex-project');
var p_btn = document.querySelector('.project-fn');
var p_prevBtn = document.querySelector('.prev-project');
var p_nextBtn = document.querySelector('.next-project');
var p_tab = document.querySelector('#project-tab');
var p_current = document.querySelector('#p-current');
var s_container = document.querySelector('.flex-study');
var s_btn = document.querySelector('.study-fn');
var s_prevBtn = document.querySelector('.prev-study');
var s_nextBtn = document.querySelector('.next-study');
var s_tab = document.querySelector('#study-tab');
var s_current = document.querySelector('#s-current');
var studyTab = function () {
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
var projectTab = function () {
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
var moveToElement = function (e, type) {
    if (e.target instanceof HTMLElement) {
        if (!e.target.closest('.portfolio-navi-elem'))
            return;
        var postingId = 0;
        if (e.target.dataset.id)
            postingId = parseInt(e.target.dataset.id);
        clickedFn(postingId, type);
    }
};
var clickedFn = function (postingId, type) {
    if (portfolioModalLoading)
        return;
    switch (type) {
        case 'project':
            p_curSlide = postingId * -100;
            p_page = postingId + 1;
            p_current.innerHTML = "".concat(p_page);
            p_container.style.transform = "translateX(".concat(p_curSlide, "vw)");
            projectTab();
            closeDropDownMenu();
            break;
        case 'study':
            s_curSlide = postingId * -100;
            s_page = postingId + 1;
            s_current.innerHTML = "".concat(s_page);
            s_container.style.transform = "translateX(".concat(s_curSlide, "vw)");
            studyTab();
            closeDropDownMenu();
            break;
    }
    naviStyle(type);
};
var naviStyle = function (type) {
    portfolioMenu.querySelectorAll('.portfolio-navi-elem').forEach(function (item) {
        item.classList.remove('selected-elem');
    });
    switch (type) {
        case 'project':
            var projectElement = projectNavi.querySelectorAll('.portfolio-navi-elem');
            projectElement[p_page - 1].classList.add('selected-elem');
            break;
        case 'study':
            var studyElement = studyNavi.querySelectorAll('.portfolio-navi-elem');
            studyElement[s_page - 1].classList.add('selected-elem');
            break;
    }
};
//List drop-down menu
var dropDownMenu = function () {
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
            onComplete: function () {
                setTimeout(function () {
                    portfolioModalLoading = false;
                }, 300);
            },
        });
    }
    if (portfolioModal && !portfolioModalLoading) {
        closeDropDownMenu();
    }
};
var closeDropDownMenu = function () {
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
        onComplete: function () {
            setTimeout(function () {
                portfolioMenuBox.style.display = 'none';
                portfolioModalLoading = false;
            }, 300);
        },
    });
};
//Carousel touchstart / mousedown
var carouselStart = function (e) {
    if (slideInProgress)
        return;
    clicked = true;
    isTap = true;
    if (e instanceof TouchEvent) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    else {
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
var carouselMove = function (e, parent, type) {
    if (!clicked)
        return;
    moved = true;
    if (e instanceof TouchEvent) {
        changedX = e.touches[0].clientX - startX;
        changedY = e.touches[0].clientY - startY;
    }
    else {
        changedX = e.clientX - startX;
        changedY = e.clientY - startY;
    }
    if (Math.abs(changedY) > 30 || Math.abs(changedX) > 30) {
        isTap = false;
    }
    if (Math.abs(changedY) > Math.abs(changedX) - 30) {
        return;
    }
    var element = parent.querySelector(".".concat(type));
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
var moveFn = function (container, curSlide, element) {
    var scale = 1 - Math.abs(changedX / 1000);
    container.style.transform = "translateX(calc(".concat(curSlide, "vw + ").concat(changedX, "px))");
    element.style.cssText = "transform:scale(".concat(scale, "); opacity:").concat(0.5);
};
/**
 * @param parent project-box || study-box
 * @param type project || study
 */
var carouselEnd = function (parent, type) {
    if (!moved)
        return;
    clicked = false;
    slideInProgress = true;
    var box;
    var idx;
    var slideData = {
        curSlide: type === 'project' ? p_curSlide : s_curSlide,
        page: type === 'project' ? p_page : s_page,
    };
    var element = parent.querySelector(".".concat(type));
    switch (type) {
        case 'project':
            box = Array.from(p_container.querySelectorAll('.project-box'));
            idx = box.indexOf(parent);
            endFn(p_container, idx, box.length, slideData, element);
            p_curSlide = slideData.curSlide;
            p_page = slideData.page;
            p_current.innerHTML = "".concat(p_page);
            break;
        case 'study':
            box = Array.from(s_container.querySelectorAll('.study-box'));
            idx = box.indexOf(parent);
            endFn(s_container, idx, box.length, slideData, element);
            s_curSlide = slideData.curSlide;
            s_page = slideData.page;
            s_current.innerHTML = "".concat(s_page);
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
var endFn = function (container, idx, total, slideData, element) {
    var timer;
    container.style.transition = 'all 0.3s';
    if (changedX <= -100 && idx < total - 1) {
        slideData.curSlide -= 100;
        slideData.page++;
    }
    else if (changedX >= 100 && idx > 0) {
        slideData.curSlide += 100;
        slideData.page--;
    }
    else {
        element.style.cssText = 'transform:scale(1); opacity:1;';
    }
    moved = false;
    container.style.transform = "translateX(".concat(slideData.curSlide, "vw)");
    timer = setTimeout(function () {
        slideInProgress = false;
        setTimeout(function () {
            container.style.transition = 'none';
            element.style.cssText = 'transform:scale(1); opacity:1;';
        }, 100);
    }, 200);
    return function () {
        clearTimeout(timer);
    };
};
var prevBtn = function (type) {
    if (prevClicked)
        return;
    prevClicked = true;
    var box;
    var slideData = {
        curSlide: type === 'project' ? p_curSlide : s_curSlide,
        page: type === 'project' ? p_page : s_page,
    };
    switch (type) {
        case 'project':
            box = Array.from(p_container.querySelectorAll('.project-box'));
            prevFn(p_container, box.length, slideData);
            p_curSlide = slideData.curSlide;
            p_page = slideData.page;
            p_current.innerHTML = "".concat(p_page);
            break;
        case 'study':
            box = Array.from(s_container.querySelectorAll('.study-box'));
            prevFn(s_container, box.length, slideData);
            s_curSlide = slideData.curSlide;
            s_page = slideData.page;
            s_current.innerHTML = "".concat(s_page);
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
var prevFn = function (container, box, slideData) {
    var timer;
    container.style.transition = 'all 0.3s';
    if (slideData.curSlide == 0) {
        slideData.curSlide = -100 * (box - 1);
        slideData.page = box;
    }
    else {
        slideData.curSlide += 100;
        slideData.page--;
    }
    container.style.transform = "translateX(".concat(slideData.curSlide, "vw)");
    timer = setTimeout(function () {
        container.style.transition = 'none';
        prevClicked = false;
    }, 300);
    return function () {
        clearTimeout(timer);
    };
};
var nextBtn = function (type) {
    if (nextClicked)
        return;
    nextClicked = true;
    var box;
    var slideData = {
        curSlide: type === 'project' ? p_curSlide : s_curSlide,
        page: type === 'project' ? p_page : s_page,
    };
    switch (type) {
        case 'project':
            box = Array.from(p_container.querySelectorAll('.project-box'));
            netxFn(p_container, box.length, slideData);
            p_curSlide = slideData.curSlide;
            p_page = slideData.page;
            p_current.innerHTML = "".concat(p_page);
            break;
        case 'study':
            box = Array.from(s_container.querySelectorAll('.study-box'));
            netxFn(s_container, box.length, slideData);
            s_curSlide = slideData.curSlide;
            s_page = slideData.page;
            s_current.innerHTML = "".concat(s_page);
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
var netxFn = function (container, box, slideData) {
    var timer;
    container.style.transition = 'all 0.3s';
    if (slideData.curSlide == (box - 1) * -100) {
        slideData.curSlide = 0;
        slideData.page = 1;
    }
    else {
        slideData.curSlide -= 100;
        slideData.page++;
    }
    container.style.transform = "translateX(".concat(slideData.curSlide, "vw)");
    timer = setTimeout(function () {
        container.style.transition = 'none';
        nextClicked = false;
    }, 300);
    return function () {
        clearTimeout(timer);
    };
};
var openLink = function (linkBtn) {
    clicked = false;
    if (!isTap && slideInProgress) {
        return;
    }
    if (linkBtn instanceof HTMLDivElement) {
        if (!linkBtn.dataset.url)
            return;
        window.open(linkBtn.dataset.url);
    }
};
export { p_container, s_container, s_tab, studyTab, p_tab, projectTab, carouselStart, carouselMove, carouselEnd, p_prevBtn, s_prevBtn, prevBtn, p_nextBtn, s_nextBtn, nextBtn, openLink, moveToElement, dropDownMenu, };
