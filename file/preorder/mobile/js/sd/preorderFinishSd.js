//사전예약관련 js
$(document).ready(function(){

})
const FinishSdCtrl = (function(){
	return {
		open : function(dataSet) {
			//adpick_webtracking({ site:'advertiser-name', event:'registered', match_key:'가입자 구별값' });
			var modTypCd  = dataSet.modTypCd;
			var modresvSaleCode = dataSet.resvSaleCode;
			var modelNm = dataSet.modelNm
			$("#finish-model-title-w").text("예약 모델 명");			
			$("#finish-model-nm-w > p").html(dataSet.modelNm);
			$('.finish_txt .finish-phone').css('style:block;');
			$(".finish-client-name").text(dataSet.rsvUserName);
			$(".finish-phon-no").text(FinishSdCtrl.hpFormatHiddenByRegx(dataSet.rsvHpNo));
			$("#finish-color-w").text(dataSet.colrNm);
			$("#finish-resv-num-w").text(dataSet.reqSeqNo);
			$("#finish-join-nm-w").text(dataSet.joinNm)
			//var result_reqSeqNo = dataSet.reqSeqNo.BODY.reqSeqNo;
			$("#finish-resv-num-w-tit-w").text('예약번호');
			$("#finish-storage-w").text(dataSet.sizeNm);
			var uplusHost = /*[[${uplusUrl}]]*/ "";
			
			var folder = "/mobile/img/preorderSeleted_IMG/";
			var cate = dataSet.cmpnId;
			var dv_type ="";
			if(cate==="20230007"){
				dv_type="tab";				
			}else if(cate==="20230008"){
				dv_type="watch";				
			}
			console.log(cate);
			var f_Mdl = dataSet.cmpnMdl;
			var f_Colr = dataSet.cmpnColr;
			var imgSrc =folder + dv_type +"_" + f_Mdl +"_"+ f_Colr + ".png" ; 
			console.log(imgSrc) ;
			var imgUrl = $("#finish_img_area .finish_device");
			imgUrl.attr("src",imgSrc);			

			if("R3000004"==dataSet.chnlCd){
				$("#finish-sub-title-w").text('사전예약 신청이 정상 접수되었습니다!');
				$("#title_typeA-w").css('display', 'block');
				$("#title_typeB-w").css('display', 'none');
				$("#storeInfo-w").css('display', 'none');
				$("#adrv-link_s-w").css('display', 'block');
				$("#adrv-link_p-w").css('display', 'none');
				$("#offline_txt-w").css('display', 'none');
			}else{
				$("#finish-sub-title-w").text('가입신청서 작성이 완료되었습니다!');
				$("#title_typeA-w").css('display', 'none');
				$("#title_typeB-w").css('display', 'block');
				$("#storeInfo-w").css('display', 'table-row');
				$("#finish-store-nm-w").text(dataSet.rsvSaleRecvName);  //saleOrgNm
				$("#adrv-link_p-w").css('display', 'block');
				$("#adrv-link_s-w").css('display', 'none');
				$("#offline_txt-w").css('display', 'block');
				//$("#onlyUshop").css('display', 'none');
			}
			
			setTimeout(function() {
				$("#myModal_tab_02_mw").modal();
			}, 1);

			if(!isGnbStat()){
			}else{				
				//네비 오픈된 상태
				$('html').attr('style','');
				$('body').attr('style','');	
			}	
			$('#wrap').hide();
		},
		// 팝업 닫기
		close : function() {
			//$('#ytVideo')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*'); //유투브 영상 제어
			//location.reload();
			$(location).attr("href", "https://newfoldable.lguplus.com/");
		},
		
		/* 폰번호 마스킹 */
		hpFormatHiddenByRegx(hp) {		
			var pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d{2}(\d{2})$/;
			var result = "";
			if (!hp)
				return result;

			if (pattern.test(hp)) {
				result = hp.replace(pattern, '$1-$2**-**$3');
			} else {
				result = "***";
			}
			
			return result;
		}
		
	}
	
})();	
