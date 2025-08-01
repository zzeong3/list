function isNull(str) {
  if (str == "" || str == undefined || str == null || str == "null" || str.length == 0 || str == "undefined") {
    //if(typeof val == "undefined" || val == "" || val == null || val == "undefined"  ){
    return true;
  } else {
    return false;
  }
}

/*  페이지 인식*/
$(function () {
  var subPage = new Array();
  subPage[0] = "alarm";
  subPage[1] = "preorder";

  var url = location.href;
  //if(window.location.pathname.replace("/","") == subPage[0]){ALARM.oepnEvtPag();};
  if (window.location.pathname.replace("/", "") == subPage[1]) {
    PreorderCtrl.open();
  }

  if (!window.location.pathname.replace("/", "") == "") {
    advALARMUtils.callRTBOtherPages();
  }
});

//dev_
const CommonUtils = (function () {
  return {
    isEmpty: function (str) {
      return str == "" || str == undefined || str == null || str == "null" || str.length == 0 || str == "undefined";
    },
    isNotEmpty: function (str) {
      return !this.isEmpty(str);
    },

    getFormDataToJson: function ($form) {
      var formid = $form + " :input";
      var arrayData = $(formid).serializeArray();
      var json = {};

      $.each(arrayData, function (i, e) {
        if (json[e.name]) {
          if (!json[e.name].push) {
            json[e.name] = [json[e.name]];
          }
          json[e.name].push(e.value || "");
        } else {
          json[e.name] = e.value || "";
        }
      });

      return json;
    },
  }; //return
})();

function call_tag_() {
  window.addEventListener("load", function () {
    var across_adn_complete_contain = new fn_across_adn_contain();
    var across_adn_complete_param = [];
    across_adn_complete_param = { ut: "Complete", ui: "107361", uo: "types2" };
    across_adn_complete_contain.init(across_adn_complete_param);
  });
  var _nasa = {};
  if (window.wcs) _nasa["cnv"] = wcs.cnv("4", "0");
}
function callgtmTagproduct_(obj) {
  var obj_tag;
  switch (obj) {
    case "product1":
      obj_tag = "한손에 쏙 잡히는 GALAXY";
      break;
    case "product2":
      obj_tag = "고성능에, 무게까지 가벼운GALAXY";
      break;
    case "product3":
      obj_tag = "화면 크기 UP! 역대급 성능의GALAXY";
      break;
    default:
      obj_tag = "";
  }
  return obj_tag;
}
function callgtmTaguseage_(obj) {
  var obj_tag;
  switch (obj) {
    case "useage1":
      obj_tag = "1년 미만";
      break;
    case "useage2":
      obj_tag = "1년 이상 - 1년 6개월 미만";
      break;
    case "useage3":
      obj_tag = "1년 6개월 이상 - 2년 미만";
      break;
    case "useage4":
      obj_tag = "2년 이상";
      break;

    default:
      obj_tag = "";
  }

  return obj_tag;
}

$.urlParam = function (name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
  if (results == null) {
    return "";
  } else {
    return results[1] || "";
  }
};

const advALARMUtils = (function () {
  return {
    callMetafbq: function () {
      fbq("track", "Purchase", {
        content_name: "갤럭시Z7폴더블_사전예약_신청완료",
      });
    },
    callkakaoPixelAl: function () {
      kakaoPixel("7728052198978992914").pageView();
      kakaoPixel("7728052198978992914").completeRegistration("갤럭시Z7폴더블_사전예약_신청완료");
    },
    callCauly: function () {
      console.log("callCauly___");
      var param = {
        track_code: "44ad8368-794d-43fc-8b8b-5b1038410480",
        event_name: "CA_CONVERSION",
      };
      cauly_send(param);
    },

    callDanggeunMarket: function () {
      window.karrotPixel.init("1750404575104600001");
      window.karrotPixel.track("Purchase");
    },
    callCriteo2: function () {
      // Criteo 세일즈 태그
      window.criteo_q = window.criteo_q || [];
      var deviceType = /iPad/.test(navigator.userAgent)
        ? "t"
        : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent)
        ? "m"
        : "d";
      window.criteo_q.push(
        { event: "setAccount", account: 75206 },
        { event: "setEmail", email: "", hash_method: "" }, // To Do 1. 현재 유저의 이메일 주소(공백 제거 및 소문자로 변환 후). 유저의 이메일을 알수 없는 상황이면 빈 문자열로 전달
        { event: "setZipcode", zipcode: "" }, // To Do 2. 현재 유저의 저장된 배송지 우편번호. 유저의 배송지 우편번호를 알수 없는 상황이면 빈 문자열로 전달
        // To Do 3. 확인 또는 주문 번호를 전달. 확인 또는 주문 번호가 없을 경우, Math.floor(Math.random()*99999999999)와 같이 랜덤한 숫자를 만들어 전달
        {
          event: "trackTransaction",
          id: Math.floor(Math.random() * 99999999999),
          item: [{ id: "1", price: 1, quantity: 1 }],
        }
      );
    },

    callRTBStep1: function () {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "offer",
          offerId: "유플러스닷컴 쿠폰 이벤트",
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBStep2: function () {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "basketadd",
          offerId: "유플러스닷컴 쿠폰 이벤트",
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBStep3: function () {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "startorder",
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTB: function (uuid) {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "conversion",
          conversionClass: "action",
          conversionSubClass: "form",
          conversionId: uuid,
          offerIds: ["유플러스닷컴 쿠폰 이벤트"],
          conversionValue: null,
          conversionCurrency: null,
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callCriteoPageView: function () {
      console.log("callCriteoPageView c");
      window.criteo_q = window.criteo_q || [];
      var deviceType = /iPad/.test(navigator.userAgent)
        ? "t"
        : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent)
        ? "m"
        : "d";
      window.criteo_q.push(
        { event: "setAccount", account: 75206 },

        //To Do 1. 현재 유저의 이메일 주소(공백 제거 및 소문자로 변환 후). 유저의 이메일을 알수 없는 상황이면 빈 문자열로 전달
        { event: "setEmail", email: "", hash_method: "" },

        // To Do 2. 현재 유저의 저장된 배송지 우편번호. 유저의 배송지 우편번호를 알수 없는 상황이면 빈 문자열로 전달
        { event: "setZipcode", zipcode: "" },

        { event: "setSiteType", type: deviceType },
        { event: "viewHome" }
      );
    },

    callCriteo: function () {
      window.criteo_q = window.criteo_q || [];
      var deviceType = /iPad/.test(navigator.userAgent)
        ? "t"
        : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent)
        ? "m"
        : "d";
      window.criteo_q.push(
        { event: "setAccount", account: 75206 },
        { event: "setEmail", email: "", hash_method: "" }, // To Do 1. 현재 유저의 이메일 주소(공백 제거 및 소문자로 변환 후). 유저의 이메일을 알수 없는 상황이면 빈 문자열로 전달
        { event: "setZipcode", zipcode: "" }, // To Do 2. 현재 유저의 저장된 배송지 우편번호. 유저의 배송지 우편번호를 알수 없는 상황이면 빈 문자열로 전달
        { event: "setSiteType", type: deviceType },
        // To Do 3. 확인 또는 주문 번호를 전달. 확인 또는 주문 번호가 없을 경우, Math.floor(Math.random()*99999999999)와 같이 랜덤한 숫자를 만들어 전달
        {
          event: "trackTransaction",
          id: Math.floor(Math.random() * 99999999999),
          item: [{ id: "1", price: 1, quantity: 1 }],
        }
      );
    },
    callRtbPreorder: function (device) {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "offer",
          offerId: device,
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBChoice: function (size, color) {
      var DeviceInfo = size.trim() + "," + color.trim();
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "size",
          size: DeviceInfo,
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBPreorderStep2: function (device) {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "basketadd",
          offerId: device,
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBPreorderKmc: function () {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "startorder",
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBPreorderEnd: function (id) {
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "conversion",
          conversionClass: "action",
          conversionSubClass: "form",
          conversionId: Math.floor(Math.random() * 99999999999), // 사전예약 번호
          offerIds: [id], //제품명
          conversionValue: null,
          conversionCurrency: null,
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
    callRTBOtherPages: function () {
      // 메인 페이지를 제외한 모든 페이지 호출
      (rtbhEvents = window.rtbhEvents || []).push(
        {
          eventType: "placebo",
        },
        {
          eventType: "uid",
          id: "unknown",
        }
      );
    },
  };
})();

/** ga4 */
function ga4loginCall() {
  console.log("ga4loginCall");
  dataLayer.push({
    event: "loginAction",
    login_channel: "CTN 인증",
  });
}

function setGtmAttrRebuilder(i, cx) {
  let re_data_gtm_event_label = "";
  let re_data_gtm_click_text = "";

  switch (i) {
    case "D11":
      re_data_gtm_event_label = "예약신청_02 - 모델선택_닫기";
      re_data_gtm_click_text = "예약신청_02 - 모델선택_닫기";
      break;
    case "D21":
      re_data_gtm_event_label = "예약신청_03-약관동의_닫기";
      re_data_gtm_click_text = "예약신청_03-약관동의_닫기";
      break;
    case "D41":
      re_data_gtm_event_label = "예약신청_05-신청완료_Case1_닫기";
      re_data_gtm_click_text = "예약신청_05-신청완료_Case1_닫기";
      break;
    case "D43":
      re_data_gtm_event_label = "예약신청_05-신청완료_Case2_닫기";
      re_data_gtm_click_text = "예약신청_05-신청완료_Case2_닫기";
      break;
    case "D45":
      re_data_gtm_event_label = "예약신청_05-신청완료_Case3_닫기";
      re_data_gtm_click_text = "예약신청_05-신청완료_Case3_닫기";
      break;
    case "D43":
      re_data_gtm_event_label = "예약신청_05-신청완료_Case1_" + cx + "만원 쿠폰 사용하기";
      re_data_gtm_click_text = "예약신청_05-신청완료_Case1_" + cx + "만원 쿠폰 사용하기";
      break;
    case "D44":
      re_data_gtm_event_label = "예약신청_05-신청완료_Case2_" + cx + "만원 쿠폰 사용하기";
      re_data_gtm_click_text = "예약신청_05-신청완료_Case2_" + cx + "만원 쿠폰 사용하기";
      break;
  }

  $("#preorder_modal_close_btn")
    .attr("data-gtm-event-label", "컨텐츠 : " + re_data_gtm_event_label)
    .attr("data-gtm-click-text", re_data_gtm_event_label);
}

/*--------------------------------------------------------------------------------------------------------------------------------------*/

/**
 * 유플러스 샵 윈도우 오픈
 * @returns
 */
function openUplusShop() {
  window.open("https://www.lguplus.com/mobile", "_blank");
}

function getQuerystring(paramName) {
  var _tempUrl = window.location.search.substring(1); // url에서 처음부터 '?'까지 삭제
  var _tempArray;
  if (_tempUrl) {
    _tempArray = _tempUrl.split("&"); // '&'을 기준으로 분리하기
    for (var i = 0; i < _tempArray.length; i++) {
      var _keyValuePair = _tempArray[i].split("="); // '=' 을 기준으로 분리하기
      if (_keyValuePair[0] == paramName) {
        // _keyValuePair[0] : 파라미터 명 //
        // _keyValuePair[1] : 파라미터 값
        return _keyValuePair[1];
      }
    }
  }
  return "";
}
//스트링 패딩(왼쪽)
function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const COMMON_MSG = (function () {
  return {
    //14세미만
    isChild: function () {
      Modalhide();
      modalAlertPop("myModalalert_limit");
    },
    isDuplicate: function () {
      Modalhide();
      modalAlertPop("myModalalert_alreadyWin2");
    },
  }; //[e]return
})();
