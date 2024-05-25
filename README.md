<img src="https://capsule-render.vercel.app/api?type=waving&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=100&section=header&text=&fontSize=0" width="100%"/>
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=500&pause=10000&color=58A6FF&center=true&random=false&width=435&lines=The World" alt="Typing SVG" />
  </a>
  <p>[ 2024.04.02 - 업데이트 중 ]</p>
  <p>인원 : 1명</p>
  
  [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JK0201/Devster-final)
  [![URL](https://img.shields.io/badge/url-222222.svg?style=for-the-badge&logo=homeadvisor&logoColor=white)](https://mynameisjk.com)
</div>

## Overview
- The World는 "춘식이의 관찰일기"를 모티브로 개발된 3D 기반의 개인용 인터랙티브 포트폴리오 사이트입니다. ThreeJS를 활용해 웹상에서 생동감 있는 3D 모델을 렌더링하고, Spring과 JPA를 이용하여 서버를 구현했습니다. 또한 Docker를 사용한 배포 환경 구축과 CI/CD 파이프라인을 통한 자동 배포 설정을 완료했습니다. 이 프로젝트의 주요 목표는 사용자가 사이트에 방문했을 때 흥미를 유발하여 더 오래 머무르게 만드는 것으로, 이를 통해 사용자 경험을 극대화하고 단순 정보 전달을 넘어 방문자에게 강렬한 인상을 남길 수 있는 포트폴리오 사이트를 제공하는 것입니다.
<br>

## 주요 기술
<div style=display:flex>
  <img src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" />
  <img src="https://img.shields.io/badge/jpa-222222.svg?style=for-the-badge&logo=buffer&logoColor=white" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" />
</div>
<br>

## 주요 작업
  <details>
    <summary><b>3D 모델링 작업 및 적용</b></summary>
    <ul>
      <li>Blender를 사용하여 3D 모델 제작</li>
      <li>ThreeJS를 사용하여 웹 상에서 3D 모델을 캔버스에 렌더링하고, 사용자와 상호작용할 수 있는 인터페이스 구현</li>
    </ul>
  </details>
  
  <details>
    <summary><b>프론트엔드 개발 및 모듈화</b></summary>
    <ul>
      <li>코드 재사용성과 유지보수를 위해 함수 및 변수를 모듈화하여 관리</li>
      <li>Class 문법을 활용하여 3D 인스턴스 생성 및 전역 관리</li>
      <li>HTML 페이지를 구성하고, 동적으로 생성되는 HTML을 컴포넌트로 분리하여 관리</li>
    </ul>
  </details>

  <details>
    <summary><b>백앤드 개발 및 데이터 관리</b></summary>
    <ul>
      <li>PostgreSQL과 JPA 초기 설정 및 Entity를 사용하여 데이터베이스와 연결</li>
      <li>초기 서버 구동 시 환경변수에 주입된 Admin 비밀번호를 CommandLineRunner 인터페이스를 활용해 Bcrypt와 Salt로 암호화 하여 저장</li>
      <li>Admin 비밀번호 검증을 통해 특정 사용자만 CRUD 요청 가능하도록 구현</li>
      <li>CRUD 요청에 대한 사용자 입력 정보 유효성 검사 기능 구현</li>
      <li>업로된 이미지에 대한 유효성 검사를 실행하고 서버에 저장 및 삭제 기능 구현</li>
      <li>ExceptionHandler를 사용하여 요청에 대해 HTTP status code로 응답해 사용자에게 피드백 하도록 구현</li>
    </ul>
  </details>

  <details>
    <summary><b>Docker</b></summary>
    <ul>
      <li>Docker를 사용하여 애플리케이션을 컨테이너화하고, 배포 환경을 설정</li>
      <li>docker-compose.yml을 작성하여 여러 컨테이너의 설정 및 관리를 자동화</li>
      <li>데이터의 영속성을 위해 서버와 volume mount를 하여 데이터 보존</li>
      <li>Docker Network를 활용하여 컨테이너 간의 통신을 효율적으로 관리</li>
      <li>CPU와 Memory 사용량에 제한을 두어 리소스 관리 최적화</li>
      <li>Certbot을 사용하여 SSL 인증서 자동 갱신 구현</li>
    </ul>
  </details>

  <details>
    <summary><b>3Tier 아키텍쳐</b></summary>
    <ul>
      <li>클라이언트, 서버, 데이터베이스 간의 명확한 분리를 통해 보안성과 확장성을 향상</li>
      <li>서버 요청을 Nginx로 처리하여 유저가 직접 서버나 데이터베이스에 접근하지 못하도록 Reverse Proxy 구현</li>
      <li>Nginx 설정을 통해 HTTP 요청을 HTTPS로 리다이렉트하여 보안 강화</li>
    </ul>
  </details>

  <details>
    <summary><b>배포 및 CI/CD</b></summary>
    <ul>
      <li>GitHub Actions를 사용하여 코드 변경 시 자동으로 빌드 및 배포되도록 각 계층별 Workflow를 작성하고 개인용 홈서버와 파이프라인 설정</li>
      <li>민감한 정보를 안전하게 관리하기 위해 Github Secrets를 사용하여 보안 강화</li>
    </ul>
  </details>

  <details>
    <summary><b>서버 보안 및 관리</b></summary>
    <ul>
      <li>Ubuntu 기반 개인용 홈서버를 구축하여 애플리케이션을 배포하고 관리하는 환경 구축</li>
      <li>SSH를 로컬 네트워크 환경에서만 접속할 수 있도록 설정하여 보안 강화</li>
      <li>Fail2ban을 적용하여 외부로 부터의 악의적인 SSH 접속 시도 차단</li>
      <li>데이터의 안정성을 높이기 위해 RAID1 구성으로 데이터 복제(Mirroring) 구현 및 배포한 어플리케이션과 volume mount를 적용</li>
      <li>Nginx와 도메인을 연결하고, 포트포워딩을 통해 HTTP/HTTPS 접근 설정</li>
      <li>SSL 인증서를 받아서 HTTPS 연결을 통해 웹사이트의 보안 강화</li>
      <li>유동 IP 환경에서 안정적인 도메인 연결을 위해 공유기의 DDNS(Dynamic DNS) 기능을 활용하여 도메인과 매핑</li>
    </ul>
  </details>
  <br>

## Outro
  <details>
    <summary><b>느낀점</b></summary>
    <ul>
      <li>해당 프로젝트를 진행하면서 프론트엔드, 백엔드, 배포, 그리고 서버 관리까지 전반적인 개발 단계를 개별적으로 경험할 수 있었습니다. 다양한 기술 스택을 활용하면서 발생한 여러 문제들을 해결하는 과정은 문제 식별 및 해결 능력을 크게 향상시켰고, 전체 시스템을 개별적으로 설계하고 구현하는 과정을 통해 통합적인 시각과 유연한 대응 능력을 키울 수 있었던 뜻깊은 경험이었습니다.</li>
      <li>ThreeJS를 활용해 3D 모델링과 웹 개발을 결합하는 과정에서 프론트엔드 개발의 새로운 가능성을 배울 수 있었습니다. 3D 모델링, 애니메이션, 렌더링 최적화 등의 기술적 도전을 극복하며 복잡한 문제 해결 능력을 크게 향상시킬 수 있었고, 웹 개발의 창의적이고 혁신적인 측면을 이해하는 데 큰 도움이 되었습니다.</li>
      <li>ExceptionHandler를 사용해 예외 상황을 관리하는 법을 배울 수 있었습니다. 각 상황에 적합한 HTTP status code와 명확한 메시지를 서버에서 보내줌으로써, 개발하는 동안 문제의 원인을 쉽게 파악할 수 있었습니다. 또한 사용자에게 상황에 맞는 피드백을 제공하여 사용자 경험을 극대화할 수 있다는 점을 통해 전반적인 에러 처리의 중요성을 깨달았습니다.</li>
      <li>Docker와 GitHub Actions를 사용하여 CI/CD 파이프라인을 구축하면서, 현대 개발 프로세스에서 DevOps의 중요성을 직접 경험할 수 있었습니다. 컨테이너를 통한 서비스 분리와 자동화된 워크플로우 구현으로 코드 변경 사항을 신속하게 배포할 수 있었고, 개발 효율성을 크게 향상시킬 수 있었습니다.</li>
      <li>부트캠프에서 Naver Cloud Platform(NCP)을 사용하면서 과금 문제를 경험하니, 나만의 서버를 가지고 싶다는 욕구가 생겼습니다. 남는 컴퓨터 부품을 활용해 Ubuntu 기반의 홈서버를 구축하고 운영해 보면서, 서버 관리와 보안의 중요성을 직접 경험할 수 있었습니다. 처음으로 나만의 서버를 가지게 되어 매우 기뻤으며, 앞으로 다양한 서비스를 추가해 보고 싶다는 의욕이 생겼습니다.</li>
    </ul>
  </details>
<br>

## Patch Notes
  <details>
    <summary><h4>v 1.0.0</h4></summary>
    <ul>
      <li>The World 프로젝트 최초 배포</li>
    </ul>
  </details>

  <details>
    <summary><h4>v 1.1.0</h4></summary>
    <ul>
      <li>API 서버 추가</li>
      <li>3Tier 아키텍쳐 추가</li>
    </ul>
    <b>Comment</b>
    <br>
    포트폴리오 게시판을 유연하게 관리하기 위해 API 서버를 구축하여 Admin만 사용가능하도록 설정했습니다.
    <br>
    3Tier 아키텍쳐를 통해 데이터베이스 보안을 강화하고, 클라이언트와 서버 간의 명확한 역할 분리를 통해 유지보수성과 확장성을 높이기 위해 적용했습니다.
  </details>

  <details>
    <summary><h4>v 1.1.1</h4></summary>
    <ul>
      <li>Resume, Biography 내용 추가 및 디자인 수정</li>
    </ul>
  </details>

  <details>
    <summary><h4>v 1.2.0</h4></summary>
    <ul>
      <li>HTTP/HTTPS 적용</li>
      <li>CI/CD 파이프라인 구축</li>
    </ul>
    <b>Comment</b>
    <br>
    HTTPS 적용으로 사용자 데이터의 안전성을 확보하고, CI/CD 파이프라인 구축으로 개발 효율성을 극대화하여 빠른 배포를 가능하도록 했습니다.
  </details>

  <details>
    <summary><h4>v 1.2.1</h4></summary>
    <ul>
      <li>포트폴리오 게시판 목차 메뉴 추가</li>
      </ul>
      <b>Comment</b>
      <br>
      사용자 경험을 향상시키기 위해 직관적인 내비게이션 기능을 추가하여 각 항목 간의 이동을 쉽게 만들도록 했습니다.
  </details>

  <details>
    <summary><h4>v 1.2.2</h4></summary>
    <ul>
      <li>디자인 수정</li>
    </ul>
  </details>

  <details>
    <summary><h4>Coming up patch</h4></summary>
    <ul>
      <li>각 게시판 상호작용 3D 모델 추가</li>
    </ul>
  </details>
<br>
<img src="https://capsule-render.vercel.app/api?type=rect&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=40&section=footer&text=&fontSize=0" width="100%"/>
