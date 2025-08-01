//formatter
const FormatRegx = (function () {
  return {
    dateFormat: function (exs) {
      const pattern = /^(\d{4})-?(\d{2})-?(\d{2})$/;
      let result = "";
      if (!exs) return result;

      if (pattern.test(exs)) {
        result = exs.replace(pattern, "$1-$2-$3");
      } else {
        result = "***";
      }
      return result;
    },
    hpFormatHiddenByRegx: function (hp) {
      const pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d(\d{3})$/;
      let result = "";
      if (!hp) return result;

      if (pattern.test(hp)) {
        result = hp.replace(pattern, "$1-$2**-*$3");
      } else {
        result = "***";
      }
      return result;
    },
  };
})();

// 더블클릭 방지t
var doubleSubmitPreorderFlag = false;
function doubleSubmitCheck_pre() {
  if (doubleSubmitPreorderFlag) {
    return doubleSubmitPreorderFlag;
  } else {
    doubleSubmitPreorderFlag = true;
    return false;
  }
}
function chageDoubleSubmitPreorderFlag() {
  doubleSubmitPreorderFlag = false;
}

function callapimTag(gtm_tg_preFin) {
  dataLayer.push({
    event: "compEvt",
    comp_evt_name: "z폴더블7 사전 예약 신청",
    comp_evt_content: gtm_tg_preFin,
  });

  advALARMUtils.callCauly();
  advALARMUtils.callMetafbq();
  advALARMUtils.callkakaoPixelAl();

  // gtag('event', 'conversion', {'send_to':
  // 'AW-11262668721/cFR9CJPE0tEZELHfuvop'});
  ttq.track("CompleteRegistration");
  advALARMUtils.callDanggeunMarket();
  advALARMUtils.callCriteo();
  // call_tag_();
}

// 사전예약 APIM
const APIM = (function () {
  return {
    alrdyRsrvd: function (resvSaleCode, rsvUserName, rsvHpNo) {
      // 가능여부 조회

      console.log(doubleSubmitCheck_pre);
      if (doubleSubmitCheck_pre()) return;

      const params = {
        cmpnId: resvSaleCode,
        rsvUserName: rsvUserName,
        rsvHpNo: rsvHpNo,
      };

      const apiUrl = "/apimApi/getPsblYn";
      const promise = $.ajax({
        url: apiUrl,
        type: "POST",
        data: params,
      });
      return promise;
    },
    alrdyRsrvdEvt: function (rsvUserName, rsvHpNo) {
      // 가능여부 조회
      const params = {
        rsvUserName: rsvUserName,
        rsvHpNo: rsvHpNo,
      };

      const apiUrl = "/apimApi/alrdyRsrvdEvt";
      const promise = $.ajax({
        url: apiUrl,
        type: "POST",
        data: params,
      });
      return promise;
    },

    /**
     * 사전예약 요청
     */
    requestReserve: function (submitData) {
      const apiUrl = "/apimApi/postPreSaleJoin";
      $.ajax({
        url: apiUrl,
        type: "POST",
        data: submitData,
        beforeSend: function () {
          // $MlSpinner.show();
        },
        success: function (result) {
          if (result.status === "OK") {
            const rsltCd = result.data.body.rsltInfo.rsltCd;
            const rsltMsg = result.data.body.rsltInfo.rsltMsg;

            // if( rsltCd === "00") {
            if (rsltCd === "00" || (rsltCd === 99 && rsltMsg === "전략단말예약 문자발송 실패")) {
              submitData.rsvSaleNo = result.data.body.presaleRegInfo.rsvSaleNo;
              submitData.preorderCnt = result.data.body.presaleRegInfo.preorderCnt;

              $(".modal-backdrop.in").removeClass("over");
              $("#myModalalert_reserve").modal("hide");

              // DatalakeCtrl.call
              /*
									let addData1 = submitData.rsvSaleNo + "_"
											+ submitData.modelNm + "_"
											+ submitData.colrNm;
									let addData2 = submitData.sizeNm;
									let addData3 = submitData.joinNm;
								
									DatalakeCtrl.call(submitData.rsvUserName,
											submitData.rsvHpNo, addData1,
											addData2, addData3);
									 */

              if (result.data2 == "1") {
                //if(true){
                const paramss = {
                  rsvSaleNo: submitData.rsvSaleNo,
                  phoneNo: submitData.rsvHpNo,
                  telType: submitData.telType,
                  hkey: submitData.hkey,
                };
                $.ajax({
                  url: "/couponMgmtCtl/call",
                  type: "POST",
                  data: paramss,
                  cache: false,
                })
                  .success(function (res, textStatus, xhr) {
                    if ("OK" == res.status) {
                      submitData.couponNo = res.data.body.data;
                      submitData.giftImg = res.data.body.giftImg;
                      submitData.giftName = res.data.body.giftNm;
                      submitData.giftDesc = res.data.body.giftDesc;
                      submitData.couponType = res.data.body.couponType;
                    }
                  })
                  .done(function (res, textStatus, xhr) {
                    PreorderCtrl.composeActiveTab3_final(submitData);
                  })
                  .fail(function (xhr, textStatus, errorThrown) {});
              } else {
                PreorderCtrl.composeActiveTab3_final(submitData);
              }

              var gtm_tg_preFin =
                submitData.modelNm +
                "_" +
                submitData.sizeNm +
                "_" +
                submitData.colrNm +
                "_" +
                submitData.joinNm +
                "_" +
                result.data.body.presaleRegInfo.rsvSaleNo;
              callapimTag(gtm_tg_preFin);
            } else if (result.data.body.rsltInfo.rsltCd === "20") {
              alert(result.data.body.rsltInfo.rsltMsg);
              PreorderCtrl.close_modal();
            } else if (result.data.body.rsltInfo.rsltCd === "99") {
              alert(result.data.body.rsltInfo.rsltMsg);
              PreorderCtrl.close_modal();
            }
          }
          // status: 'FAIL', message: '사전예약 기간이 종료되었습니다.'
          else if (result.data === "TerminateApimPost") {
            alert(result.message);
            PreorderCtrl.close_modal();
          } else resvErrCb();
        },
        error: resvErrCb,
        complete: function () {
          console.log("calllcompletecompletecomplete");
        },
      });
      /** 에러 콜백 */
      function resvErrCb() {
        alert("사전예약 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해주십시오.");
        PreorderCtrl.close_modal();
      }
    },
    updateReserve: function (submitData) {
      const apiUrl = "/apimApi/putPreSaleUpdate";
      $.ajax({
        url: apiUrl,
        type: "POST",
        data: submitData,
        success: function (result) {
          if (result.status === "OK") {
            const rsltCd = result.data.body.rsltInfo.rsltCd;
            const rsltMsg = result.data.body.rsltInfo.rsltMsg;

            if (rsltCd === "00") {
              alert("사전예약정보가 수정되었습니다.");
              PreorderUpdateCtrl.close();
              ListCtrl.goResvList();
            }
          } else resvErrCb();
        },
        error: resvErrCb,
        complete: function () {
          // $MlSpinner.hide();
        },
      });
      /** 에러 콜백 */
      function resvErrCb() {
        alert("사전예약 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해주십시오.");
      }
    },
    deleteReserve: function (resvSaleCode, reqSeqNo) {
      var confirmMsg = "선택하신 사전예약 내역을 취소하시겠습니까?";

      if (!confirm(confirmMsg)) return;
      //
      var apiUrl = "/apimApi/putPreSaleDelete";

      $.ajax({
        url: apiUrl,
        type: "POST",
        data: {
          token: "",
          cmpnId: resvSaleCode,
          rsvSaleNo: reqSeqNo,
        }, // HTTP 요청과 함께 서버로 보낼 데이터,
        success: function (result) {
          if (result.data.body.rsltInfo.rsltCd === "00") {
            ListCtrl.goResvList();
          } else {
            alert(result.data.body.rsltInfo.rsltMsg);
          }
        },
        error: function (xhr, status, error) {
          alert("서버통신이 지연되고 있습니다.\n잠시 후 다시 시도해 주시기 바랍니다.");
        },
      });
    },
    presalesPsblModalShow: function () {
      $("#checkHistory")
        .modal("show")
        .each(function () {
          $(this).css("z-index", "1051");
          $(".modal-backdrop.in").addClass("over");
          $(".close,.btn_hide").on("click", function () {
            $(".modal-backdrop.in").removeClass("over");
          });
        });
    },
    presalesPsblModalShowPC: function () {
      $("#checkHistory")
        .modal("show")
        .each(function () {
          $(this).css("z-index", "1060");
          $(".modal-backdrop.in").addClass("over");
          $(".close,.btn_hide").on("click", function () {
            $(".modal-backdrop.in").removeClass("over");
          });
        });
    },
  }; // return
})();
