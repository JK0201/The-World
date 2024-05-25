import { imgUrl } from '../common';
//Project List
var project = function (item) {
    var langs = JSON.parse(item.langs);
    var project = '';
    project += "\n  <div class=\"project-box\">\n    <div class=\"project\">\n      <div class=\"project-img-box\">\n        <img class=\"project-img\" src='".concat(item.image ? imgUrl + item.image : '../../images/no-image.svg', "' />\n      </div>\n      <div class=\"project-detail\">\n        <h3>").concat(item.title, " [").concat(item.count, "\uBA85]</h3>\n        <div class=\"stacks\">\n  ");
    langs.forEach(function (item) {
        project += "\n    <img src=\"./images/langs/".concat(item, ".svg\" />\n    ");
    });
    project += "\n    </div>\n    <div class=\"project-info\">".concat(item.content, "</div>\n  </div>\n  <div class=\"link-btn-box\">\n  ");
    if (!item.link) {
        project += "\n        <div class=\"link-btn w-100\" data-url=\"".concat(item.github, "\">\n          <img src=\"./images/langs/GitHub.png\" />\n          <h3 class=\"github-link-text\">Github</h3>\n        </div>\n      </div>\n    </div>\n  </div>\n  ");
    }
    else {
        project += "\n        <div class=\"link-btn w-70\" data-url=\"".concat(item.link, "\">\n          <h3>U R L</h3>\n        </div>\n          <div class=\"link-btn w-25\" data-url=\"").concat(item.github, "\">\n            <img src=\"./images/langs/GitHub.png\" />\n          </div>\n        </div>\n      </div>\n    </div>\n    ");
    }
    return project;
};
//Study List
var study = function (item) {
    var langs = JSON.parse(item.langs);
    var study = '';
    study += "\n  <div class=\"study-box\">\n    <div class=\"study\">\n      <div class=\"study-img-box\">\n        <img class=\"study-img\" src=\"".concat(item.image ? imgUrl + item.image : '../../images/no-image.svg', "\" />\n      </div>\n      <div class=\"study-detail\">\n        <h3>").concat(item.title, "</h3>\n        <div class=\"stacks\">\n  ");
    langs.forEach(function (item) {
        study += "\n    <img src=\"./images/langs/".concat(item, ".svg\" />\n    ");
    });
    study += "\n    </div>\n    <div class=\"study-info\">".concat(item.content, "</div>\n  </div>\n  <div class=\"link-btn-box\">\n  ");
    if (!item.link) {
        study += "\n        <div class=\"link-btn w-100\" data-url=\"".concat(item.github, "\">\n          <img src=\"./images/langs/GitHub.png\" />\n          <h3 class=\"github-link-text\">Github</h3>\n        </div>\n      </div>\n    </div>\n  </div>\n  ");
    }
    else {
        study += "\n        <div class=\"link-btn w-70\" data-url=\"".concat(item.link, "\">\n          <h3>U R L</h3>\n          </div>\n          <div class=\"link-btn w-25\" data-url=\"").concat(item.github, "\">\n            <img src=\"./images/langs/GitHub.png\" />\n          </div>\n        </div>\n      </div>\n    </div>\n    ");
    }
    return study;
};
//Admin List
var list = function (item) {
    var list = '';
    list += "\n  <div class=\"admin-list-item\">\n    <div class=\"admin-list-img\">\n      <img src=\"".concat(item.image ? imgUrl + item.image : '../../images/no-image.svg', "\" />\n    </div>\n    <div class=\"admin-list-info\">\n      <h4>").concat(item.type.toUpperCase(), "</h4>\n      <h3>").concat(item.title, "</h3>\n      <p>").concat(item.content.length > 50 ? item.content.substring(0, 50) + '...' : item.content, "</p>\n      <div class=\"item-fn\">      \n        <div id=\"update-btn\" data-id=\"").concat(item.id, "\">\n          <span>\uD83D\uDD28</span>\n          <span class=\"admin-btn-text\">UPDATE</span>\n        </div>\n        <div id=\"delete-btn\" data-id=\"").concat(item.id, "\">          \n          <span>\uD83D\uDDD1\uFE0F</span>\n          <span class=\"admin-btn-text\">DELETE</span>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"content-line\"></div>\n  ");
    return list;
};
//Project Navigation
var projectList = function (item, projectCount) {
    var projectNavi = "    \n    <div>\n      <span class='portfolio-navi-elem ".concat(projectCount === 0 ? 'selected-elem' : '', "' data-id=").concat(projectCount, ">").concat(item.title, "</span>\n    </div>\n  ");
    return projectNavi;
};
//Study Navigation
var studyList = function (item, studyCount) {
    var studyNavi = "\n    <div>\n      <span class='portfolio-navi-elem' data-id=".concat(studyCount, ">").concat(item.title, "</span>\n    </div>\n  ");
    return studyNavi;
};
export { project, study, list, projectList, studyList };
