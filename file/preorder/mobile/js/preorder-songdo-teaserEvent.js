//이벤트 관련 js
$(document).ready(function () {
  ALARM.common_evt_check();
  $(".prevention-modal").on("click", function () {
    modalAlertPop("myModalaler_alarm_stop");
  });
});

var doubleSubmitFlag = false;
function doubleSubmitCheck() {
  if (doubleSubmitFlag) {
    return doubleSubmitFlag;
  } else {
    doubleSubmitFlag = true;
    return false;
  }
}

function modalAlertPop(mId) {
  var openPopId = "#" + mId;
  $(openPopId).modal({ keyboard: false, backdrop: "static" });
  $("body").attr("style", "overflow:hidden !important; height:100%");
  $(openPopId).modal("show");
  function backdrop() {
    $(".modal-backdrop.in").addClass("over", function () {
      $("body").css("overflow", "hidden");
    });
  }
  if (mId == "myModalaler_alarm_stop" || mId == "myModalalert_marketAgree_alarm" || mId == "myModalalert_reserve") {
    backdrop();
  }
}

function modalAlertClose(mId) {
  var openPopId = "#" + mId;

  if (
    mId != "myModalaler_alarm_stop" &&
    mId != "myModalalert_marketAgree_alarm" &&
    mId != "myModalalert_reserve" &&
    mId != "myModalaler_alarm_coupon"
  ) {
    $(".modal.in").removeClass("in");
  } else {
    $("#myModalaler_alarm_stop").removeClass("in");
    $("#myModalalert_marketAgree_alarm").removeClass("in");
    $("#myModalalert_reserve").removeClass("in");
    $("#myModalaler_alarm_coupon").removeClass("in");
  }

  setTimeout(function () {
    var openPopId = "#" + mId;
    $(openPopId).modal("hide");
    $(".modal-backdrop.in").removeClass("over");
    if (mId != "myModalaler_alarm_stop" && mId != "myModalalert_marketAgree_alarm" && mId != "myModalalert_reserve") {
      $("body").removeAttr("style");
    }
  }, 300);
}

//box
function alterationBox(mid1, mid2) {
  //mid1 block
  if (isNull(mid1)) {
    $("#" + mid1).css("display", "block");
  }
  //mid1 none
  if (isNull(mid2)) {
    $("#" + mid2).css("display", "none");
  }
}

function isNull(val) {
  if (typeof val == "undefined" || val == "" || val == null) {
    return true;
  } else {
    return false;
  }
}

/* 메인 모든 팝업 열고 닫은 후 스크롤 탑 방지 */
let jsonFormData = {};
let examDataJson1 = {};
let examDataJson2 = {};
let examDataJsonToal = {};

const ALARM = (function () {
  return {
    getFormInstance: function () {
      return $("#modalAlarmEvt");
    },
    getInstance: function () {
      return $("#alarmEvtModal");
    },
    CallredMsg: function (type, txt) {
      $(".red-msg").css("display", "none");
      if (type) {
        $("#" + type + "").css("display", "block");
        $("#" + type + "").text(txt);
      }
    },
    common_evt_check: function () {

      var userAgent = window.navigator.userAgent;
      var ua = window.navigator.userAgent;
      var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      var webkit = !!ua.match(/WebKit/i);
      var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);


      console.log("isChild" + $("#isChild").val());
      console.log("userNm" + $("#userNm").val());
      console.log("isIglrps" + $("#isIglrps").val());
      console.log("isDuplicate" + $("#isDuplicate").val());
      
      $(document).ready(function () {
    	  
		const isChild = $("#isChild").val();
		const isDuplicate = $("#isDuplicate").val();
		const isIglrps = $("#isIglrps").val();
		const userNm = $("#userNm").val();
    	

		if(CommonUtils.isEmpty(userNm)){
		}else{
			ga4loginCall();
			if (isDuplicate === "Y") {
				 ALARM.isDuplicate(rtEvtDto);
			}else{
				if (isChild === "Y") {
					 ALARM.isChildAlarm(rtEvtDto);
				}else{
					 AlarmSavingCtrl.complete(rtEvtDto);	 
				}/*
				if (isIglrps === "Y") {
					AlarmSavingCtrl.complete(rtEvtDto);
				}
					*/
			}
			
			
		}
	    });
    },
    isChildAlarm: function (orderData) {
      // 모달 열기
      modalAlertPop("alarmEvtModal");

      // 법정대리인 탭으로 이동
      setActiveTab_Alarm(4);

      // 일반 인증 UI 숨기기
      $(".is-scroll.up14").hide();
      $("#joinAlarmEvtBtn").hide();
      $("#certification_btn").hide();
      $("#btn_step4").hide(); // 혜택 신청하기 버튼 숨김

      // 법정대리인 UI 표시
      $(".is-scroll.under14").show();
      $("#under_14").show();
      $("#certification_under14_btn").show().css("display", "block"); // 법정대리인 인증 시작하기 버튼 표시

      // 법정대리인 탭 활성화
      $(".tab-wrap__inner").removeClass("on");
      $(".tab-wrap__inner.step4").addClass("on");

      // 법정대리인 동의 체크박스 활성화
      $("#alram_lglrps_agree01").removeAttr("disabled");

      // 법정대리인 동의 섹션 자동 펼치기
      $("#agree_event_label2").next(".pre_toggle").trigger("click");

      $("#certification_under14_btn").attr(
        "onclick",
        "javascript:AlarmSavingCtrl.requestCertification(2,'" + orderData.hkey + "');return false;"
      );
    },
    isDuplicate: function (obj) {
      Modalhide();
      $("#alarm_finished_nm").html(obj.rsvUserName);
      modalAlertPop("myModalalert_finished_alarm");
    },
    oepnEvtPag: function () {
      //advALARMUtils.callRTBStep1();
      setActiveTab_Alarm(2);
      modalAlertPop("alarmEvtModal");
      ALARM.resetEvtPag();
    },

    resetEvtPag: function () {
      ALARM.CallredMsg();
      $("#certification_btn").show();
      $("#certification_complete").hide();

      $(".resetForm").each(function (i, el) {
        if ($(el).prop("type") == "radio") {
          $(el).prop("checked", false);
        } else if ($(el).prop("type") == "checkbox") {
          $(el).prop("checked", false);
          $(el).siblings("label").removeClass("on");
        } else {
          $(el).val("");
        }
      });

      $('input[name="useage"]').each(function (i, el) {
        $(el).prop("checked", false);
      });
      $('input[name="product"]').each(function (i, el) {
        $(el).prop("checked", false);
      });

      $("#joinAlarmEvtBtn").hide();
      $("#btn_step2").attr("disabled", "disabled");
      $("#btn_step2").hide();
      $("#btn_step3").attr("disabled", "disabled");
      $("#btn_step3").hide();
    },
    openJoinAlarmEvtForm: function (eventId) {
      ALARM.oepnEvtPag();
      if (eventId === "ddedition") {
        $("#eventId").val(eventId);
      } else {
        $("#eventId").val("");
      }

      $("#alarmEvtModal").modal();
    },
    //step2 이게마음에 들어요
    composeActiveTab2: function () {
      //advALARMUtils.callRTBStep3();
      setActiveTab_Alarm(3);
    },
    // step3 혜택 받으러 가기
    composeActiveTab3: function () {
      // advALARMUtils.callRTBStep3();
      setActiveTab_Alarm(4);
    },

    // 동의 없이 쿠폰만 받기
    myModalalertNoAgreePopup: function () {
      modalAlertClose("myModalalert_marketAgree_alarm");
      modalAlertClose("alarmEvtModal");
      modalAlertPop("myModalalert_noAgreePopup");
    },

    // 동의하고 N Pay 1,000P 받기
    myModalalertAgreePointPopup: function () {
      modalAlertClose("myModalalert_marketAgree_alarm");
      modalAlertClose("alarmEvtModal");
      modalAlertPop("myModalalert_agreePointPopup");
    },
  };
})();

const AlarmSavingCtrl = (function () {
  return {
    validate: function () {
      var $frm = ALARM.getInstance();
      jsonFormData = CommonUtils.getFormDataToJson("#alarmEvtModal");
      AlarmSavingCtrl.sendInput();
    }, //[e]validate

    initAlarmAgreeButtons: function () {
      var $alarmAgreeButtons = {
        agree1: $("#alram_agree01"),
        agree3: $("#alram_agree03"),
        agree4: $("#alram_agree04"),
        agree5: $("#alram_agree05"),
        agree6: $("#alram_agree06"),
        agree7: $("#alram_lglrps_agree01"),
      };

      $alarmAgreeButtons.agree1.is(":checked")
        ? (jsonFormData.essentialPersInfoCollectAgrYn1 = "Y")
        : (jsonFormData.essentialPersInfoCollectAgrYn1 = "N");

      $alarmAgreeButtons.agree3.is(":checked")
        ? (jsonFormData.persInfoCollectAgrYn3 = "Y")
        : (jsonFormData.persInfoCollectAgrYn3 = "N");
      $alarmAgreeButtons.agree4.is(":checked")
        ? (jsonFormData.prvBnftsAdverAgrYn4 = "Y")
        : (jsonFormData.prvBnftsAdverAgrYn4 = "N");
      $alarmAgreeButtons.agree5.is(":checked")
        ? (jsonFormData.prvBnftsOtherAdverAgrYn5 = "Y")
        : (jsonFormData.prvBnftsOtherAdverAgrYn5 = "N");
      $alarmAgreeButtons.agree6.is(":checked")
        ? (jsonFormData.prvAdverNightAgrYn6 = "Y")
        : (jsonFormData.prvAdverNightAgrYn6 = "N");
      $alarmAgreeButtons.agree7.is(":checked")
        ? (jsonFormData.lawcAgntInfoGthrAgrYn = "Y")
        : (jsonFormData.lawcAgntInfoGthrAgrYn = "N");
    },
    requestCertification: function (obj, hkey) {
      var actionURL = "/certification/requestCertification";

      switch (obj) {
        case 1:
          $("#eventId").val("songdo,hkey=" + hkey);
          break;
        case 2:
          $("#eventId").val("songdo_lglrps,hkey=" + hkey);
          break;
      }

      $("#modalAlarmEvt").attr("action", actionURL).submit();
    },

    complete: function (rtEvtDtObj) {
      modalAlertClose("myModalalert_marketAgree_alarm");
      modalAlertClose("alarmEvtModal");

      advALARMUtils.callDanggeunMarket();
      advALARMUtils.callMetafbq();
      advALARMUtils.callkakaoPixelAl();
      advALARMUtils.callCauly();
      
      /*
      DatalakeCtrl.alarmCall(
        rtEvtDtObj.rsvUserName,
        rtEvtDtObj.rsvHpNo,
        rtEvtDtObj.marketingConsent,
        rtEvtDtObj.addData1,
        rtEvtDtObj.addData2,
        rtEvtDtObj.addData3
      );
       */
      
      dataLayer.push({
  		'event' : "compEvt",
  		"comp_evt_name" : "z폴더블7 사전 알람 신청",
  		"comp_evt_content" : rtEvtDtObj.addData1 +"_"+rtEvtDtObj.addData2,
  	});

      setTimeout(function () {
    	  if (rtEvtDtObj.couponType == "NPAY") {
    		  modalAlertPop("myModalalert_agreePointPopup");
    		  $("#coupon_prize_agree")
              .find("img")
              .attr("src", rtEvtDtObj.giftImg)
              .attr("alt", rtEvtDtObj.giftDesc);
    		   $(".completed_result_prize_nm_npay").html(rtEvtDtObj.giftName);
            } else {
            	modalAlertPop("myModalalert_complete_prize");
            	  $("#coupon_prize")
                  .find("img")
                  .attr("src", rtEvtDtObj.giftImg)
                  .attr("alt", rtEvtDtObj.giftDesc);
            	   $(".completed_result_prize_nm").html(rtEvtDtObj.giftName);
            }
    	   
           $(".completed_result_nm").html(rtEvtDtObj.rsvUserName);
        
    	  
      }, 1000);
    }
    ,returnToTermsAndConditions :function (){
    	modalAlertClose("myModalalert_marketAgree_alarm");
    	$("#alram_agree03").prop("checked", true);
    	$("#alram_agree04").prop("checked", true);
        
    	var is_checked = true;
        $(".chkBx").each(function () {
          is_checked = is_checked && $(this).is(":checked");
        });

        $(".allchk").prop("checked", is_checked);
        
    }
    ,sendInput: function (agreeOptChk) {
      var $alarmAgreeButtons = {
        agree1: $("#alram_agree01"),
        agree3: $("#alram_agree03"),
        agree4: $("#alram_agree04"),
        agree5: $("#alram_agree05"),
        agree6: $("#alram_agree06"),
        agree7: $("#alram_lglrps_agree01"),
      };

      if (typeof agreeOptChk != "undefined" && agreeOptChk != null && agreeOptChk !== "") {
        if (agreeOptChk === "agreeOptChk") {
          $alarmAgreeButtons.agree3.prop("checked", true);
          $alarmAgreeButtons.agree4.prop("checked", true);
        }
      }
      AlarmSavingCtrl.initAlarmAgreeButtons();

      var urlQueryString = window.location.search;
      const utmParm = "utm_source=upluslive";
      let chnlCd = "";
      chnlCd = urlQueryString.includes(utmParm) ? "upluslive" : "";
      jsonFormData.incomCh =chnlCd;
      
      $.ajax({
        url: "/event/teaser/saveUserInput",
        type: "POST",
        data: jsonFormData,
        cache: false,
      })
        .done(function (res, textStatus, xhr) {
          if (res.data) {
            AlarmSavingCtrl.requestCertification(1, res.data.hkey);
          }
        })
        .fail(function (xhr, textStatus, errorThrown) {});
    },
  }; //[e]return
})();

// TODO 241220 lcy 추가
function setActiveTab_Alarm(i) {
  // 이전에 활성화된 탭/버튼/콘텐츠 초기화
  $(".tab-btn-wrap").removeClass("step1 step2 step3 step4");
  $(".tab-wrap__inner").removeClass("on");

  // 버튼 요소들 정의
  const $buttons = {
    btn_certification: $("#btn_certification"),
    certificationUnder14Btn: $("#certificationUnder14Btn"),
    btnStep2: $("#btn_step2"),
    btnStep3: $("#btn_step3"),
    btnStep4: $("#btn_step4"),
  };

  // 모든 버튼 숨김
  Object.values($buttons).forEach((btn) => btn.hide());

  // 단계별 처리
  switch (i) {
    case 1:
      $buttons.btn_certification.show();
      break;

    case 2:
      setTimeout(() => {
        $("#btn_step2").show().css("display", "block");
        $buttons.btnStep2.show().attr("disabled", "disabled");
      }, 100);

      // 기기 선택시 버튼 활성화
      $('input[name="product"]')
        .off("change")
        .on("change", function () {
          if ($('input[name="product"]:checked').length > 0) {
            $buttons.btnStep2.removeAttr("disabled");
          }
        });
      break;

    case 3:
      $buttons.btnStep3.show().attr("disabled", "disabled");

      // 사용기간 선택시 버튼 활성화
      $('input[name="useage"]')
        .off("change")
        .on("change", function () {
          if ($('input[name="useage"]:checked').length > 0) {
            $buttons.btnStep3.removeAttr("disabled");
          }
        });
      break;

    case 4:
      $buttons.btnStep4.show().attr("disabled", "disabled");

      // 체크박스 disabled 해제
      $('input[name="agree"], #agreeTotal').removeAttr("disabled");

      break;
  }

  // 해당 단계 활성화
  $(".tab-btn-wrap").addClass("step" + String(Number(i) - 1));
  $(".tab-wrap__inner.step" + String(Number(i) - 1)).addClass("on");
  

  // GTM 태깅 업데이트
  let stepLabel = "";
  switch (i) {
    case 2:
      stepLabel = "알람신청_02-스타일_닫기";
      break;
    case 3:
      stepLabel = "알람신청_03-사용기간_닫기";
      break;
    case 4:
      stepLabel = "알람신청_04-약관동의_닫기";
      break;
  }

  $(".prevention-modal")
    .attr("data-gtm-event-label", "컨텐츠 : " + stepLabel)
    .attr("data-gtm-click-text", stepLabel);
  
}

// TODO 241220 lcy 추가 EEE

function alarmFinishEvtBtnLink1() {
  var openurl = "https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-directcatgpack/LPZ1002888";
  window.open(openurl, "_blank");
}

function alarmFinishEvtBtnLink2() {
  var openurl = "https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-directcatgpack/LPZ0002868";
  window.open(openurl, "_blank");
}

function alarmFinishEvtBtnLink3() {
  var openurl = "https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-direct/LPZ0002629";
  window.open(openurl, "_blank");
}

/* GNB 메뉴 페이지 인식*/
$(function () {
  var path = window.location.pathname.replace(/^\/|\/$/g, ""); // 앞뒤 슬래시 제거
  var queryString = window.location.search;

  // 정확한 alarm 문자열 매칭
  if (path === "alarm" || queryString === "?alarm") {
    ALARM.oepnEvtPag();
    return;
  }

  // 정확한 경로 매칭을 위한 매핑
  var pathMap = {
    "benefit/npay": ".alarm-npay",
    "benefit/coupon": ".alarm-coupon-card",
    "benefit/raffle": ".alarm-raffle",
    "benefit/uplus": ".alarm-onlyuplus",
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
