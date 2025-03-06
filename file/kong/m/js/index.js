$(function(){
  tl = TweenMax;
  functions();
  animation();
});
function resetHeight(){
  $('.home .sec__inner').css('height', $(window).innerHeight());
}
window.addEventListener("resize", resetHeight);
resetHeight();

function animation(){
  gsap.registerPlugin(ScrollTrigger);
  //s: home
  tl.to(".home .item-kong", 0.6,{opacity:1, y:'0', delay:.6, ease: Power1.easeInOut});
  tl.to(".home .sec__text-box", 1.2,{opacity: 1, delay:.2, ease: Power1.ease});
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
      scrub: true,
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
      scrub: true,
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
      scrub: true,
      start: "top top",  
      end: "top +=80%", 
      endTrigger: ".function-wrap",
    },
    opacity: 0,
    y: '-20px',
  })
  .from(".sec__title figure", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: true,
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
      scrub: true,
      start: "top -=30%",  
      end: "top +=50%", 
      endTrigger: ".function-wrap",
    },
    opacity: 1,
    y: '0px',
  })
  .to(".sec__title", {
    scrollTrigger: {
      trigger: "#wrap",
      scroller: window,
      scrub: true,
      start: "top -=80%",  
      end: "top top", 
      endTrigger: ".function-wrap",
    },
    scale:1.1
  });

  //s: function
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
      scrub: true,
      start: "top top",
      end: "center +=10%",
    },
  })
  .to(".function-wrap .function__bg img", {
    marginTop:'-30%',
    scrollTrigger: {
      trigger: ".function-wrap",
      scroller: window,
      scrub: true,
      start: "top top",
      endTrigger: ".function-wrap",
      end: "bottom bottom",

    },
  });
  
  window.addEventListener('resize', () => {
      ScrollTrigger.refresh(); 
  });
}
function functions(){
  //s: KONG 소개 영역
  let swiperObj = [];
  let sliderItems = document.querySelectorAll('.function__list');
  let prevArrow = document.querySelectorAll('.function__list .btn.prev');
  let nextArrow = document.querySelectorAll('.function__list .btn.next');
  let pagination = document.querySelectorAll('.function__list .pagination');
  sliderItems.forEach((slider, index, thisArg) => {
      swiperObj.push(new Swiper(slider, {
      initialSlide: thisArg[index].dataset.initialslide ?? 0,
      direction: 'horizontal',
      loop: false,
      navigation: {
        nextEl: [nextArrow[index]],
        prevEl: [prevArrow[index]],
      },
      pagination: {
        el: [pagination[index]],
        type: "fraction",
      },
      speed:300,
      slidesPerView: 1,
      slidesPerGroup: 1,
      observer: true,
      observeParents: true,
      watchSlidesVisibility: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
    }));
  });
}