$(function(){
  history.scrollRestoration = "manual";
  tl = TweenMax;
	//popup();
	header();
  //sticky();
  ani();
});
function popup(){
  let evtPopup = document.getElementById('evt-popup');
  let closePopupBtn = evtPopup.querySelector('.popup__close');
 /* let homeOffset = document.querySelector(".function-cont").offsetTop;
  window.addEventListener('scroll', () => {
    if(window.scrollY > homeOffset){
      evtPopup.style.display = 'none';
    }else{
      evtPopup.style.display = 'block';
    }
  });*/
  tl.to(evtPopup, 0.6, {opacity: 1, y:'0%', delay:1, ease: Power1.easeInOut,
    onComplete:function() {
        evtPopup.style.display = 'block';
      }
  });
  closePopupBtn.addEventListener('click', function() {
    tl.to(evtPopup, 0.4, {opacity: 0, y:'100%',ease: Power1.easeInOut,
    onComplete:function() {
        evtPopup.style.display = 'none';
      }
    });
  });
}
function header() {
  let headHeight = $("header").outerHeight(true);
  
  //allmenu
  let body = document.querySelector("body");
  let btnGnb = document.querySelector(".header__btn-gnb");
  let allmenu = document.querySelector("#allmenu");
  let btnClose = document.querySelector("#allmenu .btn-close");
  btnGnb.addEventListener('click', function (e) {
    allmenu.style.display = 'block';
    allmenu.classList.add("is-active");
    body.classList.add("is-active");
    allmenu.classList.remove("close");
    tl.staggerFromTo($("#allmenu li"), 0.7, { opacity: 0, y: '40px' }, { opacity: 1, y: 0, delay:0.2, ease: Power1.easeInOut }, .07);
  });
  btnClose.addEventListener('click', function (e) {
    allmenu.classList.add("close");
    allmenu.classList.remove("is-active");
    body.classList.remove("is-active");
    setTimeout(() => {
      allmenu.style.display = 'none';
    }, 400);
  });
  
  $(".header__nav-button").on("click", function (e) {
      e.preventDefault();
      let targetSection = $(this.hash);
      let sectionTop = targetSection.offset().top - headHeight;
      let scrollToPosition = (targetSection.selector === '#home') ? 0 : sectionTop;
      $("html, body").stop().animate({
          scrollTop: scrollToPosition
      }, 800);
      allmenu.classList.add("close");
      allmenu.classList.remove("is-active");
      body.classList.remove("is-active");
      setTimeout(() => {
        allmenu.style.display = 'none';
      }, 400);
  });
  $(window).scroll(function(){
    var $thisTop = $(this).scrollTop();
    $("section").each(function(index){
      var attr = $(this).attr("id");
      var sectionTop = $(`#${attr}`).offset().top - headHeight;
      var sectionHeight = $(`#${attr}`).outerHeight(true);
      if($thisTop >= sectionTop-(sectionHeight/2)){
        $(".header__nav-menu").removeClass("is-active");
        $(".header__nav-list li:eq("+index+") .header__nav-button[href*='#"+attr+"']").parent("li").addClass("is-active");
      }
    });
  });
  $(window).load(function(e){
    showTarget(window.location.hash);
  });
  function showTarget(target) {
    target = target.replace('#', '');
    if (target) {
      $('html, body').animate({
        scrollTop: $(`#${target}`).offset().top - (headHeight + 10)
      }, 200);
    }
  }
}

function sticky(){
  function checkOffset() {
    let a = $(document).height() - $(window).height();
    let b = $('footer').height();
    scroll = $(window).scrollTop();
    if (scroll > a - b) {
      $("#sticky .sticky__cont").css("position", "absolute").addClass('on');
    } else {
      $("#sticky .sticky__cont").css("position", "fixed").removeClass('on');;
    }
  }
  $(document).ready(checkOffset);
  $(document).scroll(checkOffset);
}

function ani(){
  let $animation_elements = $('.ani');
  let $window = $(window);
  function check_if_in_view() {
    let window_height = $window.height();
    let window_top_position = $window.scrollTop();
    let window_bottom_position = (window_top_position + window_height);
    $.each($animation_elements, function() {
      let $element = $(this);
      let element_height = $element.outerHeight();
      let element_top_position = $element.offset().top+200;
      let element_bottom_position = (element_top_position + element_height);
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('is-active');
      } else {
        //$element.removeClass('in-view');
      }
    });
  }
  $window.on('scroll resize', check_if_in_view);
  $window.trigger('scroll');
}