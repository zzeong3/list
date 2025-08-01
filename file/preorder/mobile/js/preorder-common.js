const MoveT = (function () {
  return {
    preorder: function () {
      var hiddenUrl;
      const urlParams = new URL(location.href).search;
      hiddenUrl = "https://www.lguplus.com/mypage/prebook" + urlParams;
      $("#btnStep3").attr({
        "data-gtm-click-url": hiddenUrl,
      });

      window.open(hiddenUrl, "_blank");
    },

    iPhone16Pro: function () {
      var hiddenUrl;
      const urlParams = new URL(location.href).search;
      console.log(urlParams);
      hiddenUrl = "https://www.lguplus.com/mobile/device/apple/iphone-16-pro-256gb/UIP16PR-256" + urlParams;
      console.log(hiddenUrl);
      $("#btnStep3").attr({
        "data-gtm-click-url": hiddenUrl,
      });

      window.open(hiddenUrl, "_blank");
    },

    iPhone16ProMax: function () {
      var hiddenUrl;
      const urlParams = new URL(location.href).search;
      console.log(urlParams);
      hiddenUrl = "https://www.lguplus.com/mobile/device/apple/iphone-16-promax-256gb/UIP16PM-256" + urlParams;
      console.log(hiddenUrl);
      $("#btnStep3").attr({
        "data-gtm-click-url": hiddenUrl,
      });

      window.open(hiddenUrl, "_blank");
    },

    iPhone16: function () {
      var hiddenUrl;
      const urlParams = new URL(location.href).search;
      console.log(urlParams);
      hiddenUrl = "https://www.lguplus.com/mobile/device/apple/iphone-16-256gb/UIP16-256" + urlParams;
      console.log(hiddenUrl);
      $("#btnStep3").attr({
        "data-gtm-click-url": hiddenUrl,
      });

      window.open(hiddenUrl, "_blank");
    },

    iPhone16Plus: function () {
      var hiddenUrl;
      const urlParams = new URL(location.href).search;
      console.log(urlParams);
      hiddenUrl = "https://www.lguplus.com/mobile/device/apple/iphone-16-plus-256gb/UIP16PL-256" + urlParams;
      console.log(hiddenUrl);
      $("#btnStep3").attr({
        "data-gtm-click-url": hiddenUrl,
      });

      window.open(hiddenUrl, "_blank");
    },
  };
})();

function changeReqPreCnt() {
  $.ajax({
    url: "/presale/changeReqPreCnt",
    data: "",
    type: "POST",
    cache: false,
    success: function (data) {
      var d_start = data.data3;
      var d_gap = data.data2 - d_start;
      var d_min = data.data2 - 50;
      if (d_min > d_gap) {
        $("#reqPReCnt").attr("data-start", d_min);
      } else {
        $("#reqPReCnt").attr("data-start", d_start);
      }
      //$("#reqPReCnt").attr('data-start', data.data3);
      $("#reqPReCnt").attr("data-end", data.data2);
      //$("#reqPReCnt").html(data.data2);
    },
    error: function () {
      alert("오류가 발생하였습니다.");
    },
  });
}

/**
 * 모달 상태를 전역적으로 관리하는 유틸리티 객체
 * 모달의 초기화, 스타일 관리, backdrop 처리 등을 담당
 */
const ModalUtils = {
  /**
   * 모달 초기화 - 기본 설정을 지정
   * keyboard: false - ESC 키로 닫기 방지
   * backdrop: 'static' - 배경 클릭으로 닫기 방지
   * show: false - 초기에는 표시하지 않음
   */
  initModal: function ($modal) {
    $modal.modal({
      keyboard: false,
      backdrop: "static",
      show: false,
    });
  },

  /**
   * body 스크롤 제어
   * 모달 열릴 때는 스크롤 방지(hidden)
   * 모달 닫힐 때는 스크롤 복원(style 제거)
   */
  setBodyStyle: function (hidden = true) {
    if (hidden) {
      $("body").css("overflow", "hidden");
    } else {
      $("body, html").removeAttr("style");
    }
  },

  /**
   * 모달 backdrop(배경) 처리
   * show: backdrop 표시 및 애니메이션 클래스 추가
   * hide: backdrop 제거
   * isSpecial: 특수 모달의 경우 'over' 클래스 추가
   */
  handleBackdrop: function (action, isSpecial = false) {
    if (action === "show") {
      $(".modal-backdrop").addClass("in");
      if (isSpecial) $(".modal-backdrop").addClass("over");
    } else {
      $(".modal-backdrop").removeClass("in over").remove();
    }
  },

  /**
   * 특수하게 처리해야 하는 모달인지 확인
   * 특수 모달: 다른 모달과 다르게 동작해야 하는 모달들
   * (예: 마케팅 동의, 알림 중지 등)
   */
  isSpecialModal: function (modalId) {
    const specialModals = [
      "myModalaler_order_stop3",
      "myModalaler_alarm_stop",
      "myModalalert_marketAgree",
      "myModalalert_reserve",
    ];
    return specialModals.includes(modalId);
  },
};

/**
 * 모달 팝업을 여는 함수
 * @param {string} mId - 열고자 하는 모달의 ID
 */
function modalAlertPop(mId) {
  const $modal = $("#" + mId);
  const isSpecialModal = ModalUtils.isSpecialModal(mId);

  // 모달 기본 설정 초기화
  ModalUtils.initModal($modal);

  /**
   * 모달이 표시될 때 한 번만 실행되는 이벤트 설정
   * setTimeout: 모달 표시 애니메이션이 시작된 후 backdrop 처리
   */
  $modal.one("show.bs.modal", function () {
    setTimeout(() => {
      ModalUtils.handleBackdrop("show", isSpecialModal);
      ModalUtils.setBodyStyle(true);
    }, 0);
  });

  /**
   * 닫기 버튼 이벤트 처리
   * 이전 이벤트 제거 후 새로 바인딩하여 중복 실행 방지
   */
  $modal
    .find(".close, .close-over")
    .off("click")
    .on("click", function () {
      modalAlertClose(mId);
    });

  // 모달 표시
  $modal.modal("show");

  if (mId == "myModalaler_order_stop") {
    $(".modal-backdrop.in").addClass("over");
  }
}
/**
 * 모달 창 닫기
 * @param {string} mId - 닫으려는 모달의 ID
 */
function modalAlertClose(mId) {
  const $modal = $("#" + mId);
  const isSpecialModal = ModalUtils.isSpecialModal(mId);

  // 모달 닫기 전 처리
  $modal.one("hidden.bs.modal", function () {
    // 특수 모달일 경우 메인 모달 유지
    if (isSpecialModal) {
      $("#myModal01").modal("show");
    }
  });

  // 모달 상태 초기화
  $modal.removeClass("in").modal("hide");

  // backdrop 제거
  ModalUtils.handleBackdrop("hide");

  // body 스타일 초기화
  ModalUtils.setBodyStyle(false);
}

function closeVideo(videoId) {
  console.log(videoId);
  var iframe = $("#" + videoId).find("iframe")[0];
  var src = $(iframe).attr("src");
  $(iframe).attr("src", src);
}

/** 문자열 공백 검사 */
String.prototype.isEmpty = function () {
  return !this.match(/\S/);
};

window.lastScrollY = 0;

// var chatBotUse = 'N';
var callChk;

$(document).ready(function () {
  // 스크롤 복원 기능 비활성화
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // 새로고침 시 스크롤을 최상단으로 이동
  window.scrollTo(0, 0);

  /* Dropdown Menu */
  $(".dropdown").click(function () {
    $(this).attr("tabindex", 1).focus();
    $(this).toggleClass("active");
    $(this).children(".select").toggleClass("on");
    $(this).find(".dropdown-menu").slideToggle(300);
  });

  $(".dropdown .dropdown-menu li").click(function () {
    $(this).find(".dropdown-menu").slideUp(300);
    /* $(this).parents('.dropdown').find('span').html($(this).children('.tabnew').html()); */
    $(this).parents(".dropdown").find("span").text($(this).text());
  });

  // float버튼 때문에 footer 여백 조절
  $("#footer").css("padding-bottom", "60px");

  var top_gnb = $(".title .gnb_list.index_list");
  var top_gnb_logo = $(top_gnb).find("span");
  var top_gnb_subD = $(".gnb_subDepth");

  $(top_gnb_logo).on("click", function () {
    top_gnb.toggleClass("on");
    if (top_gnb.hasClass("on")) {
      top_gnb_subD_open();
    } else {
      top_gnb_subD_close();
    }
  });

  function top_gnb_subD_open() {
    $(".gnb_subDepth ul").show().stop().animate({ top: "-1px" }, 300, "easeInOutExpo");
  }
  function top_gnb_subD_close() {
    $(".gnb_subDepth ul").show().stop().animate({ top: "-60px" }, 300, "easeInOutExpo");
  }

  $(window).scroll(function () {
    // 서브 메뉴 오픈상태 스크롤시 닫힘
    var header_gnb = $(".ip283_header_type2");
    if (header_gnb.hasClass("on")) {
      $(".gnb_list.index_list").removeClass("on");
      top_gnb_subD_close();
    }
  });

  /* GNB 서브 아코디언 메뉴 */
  $(".menu_list .gnb_list li > a").on("click", function () {
    var list = $(this).parent("li");
    var list_ul = $(this).parent(".gnb_list");

    if (list_ul.hasClass("on") === true) {
      list.children(".subDepth").slideUp(600, "easeOutQuint");
      list.parent(".gnb_list").removeClass("on");
      $(".gnb_subDepth").removeClass("active");
    } else {
      list.parent(".gnb_list").toggleClass("on");
      list.siblings("li").find("a").removeClass("on");
      list.find("a").toggleClass("on");
      $(".gnb_subDepth").addClass("active");
      list.find(".subDepth").slideToggle(600, "easeOutQuint");
      list.siblings("li").find(".subDepth").slideUp(600, "easeOutQuint");
    }
  });

  // 화산귀환 인덱스일때 조건
  var now = window.location.href;
  console.log(now);

  if (now.includes("edition")) {
    $(".gnb_list .fold_li").hide();
    $(".gnb_list .edition_li").css("display", "flex");
    $(".gnb_subDepth .foldable").css("display", "block");
    $(".gnb_subDepth .foldable_ed").css("display", "none");
    $(".ip283_header_type2").addClass("edition_gnb");
    $(".pre-menu-list").addClass("edition_meun");
    $("#btnAlarm").css("display", "none");
    $("#btnEdition").css("display", "block");
    $(".quickWrap .qBox.booking4").css("display", "none");
    //$("header.header_alarm.ip283_header_type2").css('display','none');
  } else if (now.includes("coming")) {
    // 커밍순 페이지 일때
    //$("header.ip283_header_type2").css('display','none');
    //$("header.header_alarm.ip283_header_type2").css('display','block');
    $("#btnEdition").css("display", "none");
    $("#btnAlarm").css("display", "none");
    $(".ip283_cp").addClass("coming");
    $(".quickWrap").css("display", "none");
  } else {
    $("#btnAlarm").css({ display: "block", "z-index": "999" });
    $("#btnEdition").css("display", "none");
    $(".quickWrap .qBox.booking4").css("display", "block");

    //$("header.ip283_header_type2").css('display','block');
    //$("header.header_alarm.ip283_header_type2").css('display','none');
  }

  // tab wrap
  $(".section-object-wrap .tab_wrap li").click(function () {
    var activeTab = $(this).attr("data-tab");
    $(".tab_wrap li").removeClass("active");
    $(".tab_cont").removeClass("active");
    $(this).addClass("active");
    $("#" + activeTab).addClass("active");
  });
  // tab wrap
  // inner_tab_wrap
  $(".section-object-wrap .inner_tab_wrap.inner1 li").click(function () {
    var activeTab = $(this).attr("data-tab");
    $(".inner_tab_wrap.inner1 li").removeClass("active");
    $(".inner_tab_cont.inner1").removeClass("active");
    $(this).addClass("active");
    $("#" + activeTab).addClass("active");
  });
  // inner_tab_wrap2
  $(".section-object-wrap .inner_tab_wrap.inner2 li").click(function () {
    var activeTab = $(this).attr("data-tab");
    $(".inner_tab_wrap.inner2 li").removeClass("active");
    $(".inner_tab_cont.inner2").removeClass("active");
    $(this).addClass("active");
    $("#" + activeTab).addClass("active");
  });
  // modal-tab
  $(".modal-tab_wrap li").click(function () {
    var activeTab = $(this).attr("data-tab");
    $(".modal-tab_wrap li").removeClass("active");
    $(".modal-tab_cont").removeClass("active");
    $(this).addClass("active");
    $("#" + activeTab).addClass("active");
  });

  $(".tabs.detail li").click(function () {
    var activeTab = $(this).attr("data-tab");
    var i = $(this).closest("li").index();
    $(".tabs.detail li").removeClass("tc-selected");
    $(".tabs.detail li").removeClass("tc-selected");
    $(this).addClass("tc-selected");
    $(this).parent().next().find(".group").removeClass("show").eq(i).addClass("show");
    $("#" + activeTab).addClass("show");
  });

  /* 모달, 팝업 등등 예외처리 230703 ios 구별 */
  var ios;

  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
    ios = true;
  } else {
    ios = false;
  }

  $(".ev_btn.btn_run").click(function () {
    if (ios) {
      $("html").attr("style", "overflow:hidden !important; height:100%");
      $("body").attr("style", "overflow:hidden !important; height:100%");
    } else {
      setTimeout(function () {
        $("body").attr("style", "overflow:hidden !important");
      }, 100);
    }
  });

  $(".event_box .checkGift").click(function () {
    if (ios) {
      $("html").attr("style", "overflow:hidden !important; height:100%");
      $("body").attr("style", "overflow:hidden !important; height:100%");
    } else {
      setTimeout(function () {
        $("body").attr("style", "overflow:hidden !important; height:100%");
      }, 100);
    }
  });

  $(".circle_btn.btn-more").click(function () {
    if (ios) {
      $("html").attr("style", "overflow:hidden !important; height:100%");
      $("body").attr("style", "overflow:hidden !important; height:100%");
    } else {
      setTimeout(function () {
        $("body").attr("style", "overflow:hidden !important; height:100%");
      }, 100);
    }
  });
  /* 230703 ios 구별 끝 */
  $(".main-keyVisual .inner a").click(function () {
    if ($(this).hasClass("exceptBtn")) {
    } else {
      $("#wrap").hide();
    }
  });

  $(".goOtherOrder").click(function () {
    $("#wrap").hide();
  });

  $(".order_step a").click(function () {
    $("#wrap").hide();
  });

  $("#eventResult .btn_close_pop").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });

  $("#confirmGift .btn_confirm").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });

  $("#failPopup .btn_confirm").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });

  $("#alreadyWin .btn_close_pop").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });
  $("#alarmEvtModal .close").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });
  $("#modalForm01 .close").click(function () {
    $("body").attr("style", "");
    $("html").attr("style", "");
  });

  /* //모달, 팝업 등등 예외처리 */

  var element_position = 0;
  if ($(".contBox.tab-wrap").length > 0) {
    element_position = $(".contBox.tab-wrap").offset().top - 65;
  }

  // page tab fixed
  $(window).scroll(function () {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = element_position;

    if (y_scroll_pos > scroll_pos_test) {
      $(".contBox.tab-wrap").addClass("on");
      $("#content").addClass("floatingOn");
    } else if (y_scroll_pos < scroll_pos_test) {
      $(".contBox.tab-wrap").removeClass("on");
      $("#content").removeClass("floatingOn");
    }
  });

  // 페이지 tab 20180808
  $(".tab-wrap ul li button").on("click", function () {
    var i = $(this).closest("li").index();
    $(".tab-wrap ul li").removeClass("selected").eq(i).addClass("selected");
    $(".contBox.tab-content").removeClass("show").eq(i).addClass("show");
    $(window).scrollTop("0");
  });

  // modal 수정 (IOS 이슈)
  var btnModal = $("a[data-toggle=modal]");
  var btnCloseBook = $(".modal-header .close");

  btnModal.click(function () {
    window.lastScrollY = window.scrollY;
    $(window).scrollTop(0);
    if (
      /* $(this).attr('data-target') == "#myModal01" || */ // '사전예약하기' 모달은
      // 따로 처리합니다.
      $(this).attr("data-target") == "#myModal02" ||
      $(this).attr("data-target") == "#myModal03" ||
      $(this).attr("data-target") == "#myModal04" ||
      $(this).attr("data-target") == "#view360"
      /* || $(this).attr('data-target') == "#myModal05" */ // '사전예약 한 눈에
      // 보기' 모달은 따로
      // 처리합니다.
    ) {
      $("#wrap").hide();
    }
  });

  // inner_tab_wrap2
  /*$('ul.inner_tab_wrap.inner2 li').click(function() {
        var activeTab = $(this).attr('data-tab');
        $('.inner_tab_wrap.inner2 li').removeClass('active');
        $('.inner_tab_cont.inner2').removeClass('active');
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');
    })*/

  // 옵션 선택
  $(".sel_opt li button").on("click", function () {
    var $choiceLi = $(this).closest("li");
    if ($choiceLi.hasClass("disable")) {
      return false;
    } else {
      $choiceLi.addClass("on").siblings("li").removeClass("on");
    }

    // 색상 선택 시 텍스트 변경
    var $choiceUl = $(this).closest(".sel_opt");
    $choiceUl.parent().find(".on_txt").text($(this).text());
  });

  // 약관 열기/닫기
  $(document).on("click", ".pre_list .btnToggle", function () {
    var agreeBox = $(this).parents(".pre_list").find(".agreeBox");

    if (agreeBox.is(":visible")) {
      agreeBox.slideUp(200);
      $(this).removeClass("on");
    } else {
      agreeBox.slideDown(200);

      $(this).addClass("on");
    }
    return false;
  });

  /* 약관 열기/닫기(리뉴얼 이후 이벤트에서만 사용, 사용 필요할 경우 else 주석 해제 후 사용) */
  $(".pre_tit .pre_toggle").on("click", function () {
    var txtBox = $(this).parent().next(".pre_txt");

    if (txtBox.is(":visible")) {
      txtBox.slideUp(200);
      if ($(this).closest(".modal").hasClass("_event")) {
        $(this).removeClass("on");
      } else {
        // $(this).removeClass('on').text('읽어보기');
      }
    } else {
      txtBox.slideDown(200);
      if ($(this).closest(".modal").hasClass("_event")) {
        $(this).addClass("on");
      } else {
        // $(this).addClass('on').text('닫기');
      }
    }
    return false;
  });

  // 스펙비교하기 리스트 선택
  $(document).on("click", ".spec_sel .spec_tit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    if ($(this).parent().find(".sel_list").is(":visible")) {
      $(this).parent().find(".sel_list").hide();
    } else {
      $(this).parent().find(".sel_list").show();
    }
    if ($(".sel_list").is(":visible")) {
      $(document).one("click", function () {
        $(".sel_list").hide();
      });
      return false;
    }
    $(this).off("click");
  });

  $(document).on("click", ".sel_list a", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var $el_id = $(this).attr("href");

    if ($(this).parent().hasClass("on")) {
      return false;
    } else {
      $(this).parents(".spec_list").find($el_id).addClass("on").siblings("li").removeClass("on");
      $(this).parents(".sel_list").hide();
    }
  });

  // GNB 메뉴보기
  $(document).on("click", ".menu a", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#btnAlarm").css("z-index", 0);

    if ($(".menu").hasClass("close")) return;
    setTimeout(openGnb, 1);
  });
  $(document).on("click", ".menu.close a", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#btnAlarm").css("z-index", 999);
  });

  // GNB 메뉴닫기
  $(document).on("click", ".menu.close a", function (e) {
    e.preventDefault();
    e.stopPropagation();

    setTimeout(closeGnb, 1);
  });

  $(".menu.close a").focusin(function (e) {
    e.preventDefault();
  });
  // 매장 지도 페이징 포커스
  /*
   * $(document).on('click', '.pagination a', function(e){ $('html
   * ,body').scrollTop(0); });
   */
  /* Quick menu */
  $(".btnTop").click(function () {
    console.log("a");
    $("html, body").animate({ scrollTop: 0 }, 300);
    return false;
  });

  var img_w = $(".kv_visual_img2 .obj2").width();
  $(".kv_visual_img2 .obj2").find(".cover img").width(img_w);
  setTimeout(function () {
    $(".kv_visual_img2 .obj2 .cover").addClass("on");
  }, 1000);

  console.log(img_w);

  $(".allchk").on("click", function () {
    if ($(this).is(":checked")) {
      $(".allchk").hasClass("allchk on");
      $(".chkBx").prop("checked", true);
      $(".step-complete").addClass("is-checked");
      $("#btn_step4").attr("disabled", false);
    } else {
      $(".allchk").hasClass("allchk");
      $(".chkBx").prop("checked", false);
      $(".step-complete").removeClass("is-checked");
      $("#btn_step4").attr("disabled", true);
    }
  });

  $(".chkBx").on("click", function () {
    var targetId = $(this).attr("id");

    // 약관 > 필수 약관 클릭 시 상단 약관 동의 시 사전 알람 신청 완료 버튼 활성화
    if (targetId == "alram_agree01") {
      if ($(this).is(":checked")) {
        $(".step-complete").addClass("is-checked");
        $("#btn_step4").removeAttr("disabled");
      } else {
        $(".step-complete").removeClass("is-checked");
        $("#btn_step4").attr("disabled", "disabled");
      }
    }

    var is_checked = true;
    $(".chkBx").each(function () {
      is_checked = is_checked && $(this).is(":checked");
    });

    $(".allchk").prop("checked", is_checked);
  });

  $(".chkBx2").on("click", function () {
    var targetId = $(this).attr("id");
    console.log(targetId);
    //14세 미만일경우 >>> 약관동의 활성화 비활성화 작업
    if (targetId == "alram_lglrps_agree01") {
      if ($(this).is(":checked")) {
        $("#certification_under14_btn").removeAttr("disabled");
        $("#certification_under14_btn").show();
      } else {
        $("#certification_under14_btn").attr("disabled", "disabled");
        $("#certification_under14_btn").hide();
      }
    }

    if (targetId == "preorder_lglrps_agree01") {
      if ($(this).is(":checked")) {
        $("#preorder_footer_btn4").removeAttr("disabled");
      } else {
        $("#preorder_footer_btn4").attr("disabled", "disabled");
      }
    }
  });

  /* index js로 이동 
	 * $(".device-detail > button").on('click',function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).next().hide();
		}else{
			$(".device-detail > button").removeClass("active");
			$(".device-detail > button").next().hide();
			$(this).addClass("active");
			$(this).next().show();
		}
		return false;
	});*/
  $("#accordion2 .accordion-item > a").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      $(this).next().hide();
    } else {
      $("#accordion2 .accordion-item > a").removeClass("on");
      $("#accordion2 .accordion-item > a").next().hide();
      $(this).addClass("on");
      $(this).next().show();
    }
    return false;
  });

  var audio = document.getElementById("edition_audio");
  var isPlaying = false;

  $(".sound-btn").click(function () {
    console.log("before audio check == ", isPlaying);
    var targetEl = $(this);

    if (isPlaying) {
      targetEl.removeClass("off");
      targetEl.addClass("on");
      audio.pause();
    } else {
      targetEl.removeClass("on");
      targetEl.addClass("off");
      audio.play();
    }
    isPlaying = !isPlaying;

    console.log("after audio check == ", isPlaying);

    audio.addEventListener("ended", function () {
      targetEl.removeClass("off");
      targetEl.addClass("on");
      isPlaying = false;
    });
  });
});

function getScrollY() {
  lScrollY = $(document).scrollTop();
}
function setScrollY() {
  $("html, body").scrollTop(lScrollY);
}
function isGnbStat() {
  return $(".gnbBg").length;
}

function openGnb() {
  getScrollY();

  windowH = $(window).height();
  menuH = $(window).height() - $("header").height();

  $("header").addClass("open");
  // $('.menu_list').css({height:menuH+'px'});
  $(".menu").addClass("close");
  $(".menu_list").css("bottom", -menuH);
  $("body").css({ overflow: "hidden", height: "100%" });
  $("html").css({ overflow: "hidden", height: "100%" });
  // $('#btnAlarm').css({'overflow': 'hidden', 'height': '100%'});
  $('<span class="gnbBg"></span>').appendTo($("body"));
  subGnb();
  removeActive();
}

function closeGnb() {
  $("header").removeClass("open");
  $(".menu").removeClass("close");
  $(".menu_list").css("bottom", 0);
  $(".menu").focus();
  $("body").attr("style", "");
  $("html").attr("style", "");
  // iOS 바디 스크롤 막기 풀기
  $("#wrap").off("touchmove");
  $(".gnbBg").remove();

  setScrollY();
}
function subGnb() {
  $(".gnb_list.index_list li").on("click", function () {
    closeGnb();
  });
}
function removeActive() {
  $(".gnb_list.index_list li").removeClass("on");
  $(".gnb_subDepth ").removeClass("active");
}
$(window).on("scroll", function () {
  /* gnb */
  var nowScroll = $(this).scrollTop();

  if (nowScroll >= 100) {
    $("header").addClass("on");
  } else {
    $("header").removeClass("on");
  }
});

function getQuerystring(paramName) {
  var _tempUrl = window.location.search.substring(1); // url에서 처음부터 '?'까지 삭제
  var _tempArray;
  if (_tempUrl) {
    _tempArray = _tempUrl.split("&"); // '&'을 기준으로 분리하기
    for (var i = 0; i < _tempArray.length; i++) {
      var _keyValuePair = _tempArray[i].split("="); // '=' 을 기준으로 분리하기
      if (_keyValuePair[0] == paramName) {
        // _keyValuePair[0] : 파라미터 명
        // //
        // _keyValuePair[1] : 파라미터 값
        return _keyValuePair[1];
      }
    }
  }
  return "";
}

/* GNB 메뉴 페이지 인식*/
$(function () {
  // var path = window.location.pathname.replace(/^\/|\/$/g, ""); // 앞뒤 슬래시 제거
  // var queryString = window.location.search;

  var fullPath = window.location.pathname.replace(/^\/|\/$/g, "");
  var pathSegments = fullPath.split("/");
  var path = pathSegments.slice(-2).join("/"); // 항상 마지막 2개 조합 사용
  var queryString = window.location.search;

  // 정확한 alarm 문자열 매칭
  if (path === "preorder" || queryString === "?preorder") {
    PreorderCtrl.open();
    return;
  }

  // 정확한 경로 매칭을 위한 매핑
  var pathMap = {
    // 플립
    "benefit/double-storage": "preorder-double-storage",
    "benefit/device": ".model-select-wrp",
    "benefit/coupon": ".preorder-coupon20",
    "benefit/raffle": ".preorder-gold",
    "benefit/ai": ".preorder-ai",
    "benefit/discount": ".preorder-simple",
    "benefit/summary": ".benefit-summary",
    "benefit/service": ".preorder-howto",
    "benefit/samsung": ".preorder-howto.samsung",
    "benefit/uplus": ".one-minute-section.uplus",
    "benefit/upgrade": ".one-minute-section.upgrade",
    "double-storage": ".today-benefit-content",
    // 플립
    "fold7/benefit/double-storage": "preorder-double-storage",
    "fold7/benefit/device": ".model-select-wrp",
    "fold7/benefit/coupon": ".preorder-coupon20",
    "fold7/benefit/raffle": ".preorder-gold",
    "fold7/benefit/ai": ".preorder-ai",
    "fold7/benefit/discount": ".preorder-simple",
    "fold7/benefit/summary": ".benefit-summary",
    "fold7/benefit/service": ".preorder-howto",
    "fold7/benefit/samsung": ".preorder-howto.samsung",
    "fold7/benefit/uplus": ".one-minute-section.uplus",
    "fold7/benefit/upgrade": ".one-minute-section.upgrade",
    "fold7/double-storage": ".today-benefit-content",
    raffle: ".lucky-draw",
    delivery: ".s25_counter",
    uplus: ".advantages-section",
    samsung: ".samsung-benefit-section",
    summary: ".benefit-summary",
    "summary/pick": {
      action: function () {
        var target = $(".ai-uplus-1");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("ai-uplus-1");
        }
      },
    },
    "summary/support": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-1");
        }
      },
    },
    "summary/coupon": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-2");
        }
      },
    },
    "summary/sello": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-3");
        }
      },
    },
    "summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-1");
        }
      },
    },
    "summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-2");
        }
      },
    },
    "summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-3");
        }
      },
    },
    "summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-4");
        }
      },
    },
    "summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-1");
        }
      },
    },
    "summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-2");
        }
      },
    },
    "summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-3");
        }
      },
    },
    "summary/live": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(4)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-benefit-1");
        }
      },
    },
    "summary/gift": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(4)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-benefit-2");
        }
      },
    },
    "summary/ai-club": {
      action: function () {
        var target = $(".preorder-howto");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-howto-1");
        }
      },
    },
    "fold7/summary/pick": {
      action: function () {
        var target = $(".ai-uplus-1");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("ai-uplus-1");
        }
      },
    },
    "fold7/summary/support": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-1");
        }
      },
    },
    "fold7/summary/coupon": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-2");
        }
      },
    },
    "fold7/summary/sello": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(1)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("price-discount-3");
        }
      },
    },
    "fold7/summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-1");
        }
      },
    },
    "fold7/summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-2");
        }
      },
    },
    "fold7/summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-3");
        }
      },
    },
    "fold7/summary/nerget": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(2)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("recomm-benefit-4");
        }
      },
    },
    "fold7/summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-1");
        }
      },
    },
    "fold7/summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-2");
        }
      },
    },
    "fold7/summary/card": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(3)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("samsung-benefit-3");
        }
      },
    },
    "fold7/summary/live": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(4)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-benefit-1");
        }
      },
    },
    "fold7/summary/gift": {
      action: function () {
        var target = $(".benefit-group:nth-of-type(4)");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-benefit-2");
        }
      },
    },
    "fold7/summary/ai-club": {
      action: function () {
        var target = $(".preorder-howto");
        if (target.length) {
          var absolutePosition = target.offset().top - 200;
          window.scrollTo(0, absolutePosition);
          bottomSheet("uplus-howto-1");
        }
      },
    },
    notice: {
      action: function () {
        window.scrollTo(0, document.documentElement.scrollHeight);
      },
    },
  };

  // 정확한 경로 매칭 -  pathMap 객체에 해당 path가 존재하는지 확인
  if (pathMap.hasOwnProperty(path)) {
    // 페이지 로드 완료 후 실행되도록 수정
    $(document).ready(function () {
      var pathConfig = pathMap[path];
      // 바텀시트 관련 경로인 경우 action 실행
      if (typeof pathConfig === "object" && pathConfig.action) {
        pathConfig.action();
      } else {
        var target = $(pathConfig);
        // 요소를 찾지 못한 경우
        if (target.length) {
          var absolutePosition = target.offset().top - 70;
          window.scrollTo(0, absolutePosition);
        }
      }
    });
  }
});

function bnf_btmSheet_open() {
  $(".bnf_bottomSheet").stop().animate(
    {
      bottom: 0,
      opacity: "1",
    },
    250,
    "easeInOutExpo"
  );
  $(".btm_sheet-dim").show();
  $("body").css("overflow", "hidden");
}
function bnf_btmSheet_close() {
  $(".bnf_bottomSheet").stop().animate(
    {
      bottom: "-200vh",
      opacity: "0",
    },
    250,
    "easeInOutExpo"
  );
  $(".btm_sheet-dim").hide();
  $("html,body").removeAttr("style");
}
function bnf_btn_show() {
  $("#btnAlarm.type2 .float_bnf--btn").stop().delay("600").animate(
    {
      bottom: "73px",
      opacity: "1",
    },
    1000,
    "easeInOutExpo"
  );
}
function bnf_btn_hide() {
  $("#btnAlarm.type2 .float_bnf--btn").stop().animate(
    {
      bottom: "-73px",
    },
    200,
    "easeInOutExpo"
  );
}
function open_policy() {
  $("#policyModal").modal();
}
function open_policy_new() {
  $("#policyModal").modal();
}

bnf_btn_show();

//푸터 카운터 스크립트2244
function initializeCounter(targetDate, elementIds) {
  var dday = new Date(targetDate).getTime(); // End time
  var timer = setInterval(function () {
    var now = new Date().getTime(); // Current time
    var distance = dday - now;

    if (distance < 1000) {
      // Countdown finished
      clearInterval(timer);
      $("#" + elementIds.secondsTens).attr("class", "num0");
    } else {
      var d = Math.floor(distance / (1000 * 60 * 60 * 24)); // Days
      var h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Hours
      var m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Minutes
      var s = Math.floor((distance % (1000 * 60)) / 1000); // Seconds

      // For days, do not add a leading zero if it's a single digit
      var d1 = d < 10 ? String(d) : String(d); // No leading zero for days (e.g. "9" instead of "09")

      // For hours, minutes, and seconds, add leading zero if needed
      var h1 = (h < 10 ? "0" : "") + h;
      var m1 = (m < 10 ? "0" : "") + m;
      var s1 = (s < 10 ? "0" : "") + s;

      updateHtml(elementIds, d1, h1, m1, s1);
    }
  }, 1000);
}

function updateHtml(ids, d, h, m, s) {
  $("#" + ids.daysTens)
    .html(d)
    .attr("class", "num" + d);
  $("#" + ids.daysUnits)
    .html("")
    .attr("class", "num" + ""); // Empty for days units to avoid leading zero
  $("#" + ids.hoursTens)
    .html(h[0])
    .attr("class", "num" + h[0]);
  $("#" + ids.hoursUnits)
    .html(h[1])
    .attr("class", "num" + h[1]);
  $("#" + ids.minutesTens)
    .html(m[0])
    .attr("class", "num" + m[0]);
  $("#" + ids.minutesUnits)
    .html(m[1])
    .attr("class", "num" + m[1]);
  $("#" + ids.secondsTens)
    .html(s[0])
    .attr("class", "num" + s[0]);
  $("#" + ids.secondsUnits)
    .html(s[1])
    .attr("class", "num" + s[1]);
}

function startCounter(startDate, endDate, elementIds, wrapperClass) {
  $(wrapperClass).show(); // Show the countdown wrapper
  var st = setInterval(function () {
    var startday = new Date(startDate).getTime(); // Start time
    var nowday = new Date().getTime(); // Current time
    var start = startday - nowday;

    if (start < 1000) {
      // Start date has passed, begin countdown to the end date
      initializeCounter(endDate, elementIds);
      clearInterval(st); // Stop checking for the start date
    }
  }, 1000);
}

// Element IDs configuration for counter2
const elementIds2 = {
  daysTens: "d1",
  daysUnits: "d0",
  hoursTens: "h1",
  hoursUnits: "h0",
  minutesTens: "m1",
  minutesUnits: "m0",
  secondsTens: "s1",
  secondsUnits: "s0",
};

// Element IDs configuration for counter3
const elementIds3 = {
  daysTens: "d1_1",
  daysUnits: "d0_0",
  hoursTens: "h1_1",
  hoursUnits: "h0_0",
  minutesTens: "m1_1",
  minutesUnits: "m0_0",
  secondsTens: "s1_1",
  secondsUnits: "s0_0",
};

const elementIds4 = {
  daysTens: "d111",
  daysUnits: "d000",
  hoursTens: "h111",
  hoursUnits: "h000",
  minutesTens: "m111",
  minutesUnits: "m000",
  secondsTens: "s111",
  secondsUnits: "s000",
};

// 푸터 카운터
startCounter("Jun 24,2025,00:00:00", "Jul 21,2025,23:59:59", elementIds2, ".timerWrap.ty2.box-countdown");
// 혜택 요약 카운터
startCounter("Jun 24,2025,00:00:00", "Jul 21,2025,23:59:59", elementIds3, ".timerWrap.ty2.bnf_timer");

startCounter("July 31,2024,12:00:00", "Jul 14,2025,23:59:59", elementIds4, ".timerWrap.ty2.alarm");

/* scroll 이벤트 동작 안하는 문제 수정 */
$(document).ready(function () {
  $("#wrap").css("height", "auto");

  if (!$("#content").hasClass("commingPage")) {
    /* 퀵메뉴 스크롤 이벤트 */
    /* console.log('퀵메뉴 스크립트 작동'); */
    /*
     * $(window).on('scroll', function(){ var quickScroll =
     * $(this).scrollTop();
     *
     * console.log(quickScroll)
     *
     * if (quickScroll > 100) { $(".ubot_area").addClass("active").fadeIn();
     *  } else { //$(".ubot_area").removeClass("active").fadeIn();
     * $(".ubot_area").removeClass("active").hide(); } });
     */
  }
  const setVh = () => {
    document.documentElement.style.setProperty("--vh", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", setVh);
  setVh();
});
// 메인 카운터 스크립트 end
/* 전체 모달 닫기 팝업 */
function Modalhide() {
  $(".modal").modal("hide");
  $("html").removeAttr("style");
  $("body").removeAttr("style");
  $("head").removeAttr("style");
}

function pageCall(str, str2) {
  dataLayer.push({
    event: "page_view",
    behavior_channel_type: "마이크로사이트",
    behavior_host_type: "MOWEB",
    site_category: "MOWEB|마이크로사이트|기기예약",
    site_type: "기기예약",
    content_group: str,
    mkt_event_name: str2,
  });
  console.log(dataLayer);
}

function modalLivePop(mId) {
  backdrop();
  var openPopId = "#" + mId;
  console.log(openPopId);
  $(openPopId).modal({ keyboard: false, backdrop: "static" });
  $(openPopId).modal("show");
  function backdrop() {
    $(".modal-backdrop.in").addClass("over", function () {
      $("body").css("overflow", "hidden");
    });
    $(".close-over,.confirm").on("click", function () {
      $(openPopId).modal("hide");
      $(".modal-backdrop.in").removeClass("over");
      $("body").attr("style", "");
    });
  }
}

// 용량 체크 스크립트 추가
$(document).ready(function () {
  // 이벤트 위임 사용
  $(document).on("click touchend", ".innerBox.long", function (e) {
    e.preventDefault(); // 더블 이벤트 방지
    $(".innerBox.long").removeClass("on");
    $(this).addClass("on");
  });
});
