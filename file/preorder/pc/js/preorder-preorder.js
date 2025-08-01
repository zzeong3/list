$(document).ready(function () {
  PreorderCtrl.init();
  $(".controll_modal .is-scroll").scroll(function () {
    var setPos = $(this).scrollTop();
    var step1Pos = $(".step1_wrap").position().top + setPos - $(this).position().top + 100;
    var step2Pos = $(".step2_wrap").position().top + setPos - $(this).position().top;
    var step3Pos = $(".step3_wrap").position().top + setPos - $(this).position().top;

    if (!$(".modal-content").hasClass("step3")) {
      if (setPos < step1Pos) {
        $(".modal-header").removeClass("step1 step2 step3");
        $(".modal-header").addClass("step1");
      } else {
        $(".modal-header").removeClass("step1 step2 step3");
        $(".modal-header").addClass("step2");
      }
    } else {
      $(".modal-header").removeClass("step1 step2 step3");
      $(".modal-header").addClass("step3");
    }
  });
});

let submit_M_Data;

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

const PreorderLGLRPSCtrl = (function () {
  return {
    isChild: function (preOrderData) {
      modalAlertClose("myModalalert_reserve");
      age14_under_set();
      setCreateBtn(4);
      $("#preorder_footer_btn4").attr(
        "onclick",
        "javascript:PreSavingCtrl.requestCertification(2,'" + preOrderData.hkey + "');return false;"
      );
    },
  };
})();

const PreSavingCtrl = (function () {
  return {
    requestCertification: function (obj, hkey) {
      var certUrl;
      switch (obj) {
        case 1:
          certUrl = "/certification/requestCertification?callId=preorder,hkey=" + hkey;
          break;
        case 2:
          certUrl = "/certification/requestCertification?callId=preorder_lglrps,hkey=" + hkey;
          break;
      }

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
  };
})();

const PreorderApimCtrl = (function () {
  return {
    success: function (preOrderData) {
      var chkAlrdyRsrvd = APIM.alrdyRsrvd(preOrderData.cmpnId, preOrderData.rsvUserName, preOrderData.rsvHpNo);

      chkAlrdyRsrvd.then(
        // success
        function (result) {
          // API �샇異� �떎�뙣
          if (result.status != "OK") {
            alert(result.message);
            return reject();
          }
          // API �샇異� 寃곌낵
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
    },
  };
})();

function updatefooter_btn3_GTM(w) {
  $("#preorder_footer_btn3 ").attr({
    // 브라우저 개발자 도구 상 변경사항 확인 위해 attr 임의 사용
    "data-gtm-click-text": "예약신청_05-신청완료_Case1" + w + " 쿠폰 사용하기",
    "data-gtm-event-label": "컨텐츠 : 예약신청_05-신청완료_Case1" + w + " 쿠폰 사용하기",
  });
}

/* ------comm-------- */
/** 사전 예약하기 UI 컨트롤 */
const PreorderCtrl = (function () {
  return {
    // 珥덇린�솕
    init: function () {
      this.bindEvent();
      console.log("PreorderCtrl.init");
    },
    getInstance: function () {
      return $("#myModal01"); //
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
    // �궗�쟾�삁�빟 �슂泥� �쟾�넚 > �궗�쟾�삁�빟�셿猷�
    goMain: function () {
      if ($(".modal-content").hasClass("step3")) {
        modalAlertClose("myModal01");
      } else {
        var cmpnId = $("#reservePForm #resvSaleCode").val();

        if (!isNull(cmpnId) && cmpnId == Preorder.resvSaleCodeFlipSp) {
          modalAlertPop("myModalaler_order_stop2"); // �뿉�뵒�뀡 �쟾�슜 �씠�깉諛⑹�
        } else {
          modalAlertPop("myModalaler_order_stop"); // 湲곕낯 �씠�깉諛⑹�
        }
      }
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

        //advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
        //return false;
      });

      // �샃�뀡 �꽑�깮 而щ윭 //sel_opt color phoneC
      $(".sel_opt.color li button").on("click", function () {
        var $choiceLi = $(this).closest("li");
        if ($choiceLi.hasClass("disable")) {
          return false;
        } else {
          $choiceLi.addClass("on").siblings("li").removeClass("on");
        }
        //紐⑤뜽 蹂�寃쎌떆 �씠誘몄� 泥댁씤吏�
        PreorderCtrl.changeimg($(this));
        // �깋�긽 �꽑�깮 �떆 �뀓�뒪�듃 蹂�寃�
        var $choiceUl = $(this).closest(".sel_opt");
        $choiceUl.parents(".optBoxInner").find(".on_txt").text($(this).text());
        //advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
      });

      // �샃�뀡 �꽑�깮
      $(".sel_opt.sizeCd li button").on("click", function () {
        var $choiceLi = $(this).closest("li");
        if ($choiceLi.hasClass("disable")) {
          return false;
        } else {
          $choiceLi.addClass("on").siblings("li").removeClass("on");
        }

        var $choiceVolumn = $(".change_volumn");
        $choiceVolumn.text($(this).text());
        //advALARMUtils.callRTBChoice($(".sel_opt.sizeCd li.on").text(), $(".sel_opt.color li.on").text());
      });

      //�쑕���룿紐� �몢以꾩쿂由�
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
      //advALARMUtils.callRtbPreorder($('.sel_opt.modelNm li.on').text().trim());
      // advALARMUtils.callRTBChoice($('.sel_opt.sizeCd li.on').text(),$('.sel_opt.color li.on').text());
    },

    open: function (cmpnId, cmpnMdl, cmpnCapa, cmpnColr) {
      PreorderCtrl.bindEvent();

      /*
			if(!isNull(cmpnId)){ 
				$("#reservePForm #resvSaleCode").val(cmpnId);
			}
			advALARMUtils.callRtbPreorder($("#reservePForm #modelNm").val());
			*/
      if (PreorderCtrl.status == "over") {
        var message = "사전예약이 종료되었습니다.";
        return alert(message);
      }

      chageDoubleSubmitPreorderFlag();

      //this.initialBuild( cmpnId , cmpnMdl ,cmpnCapa,cmpnColr);
      this.initialBuild("", cmpnMdl, cmpnCapa, cmpnColr);
      $("#myModal01").modal("show");
      $("body").css("overflow", "hidden");
      $(".is-scroll").scrollTop(0);
      $(".modal-body").scrollTop(0);
      $(".pop_inner").scrollTop(0);
      $(".allchk").hasClass("allchk");
      $(".chkBx").prop("checked", false);
      $(".step-complete").removeClass("is-checked");
    },
    //,initialBuild: function(cmpnId , cmpnMdl ,cmpnCapa,cmpnColr  ) {
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

      // javascript:PreorderCtrl.choiceModel('2','20240002','PH001','媛ㅻ윮�떆 Z�뵆由�6 �솕�궛洹��솚 �뿉�뵒�뀡�룿');
      await PreorderCtrl.iInitialPreorderPageBuild(modelIndex, cmpnMdl, cmpnCapa, cmpnColr);
      setActiveTab(1);
      setCreateBtn(1);
    },
    iInitialPreorderPageBuild: function (modelIndex, cmpnMdl, cmpnCapa, cmpnColr) {
      console.log("call iInitialPreorderPageBuild " + modelIndex);
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
          $("#preOrder_optBox").html(data);
          PreorderCtrl.PreorderPageBuildBindEvent();
        },
        error: function () {
          alert("오류가 발생하였습니다.");
        },
      });
    },
    choiceModel: function (modelIndex, resvSaleCode, modTypCd, modTypCdDesc) {
      $("#reservePForm #resvSaleCode").val(resvSaleCode);
      $("#reservePForm #modTypCd").val(modTypCd);
      $("#reservePForm #modelNm").val(modTypCdDesc);

      var params = {
        modelIndex: modelIndex,
      };

      $.ajax({
        url: "/preOrder/choiceModel",
        type: "POST",
        data: params,
        cache: false,
        success: function (data) {
          $("#preOrder_optBox").html(data);
          PreorderCtrl.PreorderPageBuildBindEvent();
        },
        error: function () {
          alert("오류가 발생하였습니다.");
        },
      });

      //durl
    },
    chageSizeCdStatus: function (colorCd) {
      //console.log()
      modTypCd = $("#reservePForm #modTypCd").val();
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
    //�빟愿�
    composeActiveTab2: function () {
      setActiveTab(2);
      setCreateBtn(2);
      setGtmAttrRebuilder("D21");
      //advALARMUtils.callRTBPreorderStep2($("#reservePForm #modelNm").val());
    },
    //�셿猷뚰럹�씠吏�
    composeActiveTab3_final: function (dataSet) {
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
        var completed_result_prize_nm2 = "<strong>" + dataSet.giftName + "</strong> 즉시 할인 쿠폰 발급 완료!";
        $("#completed_result_prize_nm2").html(completed_result_prize_nm2);
        $("#completed_result_prize_nm_bottom").html(dataSet.giftName);

        //napy쿠폰
        if (dataSet.couponType == "NPAY") {
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
        "</span> 님, <span>" +
        hpFormatHiddenByRegx(dataSet.rsvHpNo) +
        "</span> 번호로 사전예약을 완료했습니다.";

      $("#modalTitle").html(fin_title_msg);
      $("#finish-model-nm").html(dataSet.modelNm);
      $("#finish-color").text(dataSet.colrNm);
      $("#finish-storage").text(dataSet.sizeNm);
      $("#finish-join-nm").text(dataSet.joinNm);
      $("#finish-resv-num").text(dataSet.rsvSaleNo);

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
    },
    /*
		,choiceModel2 : function(modelIndex,resvSaleCode,modTypCd,modTypCdDesc){
			$("#reservePForm #resvSaleCode").val(resvSaleCode);
			$("#reservePForm #modTypCd").val(modTypCd);
			$("#reservePForm #modelNm").val(modTypCdDesc);
			
			var params = {
					"modelIndex"	: modelIndex
				};

			$.ajax({
				url: "/preOrder/choiceModel"
				, type: "POST"
				, data : params
				, cache : false
				, success: function(data) {
					$("#preOrder_optBox").html(data);

					PreorderCtrl.PreorderPageBuildBindEvent();		
					 
				}, error : function() {
					alert("�삤瑜섍� 諛쒖깮�븯���뒿�땲�떎.");
				}
			});
		}
		*/
    changeimg: function (val) {
      console.log(Resource.imgUrl);

      var seletedEL = val;
      var folder = Resource.imgUrl + "/pc/img/preorderSeleted_IMG/";
      var seletedMD = $(".modelNm .on").find("button").attr("data-model");
      var listCk = val.parent().parent();
      var imgUrl = $(".change_img");

      var changeModel = $(".change_model");
      var changeColor = $(".change_color");
      var changeVolumn = $(".change_volumn");

      if (listCk.hasClass("modelNm")) {
        var changeMd = $("#reservePForm #resvSaleCode").val();
        var changeNM = seletedEL.attr("data-model");
        //var changeCd = "PH001";
        //var defaultCL = "CO001"
        var changeNM = seletedEL.attr("data-model");

        var changeCd = $(".sel_opt.color li.on").attr("data-colr-cd");
        imgUrl.attr("src", folder + changeMd + "_" + changeCd + "_" + changeCL + ".png");

        //header �궡 紐⑤뜽紐� �닔�젙
        var modelTxt = $("#reservePForm #modelNm").val();
        changeModel.html(modelTxt);
      }
      if (listCk.hasClass("phoneC")) {
        var changeCL = seletedEL.parent().attr("data-colr-cd");
        var changeMd = $("#reservePForm #resvSaleCode").val();
        var changeNM = seletedEL.attr("data-model");

        var changeCd = seletedEL.parent().attr("data-model-cd");
        var changeCL = seletedEL.parent().attr("data-colr-cd");

        imgUrl.attr("src", folder + changeMd + "_" + seletedMD + "_" + changeCL + ".png");

        var modelTxt = $("#reservePForm #modelNm").val();
        changeModel.html(modelTxt);
        changeColor.text($(".sel_opt.color li.on").text());
      }
    },
    // �쑀�슚�꽦 寃��궗
    validate: function (rcepMthd) {
      console.log("call validate ");
      return new Promise(function (resolve, reject) {
        var jsonFormData = CommonUtils.getFormDataToJson("#myModal01");
        var $selectedTab = $("#myModal01");
        var validateFalg = true;

        // STEP-1 : 紐⑤뜽 寃��궗
        var modelNm = $("#reservePForm #modelNm").val();
        var modTypCd = $("#reservePForm #modTypCd").val();
        var resvSaleCode = $("#reservePForm #resvSaleCode").val();

        var $selectedModel = $selectedTab.find(".modelNm").find("li.on");

        // STEP-2 : (�룿) ���옣怨듦컙, (�썙移�) �궗�씠利�
        var $selectedSize = $selectedTab.find(".sizeCd").find("li.on");
        var sizeCd = $selectedSize.attr("data-size-cd");
        //var sizeNm = $selectedSize.find('button').text();
        var sizeNm = $selectedSize
          .find("button")
          .text()
          .replace(/(^\s*)|(\s*$)/g, "");

        // STEP-3 : 媛��엯�쑀�삎
        var $selectedJoin = $selectedTab.find(".resvMnpStat").find("li.on");
        var joinCd = $selectedJoin.attr("data-resv-mnp-stat");
        var joinNm = $selectedJoin.find("button").text();

        // STEP-3 : 湲곌린 �깋�긽
        var $colorDiv = $selectedTab.find(".color").find("li.on");
        var colrCd = $colorDiv.attr("data-colr-cd");
        var colrNm = $.trim($colorDiv.find("button").text());

        // STEP-6 : 媛쒖씤�젙蹂� �닔吏� 諛� �씠�슜 �룞�쓽( server side�뿉�꽌�룄 蹂묓뻾�븷 寃� )
        var $chkAgree = $("#alram_agree01");

        if (!$chkAgree.is(":checked")) {
          //$("#redMsg1").css("display", "block");
          validateFalg = false;
        } else {
          //$("#redMsg1").css("display", "none");
        }

        if (validateFalg == false) {
          return reject();
        } else {
          $(".warningtxt").css("display", "none");
        }

        // STEP-7 :
        let chkMarketAgreeTxt4 = $("#alram_agree06").is(":checked") ? " 야간혜택알림:Y" : " 야간혜택알림:N";
        let agreetxt1 = $("#alram_agree03").is(":checked") ? " (선택)고객혜택제공:Y" : " (선택)고객혜택제공:N";
        let agreetxt2 = $("#alram_agree04").is(":checked") ? " (선택)광고성정보SMS:Y" : "( 선택)광고성정보SMS:N";

        var urlQueryString = window.location.search;
        const utmParm = "utm_source=upluslive";
        let chnlCd = "R3000004";
        chnlCd = urlQueryString.includes(utmParm) ? "R3000012" : "R3000004";
        let apiUm = urlQueryString.includes(utmParm) ? utmParm : " ";

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

        console.log($alarmAgreeButtons.agree1.is(":checked"));
        console.log(jsonFormData.essentialPersInfoCollectAgrYn1);
        return resolve({
          cmpnId: resvSaleCode, //�씠踰ㅽ듃 肄붾뱶
          cmpnMdl: modTypCd, //�씠踰ㅽ듃 肄붾뱶
          cmpnCapa: sizeCd, // �슜�웾
          cmpnColr: colrCd, //�깋�긽
          cmpnGift: "", //�궗���뭹肄붾뱶  -�븘�닔�븘�떂
          rcepMthd: "D01", //rcepMthd	�떊泥�諛⑸쾿	string	Y	D02	D01:�깮諛�, D02:留ㅼ옣,D03:吏곸쁺�젏, D04:�슜�궛媛쒗넻�꽱�꽣,D05:留덇끝媛쒗넻�꽱�꽣
          rqstDivs: joinCd, //媛��엯�삎�깭	string
          chnlCd: chnlCd,
          rsvUserName: "", // �떊泥��옄 �씠由�
          rsvHpNo: "",
          //alert臾멸뎄 援ъ꽦
          modelNm: modelNm,
          sizeNm: sizeNm,
          colrNm: colrNm,
          joinNm: joinNm,
          utm: apiUm,
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

    // �궗�쟾�삁�빟 �슂泥� �쟾�넚 > �궗�쟾�삁�빟�셿猷�
    submit: function (agreeOptChk) {
      $.ajax({
        url: "/presale/saveUserInput",
        type: "POST",
        data: submit_M_Data,
        cache: false,
      })
        .done(function (res, textStatus, xhr) {
          if (res.data) {
            //�씠踰ㅽ듃 李몄뿬
            PreSavingCtrl.requestCertification(1, res.data.hkey);
          }
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
      // 마케팅 동의 체크 여부 확인 및 자동 체크 처리
      if (typeof agreeOptChk != "undefined" && agreeOptChk != null && agreeOptChk !== "") {
        if (agreeOptChk === "agreeOptChk") {
          $("#alram_agree03").prop("checked", true); // 개인정보 수집/이용 동의
          $("#alram_agree04").prop("checked", true); // 광고성 정보 수신 동의
          // $("#alram_agree06").prop("checked", true); // 야간 광고성 정보 수신 동의
        }
      }

      modalAlertClose("myModalalert_marketAgree");

      this.validate("D01").then(
        function (submitData) {
          console.log("call msg ");
          /* 확인 메세지 세팅 [F] */
          var confirmMsg = "";
          // 선택한 모델/색상/용량/가입형태 정보로 메시지 구성
          confirmMsg += submitData.modelNm + "<br>" + submitData.colrNm + "<br>";
          confirmMsg += submitData.sizeNm + "<br>" + submitData.joinNm + "<br>";
          confirmMsg +=
            "<br>이 내용으로 예약할게요 :)<br>예약자의 <strong>이름</strong>과 <strong>전화전호를</strong> 인증해주세요.";

          // 마케팅 동의 팝업 닫고 예약 확인 팝업 표시
          $("#myModalalert_marketAgree").modal("hide");
          $("#preorder_confirm_msg").html(confirmMsg);
          modalAlertPop("myModalalert_reserve");
          submit_M_Data = submitData;

          // 딤처리를 위한 클래스 추가
          $(".modal-backdrop.in").addClass("over");
        },
        function (err) {
          console.error("submit error", err);
        }
      );
    },
    validateAgree: function () {
      console.log("call validateAgree");
      var $chkAgree = $("#alram_agree01");

      // 필수 동의 체크 확인
      if (!$chkAgree.is(":checked")) {
        // $("#redMsg1").css("display", "block");
        // 동의 영역으로 스크롤 이동
        var targetTab = $(".step2_wrap");
        var targetPosition = targetTab.position().top + targetTab.closest(".is-scroll").scrollTop();
        $(".controll_modal .is-scroll").animate({ scrollTop: targetPosition }, 400);
        return false;
      } else {
        // $("#redMsg1").css("display", "none");
      }

      // 마케팅 관련 동의 체크 확인
      var $agree3 = $("#alram_agree03"); // 개인정보 수집/이용
      var $agree4 = $("#alram_agree04"); // 광고성 정보 수신

      // 모든 마케팅 동의가 체크된 경우 예약 진행
      if ($agree3.is(":checked") && $agree4.is(":checked")) {
        PreorderCtrl.confirmPreorder();
      } else {
        // 마케팅 동의 팝업 표시
        $("#myModalalert_marketAgree").modal("hide");
        modalAlertPop("myModalalert_marketAgree");
      }
    },
  }; //[END] RETURN
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
  $(".controll_modal .is-scroll").animate({ scrollTop: -100 }, 0);
  // �씠�쟾�뿉 �솢�꽦�솕�맂 �꺆/踰꾪듉/contents 珥덇린�솕
  $(".modal-content").removeClass("step1 step2 step3");
  // i踰덉㎏ �겢�옒�뒪 異붽�
  $(".modal-content").addClass("step" + i);

  // 媛� �꺆�쓽 �쐞移섎�� 怨꾩궛�븯�뿬 �뒪�겕濡� �쐞移� �꽕�젙
  var targetTab = $(".step" + i + "_wrap");
  /*var targetPosition = targetTab.position().top + targetTab.closest('.is-scroll').scrollTop() + $('.is-scroll').position().top;*/
  var targetPosition = targetTab.position().top + targetTab.closest(".is-scroll").scrollTop();

  if (i == 1) {
    $(".controll_modal .is-scroll").animate({ scrollTop: "0" }, 400);
  } else {
    $(".controll_modal .is-scroll").animate({ scrollTop: targetPosition }, 400);
  }

  if (i == 1) {
    $("#modalTitle").html("<span>사전예약</span> 신청하기");
  } else if (i == 3) {
    $(".modal-content").removeClass("step1 step2 step3");
    $(".modal-header").removeClass("step1 step2 step3");

    $(".modal-content").addClass("step" + i);
    $(".modal-header").addClass("step" + i);

    //$('#modalTitle').html('<span>�솉湲몃룞</span> �떂, <span>010-12**-**78</span> 踰덊샇濡� �궗�쟾�삁�빟�쓣 �셿猷뚰뻽�뒿�땲�떎.');
  }
}
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
  // AOS 珥덇린�솕
  if (typeof AOS !== "undefined") {
    // 泥� 珥덇린�솕
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

    // 紐⑤뱺 �씠誘몄�媛� 濡쒕뱶�맂 �썑 AOS �깉濡쒓퀬移�
    window.addEventListener("load", () => {
      AOS.refresh();
    });

    // 媛쒕퀎 �씠誘몄� 濡쒕뱶 �셿猷뚯떆留덈떎 �깉濡쒓퀬移�
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.addEventListener("load", () => {
        AOS.refresh();
      });
    });
  }
});
