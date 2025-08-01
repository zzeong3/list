//사전예약관련 js
$(document).ready(function(){
	//Youtube API 로드
	//var tag = document.createElement('script');
	//tag.src = "https://www.youtube.com/iframe_api";
	//var firstScriptTag = document.getElementsByTagName('script')[0];
	//firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	//var player1;
})
 

const FinishCtrl = (function(){
	return {
		open : function(dataSet) {
			
			//adpick_webtracking({ site:'advertiser-name', event:'registered', match_key:'가입자 구별값' });
			var modTypCd  = dataSet.modTypCd;
			var modresvSaleCode = dataSet.resvSaleCode;
			var modelNm = dataSet.modelNm
			$("#finish-model-title").text("예약 모델 명");			
			$("#finish-model-nm > p").html(dataSet.modelNm);
			$('.finish_txt .finish-phone').css('style:block;');
			$(".finish-client-name").text(dataSet.rsvUserName);
			$(".finish-phon-no").text(FinishCtrl.hpFormatHiddenByRegx(dataSet.rsvHpNo));
			$("#finish-color").text(dataSet.colrNm);
			$("#finish-resv-num").text(dataSet.reqSeqNo);
			$("#finish-join-nm").text(dataSet.joinNm)
			//var result_reqSeqNo = dataSet.reqSeqNo.BODY.reqSeqNo;
			$("#finish-resv-num-tit").text('예약번호');
			$("#finish-storage").text(dataSet.sizeNm);
			
			$("#finish-pointpark-coupon").text('['+dataSet.pointparkCoupon+']');  //check
			
			var folder = "/mobile/img/preorderSeleted_IMG/";
			var cate = dataSet.cmpnId;
			var dv_type ="";
			if(cate==="20230004"){
				dv_type="flip";
			}else if(cate==="20230005"){
				dv_type="fold";
			}else if(cate==="20230006"){
				dv_type="flipsp";			
			}
			console.log(cate);
			var f_Mdl = dataSet.cmpnMdl;
			var f_Colr = dataSet.cmpnColr;
			var imgSrc =folder + dv_type +"_" + f_Mdl +"_"+ f_Colr + ".png" ; 
			console.log(imgSrc) ;
			var imgUrl = $("#finish_img_area .finish_device");
			imgUrl.attr("src",imgSrc);			
			
			var uplusHost = /*[[${uplusUrl}]]*/ "";

			if("R3000004"==dataSet.chnlCd){
				if (!wcs_add) var wcs_add={};
				wcs_add["wa"] = "s_18b5eca7bae7";
				var _nasa={};
				if (window.wcs) {
				_nasa["cnv"] = wcs.cnv("4","0");
				wcs_do(_nasa);
				}
				$("#finish-sub-title").text('사전예약 신청이 정상 접수되었습니다!');
				$("#title_typeA").css('display', 'block');
				$("#title_typeB").css('display', 'none');
				$("#storeInfo").css('display', 'none');
				$("#adrv-link_s").css('display', 'block');
				$("#adrv-link_p").css('display', 'none');
				$("#offline_txt").css('display', 'none');
			}else{
				$("#finish-sub-title").text('가입신청서 작성이 완료되었습니다!');
				$("#title_typeA").css('display', 'none');
				$("#title_typeB").css('display', 'block');
				$("#storeInfo").css('display', 'table-row');
				$("#finish-store-nm").text(dataSet.rsvSaleRecvName);  //saleOrgNm
				$("#adrv-link_p").css('display', 'block');
				$("#adrv-link_s").css('display', 'none');
				$("#offline_txt").css('display', 'block');
				//$("#onlyUshop").css('display', 'none');
				$("#not_offline").css('display', 'none');
			}
			
			setTimeout(function() {
				$("#myModal02").modal();				
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
			//$(location).attr("href", "https://newiphone2023.lguplus.com/");
			$(location).attr("href", "/");
			//
		},
		close_modal : function() {
			$("#myModal02").modal('hide');
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
