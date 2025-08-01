function initializeScroll() {
  // DOM 요소 선택
  const header = document.querySelector(".ip283_header_type2");
  const kvArea = document.querySelector(".main-visual"); // KV(Key Visual) 영역
  //const secondSection = document.querySelector(".coupon-content"); // 두 번째 섹션

  // 스크롤 관련 변수 초기화
  let lastScrollTop = 0;
  let ticking = false; // requestAnimationFrame 최적화를 위한 플래그
  let isScrollingUp = false;

  // iOS 디바이스 체크
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (header && kvArea) {
    // 스크롤 이벤트 리스너
    window.addEventListener(
      "scroll",
      () => {
        // requestAnimationFrame을 사용한 스크롤 최적화
        if (!ticking) {
          window.requestAnimationFrame(() => {
            // 현재 스크롤 위치 계산
            const currentScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, 0);
            const kvBottom = kvArea.offsetTop + kvArea.offsetHeight;

            // 스크롤 방향 감지
            isScrollingUp = currentScrollTop < lastScrollTop;

            // iOS에서의 바운스 스크롤 처리
            if (isIOS && currentScrollTop <= 0) {
              header.classList.remove("header-hidden", "scrollEffect");
              lastScrollTop = 0;
              ticking = false;
              return;
            }

            // 헤더 동작 처리
            if (currentScrollTop > kvBottom) {
              // KV 영역을 벗어난 경우 헤더 숨김
              header.classList.add("header-hidden");
            } else {
              // KV 영역 내에서의 헤더 동작
              header.classList.remove("header-hidden");
              if (currentScrollTop > 0 && currentScrollTop > lastScrollTop) {
                header.classList.add("scrollEffect"); // 아래로 스크롤 시 효과 추가
              } else {
                header.classList.remove("scrollEffect"); // 위로 스크롤 시 효과 제거
              }
            }

            lastScrollTop = currentScrollTop;
            ticking = false;
          });

          ticking = true;
        }
      },
      { passive: true } // 스크롤 성능 최적화
    );

    // iOS 스크롤 종료 처리
    if (isIOS) {
      let scrollTimeout;
      window.addEventListener(
        "scroll",
        () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            const currentScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, 0);
            const kvBottom = kvArea.offsetTop + kvArea.offsetHeight;

            // iOS에서 스크롤 종료 시 헤더 상태 확인 및 처리
            if (currentScrollTop > kvBottom) {
              header.classList.add("header-hidden");
            }
          }, 150);
        },
        { passive: true }
      );
    }
  }
}

/* 사전 예약 종료용 */
// function initializeScroll() {
//   const header = document.querySelector(".ip283_header_type2");
//   const kvArea = document.querySelector(".main-visual");
//   const secondSection = document.querySelector(".benefit-summary");
//   let lastScrollTop = 0;
//   let ticking = false;
//   const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

//   if (header && kvArea && secondSection) {
//     // 초기 로드 시 체크
//     const checkInitialPosition = () => {
//       const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       const secondSectionTop = secondSection.offsetTop;
//     };

//     // 페이지 로드 시 한 번 실행
//     checkInitialPosition();

//     // 리사이즈 이벤트에도 체크
//     window.addEventListener("resize", checkInitialPosition);

//     window.addEventListener("scroll", () => {
//       const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       const kvBottom = kvArea.offsetTop + kvArea.offsetHeight;

//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           // iOS에서의 바운스 스크롤 처리
//           if (isIOS && currentScrollTop <= 0) {
//             header.classList.remove("header-hidden", "scrollEffect");
//             lastScrollTop = 0;
//             ticking = false;
//             return;
//           }

//           // 헤더 처리
//           if (currentScrollTop > kvBottom) {
//             header.classList.add("header-hidden");
//           } else {
//             header.classList.remove("header-hidden");
//             if (currentScrollTop > lastScrollTop) {
//               header.classList.add("scrollEffect");
//             } else {
//               header.classList.remove("scrollEffect");
//             }
//           }

//           lastScrollTop = currentScrollTop;
//           ticking = false;
//         });

//         ticking = true;
//       }
//     });

//     // iOS 스크롤 종료 처리
//     if (isIOS) {
//       let scrollTimeout;
//       window.addEventListener(
//         "scroll",
//         () => {
//           clearTimeout(scrollTimeout);
//           scrollTimeout = setTimeout(() => {
//             const currentScrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, 0);
//             const kvBottom = kvArea.offsetTop + kvArea.offsetHeight;

//             // iOS에서 스크롤 종료 시 헤더 상태 확인 및 처리
//             if (currentScrollTop > kvBottom) {
//               header.classList.add("header-hidden");
//             }
//           }, 150);
//         },
//         { passive: true }
//       );
//     }
//   }
// }
