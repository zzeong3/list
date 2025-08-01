function initializeSwiper() {
  // 가격 스와이퍼 (price)
  // 가격 스와이퍼와 메인 비주얼 스와이퍼 연동
  const mainVisual = document.querySelector(".main-visual");
  const priceSwiper = document.querySelector(".price-swiper");
  const mainVisualSwiper = document.querySelector(".main-visual-swiper");
  const bgSwiper = document.querySelector(".bg-swiper");

  if (mainVisual) {
    setTimeout(() => {
      // 가격 스와이퍼 초기화
      const priceSwiperInstance = new Swiper(priceSwiper, {
        direction: "horizontal",
        loop: true,
        autoplay: {
          delay: 1000, // 1초 딜레이
          disableOnInteraction: true, // 터치시 자동 슬라이드 정지
        },
        speed: 700,
        effect: "creative",
        creativeEffect: {
          prev: {
            translate: [0, "-50%", 0],
            opacity: 0,
          },
          next: {
            translate: [0, "50%", 0],
            opacity: 0,
          },
        },
        allowTouchMove: true,
      });

      // 메인 비주얼 스와이퍼 초기화
      const mainSwiperInstance = new Swiper(mainVisualSwiper, {
        direction: "horizontal",
        loop: true,
        effect: "creative",
        creativeEffect: {
          prev: {
            translate: [0, "-50%", 0],
            opacity: 0,
          },
          next: {
            translate: [0, "50%", 0],
            opacity: 0,
          },
        },
        allowTouchMove: true,
      });

      // bg 스와이퍼 초기화
      const bgSwiperInstance = new Swiper(bgSwiper, {
        direction: "horizontal",
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        allowTouchMove: true,
      });

      priceSwiperInstance.controller.control = [mainSwiperInstance];
      mainSwiperInstance.controller.control = [priceSwiperInstance];
    }, 1500);
  }

  // 컬러 스와이퍼 초기화
  const colorSwiper = document.querySelector(".color-swiper");
  if (colorSwiper) {
    // 개별 컬러 스와이퍼 초기화 함수
    function initColorSwiper(element) {
      if (element.swiper) {
        element.swiper.destroy(true, true);
      }

      return new Swiper(element, {
        direction: "horizontal",
        loop: true,
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        observer: true,
        observeParents: true,
        on: {
          init: function () {
            this.slideTo(0, 0);
          },
        },
      });
    }

    // 모든 컬러 스와이퍼 초기화 함수
    function initializeAllColorSwipers() {
      const allSwipers = document.querySelectorAll(".color-swiper");
      allSwipers.forEach((element) => {
        if (element && element.querySelector(".swiper-wrapper")) {
          initColorSwiper(element);
        }
      });
    }

    // 초기 컬러 스와이퍼 초기화
    initializeAllColorSwipers();
  }

  // Lucky Draw 메인 스와이퍼
  const prizeDisplayEl = document.querySelector(".prize-display-swiper");
  if (prizeDisplayEl) {
    const prizeDisplaySwiper = new Swiper(".prize-display-swiper", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      speed: 600,
      allowTouchMove: false,
    });

    // Lucky Draw 썸네일 스와이퍼
    const prizeThumbsSwiper = new Swiper(".prize-thumbs-swiper", {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: "row",
      },
      spaceBetween: 12,
      loop: false,
      watchSlidesProgress: true,
      allowTouchMove: true,
    });

    // 썸네일 클릭 시 메인 이미지 변경 및 모션 효과
    const thumbSlides = document.querySelectorAll(".prize-thumbs-swiper .swiper-slide");
    thumbSlides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        // 클릭한 썸네일에 active 클래스 추가
        thumbSlides.forEach((s) => s.querySelector(".thumb-item").classList.remove("active"));
        slide.querySelector(".thumb-item").classList.add("active");

        // 메인 이미지 전환
        prizeDisplaySwiper.slideTo(index);

        // 클릭한 슬라이드의 이미지 flip
        const mainSlideImg = prizeDisplayEl.querySelector(`.swiper-slide:nth-child(${index + 1}) img`);
        mainSlideImg.classList.add("flipped");

        // 3초 후 flip 제거
        setTimeout(() => {
          mainSlideImg.classList.remove("flipped");
        }, 200);
      });
    });
  }

  const strengthSwipers = document.querySelectorAll(".strength-swiper");
  if (strengthSwipers.length) {
    strengthSwipers.forEach((element) => {
      new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });
  }

  /*
  const benefitSwipers = document.querySelectorAll(".benefit-swiper");
  if (benefitSwipers.length) {
    benefitSwipers.forEach((element) => {
      new Swiper(element, {
        slidesPerView: "auto",
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 40,
      });
    });
  }
  */
}
