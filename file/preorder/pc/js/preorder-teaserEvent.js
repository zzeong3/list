function modalAlertPop(mId) {
  var openPopId = "#" + mId;
  $(openPopId).modal({ keyboard: false, backdrop: "static" });
  $("html").attr("style", "overflow:hidden !important; height:100%");
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
      $("html").removeAttr("style");
      $("body").removeAttr("style");
    }
  }, 300);
}

//box
function alterationBox(mid1, mid2) {
  //mid1 block
  if (CommonUtils.isNotEmpty(mid1)) {
    $("#" + mid1).css("display", "block");
  }
  //mid1 none
  if (CommonUtils.isNotEmpty(mid2)) {
    $("#" + mid2).css("display", "none");
  }
}

//더블클릭 방지
var doubleSubmitFlag = false;
function doubleSubmitCheck() {
  if (doubleSubmitFlag) {
    return doubleSubmitFlag;
  } else {
    doubleSubmitFlag = true;
    return false;
  }
}

let jsonFormData = {};
let examDataJson1 = {};
let examDataJson2 = {};
let examDataJsonToal = {};
/*
let $AlarmAgreeButtons={
		agree1: $("#alram_agree01"),
		agree3: $("#alram_agree03"),
		agree4: $("#alram_agree04"),
		agree5: $("#alram_agree05"),
		agree6: $("#alram_agree06"),
		agree7: $("#alram_lglrps_agree01")
	};
*/
$(document).ready(function () {
  $(".prevention-modal").on("click", function () {
    modalAlertPop("myModalaler_alarm_stop");
  });
});

const ALARM = (function () {
  return {
    getFormInstance: function () {
      return $("#modalAlarmEvt");
    },
    //==============================renew====[s]==========================
    getInstance: function () {
      return $("#alarmEvtModal");
    },
    CallredMsg: function (type, txt) {
      //$("#redMsg_alarm").css("display", "none");
      if (type) {
        $("#redMsg_alarm").css("display", "block");
      }
    },
    isChildAlarm: function (obj) {
      // 모달 열기
      modalAlertPop("alarmEvtModal");
      modalAlertClose("myModalalert_marketAgree_alarm");
      // 법정대리인 탭으로 이동
      setActiveTab_Alarm(4);

      console.log(obj);
      // 일반 인증 UI 숨기기
      $(".is-scroll.up14").hide();
      $("#joinAlarmEvtBtn").hide();
      $("#certification_btn").hide();
      $("#btnStep4").hide();

      // 법정대리인 UI 표시
      $(".is-scroll.under14").show();
      $("#under_14").show();
      $("#certificationUnder14Btn").show();

      // 법정대리인 탭 활성화
      $(".tab-wrap__inner").removeClass("on");
      $(".tab-wrap__inner.step4").addClass("on");

      // 법정대리인 동의 체크박스 활성화
      $("#alram_lglrps_agree01").removeAttr("disabled");

      // 법정대리인 동의 섹션 자동 펼치기
      $("#agree_event_label2").next(".pre_toggle").trigger("click");

      // $("#certificationUnder14Btn")
      $("#certificationUnder14Btn").attr(
        "onclick",
        "javascript:AlarmSavingCtrl.requestCertification(2,'" + obj.hkey + "');return false;"
      );
    },
    evtIsDuplicate: function (obj) {
      Modalhide();
      $("#alarm_finished_nm").html(obj.rsvUserName);
      modalAlertPop("myModalalert_finished_alarm");
    },
    calllog(param) {},
    oepnEvtPag: function () {
      //advALARMUtils.callRTBStep1();
      Modalhide();
      modalAlertPop("alarmEvtModal");
      setActiveTab_Alarm(2);
      ALARM.resetEvtPag();
    },

    resetEvtPag: function () {
      ALARM.CallredMsg();
      $("#joinAlarmEvtBtn").attr("disabled", "disabled");

      $("#certification_btn").show();
      $("#certification_complete").hide();

      $(".resetForm").each(function (i, el) {
        if ($(el).prop("type") == "radio") {
          $(el).prop("checked", false);
          $(el).attr("disabled", "disabled");
        } else if ($(el).prop("type") == "checkbox") {
          $(el).attr("disabled", "disabled");
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
    },
    //본인인증 버튼
    openJoinAlarmEvtForm: function (eventId) {
      ALARM.resetEvtPag();
      $("#alarmEvtModal").modal();
      $("html").css("overflow", "hidden");
    },
    openAlarmEvtAfterKmc: function (ty) {
      doubleSubmitFlag = false;
      $("#alarmEvtModal").modal({ backdrop: "static", keyboard: false });
      // ALARM.composeActiveTab2(); 24-09-10 로직생략
      ALARM.composeActiveTab3();
    },
    //step2 이게마음에 들어요
    composeActiveTab2: function () {
      setActiveTab_Alarm(3);
    },

    //step3 혜택 받으러 가기 (Agreement on Terms and Conditions__unlock)
    composeActiveTab3: function () {
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
      //Terms and Conditions check.
      console.log("AlarmSavingCtrl.validate");
      var $frm = ALARM.getInstance();
      jsonFormData = CommonUtils.getFormDataToJson("#alarmEvtModal");

      var $alarmAgreeButtons = {
        agree1: $("#alram_agree01"),
        agree3: $("#alram_agree03"),
        agree4: $("#alram_agree04"),
        agree5: $("#alram_agree05"),
        agree6: $("#alram_agree06"),
        agree7: $("#alram_lglrps_agree01"),
      };

      if ($alarmAgreeButtons.agree3.is(":checked") && $alarmAgreeButtons.agree4.is(":checked")) {
        AlarmSavingCtrl.sendInput();
      } else {
        modalAlertPop("myModalalert_marketAgree_alarm");
        return false;
      }
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
      // requestCertification
      var certUrl;
      switch (obj) {
        case 1:
          certUrl = "/certification/requestCertification?callId=alarm,hkey=" + hkey;
          break;
        case 2:
          certUrl = "/certification/requestCertification?callId=alarm_lglrps,hkey=" + hkey;
          break;
      }

      window.name = "kmcCerti"; //PC ie 관련 이슈 해결을 위한 opener 강제 정의
      var popUrl = certUrl;
      var left = screen.width / 2 - 450 / 2;
      var top = screen.height / 2 - 600 / 2;
      var title = "KMCISWindow";
      var popOption =
        "fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no,width=450, height=550, resizable=no, scrollbars=no,top=" +
        top +
        ",left=" +
        left;
      window.open(popUrl, title, popOption);
    },
    complete: function (rtEvtDtObj) {
      modalAlertClose("myModalalert_marketAgree_alarm");
      modalAlertClose("alarmEvtModal");
      dataLayer.push({
        event: "compEvt",
        comp_evt_name: "z폴더블7 사전 알람 신청",
        comp_evt_content: rtEvtDtObj.addData1 + "_" + rtEvtDtObj.addData2,
      });

      advALARMUtils.callMetafbq();
      advALARMUtils.callkakaoPixelAl();
      advALARMUtils.callDanggeunMarket();
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
      setTimeout(function () {
        if (rtEvtDtObj.couponType == "NPAY") {
          modalAlertPop("myModalalert_agreePointPopup");
          $("#coupon_prize_agree").find("img").attr("src", rtEvtDtObj.giftImg).attr("alt", rtEvtDtObj.giftDesc);
          $(".completed_result_prize_nm_npay").html(rtEvtDtObj.giftName);
        } else {
          modalAlertPop("myModalalert_complete_prize");
          $("#coupon_prize").find("img").attr("src", rtEvtDtObj.giftImg).attr("alt", rtEvtDtObj.giftDesc);
          $(".completed_result_prize_nm").html(rtEvtDtObj.giftName);
        }

        $(".completed_result_nm").html(rtEvtDtObj.rsvUserName);
      }, 1000);
    },

    returnToTermsAndConditions: function () {
      modalAlertClose("myModalalert_marketAgree_alarm");
      $("#alram_agree03").prop("checked", true);
      $("#alram_agree04").prop("checked", true);
      var is_checked = true;
      $(".chkBx").each(function () {
        is_checked = is_checked && $(this).is(":checked");
      });

      $(".allchk").prop("checked", is_checked);
    },

    sendInput: function (agreeOptChk) {
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
      jsonFormData.incomCh = chnlCd;

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
  };
})();

// TODO 241220 lcy 추가
function setActiveTab_Alarm(i) {
  // 이전에 활성화된 탭/버튼/콘텐츠 초기화
  $(".tab-btn-wrap").removeClass("step1 step2 step3 step4");
  $(".tab-wrap__inner").removeClass("on");

  // 버튼 요소들 정의
  const $buttons = {
    joinAlarmEvtBtn: $("#joinAlarmEvtBtn"),
    certificationUnder14Btn: $("#certificationUnder14Btn"),
    btnStep2: $("#btnStep2"),
    btnStep3: $("#btnStep3"),
    btnStep4: $("#btnStep4"),
  };

  // 모든 버튼 숨김
  Object.values($buttons).forEach((btn) => btn.hide());

  // 단계별 처리
  switch (i) {
    case 1:
      $buttons.joinAlarmEvtBtn.show();
      break;

    case 2:
      $buttons.btnStep2.show().attr("disabled", "disabled");
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

/*
 * 
 	최신 갤럭시 선택 고객 {'(갤럭시워치7) 5G 다이렉트 65','https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-directcatgpack/LPZ1002888'}
 	최신 아이폰 선택 고객 {'(애플워치SE2) 5G 다이렉트 65','https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-directcatgpack/LPZ0002868'}
 	중저가 아이폰, 중저가 갤럭시 , 그외 선택 고객 {'5G 다이렉트 37.5', 'https://www.lguplus.com/mobile/plan/direct/dr-5g/5g-direct/LPZ0002629'}  
 * 
 */
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
