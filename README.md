<img src="https://capsule-render.vercel.app/api?type=waving&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=100&section=header&text=&fontSize=0" width="100%"/>
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=500&pause=10000&color=58A6FF&center=true&random=false&width=435&lines=The World" alt="Typing SVG" />
  </a>
  <p>[ 2023.06.30 - 2023.08.06 ]</p>
  <p>인원 : 1명</p>
  
  [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JK0201/Devster-final)
  [![URL](https://img.shields.io/badge/url-222222.svg?style=for-the-badge&logo=homeadvisor&logoColor=white)](https://mynameisjk.com)
</div>

## Overview
- The World는 "춘식이의 관찰일기"를 모티브로 개발된 3D 기반의 개인용 인터랙티브 포트폴리오 사이트입니다. ThreeJS를 활용해 웹상에서 생동감 있는 3D 모델을 렌더링하며, Spring과 JPA를 이용하여 서버를 구현했습니다. Docker를 사용한 배포 환경 구축과 CI/CD 파이프라인을 통한 자동 배포 설정을 완료했습니다. 이 프로젝트의 주요 목표는 사용자가 사이트에 방문했을 때 흥미를 유발하여 더 오래 머무르게 만드는 것으로, 이를 통해 사용자 경험을 극대화하고 단순 정보 전달을 넘어 방문자에게 강렬한 인상을 남길 수 있는 포트폴리오 사이트를 제공하는 것입니다.
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
  <br>

## 문제점 및 개선점
  <details>
    <summary><b>문제점 (Version 1.0)</b></summary>
    <ul>
      <li>컨트롤러에 모든 기능이 집중되어 있어 코드 유지보수 및 재사용성이 떨어짐</li>
      <li>유효성 검사를 클라이언트에서만 수행하여 보안 취약점이 존재함</li>
      <li>JavaScript로 클라이언트에서만 소셜 로그인을 처리하여 토큰 노출 위험 및 코드 유출로 인한 보안 취약점</li>
      <li>JavaScript코드가 모듈화 되지 않아 유지 보수 및 가독성이 떨어짐</li>
      <li>기존 SSR(Server-Side Rendering) 방식의 v1.0은 페이지 전환이 매끄럽지 않아 사용자 경험을 제한함</li>
      <li>전역 변수를 체계적으로 관리하지 못해 상태 관리의 일관성이 떨어짐</li>
    </ul>
  </details>

  <details>
    <summary><b>개선점 (Version 2.0)</b></summary>
    <ul>
      <li>서비스 레이어로 기능을 분리하고 컨트롤러 본연의 역할을 할 수 있도록 분리하여 코드의 유지보수성을 높이고 재사용성을 향상 시킴</li>
      <li>서버 측 유효성 검사를 추가하여 보안 강화</li>
      <li>소셜 로그인 처리를 서버 측으로 이전하여 보안성을 강화하고, 리다이렉트를 통해 사용자 경험을 향상</li>
      <li>CSR(Client-Side Rendering) 방식인 React를 사용하여 SPA(Single Page Application) 방식을 통해 페이지 전환을 매끄럽게 하여 사용자 경험을 향상 </li>
      <li>Redux를 도입하여 전역 변수를 효율적으로 관리하고 상태 관리의 일관성을 높임</li>
    </ul>
  </details>  
<br>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:16213E,10:0F3460,30:533483,75:5B2A86,100:E94560&height=40&section=footer&text=&fontSize=0" width="100%"/>
