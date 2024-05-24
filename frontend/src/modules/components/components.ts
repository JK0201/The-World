import { PostingType } from '../../types';
import { imgUrl } from '../common';

//Project List
const project = (item: PostingType) => {
  const langs: string[] = JSON.parse(item.langs);
  let project = '';
  project += `
  <div class="project-box">
    <div class="project">
      <div class="project-img-box">
        <img class="project-img" src='${item.image ? imgUrl + item.image : '../../images/no-image.svg'}' />
      </div>
      <div class="project-detail">
        <h3>${item.title} [${item.count}명]</h3>
        <div class="stacks">
  `;

  langs.forEach((item) => {
    project += `
    <img src="./images/langs/${item}.svg" />
    `;
  });

  project += `
    </div>
    <div class="project-info">${item.content}</div>
  </div>
  <div class="link-btn-box">
  `;
  if (!item.link) {
    project += `
        <div class="link-btn w-50" data-url="${item.github}">
          <img src="./images/langs/GitHub.png" />
        </div>
      </div>
    </div>
  </div>
  `;
  } else {
    project += `
        <div class="link-btn w-50" data-url="${item.link}">
          <h2>🔗 U R L</h2>
        </div>
          <div class="link-btn w-25" data-url="${item.github}">
            <img src="./images/langs/GitHub.png" />
          </div>
        </div>
      </div>
    </div>
    `;
  }
  return project;
};

//Study List
const study = (item: PostingType) => {
  const langs: string[] = JSON.parse(item.langs);
  let study = '';
  study += `
  <div class="study-box">
    <div class="study">
      <div class="study-img-box">
        <img class="study-img" src="${item.image ? imgUrl + item.image : '../../images/no-image.svg'}" />
      </div>
      <div class="study-detail">
        <h3>${item.title}</h3>
        <div class="stacks">
  `;

  langs.forEach((item) => {
    study += `
    <img src="./images/langs/${item}.svg" />
    `;
  });

  study += `
    </div>
    <div class="study-info">${item.content}</div>
  </div>
  <div class="link-btn-box">
  `;
  if (!item.link) {
    study += `
        <div class="link-btn w-50" data-url="${item.github}">
          <img src="./images/langs/GitHub.png" />
        </div>
      </div>
    </div>
  </div>
  `;
  } else {
    study += `
        <div class="link-btn w-50" data-url="${item.link}">
            <h2>🔗 U R L</h2>
          </div>
          <div class="link-btn w-25" data-url="${item.github}">
            <img src="./images/langs/GitHub.png" />
          </div>
        </div>
      </div>
    </div>
    `;
  }
  return study;
};

//Admin List
const list = (item: PostingType) => {
  let list = '';
  list += `
  <div class="admin-list-item">
    <div class="admin-list-img">
      <img src="${item.image ? imgUrl + item.image : '../../images/no-image.svg'}" />
    </div>
    <div class="admin-list-info">
      <h4>${item.type.toUpperCase()}</h4>
      <h3>${item.title}</h3>
      <p>${item.content.length > 50 ? item.content.substring(0, 50) + '...' : item.content}</p>
      <div class="item-fn">      
        <div id="update-btn" data-id="${item.id}">
          <span>🔨</span>
          <span class="admin-btn-text">UPDATE</span>
        </div>
        <div id="delete-btn" data-id="${item.id}">          
          <span>🗑️</span>
          <span class="admin-btn-text">DELETE</span>
        </div>
      </div>
    </div>
  </div>
  <div class="content-line"></div>
  `;
  return list;
};

//Project Navigation
const projectList = (item: PostingType, projectCount: number) => {
  let projectNavi = `    
    <div>
      <span class='portfolio-navi-elem ${projectCount === 0 ? 'selected-elem' : ''}' data-id=${projectCount}>${
    item.title
  }</span>
    </div>
  `;
  return projectNavi;
};

//Study Navigation
const studyList = (item: PostingType, studyCount: number) => {
  let studyNavi = `
    <div>
      <span class='portfolio-navi-elem' data-id=${studyCount}>${item.title}</span>
    </div>
  `;
  return studyNavi;
};

export { project, study, list, projectList, studyList };
