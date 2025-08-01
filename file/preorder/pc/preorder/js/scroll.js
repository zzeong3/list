// function initializeScroll() {
//   const header = document.querySelector(".ip283_header_type2");
//   const kvArea = document.querySelector(".main-visual");
//   const secondSection = document.querySelector(".coupon-content");
//   const unpackedPreorderCoupon = document.querySelector(".unpacked-preorder-coupon");
//   let lastScrollTop = 0;

//   if (header && kvArea && (secondSection || unpackedPreorderCoupon)) {
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

//       // 헤더 처리
//       if (currentScrollTop > kvBottom) {
//         header.classList.add("header-hidden");
//       } else {
//         header.classList.remove("header-hidden");
//         if (currentScrollTop > lastScrollTop) {
//           header.classList.add("scrollEffect");
//         } else {
//           header.classList.remove("scrollEffect");
//         }
//       }

//       lastScrollTop = currentScrollTop;
//     });
//   }
// }

// 사전 예약 종료용
function initializeScroll() {
  const header = document.querySelector(".ip283_header_type2");
  const kvArea = document.querySelector(".main-visual");
  const secondSection = document.querySelector(".benefit-summary");
  let lastScrollTop = 0;

  if (header && kvArea && secondSection) {
    // 초기 로드 시 체크
    const checkInitialPosition = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const secondSectionTop = secondSection.offsetTop;
    };

    // 페이지 로드 시 한 번 실행
    checkInitialPosition();

    // 리사이즈 이벤트에도 체크
    window.addEventListener("resize", checkInitialPosition);

    window.addEventListener("scroll", () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const kvBottom = kvArea.offsetTop + kvArea.offsetHeight;

      // 헤더 처리
      if (currentScrollTop > kvBottom) {
        header.classList.add("header-hidden");
      } else {
        header.classList.remove("header-hidden");
        if (currentScrollTop > lastScrollTop) {
          header.classList.add("scrollEffect");
        } else {
          header.classList.remove("scrollEffect");
        }
      }

      lastScrollTop = currentScrollTop;
    });
  }
}
