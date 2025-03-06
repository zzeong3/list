$(function(){
  tl = TweenMax;
  animation();
  functions();
  // scrollTrigger refresh
  window.addEventListener("resize", ScrollTrigger.update);
});
function animation(){
  gsap.registerPlugin(ScrollTrigger);
  //s: home gsap timeline
  tl.to(".home .item-kong", 0.6,{opacity:1,x:'0px', delay:'.5', ease: Power1.easeInOut});
  tl.to(".home .scroll-down", 0.6,{opacity:1,delay:'.7', ease: Power1.easeInOut});
  tl.to(".home .sec__text-box", 0.8,{opacity: 1,scale:'1', y:'0px', delay:'.3', ease: Power1.ease});
  const home = gsap.timeline({
    scrollTrigger: {
      trigger: ".home",
      scroller: window,
      scrub: true,
      pin: true,
      pinSpacing: false, 
      endTrigger: ".function-wrap",
      end: "top top",
      anticipatePin:1,
    },
  });
  home.to(".home", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0,
      start: "top -=75%",
      end: "top top",
      endTrigger: ".function-wrap",
    },
    opacity:0,
  })
  .to(".home .home__bg", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.4,
      start: "top top",
      endTrigger: ".function-wrap",
      end: "top top",
    },
    scale:1.1,
  })
  .to(".sec__logo-kong", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.2,
      start: "top top",  
      end: "top +=80%", 
      endTrigger: ".function-wrap",
    },
    opacity: 0,
    y: '-20px',
  })
  .from(".sec__title", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.3,
      start: "top top",  
      end: "top +=80%", 
      endTrigger: ".function-wrap",
    },
    opacity: 0,
    y: '20px',
  })
  .to(".sec__title", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.3,
      start: "top -=30%",  
      end: "top +=50%", 
      endTrigger: ".function-wrap",
    },
    opacity: 1,
    y: '0px',
  })
  .to(".home .scroll-down", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.3,
      start: "top -=60%",  
      end: "top top", 
      endTrigger: ".function-wrap",
    },
   y:'120%',
  })
  .to(".sec__title", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: 0.3,
      start: "top -=80%",  
      end: "top top", 
      endTrigger: ".function-wrap",
    },
    scale:1.1,
  });

  //s: function gsap timeline
  const deviceBgTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".function-wrap .function__bg",
      scroller: window,
      scrub: true,
      start:"top top",
      endTrigger: ".function-wrap",
      end: "bottom bottom",
      pin:true,
      pinSpacing: false, 
      anticipatePin: 1,
    },
  });	
  deviceBgTimeline.to(".function-wrap .function__bg", {
    opacity:1,
    scrollTrigger: {
      trigger: ".function-wrap",
      scroller: window,
      scrub: 0.2,
      start: "top top",
      end: "center +=10%",
    },
  })
  .to(".function-wrap .function__bg img", {
    y:'-39%',
    scrollTrigger: {
      trigger: ".function-wrap",
      scroller: window,
      scrub: 0.2,
      start: "top top",
    },
  });
}
function functions(){
  //s: KONG 소개 영역
  const scrollingWrap = document.querySelector('.function-cont');
  const deviceItems = document.querySelectorAll('.device-obj__item');
  const scrollingItems = document.querySelectorAll('.function');
  const allButtons = scrollingWrap.querySelectorAll('.function__button');
  const allListItems = scrollingWrap.querySelectorAll('li');
  const allImages = document.querySelectorAll('.device-obj__img');
  // init
  function activateDefaults(index) {
    deviceItems[index].classList.add('is-active');
    const deviceImages = deviceItems[index].querySelectorAll('.device-obj__img');
    deviceImages[0].classList.add('is-active');

    scrollingItems[index].classList.add('is-active');
    const buttons = scrollingItems[index].querySelectorAll('.function__button');
    buttons[0].parentElement.classList.add('is-active');
  }
  //activateDefaults(0);
  // click (button, btnIndex)
  allButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const listItem = button.parentElement;
      const listIndex = Array.from(allListItems).indexOf(listItem);
      allListItems.forEach((li, index) => {
        li.classList.toggle('is-active', index === listIndex);
      });
      allImages.forEach((img, index) => {
        img.classList.toggle('is-active', index === listIndex);
      });
    });
  });
  // device obj (scrollTrigger)
  gsap.timeline({
    scrollTrigger: {
      trigger: ".device-obj",
      scroller: window,
      scrub: true,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      endTrigger: ".function-wrap",
      end: "bottom bottom",
      invalidateOnResize: true,
      invalidateOnRefresh: true,
    },
  });
  // scrolling items (ScrollTrigger)
  // 모든 active 클래스 제거 (초기화)
  function deactivateAll() {
    allListItems.forEach(li => li.classList.remove('is-active'));
    allImages.forEach(img => img.classList.remove('is-active'));
  }
  // 스크롤 진입 영역 내 active 활성화
  function activeScrollingItem(scrollingItem) {
    const firstLi = scrollingItem.querySelector('li');
    if (firstLi) {
      firstLi.classList.add('is-active');
      const firstButton = firstLi.querySelector('.function__button');
      if (firstButton) {
        const btnIndex = Array.from(allButtons).indexOf(firstButton);
        allImages.forEach((img, imgIndex) => {
          img.classList.toggle('is-active', imgIndex === btnIndex);
        });
      }
    }
  }
  // 모든 scrolling-item 비활성화
  function deactivateAllScrollingItems() {
    scrollingItems.forEach(item => item.classList.remove('is-active'));
  }
  function activateDeviceItem(index) {
    deviceItems.forEach(item => item.classList.remove('is-active'));
    if (deviceItems[index]) {
      deviceItems[index].classList.add('is-active');
      const deviceImages = deviceItems[index].querySelectorAll('.device-obj__img');
      if (deviceImages.length > 0) {
        deviceImages[0].classList.add('is-active');
      }
      // device img animation
      tl.staggerTo($(deviceItems[index]), 0.5, {opacity: 1,y:'-50%',ease: Power1.easeInOut});
    }
  }
  // functions scrolltrigger
  scrollingItems.forEach((scrollingItem,index) => {
    ScrollTrigger.create({
      trigger: scrollingItem,
      start: "top center",
      end: 'bottom center',
      endTrigger: scrollingItem,
      onEnter: () => {
        tl.staggerTo(scrollingItem.querySelector(".sec__text-box"), 0.5, {opacity: 1,y:'0', ease: Power1.easeInOut});
        tl.staggerTo(scrollingItem.querySelectorAll("li"), 0.5,  {opacity: 1, y:'0', ease: Power1.easeInOut},0.1);
        deactivateAll();
        deactivateAllScrollingItems();
        scrollingItem.classList.add('is-active');
        activeScrollingItem(scrollingItem);
        activateDeviceItem(index);
      },
      onLeave: () => {
        const firstLi = scrollingItem.querySelector('li');
        if (firstLi) {
          firstLi.classList.remove('is-active');
        }
      },
      onEnterBack: () => {
        deactivateAll();
        deactivateAllScrollingItems();
        scrollingItem.classList.add('is-active');
        activeScrollingItem(scrollingItem);
        activateDeviceItem(index);
      },
      onLeaveBack: () => {
        const firstLi = scrollingItem.querySelector('li');
        if (firstLi) {
          firstLi.classList.remove('is-active');
        }
      }
    });
  });
}

// header 고정
const topHeader = document.querySelector('.header');
window.onscroll = function () {
    let windowTop = window.scrollY;

    if (windowTop > 0) {
        topHeader.classList.add("scroll");
    }
    else {
        topHeader.classList.remove("scroll");
    }
};