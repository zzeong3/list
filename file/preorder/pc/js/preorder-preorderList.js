//사전예약관련 js
$(document).ready(function(){
	
})


const ListCtrl = (function(){
	return {
		goCresteForm : function (resvSaleCode, reqSeqNo) {
			$('#resvSaleCodeList').val(resvSaleCode);
			$('#reqSeqNo').val(reqSeqNo);
			document.getElementById("resvFrom").submit();
		},
		/*kmc 인증 PC ie opener 관련 이슈 해결을 위한 opener 강제 정의*/
		requestCertification : function () {
			window.name = "kmcCerti";
			var popUrl = "/certification/requestCertification?callId=rsvList";
			var left = (screen.width / 2) - (450 / 2);
			var top = (screen.height / 2) - (600 / 2);
			var title = "KMCISWindow";
			var popOption = "fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no,width=450, height=550, resizable=no, scrollbars=no,top=" + top + ",left=" + left;
			window.open(popUrl, title, popOption);
			
		},
	    
	    goResvList : function() {
	    	
	    	console.log("goResvList");
	    	const apiUrl = "/apimApi/getPreSale";
	    	const cmpnId = $("#resvSaleCodeList").val();
	    	const rsvUserName = $("#userNm").val();
	    	const rsvHpNo = $("#hpNo").val();
	    	const joinStatus = /*[[${joinPeriodStatus}]]*/ "";
	    	const preorderStatus= /*[[${preorderStatus}]]*/ "";
	    	const params = {
	            cmpnId: cmpnId,
	            rsvUserName: rsvUserName,
	            rsvHpNo: rsvHpNo
	        };
	    	
	        $.ajax({
	            url: apiUrl,
	            type: "POST",
	            cache: false,
	            data: params
	            , success: function (result) {
	            	 $("#select_rsv_type").css('display', 'none');

	                 if (result.data.body.rsltInfo.totalCnt > 0) {
	                     $("#inner_list").css('display', 'block');
	                     
	                     var content = '';
	                     for (var i = 0; i < result.data.body.rsltInfo.totalCnt; i++) {
	                         content += '<tr class ="listBox" style="">';
	                         content += '<td id = "reqDt">' + result.data.body.presaleRegInfo[i].rsvSaleRqstDt + '</td>';
	                         content += '<td id = "reqSeqNo">' + result.data.body.presaleRegInfo[i].rsvSaleNo + '</td>';   //:
	                         content += '<td id = "modTypNm">' + result.data.body.presaleRegInfo[i].cmpnMdlNmText + '</td>';
	                         content += '<td id = "sizeNm">' + result.data.body.presaleRegInfo[i].cmpnCapaNm + '</td>';
	                         content += '<td id = "resvMnpStatNm">' + result.data.body.presaleRegInfo[i].rqstDivsNm + '</td>';
	                         content += '<td id = "colrNm">' + result.data.body.presaleRegInfo[i].cmpnColrNm + '</td>';
	                         content += '<td id = "dlrNm">' + result.data.body.presaleRegInfo[i].saleOrgNm;
	                         content += '</span><span class="tell">' + result.data.body.presaleRegInfo[i].rsvSaleRecvHpno + '</span></td>';
	                         content += '<td id = "cmpnGiftNm">' + result.data.body.presaleRegInfo[i].cmpnGiftNm + '</td>';
	                         
	                         if(PreorderList.preorderStatus=="on"){
	                        		content += '<td><input type="button" value="수정" onclick="javascript:ListCtrl.goPreOrderUpdate(\''
		                             	+ result.data.body.presaleRegInfo[i].detailCmpId
		                             	+ '\',\'' + result.data.body.presaleRegInfo[i].rsvSaleNo
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnMdl
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnMdlNmText
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnCapa
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnColr
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].rqstDivs
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnGift
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnMdlNm
		                                 + '\',\'' + result.data.body.presaleRegInfo[i].cmpnColrNm
		                                 + '\');" class="rsvModi">';
		                         content += '<input type="button" value="취소" onclick="javascript:APIM.deleteReserve(\'' + result.data.body.presaleRegInfo[i].detailCmpId + '\',\''
		                             + result.data.body.presaleRegInfo[i].rsvSaleNo + '\');" class="rsvDel"></td>';
	                         }
	                         
	                         
	                         if(PreorderList.preorderStatus=="over"){
	                        	content += '<td><input type="button" value="수정"  onclick="javascript:alert(\'사전예약이 종료되었습니다.\');" class="rsvModi">';
	                        	content += '<input type="button" value="취소"  onclick="javascript:alert(\'사전예약이 종료되었습니다.\');" class="rsvDel"> </td>';
	                        	 
	                         }
                            
	                         $('#resvList').html(content);
	                     }

	                 } else {

	                     $("#inner_list").css('display', 'block');
	                     $("#ptype1_resernone").css('display', 'block');
	                     $(".reservY").css('display', 'none');

	                 }
	            }
	        });
	    },
	    
	    goPreOrderUpdate : function (detailCmpId,
				rsvSaleNo,
	            cmpnMdl,
	            cmpnMdlNmText,
	            cmpnCapa,
	            cmpnColr,
	            rqstDivs,
	            cmpnGift,
	            modelNm,
	            cmpnColrNm) {

			$("#reserveFormUpdate #rsvSaleNo").val(rsvSaleNo);
			$("#reserveFormUpdate #cmpnId").val(detailCmpId);
			$("#reserveFormUpdate #cmpnMdlNmText").val(cmpnMdlNmText);
			$("#reserveFormUpdate #modelNm").val(modelNm);
			$("#reserveFormUpdate #orgCmpnMdl").val(cmpnMdl);
			$("#reserveFormUpdate #orgCmpnCapa").val(cmpnCapa);
			$("#reserveFormUpdate #orgCmpnColr").val(cmpnColr);
			$("#reserveFormUpdate #orgCmpnColrNm").val(cmpnColrNm);
			$("#reserveFormUpdate #orgRqstDivs").val(rqstDivs);
			$("#reserveFormUpdate #orgCmpnGift").val(cmpnGift);

	        PreorderUpdateCtrl.open();
	    }
	    
	    ,goPreOrderWatchUpdate : function (detailCmpId,
				rsvSaleNo,
	            cmpnMdl,
	            cmpnMdlNmText,
	            cmpnCapa,
	            cmpnColr,
	            rqstDivs,
	            cmpnGift,
	            modelNm,
	            cmpnColrNm) {

			$("#reserveFormUpdateWatch #rsvSaleNo").val(rsvSaleNo);
			$("#reserveFormUpdateWatch #cmpnId").val(detailCmpId);
			$("#reserveFormUpdateWatch #cmpnMdlNmText").val(cmpnMdlNmText);
			$("#reserveFormUpdateWatch #modelNm").val(modelNm);
			$("#reserveFormUpdateWatch #orgCmpnMdl").val(cmpnMdl);
			$("#reserveFormUpdateWatch #orgCmpnCapa").val(cmpnCapa);
			$("#reserveFormUpdateWatch #orgCmpnColr").val(cmpnColr);
			$("#reserveFormUpdateWatch #orgCmpnColrNm").val(cmpnColrNm);
			$("#reserveFormUpdateWatch #orgRqstDivs").val(rqstDivs);
			$("#reserveFormUpdateWatch #orgCmpnGift").val(cmpnGift);

			PreorderUpdateWatchCtrl.open();
	    }
	    
			
	}//[END]RETURN 
	
})();	