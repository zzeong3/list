/**
 *
 */
$(document).ready(function () {
  console.log("DatalakeCtrl..ready..");
});

const DatalakeCtrl = (function () {
  return {
    call: async function (dl_name, dl_phoneNumber, addData1, addData2, addData3) {
      var reqParams = {};
      var context = await getUplusEventContext();
      reqParams.context = context;

      reqParams.mainPageUrl = "https://preorder.lguplus.com"; //메인 랜딩 페이지
      reqParams.campaignName = "New Galaxy Z Series 사전알람"; //캠페인명(1depth)
      reqParams.eventName = "사전알람 신청"; //하위 이벤트명(2depth)

      const todayDate = new Date();
      reqParams.eventTime = todayDate.toISOString(); //이벤트 참여 시간
      todayDate.setMonth(todayDate.getMonth() + 12); //
      reqParams.expirationDate = todayDate.toISOString(); //개인정보 만료일자

      reqParams.marketingConsent = true;
      reqParams.devMode = false;
      var reqAdditionalData = {
        additionalProp1: addData1,
        additionalProp2: addData2,
        additionalProp3: addData3,
      };

      reqParams.additionalData = reqAdditionalData;
      reqParams.name = dl_name;
      reqParams.phoneNumber = dl_phoneNumber;
      reqParams.ipAddress = "";

      $.ajax({
        url: "/datalake/call",
        type: "POST",
        data: JSON.stringify(reqParams),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        timeout: 5000,
        tryCount: 0,
        retryLimit: 3,
        success: function (res2) {},
        error: function (xhr, textStatus, errorThrown) {
          if (textStatus == "timeout") {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              //try again
              $.ajax(this);
              return;
            }
            return;
          }
          if (xhr.status == 500) {
            //handle error
          } else {
            //handle error
          }
        },
        complete: function (res2) {
          console.log("complete");
        },
      });
    },

    alarmCall: async function (dl_name, dl_phoneNumber, marketingConsent, addData1, addData2, addData3) {
      var reqParams = {};
      var context = await getUplusEventContext();
      reqParams.context = context;

      reqParams.mainPageUrl = "https://preorder.lguplus.com"; //메인 랜딩 페이지
      reqParams.campaignName = "New Galaxy Z Series 사전알람"; //캠페인명(1depth)
      reqParams.eventName = "사전알람 신청"; //하위 이벤트명(2depth)

      const todayDate = new Date();
      reqParams.eventTime = todayDate.toISOString(); //이벤트 참여 시간
      todayDate.setMonth(todayDate.getMonth() + 12); //
      reqParams.expirationDate = todayDate.toISOString(); //개인정보 만료일자

      reqParams.marketingConsent = marketingConsent;
      reqParams.devMode = false;
      var reqAdditionalData = {
        additionalProp1: addData1,
        additionalProp2: addData2,
        additionalProp3: addData3,
      };

      reqParams.additionalData = reqAdditionalData;
      reqParams.name = dl_name;
      reqParams.phoneNumber = dl_phoneNumber;
      reqParams.ipAddress = "";
      $.ajax({
        url: "/datalake/call",
        type: "POST",
        data: JSON.stringify(reqParams),
        contentType: "application/json; charset=utf-8",
        cache: false,
        dataType: "json",
        timeout: 5000,
        tryCount: 0,
        retryLimit: 3,
        success: function (res2) {},
        error: function (xhr, textStatus, errorThrown) {
          if (textStatus == "timeout") {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
              //try again
              $.ajax(this);
              return;
            }
            return;
          }
          if (xhr.status == 500) {
            //handle error
          } else {
            //handle error
          }
        },
        complete: function (res2) {
          console.log("complete");
        },
      });
    },
  }; //return
})();
