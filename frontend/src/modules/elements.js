var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import gsap from 'gsap';
import { player } from '../main';
import * as api from './api';
import * as component from './components/components';
import { adminList, adminPostingBtn, adminPrevBtn, cameraPosition, cm, getMenuLoading, getMenuOpen, getSoundMuted, getTouched, imgUrl, p_content, p_count, p_github, p_link, p_title, p_type, previewImg, projectNavi, setMenuLoading, setMenuOpen, setSoundMuted, spots, studyNavi, u_content, u_count, u_github, u_langBox, u_link, u_title, u_type, updateImg, } from './common';
import { p_container, s_container } from './carousel';
var bgSound = new Audio();
var firstPlay = true;
var menuBar = document.querySelector('.menu-bar');
var menuBtnBar1 = document.querySelector('.menu-btn-bar-1');
var menuBtnBar2 = document.querySelector('.menu-btn-bar-2');
var menuBtnBar3 = document.querySelector('.menu-btn-bar-3');
var soundBar = document.querySelector('.menu-sound');
var soundImg = document.querySelector('.menu-sound-img');
var soundBar1 = document.querySelector('.menu-sound-bar-1');
var soundBar2 = document.querySelector('.menu-sound-bar-2');
var loadingScreen = document.querySelector('.loading-screen');
var loadingMain = document.querySelector('.loading-main');
var loadingBox = document.querySelector('.loading-box');
var loadingBar = document.querySelector('.loading-bar');
var p_imgSelector = document.querySelector('.p-img-selector');
var p_previewText = document.querySelector('.p-preview-text');
var p_contentLength = document.querySelector('#p-content-length');
var p_total = document.querySelector('#p-total');
var s_total = document.querySelector('#s-total');
var posting_id = document.querySelector('.posting-id');
var u_imgSelector = document.querySelector('.u-img-selector');
var u_previewText = document.querySelector('.u-preview-text');
var u_contentLength = document.querySelector('#u-content-length');
var adminPosting = document.querySelector('.admin-posting');
var adminUpdate = document.querySelector('.admin-update');
var adminChkBox = document.querySelector('.admin-check-box');
var adminChk = document.querySelector('.admin-check');
var adminPass = document.querySelector('#admin-pass');
var loading = false;
var password;
var postingData = [];
var postingId;
var image;
var type;
var title;
var count = 1;
var langs = [];
var content;
var link = '';
var github;
var updateData;
var p_langs_backup = [];
var adminType;
var adminParent;
var resetValues = function () {
    image = undefined;
    type = '';
    title = '';
    count = 1;
    langs = [];
    content = '';
    link = '';
    github = '';
};
var initWorld = function () { return __awaiter(void 0, void 0, void 0, function () {
    var projectCount, studyCount, loadingProgression, timer_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api.init()];
            case 1:
                postingData = _a.sent();
                if (!postingData) {
                    alert('서버에 연결에 실패했습니다\n잠시후 다시 시도해주세요');
                    return [2 /*return*/];
                }
                projectCount = 0;
                studyCount = 0;
                postingData.forEach(function (item, idx) {
                    if (item.type === 'project') {
                        var project = component.project(item);
                        var projectList = component.projectList(item, projectCount);
                        p_container.insertAdjacentHTML('beforeend', project);
                        projectNavi.insertAdjacentHTML('beforeend', projectList);
                        projectCount++;
                    }
                    else {
                        var study = component.study(item);
                        var studyList = component.studyList(item, studyCount);
                        s_container.insertAdjacentHTML('beforeend', study);
                        studyNavi.insertAdjacentHTML('beforeend', studyList);
                        studyCount++;
                    }
                    //Admin List
                    var list = component.list(item);
                    adminList.insertAdjacentHTML('beforeend', list);
                });
                p_container.style.width = "calc(100vw * ".concat(projectCount, ")");
                p_total.innerHTML = "".concat(projectCount);
                s_container.style.width = "calc(100vw * ".concat(studyCount, ")");
                s_total.innerHTML = "".concat(studyCount);
                loading = true;
                loadingProgression = 0;
                if (loading) {
                    timer_1 = setInterval(function () {
                        loadingProgression++;
                        loadingBar.style.width = "".concat(loadingProgression, "%");
                        if (loadingProgression >= 100) {
                            clearInterval(timer_1);
                            loadingMain.innerHTML = 'COMPLETE!';
                            loadingComplete();
                        }
                    }, 10);
                }
                return [2 /*return*/];
        }
    });
}); };
var loadingComplete = function () {
    var timer = setTimeout(function () {
        gsap.to(loadingScreen, {
            duration: 0.5,
            opacity: 0,
            onComplete: function () {
                loadingScreen.style.display = 'none';
                loadingBar.style.display = 'none';
                loadingBox.style.display = 'none';
                loadingMain.innerHTML = 'LOADING...';
            },
        });
    }, 1000);
    return function () {
        clearTimeout(timer);
    };
};
//Sounds
var playBgSound = function () {
    if (getTouched())
        return;
    bgSound.src = '../sounds/Background.mp3';
    bgSound.loop = true;
    bgSound.play();
    firstPlay = false;
};
var muteSounds = function () {
    bgSound.muted = true;
};
var unMuteSounds = function () {
    bgSound.muted = false;
};
//Menu toggle controller
var menuController = function () {
    if (getTouched())
        return;
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
            onUpdate: function () {
                cm.camera.updateProjectionMatrix();
            },
            onComplete: function () {
                menuBar.classList.add('show-menu');
                setTimeout(function () {
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
            onUpdate: function () {
                cm.camera.updateProjectionMatrix();
            },
            onComplete: function () {
                menuBar.style.display = 'none';
                setTimeout(function () {
                    setMenuOpen(false);
                }, 300);
            },
        });
    }
};
//Sound toggle controller
var soundController = function () {
    if (getTouched())
        return;
    if (getSoundMuted()) {
        soundImg.style.transform = 'translateX(0)';
        gsap.to(soundBar, {
            duration: 0.1,
            backgroundColor: '#222',
            onComplete: function () {
                gsap.to(soundBar1, {
                    duration: 0.1,
                    opacity: 1,
                    onComplete: function () {
                        soundBar2.style.opacity = '1';
                        if (firstPlay) {
                            playBgSound();
                        }
                        else {
                            unMuteSounds();
                        }
                        setTimeout(function () {
                            setSoundMuted(false);
                        }, 400);
                    },
                });
            },
        });
    }
    else {
        soundBar2.style.opacity = '0';
        gsap.to(soundBar1, {
            duration: 0.1,
            opacity: 0,
            onComplete: function () {
                soundImg.style.transform = 'translateX(7px)';
                gsap.to(soundBar, {
                    duration: 0.1,
                    backgroundColor: '#999',
                    onComplete: function () {
                        muteSounds();
                        setTimeout(function () {
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
var menuSelected = function (item, sectionNumber) {
    item.addEventListener('click', function () {
        menuController();
        var spotPosition = spots[sectionNumber].mesh.position;
        loadingScreen.style.display = 'block';
        gsap.to(loadingScreen.style, {
            duration: 0.5,
            opacity: 1,
            onComplete: function () {
                player.mesh.position.x = spotPosition.x - 1;
                player.mesh.position.z = spotPosition.z - 1;
                cm.camera.position.x = cameraPosition.x + player.mesh.position.x;
                cm.camera.position.z = cameraPosition.z + player.mesh.position.z;
            },
        });
        setTimeout(function () {
            gsap.to(loadingScreen.style, {
                duration: 0.5,
                opacity: 0,
                onComplete: function () {
                    loadingScreen.style.display = 'none';
                },
            });
        }, 1000);
    });
};
var posting = function () {
    adminPrevBtn.style.visibility = 'visible';
    adminPostingBtn.style.visibility = 'hidden';
    adminList.style.display = 'none';
    adminPosting.style.display = 'block';
    image = p_imgSelector.files ? p_imgSelector.files[0] : undefined;
    langs = p_langs_backup;
};
var adminPrev = function () {
    adminPrevBtn.style.visibility = 'hidden';
    adminPostingBtn.style.visibility = 'visible';
    adminList.style.display = 'block';
    adminPosting.style.display = 'none';
    adminUpdate.style.display = 'none';
};
var selectImg = function (type) {
    if (type === 'posting') {
        p_imgSelector.click();
    }
    else {
        u_imgSelector.click();
    }
};
/**
 * @param e
 * @returns when null || e.target.files.length === 0
 *
 * File change event
 */
var changeImg = function (e, type) {
    var _a;
    if (!(e.target instanceof HTMLInputElement))
        return;
    if (!e.target.files || e.target.files.length === 0) {
        return;
    }
    if (e.target.files[0].size > 1024 * 1024 * 3) {
        alert('3MB이하 사진만 업로드 가능합니다');
        return;
    }
    var ext = (_a = e.target.files[0].name.split('.').pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (ext != 'jpg' && ext != 'jpeg' && ext != 'png') {
        alert('이미지만 업로드 가능합니다  (jpg , jpeg , png)');
        return;
    }
    image = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        if (!e.target.result)
            return;
        if (type === 'posting') {
            p_previewText.style.display = 'none';
            previewImg.style.padding = '0';
            previewImg.innerHTML = "<img src=".concat(e.target.result, " />");
        }
        else {
            u_previewText.style.display = 'none';
            updateImg.style.padding = '0';
            updateImg.innerHTML = "<img src=".concat(e.target.result, " />");
        }
    };
    reader.readAsDataURL(image);
};
var inputCount = function (e, type) {
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
var selectLang = function (e, langBox) {
    var dupeChk = langs.indexOf(e.target.value);
    if (langs.length >= 5 || dupeChk >= 0)
        return;
    langs.push(e.target.value);
    langBox.innerHTML = '';
    langs.forEach(function (item) {
        langBox.insertAdjacentHTML('beforeend', "<img class=\"lang-img\" src='/images/langs/".concat(item, ".svg' />"));
    });
    if (langBox.classList.contains('p-lang-img-box'))
        p_langs_backup = langs;
};
var deleteLang = function (e, langBox) {
    var target = e.target;
    if (target.classList.contains('lang-img')) {
        var elements = Array.from(langBox.getElementsByClassName('lang-img'));
        var idx = elements.indexOf(target);
        langs.splice(idx, 1);
        langBox.innerHTML = '';
        langs.forEach(function (item) {
            langBox.insertAdjacentHTML('beforeend', "<img class=\"lang-img\" src='/images/langs/".concat(item, ".svg' />"));
        });
    }
    if (langBox.classList.contains('p-lang-img-box'))
        p_langs_backup = langs;
};
var inputContent = function (e, type) {
    content = e.target.value.trim();
    if (type === 'posting')
        p_contentLength.innerText = content.length.toString();
    if (type === 'update')
        u_contentLength.innerText = content.length.toString();
};
var inputLink = function (e) {
    link = e.target.value.trim();
};
var inputGithub = function (e) {
    github = e.target.value.trim();
};
//Admin password
var openAdminModal = function (type, parent) {
    adminChkBox.style.cssText = 'opacity: 1; visibility: visible';
    adminChk.style.cssText = 'opacity: 1; transform: translateY(0)';
    adminType = type;
    if (parent instanceof HTMLDivElement)
        adminParent = parent;
};
var closeAdminModal = function () {
    password = '';
    adminPass.value = '';
    adminChkBox.style.cssText = 'opacity: 0; visibility: hidden';
    adminChk.style.cssText = 'opacity: 0; transform: translateY(-5vh)';
};
var confirmPassword = function () {
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
var submit = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var formData;
    return __generator(this, function (_a) {
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
            return [2 /*return*/];
        }
        if (title.length > 14) {
            closeAdminModal();
            alert('제목은 최대 14자까지 입니다');
            return [2 /*return*/];
        }
        if (content.length > 1000) {
            closeAdminModal();
            alert('내용은 최대 1000자까지 입니다');
            return [2 /*return*/];
        }
        formData = new FormData();
        formData.append('password', password);
        formData.append('type', type);
        formData.append('title', title);
        formData.append('count', count.toString());
        formData.append('langs', JSON.stringify(langs));
        formData.append('content', content);
        formData.append('link', link);
        formData.append('github', github);
        if (image instanceof File)
            formData.append('image', image);
        if (req === 'posting')
            api.postItem(formData);
        if (req === 'update')
            api.updateItem(postingId, formData);
        return [2 /*return*/];
    });
}); };
var deletePosting = function (deleteBtn) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = deleteBtn.dataset.id;
        if (id) {
            api.deleteItem(parseInt(id), password);
        }
        else {
            return [2 /*return*/];
        }
        return [2 /*return*/];
    });
}); };
var updatePosting = function (updateBtn) {
    resetValues();
    adminPostingBtn.style.visibility = 'hidden';
    adminPrevBtn.style.visibility = 'visible';
    adminList.style.display = 'none';
    adminUpdate.style.display = 'block';
    if (updateBtn instanceof HTMLDivElement) {
        var postingId_1 = updateBtn.dataset.id;
        if (postingId_1) {
            posting_id.value = postingId_1;
            postingData.forEach(function (item) {
                if (item.id == parseInt(postingId_1)) {
                    updateData = item;
                    return;
                }
            });
        }
    }
    //Admin Update
    if (updateData.image) {
        updateImg.style.padding = '0';
        updateImg.innerHTML = "<img src=\"".concat(imgUrl + updateData.image, "\" />");
    }
    else {
        updateImg.style.padding = '2rem';
        updateImg.innerHTML = "\n    <div class=\"p-preview-text\">\n      <div>+</div>\n      <div>\uC0AC\uC9C4 \uCD94\uAC00\uD558\uAE30</div>\n    </div>\n    ";
    }
    var options = u_type.querySelectorAll('option');
    options.forEach(function (item) {
        if (item.value === updateData.type) {
            item.selected = true;
        }
    });
    langs = JSON.parse(updateData.langs);
    u_langBox.innerHTML = '';
    langs.forEach(function (item) {
        u_langBox.insertAdjacentHTML('beforeend', "<img class=\"lang-img\" src='/images/langs/".concat(item, ".svg' />"));
    });
    u_title.value = updateData.title;
    u_count.value = updateData.count.toString();
    u_content.value = updateData.content;
    u_contentLength.innerText = updateData.content.replace(/\r\n/g, '\n').length.toString();
    u_link.value = updateData.link;
    u_github.value = updateData.github;
};
//Open Link
var aboutLink = function (item) {
    if (item instanceof HTMLDivElement) {
        window.open(item.dataset.url);
    }
};
export { initWorld, menuController, soundController, menuSelected, posting, adminPrev, selectImg, inputCount, selectLang, deleteLang, inputContent, inputLink, inputGithub, submit, deletePosting, updatePosting, openAdminModal, confirmPassword, closeAdminModal, adminPass, changeImg, aboutLink, };
