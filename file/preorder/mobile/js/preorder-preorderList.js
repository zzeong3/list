//사전예약관련 js
$(document).ready(function(){
 
	if ( ($('#hpNo').val() != null && $('#hpNo').val() != "") &&  $('#resvSaleCodeList').val() != ""  ) {
	       if( typeof($('#resvSaleCodeList').val()) != "undefined" && $('#resvSaleCodeList').val() != null && $('#resvSaleCodeList').val() !== "" ) {
	    	   	ListCtrl.goResvList();
	       }
	}
   
    
})

const ListCtrl = (function(){
	return {
		resvEnd : function (){
			  alert("사전예약이 종료되었습니다.");
		        return false;
		},
		
		/*kmc 인증 //모바일일 경우 inApp 문제로 창전환으로 구현 */
		requestCertification : function () {
			var actionURL = "/certification/requestCertification";
			$("#kmcForm").attr("action",actionURL).submit();
			//ListCtrl.goResvList();
		},
	    
	    goResvList : function() {
	    	const apiUrl = "/apimApi/getPreSale";
	    	const cmpnId = $("#resvSaleCodeList").val();
	    	const rsvUserName = $("#userNm").val();
	    	const rsvHpNo = $("#hpNo").val();
	    	
	    	$.ajax({
	            url: apiUrl,
	            type: "POST",
	            data: {
	                cmpnId: cmpnId,
	                rsvUserName: rsvUserName,
	                rsvHpNo: rsvHpNo
	            },                 // HTTP 요청과 함께 서버로 보낼 데이터,
	            success: function (result) {
	                $("#wrap").show();
	                var content = '';
	                if (result.data.body.rsltInfo.totalCnt > 0) {
	                    $("#rlCheck").css('display', 'none');
	                    $("#noneTxt").css('display', 'none');
	                    $("#rlList").css('display', 'block');
	                    $(".with_rlList").css('display', 'block');
	                    $(".noticeTxt").css('display', 'block');
	                    for (var i = 0; i < result.data.body.rsltInfo.totalCnt; i++) {
	                        content += '<div class="listBox" style="display:block;">';
	                        content += '<div class="listTop"><span id="modTypNm">' + result.data.body.presaleRegInfo[i].cmpnMdlNmText + '</span></div>';
	                        content += '<dl>';
	                        content += '<dt>신청일자</dt>';
	                        content += '<dd id="reqDt">' + result.data.body.presaleRegInfo[i].rsvSaleRqstDt + '</dd>';
	                        content += '<dt>예약번호</dt>';
	                        content += '<dd id="reqSeqNo">' + result.data.body.presaleRegInfo[i].rsvSaleNo + '</dd>';
	                        content += '<dt>저장공간</dt>';
	                        content += '<dd id="sizeNm">' + result.data.body.presaleRegInfo[i].cmpnCapaNm + '</dd>';                        
	                        //content += '<dt>휴대폰명</dt>';
	                        //content += '<dd id="modTypNm">' + result.data.body.presaleRegInfo[i].cmpnMdlNmText + '</dd>';
	                        content += '<dt>가입유형</dt>';
	                        content += '<dd id="resvMnpStatNm">' + result.data.body.presaleRegInfo[i].rqstDivsNm + '</dd>';                        
	                        content += '<dt>색상</dt>';
	                        content += '<dd id="colrNm">' + result.data.body.presaleRegInfo[i].cmpnColrNm + '</dd>';
	                        content += '<dt>수령매장</dt>';
	                        content += '<dd id="orgNm">' + result.data.body.presaleRegInfo[i].saleOrgNm + '</dd>';
	                        content += '<dt>사은품</dt>';
	                        content += '<dd id="cmpnGiftNm"><span>' + result.data.body.presaleRegInfo[i].cmpnGiftNm +  '</span></dd>';
	                        content += '</dl>';
	                        content += '<div class="listBottom">';
	                        
	                        if(PreorderList.preorderStatus=="on"){
	                    		  content += '<button type="button" class="rsvModi"  onclick="javascript:ListCtrl.goPreOrderUpdate(\''
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
			                          + '\');">수정</button>';
		                        	content += '<button type="button" class="rsvDel" onclick="javascript:APIM.deleteReserve(\'' + result.data.body.presaleRegInfo[i].detailCmpId + '\',\'' + result.data.body.presaleRegInfo[i].rsvSaleNo + '\');">취소</button>';                       
		                        	 
	                      		}
	                          
							if(PreorderList.preorderStatus=="over"){
								content += '<button type="button" class="rsvModi" onclick="javascript:alert(\'사전예약이 종료되었습니다.\');"">수정</button>';
								content += '<button type="button" class="rsvDel"  onclick="javascript:alert(\'사전예약이 종료되었습니다.\');"">취소</button>';
							}
	                        content += '</div>';
	                        content += '</div>'; 
	                      }
	                    
	                    $('#pdList').html(content);
	                } else {
	                    $("#rlList").css('display', 'block');
	                    $("#rlCheck").css('display', 'none');
	                    $("#noneTxt").css('display', 'block');
	                    $(".listBox").css('display', 'none');
	                    
	                }
	                
	            }
	        });
	    }
	    ,goPreOrderUpdate : function (
	    		detailCmpId,
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
					$("#reserveFormUpdate #cmpnMdlNmText").val(cmpnMdlNmText);
					$("#reserveFormUpdate #cmpnId").val(detailCmpId);
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

			$("#reserveFormUpdateWatchMW #rsvSaleNo").val(rsvSaleNo);
			$("#reserveFormUpdateWatchMW #cmpnId").val(detailCmpId);
			$("#reserveFormUpdateWatchMW #cmpnMdlNmText").val(cmpnMdlNmText);
			$("#reserveFormUpdateWatchMW #modelNm").val(modelNm);
			$("#reserveFormUpdateWatchMW #orgCmpnMdl").val(cmpnMdl);
			$("#reserveFormUpdateWatchMW #orgCmpnCapa").val(cmpnCapa);
			$("#reserveFormUpdateWatchMW #orgCmpnColr").val(cmpnColr);
			$("#reserveFormUpdateWatchMW #orgCmpnColrNm").val(cmpnColrNm);
			$("#reserveFormUpdateWatchMW #orgRqstDivs").val(rqstDivs);
			$("#reserveFormUpdateWatchMW #orgCmpnGift").val(cmpnGift);

		 
			PreorderUpdateWatchCtrl.open();
	    }
	    
	}//[END]RETURN 
	
})();	