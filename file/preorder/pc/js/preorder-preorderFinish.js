//사전예약관련 js
$(document).ready(function(){
	
})

const FinishCtrl = (function(){
	return {
		open : function(dataSet) {
			
			fbq('track', 'Purchase', {
				  content_name: '갤럭시Z7폴더블_사전예약_신청완료',
				 });
			
			/* 챗봇 트래킹 [S] */
			//adpick_webtracking({ site:'advertiser-name', event:'registered', match_key:'가입자 구별값' });
			$(".finish-client-name").text(dataSet.rsvUserName);
			$(".finish-phon-no").text(FinishCtrl.hpFormatHiddenByRegx(dataSet.rsvHpNo));
			
			$("#finish-model-nm >p").html(dataSet.modelNm);
			$("#finish-color").text(dataSet.colrNm);
			$("#finish-storage").text(dataSet.sizeNm);
			$("#finish-join-nm").text(dataSet.joinNm);
			$("#finish-resv-num").text(dataSet.reqSeqNo);
			
			$("#finish-pointpark-coupon").text('['+dataSet.pointparkCoupon+']');  //check
			//img combination
			var folder = "/pc/img/preorderSeleted_IMG/";
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
			var imgSrc =folder + dv_type + f_Mdl +"_"+ f_Colr + ".png" ;
			console.log(imgSrc) ;
			var imgUrl = $("#finish_img_area .finish_device");
			imgUrl.attr("src",imgSrc);
			
			//R3000004 U+Shop(택배받기), R3000006 U+Shop(매장받기) 
			if("R3000004"==dataSet.chnlCd){
				if (!wcs_add) var wcs_add={};
				wcs_add["wa"] = "s_18b5eca7bae7";
				var _nasa={};
				if (window.wcs) {
				_nasa["cnv"] = wcs.cnv("4","0");
				wcs_do(_nasa);
				}
				$("#finish-sub-title").css('display', 'block');
				$("#finish-sub-title2").css('display', 'none');
				$("#title_typeA").css('display', 'block');
				$("#title_typeB").css('display', 'none');
				$("#storeInfo").css('display', 'none');
				$("#adrv-link_s").css('display', 'inline-block');
				$("#adrv-link_p").css('display', 'none');
				$("#offline_txt").css('display', 'none');				
			}else{
				$("#finish-sub-title").css('display', 'none');
				$("#finish-sub-title2").css('display', 'block');
				$("#title_typeA").css('display', 'none');
				$("#title_typeB").css('display', 'block');
				$("#title_typeC").css('display', 'block');
				$("#storeInfo").css('display', 'table-row');
				$("#finish-store-nm").text(dataSet.rsvSaleRecvName);
				$("#adrv-link_p").css('display', 'inline-block');
				$("#adrv-link_s").css('display', 'none');
				$("#offline_txt").css('display', 'block');
				$("#finish_img_area").css('display', 'none');
				$("#not_offline").css('display', 'none');
				 
			}
			var uplusHost = /*[[${uplusUrl}]]*/ "";
			setTimeout(function() {
				$("#myModal02").modal();
				$(".modal-backdrop").remove();
			}, 0);
		},
		close : function() {
//			$('#ytVideo')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*'); //유투브 영상 제어
			//$("#myModal02").modal('hide');
			$(location).attr("href", "https://preorder.lguplus.com/");
		} 
		,close_modal : function() {
			$("#myModal02").modal('hide');
		}
		/* 폰번호 마스킹 */
		,hpFormatHiddenByRegx : function(hp) {		
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
