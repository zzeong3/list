//사전예약관련 js
$(document).ready(function () {
  PreorderCtrl.common_evt_check();
});
var submit_M_Data;

function hpFormatHiddenByRegx(hp) {
  var pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d{2}(\d{2})$/;
  var result = "";
  if (!hp) return result;

  if (pattern.test(hp)) {
    result = hp.replace(pattern, "$1-$2**-**$3");
  } else {
    result = "***";
  }

  return result;
}

function updatefooter_btn3_GTM(w) {
  $("#preorder_footer_btn3 ").attr({
    // 브라우저 개발자 도구 상 변경사항 확인 위해 attr 임의 사용
    "data-gtm-click-text": "예약신청_05-신청완료_" + w + " 쿠폰 사용하기",
    "data-gtm-event-label": "컨텐츠 : 예약신청_05-신청완료_" + w + "쿠폰 사용하기",
  });
}

const PreorderLGLRPSCtrl = (function () {
  return {
    isChild: function (preOrderData) {
      $("#myModal01_MW").modal("show");
      age14_under_set();
      setCreateBtn(4);

      $("#preorder_footer_btn4").attr(
        "onclick",
        "javascript:PreSavingCtrl.requestCertification(2,'" + preOrderData.hkey + "');return false;"
      );
    },
  };
})();

function age14_under_set() {
  $(".is-scroll > .step1_wrap").hide();
  $(".is-scroll > .step2_wrap").hide();
  $(".under14_container").show();
}
function age14_under_off() {
  $(".is-scroll > .step1_wrap").show();
  $(".is-scroll > .step2_wrap").show();
  $(".under14_container").hide();
}

const PreorderApimCtrl = (function () {
  return {
    success: function (preOrderData) {
      var chkAlrdyRsrvd = APIM.alrdyRsrvd(preOrderData.cmpnId, preOrderData.rsvUserName, preOrderData.rsvHpNo);
      chkAlrdyRsrvd.then(
        // success
        function (result) {
          // API 호출 실패
          if (result.status != "OK") {
            alert(result.message);
            return reject();
          }
          // API 호출 결과
          var responseCode = result.data.body.rsltInfo.rsltCd;
          if (responseCode != "00") {
            alert(result.data.HEADER.responseMessage);
            return reject();
          }

          if (result.data.body.presaleRegInfo.reqYn == "N") {
            Modalhide();
            modalAlertPop("myModalalert_finished");
          } else if (result.data.body.presaleRegInfo.reqYn == "F") {
            var alrtMsg =
              "매장에서 사전예약 신청 및 가입신청서 작성 시 온라인에서 추가적인 사전예약 신청이 불가합니다.";
            alert(alrtMsg);
            // 고객 정보 초기화
            $(".clientNm, .clientPhoneNo").val("");
            // 개인정보 수집 동의 초기화
            $(".agreeCheck").prop("checked", false).next().removeClass("on");
            return reject();
          } else {
            // 사전예약 요청
            APIM.requestReserve(preOrderData);
          }
        },

        // error
        function (err) {
          alert("사전예약 요청 중 에러가 발생했습니다.\n잠시 후 다시 시도해주십시오.");
          console.log("err......", err);
          return reject();
        }
      ); //end then
    }, //esuccess
  };
})();
/** 사전 예약하기 UI 컨트롤 */
const PreorderCtrl = (function () {
  return {
    // 초기화
    init: function () {
      this.bindEvent();
    },
    getInstance: function () {
      return $("#myModal01_MW"); //
    },
    bindEvent: function () {
      $(".resetForm").each(function (i, el) {
        if ($(el).prop("type") == "radio") {
          $(el).prop("checked", false);
        } else if ($(el).prop("type") == "checkbox") {
          $(el).prop("checked", false);
          $(el).siblings("label").removeClass("on");
        } else {
          //console.log($(el).prop('id'));
          $(el).val("");
        }
      });
    },
    common_evt_check: function () {
      console.log("common_evt_check");

      var userAgent = window.navigator.userAgent;

      var ua = window.navigator.userAgent;
      var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
      var webkit = !!ua.match(/WebKit/i);
      var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

      $(document).ready(function () {
        if ($("#isChild").val() != "Y" && $("#userNm").val() != "") {
          ga4loginCall();
          PreorderApimCtrl.success(rtEvtDto);
        }

        if ($("#isChild").val() == "Y") {
          PreorderLGLRPSCtrl.isChild(rtEvtDto);
          ga4loginCall();
        }

        if ($("#r_isIglrps").val() == "Y" && $("#userNm").val() != "") {
          ga4loginCall();
          PreorderApimCtrl.success(rtEvtDto);
        }
      });

      /*
        if ($("#isChild").val() != "Y" && $("#userNm").val() != "") {
          if ($("#isDuplicate").val() == "Y") {
            if ($("#redirect_action").val() == "event") {
              COMMON_MSG.isDuplicate();
            } else {
              ALARM.isDuplicate();
            }
          } else {
            if ($("#redirect_action").val() == "preorder") {
              PreorderCtrl.openAlarmEvtAfterKmc();
            } else if ($("#redirect_action").val() == "event") {
              EVENT.openEvtAfterKmc();
            } else {
              ALARM.openAlarmEvtAfterKmc();
            }
          }
          ga4loginCall();
        }
        if ($("#isChild").val() == "Y") {
          if ($("#r_isIglrps").val() == "") {
            PreorderLGLRPSCtrl.isChild();
          } else if ($("#r_isIglrps").val() == "Y") {
            PreorderCtrl.openAlarmEvtAfterKmc();
          } else {
            ALARM.isChildAlarm();
          }
          ga4loginCall();
        }
      });
      */
    },
    PreorderPageBuildBindEvent: function () {
      $(".sel_opt.modelNm li button").on("click", function () {
        var $choiceLi = $(this).closest("li");
        if ($choiceLi.hasClass("disable")) {
          return false;
        } else {
          $choiceLi.addClass("on").siblings("li").removeClass("on");
        }
        //모델 변경시 이미지 체인지
        PreorderCtrl.changeimg($(this));
        // 색상 선택 시 텍스트 변경
        var $choiceUl = $(this).closest(".sel_opt");
        $choiceUl.parents(".optBoxInner").find(".on_txt").text($(this).text());
        //return false;
      });

      // 옵션 선택 컬러
      $(".sel_opt.color li button").on("click", function () {
        var $choiceLi = $(this).closest("li");
        if ($choiceLi.hasClass("disable")) {
          return false;
        } else {
          $choiceLi.addClass("on").siblings("li").removeClass("on");
        }
        //모델 변경시 이미지 체인지
        PreorderCtrl.changeimg($(this));
        // 색상 선택 시 텍스트 변경
        var $choiceUl = $(this).closest(".sel_opt");
        $choiceUl.parents(".optBoxInner").find(".on_txt").text($(this).text());

        $(".change_color").text($(".sel_opt.color li.on").text());
        //advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
      });

      // 옵션 선택
      $(".sel_opt.sizeCd li button").on("click", function () {
        var $choiceLi = $(this).closest("li");
        if ($choiceLi.hasClass("disable")) {
          return false;
        } else {
          $choiceLi.addClass("on").siblings("li").removeClass("on");
        }

        var $choiceVolumn = $(".change_volumn");
        $choiceVolumn.text($(this).text());
        advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
      });

      //휴대폰명 두줄처리
      $(".sel_opt.modelNm li").each(function (i) {
        var txtNum = $(this).find("a").text().length;
        if (txtNum > 14) {
          $(this).find("a").css({
            "line-height": "16px",
            display: "table-cell",
            "vertical-align": "middle",
          });
        }
      });

      $(".change_model").text($(".sel_opt.modelNm li.on").text());

      $(".change_color").text($(".sel_opt.color li.on").text());

      $(".change_volumn").text($(".sel_opt.sizeCd li.on").text());

      $(".optBoxInner").find(".on_txt").text($(".sel_opt.color li.on").text());

      PreorderCtrl.changeimg($(".sel_opt.color li.on button"));

      //advALARMUtils.callRtbPreorder($(".sel_opt.modelNm li.on").text().trim());
      //advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
    },

    open: function (cmpnId, cmpnMdl, cmpnCapa, cmpnColr) {
      //advALARMUtils.callRtbPreorder($("#reserveForm #modelNm").val());

      PreorderCtrl.bindEvent();

      if (PreorderCtrl.status == "over") {
        var message = "사전예약이 종료되었습니다.";
        return alert(message);
      }

      chageDoubleSubmitPreorderFlag();

      //this.initialBuild(initType);
      this.initialBuild(cmpnId, cmpnMdl, cmpnCapa, cmpnColr);
      $("#myModal01_MW").modal("show");
      $("body").css("overflow", "hidden");
    },
    initialBuild: async function (cmpnId, cmpnMdl, cmpnCapa, cmpnColr) {
      var modelIndex = 0;
      if (cmpnMdl == "PH001") {
        modelIndex = 0;
      }
      if (cmpnMdl == "PH002") {
        modelIndex = 2;
      }
      if (cmpnMdl == "PH003") {
        modelIndex = 1;
      }

      console.log(modelIndex);

      await PreorderCtrl.iInitialPreorderPageBuild(modelIndex, cmpnMdl, cmpnCapa, cmpnColr);
      setActiveTab(1);
      setCreateBtn(1);
    },
    iInitialPreorderPageBuild: function (modelIndex, cmpnMdl, cmpnCapa, cmpnColr) {
      var params = {
        modelIndex: modelIndex,
        PcmpnColr: cmpnColr,
        PcmpnCapa: cmpnCapa,
      };
      $.ajax({
        url: "/preOrder/choiceModel",
        type: "POST",
        data: params,
        cache: false,
        success: function (data) {
          $("#optBox").html(data);
          PreorderCtrl.PreorderPageBuildBindEvent();
        },
        error: function () {
          alert("오류가 발생하였습니다.");
        },
      });
    },
    chageSizeCdStatus: function (colorCd) {
      //console.log()
      modTypCd = $("#reserveForm #modTypCd").val();

      var params = {
        modTypCd: modTypCd,
        colorCd: colorCd,
      };

      $.ajax({
        url: "/preOrder/chageSizeCdStatus",
        type: "POST",
        data: params,
        cache: false,
        success: function (data) {
          $("#chageSizeStatus").html(data);
          PreorderCtrl.PreorderPageBuildBindEvent();
          //PreorderCtrl.PreorderPageBuildBindEvent();
        },
        error: function () {
          alert("오류가 발생하였습니다.");
        },
      });
    },
    composeActiveTab2: function () {
      setActiveTab(2);
      setCreateBtn(2);
      setGtmAttrRebuilder("D21");
      //advALARMUtils.callRTBPreorderStep2($("#reserveForm #modelNm").val());
    },
    composeActiveTab3_final: function (dataSet) {
      console.log("composeActiveTab3_final");
      setActiveTab(3);
      setCreateBtn(3);

      if (isNull(dataSet.couponNo)) {
        setGtmAttrRebuilder("D45");
        $("#couponDisplayArea").css("display", "none");
        $("#preorder_footer_btn3").css("display", "none");
        $("#preorder_footer_btn5").css("display", "block");
        $("#preorder_footer_btn5").removeAttr("disabled");
        $("#coupon-reserve_desc").css("display", "block");
        $(".desc-reserve-coupon").css("display", "none");
      } else {
        setGtmAttrRebuilder("D41");
        setGtmAttrRebuilder("D42", dataSet.giftName);
        $("#coupon-reserve_desc").css("display", "none");
        $("#couponDisplayArea").css("display", "block");

        $("#finish-pointpark-coupon").text(dataSet.couponNo); //check
        $("#preorder_footer_btn3 > span").text(dataSet.giftName + " 쿠폰 사용하기");
        updatefooter_btn3_GTM(dataSet.giftName);
        var couponimg = Resource.imgUrl + dataSet.giftImg;

        $("#coupon_prize").find("img").attr("src", couponimg).attr("alt", dataSet.giftDesc);
        // $("#completed_result_prize_nm").html(dataSet.giftName);
        var completed_result_prize_nm2 = "<strong>" + dataSet.giftName + "</strong> 즉시 할인 쿠폰 발급 완료!";
        // $("#completed_result_prize_nm2").html(completed_result_prize_nm2);
        $("#completed_result_prize_nm_bottom").html(dataSet.giftName);
        //napy쿠폰
        if (dataSet && dataSet.couponType == "NPAY") {
          setGtmAttrRebuilder("D43");
          setGtmAttrRebuilder("D44", dataSet.giftName);
          $("#completed_result_prize_npy_nm").css("display", "block");
          $("#completed_result_prize_npy_notice1").css("display", "block");
          $("#completed_result_prize_npy_notice2").css("display", "block");
          $("#completed_result_prize_nm").html(dataSet.giftName);
        } else {
          $("#completed_result_prize_npy_notice1").css("display", "none");
          $("#completed_result_prize_npy_notice2").css("display", "none");
          $("#completed_result_prize_npy_nm").css("display", "none");
          $("#completed_result_prize_nm").html(dataSet.giftName);
        }
      }

      var fin_title_msg =
        "<span>" +
        dataSet.rsvUserName +
        "</span> 님,<br><span>" +
        hpFormatHiddenByRegx(dataSet.rsvHpNo) +
        "</span> 번호로<br>사전예약을 완료했습니다.";

      $("#modalTitle").html(fin_title_msg);

      $("#finish-model-nm").html(dataSet.modelNm);
      $("#finish-color").text(dataSet.colrNm);
      $("#finish-storage").text(dataSet.sizeNm);
      $("#finish-join-nm").text(dataSet.joinNm);
      $("#finish-resv-num").text(dataSet.rsvSaleNo);

      var folder = Resource.imgUrl + "/mobile/img/preorderSeleted_IMG/";
      var imgUrl = $(".resv-device>.device_img.change_img");
      var fincmpnId = dataSet.cmpnId;
      var fincmpnMdl = dataSet.cmpnMdl;
      var cincmpnColr = dataSet.cmpnColr;
      imgUrl.attr("src", folder + fincmpnId + "_" + fincmpnMdl + "_" + cincmpnColr + ".png");

      $("#myModal01_MW").modal("show");

      setTimeout(function () {
        $(".step3_wrap .prize").addClass("show");

        setTimeout(function () {
          var targetPosition =
            $(".point_coupon_wrap").offset().top -
            $(".controll_modal .is-scroll").offset().top +
            $(".controll_modal .is-scroll").scrollTop();

          $(".controll_modal .is-scroll").animate(
            {
              scrollTop: targetPosition,
            },
            500
          );
        }, 1000);
      }, 4000);

      setTimeout(function () {
        $(".step3_wrap .notice").addClass("show");
      }, 4500);

      setTimeout(function () {
        $(".step3_wrap .reserve_desc").addClass("show");
      }, 2500);
    },
    choiceModel: function (modelIndex, resvSaleCode, modTypCd, modTypCdDesc) {
      $("#reserveForm #resvSaleCode").val(resvSaleCode);
      $("#reserveForm #modTypCd").val(modTypCd);
      $("#reserveForm #modelNm").val(modTypCdDesc);

      var params = {
        modelIndex: modelIndex,
      };

      $.ajax({
        url: "/preOrder/choiceModel",
        type: "POST",
        data: params,
        cache: false,
        success: function (data) {
          $("#optBox").html(data);

          PreorderCtrl.PreorderPageBuildBindEvent();
        },
        error: function () {
          alert("오류가 발생하였습니다.");
        },
      });
    },
    changeimg: function (val) {
      var seletedEL = val;
      var folder = Resource.imgUrl + "/mobile/img/preorderSeleted_IMG/";
      var seletedMD = $(".modelNm .on").find("button").attr("data-model");
      var listCk = val.parent().parent();
      var imgUrl = $(".change_img");

      var changeModel = $(".change_model");
      var changeColor = $(".change_color");
      var changeVolumn = $(".change_volumn");

      if (listCk.hasClass("modelNm")) {
        var changeMd = $("#reserveForm #resvSaleCode").val();
        var changeNM = seletedEL.attr("data-model");
        var changeCd = $(".sel_opt.type-gal  li.on").attr("data-model-cd");
        var defaultCL = $(".phoneC >li").eq(0).attr("data-colr-cd");
        imgUrl.attr("src", folder + changeMd + "_" + changeCd + "_" + defaultCL + ".png");

        //header 내 모델명 수정
        var modelTxt = $("#reserveForm #modelNm").val();
        changeModel.html(modelTxt);
      }
      if (listCk.hasClass("phoneC")) {
        var changeCL = seletedEL.parent().attr("data-colr-cd");
        var folder = Resource.imgUrl + "/mobile/img/preorderSeleted_IMG/";

        var changeMd = $("#reserveForm #resvSaleCode").val();
        var changeNM = seletedEL.attr("data-model");

        var changeCd = $(".sel_opt.type-gal  li.on").attr("data-model-cd");
        var changeCL = seletedEL.parent().attr("data-colr-cd");

        imgUrl.attr("src", folder + changeMd + "_" + changeCd + "_" + changeCL + ".png");

        var modelTxt = $("#reserveForm #modelNm").val();
        changeModel.html(modelTxt);
        changeColor.text($(".sel_opt.color li.on").text());
      }
    },
    // 유효성 검사
    validate: function (rcepMthd) {
      return new Promise(function (resolve, reject) {
        var jsonFormData = CommonUtils.getFormDataToJson("#myModal01_MW");

        var $selectedTab = $("#myModal01_MW");
        var validateFalg = true;

        // STEP-1 : 모델 검사
        var modelNm = $("#reserveForm #modelNm").val();
        var modTypCd = $("#reserveForm #modTypCd").val();
        var resvSaleCode = $("#reserveForm #resvSaleCode").val();

        var $selectedModel = $selectedTab.find(".modelNm").find("li.on");
        //var modTypCd = $selectedModel.attr('data-model-cd');

        // STEP-2 : (폰) 저장공간, (워치) 사이즈
        var $selectedSize = $selectedTab.find(".sizeCd").find("li.on");
        var sizeCd = $selectedSize.attr("data-size-cd");
        var sizeNm = $selectedSize
          .find("button")
          .text()
          .replace(/(^\s*)|(\s*$)/g, "");
        console.log(sizeNm);
        // STEP-3 : 가입유형
        var $selectedJoin = $selectedTab.find(".resvMnpStat").find("li.on");
        var joinCd = $selectedJoin.attr("data-resv-mnp-stat");
        var joinNm = $selectedJoin.find("button").text();

        // STEP-3 : 기기 색상
        var $colorDiv = $selectedTab.find(".color").find("li.on");
        var colrCd = $colorDiv.attr("data-colr-cd");
        var colrNm = $.trim($colorDiv.find("button").text());

        // STEP-6 : 개인정보 수집 및 이용 동의( server side에서도 병행할 것 )
        var $chkAgree = $("#alram_agree01");

        // STEP-7 :
        //let chkMarketAgreeTxt3 =   $("#alram_agree05").is(":checked")?" 3자에대한광고:Y":" 3자에대한광고:N";
        let chkMarketAgreeTxt4 = $("#alram_agree06").is(":checked") ? " 야간혜택알림:Y" : " 야간혜택알림:N";
        let agreetxt1 = $("#alram_agree03").is(":checked") ? " (선택)고객혜택제공:Y" : " (선택)고객혜택제공:N";
        let agreetxt2 = $("#alram_agree04").is(":checked") ? " (선택)광고성정보SMS:Y" : "( 선택)광고성정보SMS:N";
        //고객혜택제공, 광고성정보, 야간혜택알림

        var urlQueryString = window.location.search;
        const utmParm = "utm_source=upluslive";
        let chnlCd = "R3000004";
        chnlCd = urlQueryString.includes(utmParm) ? "R3000012" : "R3000004";

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

        return resolve({
          cmpnId: resvSaleCode, //이벤트 코드
          cmpnMdl: modTypCd, //이벤트 코드
          cmpnCapa: sizeCd, // 용량
          cmpnColr: colrCd, //색상
          cmpnGift: "", //사은품코드  -필수아님
          rcepMthd: "D01", //rcepMthd	신청방법	string	Y	D02	D01:택배, D02:매장,D03:직영점, D04:용산개통센터,D05:마곡개통센터
          rqstDivs: joinCd, //가입형태	string
          chnlCd: chnlCd,
          //rsvUserName : $name.val(),					// 신청자 이름
          //rsvHpNo : $phoneNo.val(),			// 신청자 휴대폰 번호
          rsvUserName: "", // 신청자 이름
          rsvHpNo: "",
          //alert문구 구성
          modelNm: modelNm,
          sizeNm: sizeNm,
          colrNm: colrNm,
          joinNm: joinNm,
          pnifPuseTrstAgrYn: $("#alram_agree03").is(":checked") ? "Y" : "N",
          mblAdRcpAgrYn: $("#alram_agree05").is(":checked") ? "Y" : "N",
          memo: agreetxt1 + agreetxt2 + chkMarketAgreeTxt4,
          essentialPersInfoCollectAgrYn1: $alarmAgreeButtons.agree1.is(":checked") ? "Y" : "N",
          persInfoCollectAgrYn3: $alarmAgreeButtons.agree3.is(":checked") ? "Y" : "N",
          prvBnftsAdverAgrYn4: $alarmAgreeButtons.agree4.is(":checked") ? "Y" : "N",
          prvBnftsOtherAdverAgrYn5: $alarmAgreeButtons.agree5.is(":checked") ? "Y" : "N",
          prvAdverNightAgrYn6: $alarmAgreeButtons.agree6.is(":checked") ? "Y" : "N",
        });
      });
    },
    submit: function () {
      console.log(submit_M_Data);
      $.ajax({
        url: "/presale/saveUserInput",
        type: "POST",
        data: submit_M_Data,
        cache: false,
      })
        .done(function (res, textStatus, xhr) {
          if (res.data) {
            //이벤트 참여
            PreSavingCtrl.requestCertification(1, res.data.hkey);
          }
          // 본인인증 팝업 닫기
          // modalAlertClose("myModalalert_reserve");
          // dim 처리를 위한 클래스 추가
          // $(".modal-backdrop").addClass("in");
        })
        .fail(function (xhr, textStatus, errorThrown) {});
    },
    returnToTermsAndConditions: function () {
      modalAlertClose("myModalalert_marketAgree");
      $("#alram_agree03").prop("checked", true);
      $("#alram_agree04").prop("checked", true);
      var is_checked = true;
      $(".chkBx").each(function () {
        is_checked = is_checked && $(this).is(":checked");
      });

      $(".allchk").prop("checked", is_checked);
    },
    confirmPreorder: function (agreeOptChk) {
      if (typeof agreeOptChk != "undefined" && agreeOptChk != null && agreeOptChk !== "") {
        if (agreeOptChk === "agreeOptChk") {
          $("#alram_agree03").prop("checked", true);
          $("#alram_agree04").prop("checked", true);
          // $("#alram_agree06").prop("checked", true);
        }
      }

      //APIM.requestReserve(submit_M_Data);
      this.validate("D01").then(
        function (submitData) {
          /* 확인 메세지 세팅 [F] */
          var confirmMsg = "";
          confirmMsg += submitData.modelNm + "<br>" + submitData.colrNm + "<br>";
          confirmMsg += submitData.sizeNm + "<br>" + submitData.joinNm + "<br>";
          confirmMsg +=
            "<br>이 내용으로 예약할게요 :)<br>예약자의 <strong>이름</strong>과 <strong>전화전호를</strong> 인증해주세요.";

          $("#myModalalert_marketAgree").hide();

          //preorder_confirm_msg
          $("#preorder_confirm_msg").html(confirmMsg);
          $("#myModalalert_reserve").modal();

          submit_M_Data = submitData;
          $(".modal-backdrop.in").addClass("over");
        },
        function (err) {
          console.error("submit error", err);
        }
      );
    },
    // 사전예약 요청 전송 > 사전예약완료
    goMain: function () {
      if ($(".modal-content").hasClass("step3")) {
        modalAlertClose("myModal01_MW");
      } else {
        var cmpnId = $("#reserveForm #resvSaleCode").val();
        modalAlertPop("myModalaler_order_stop");
      }
    },
    openAlarmEvtAfterKmc: function () {
      var seq = $("#r_seq").val();
      PreorderApimCtrl.success(seq);
    },
    validateAgree: function () {
      var $chkAgree = $("#alram_agree01");

      if (!$chkAgree.is(":checked")) {
        // $("#redMsg1").css("display", "block");
        var targetTab = $(".step2_wrap");
        var targetPosition = targetTab.position().top + targetTab.closest(".is-scroll").scrollTop();
        $(".controll_modal .is-scroll").animate({ scrollTop: targetPosition }, 400);
        validateFalg = false;
        return false;
      } else {
        //$("#redMsg1").css("display", "none");
      }

      var $agree3 = $("#alram_agree03");
      var $agree4 = $("#alram_agree04");

      if ($agree3.is(":checked") && $agree4.is(":checked")) {
        PreorderCtrl.confirmPreorder();
      } else {
        $("#myModalalert_marketAgree").modal("hide");
        modalAlertPop("myModalalert_marketAgree");
      }
    },
  }; //[END] RETURN
})();

const PreSavingCtrl = (function () {
  return {
    requestCertification: function (obj, seq) {
      var actionURL = "/certification/requestCertification";

      switch (obj) {
        case 1:
          $("#preorderKMC #eventId").val("preorder,hkey=" + seq);

          break;
        case 2:
          $("#preorderKMC #eventId").val("preorder_lglrps,hkey=" + seq);
          break;
      }

      $("#preorderKMC").attr("action", actionURL).submit();

      /*
         var seq = $("#r_seq").val();
         var target = "preorder_lglrps";
         var actionURL = "/certification/requestCertification";
         $("#preorderKMC #callId").val(target + ",seq=" + seq);
         $("#preorderKMC").attr("action", actionURL).submit();
         
         */
    },
  };
})();

function reject() {
  console.log("reject...mw......");
  //PreorderStoreApplyCtrl.close();
  $(".modal-header .close").click();
}
function copyText() {
  var copyText = $("#finish-pointpark-coupon").text();
  var textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.value = copyText;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("clipboard에 복사 되었습니다.");
}
function setActiveTab(i) {
  // 이전에 활성화된 탭/버튼/contents 초기화
  $(".modal-content").removeClass("step1 step2 step3");
  $(".modal-header").removeClass("step1 step2 step3");

  // i번째 클래스 추가
  $(".modal-content").addClass("step" + i);
  $(".modal-header").addClass("step" + i); // modal-header에도 클래스 추가

  // 각 탭의 위치를 계산하여 스크롤 위치 설정
  var targetTab = $(".step" + i + "_wrap");
  var targetPosition = targetTab.position().top + targetTab.closest(".is-scroll").scrollTop();

  if (i == 1) {
    $(".controll_modal .is-scroll").animate({ scrollTop: "0" }, 400);
    $("#modalTitle").html("<span>사전예약</span> 신청하기");
  } else if (i == 3) {
    $("#modalTitle").html("<span>홍길동</span> 님,<br><span>010-12**-**78</span> 번호로<br>사전예약을 완료했습니다.");
  } else {
    $(".controll_modal .is-scroll").animate({ scrollTop: targetPosition }, 400);
  }
}

$(document).ready(function () {
  $(".controll_modal .is-scroll").on("scroll", function () {
    var scrollTop = $(this).scrollTop();

    // step3일 경우 스크롤 이벤트 무시
    if ($(".modal-header").hasClass("step3") || $(".modal-content").hasClass("step3")) {
      return;
    }

    // 스크롤이 최상단일 때 step1으로 초기화
    if (scrollTop === 0) {
      $(".modal-header").removeClass("step1 step2 step3");
      $(".modal-header").addClass("step1");
      $("#modalTitle").html("<span>사전예약</span> 신청하기");
    }

    // 스크롤이 250 이상일 때 step2로 변경
    if (scrollTop >= 250) {
      $(".modal-header").removeClass("step1 step2 step3");
      $(".modal-header").addClass("step2");
    }
  });
});

function setCreateBtn(i) {
  $(".preorderfooterbtn").attr("disabled", "disabled");
  $(".preorderfooterbtn").css("display", "none");
  $("#preorder_footer_btn" + i).css("display", "block");
  $("#preorder_footer_btn" + i).removeAttr("disabled");

  switch (i) {
    case 4:
      $("#preorder_footer_btn" + i).attr("disabled", "disabled");
      break;
  }
}

$(document).ready(function () {
  // AOS 초기화
  if (typeof AOS !== "undefined") {
    // 첫 초기화
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
      duration: 800,
      // 모달 내부에서도 작동하도록 설정
      mirror: true,
      // 스크롤 이벤트 충돌 방지
      disableMutationObserver: true,
    });

    // 모든 이미지가 로드된 후 AOS 새로고침
    window.addEventListener("load", () => {
      AOS.refresh();
    });

    // 개별 이미지 로드 완료시마다 새로고침
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.addEventListener("load", () => {
        AOS.refresh();
      });
    });
  }
});
