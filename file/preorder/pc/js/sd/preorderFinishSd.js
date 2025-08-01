//사전예약관련 js
$(document).ready(function(){
	
})

const FinishSdCtrl = (function(){
	return {
		open : function(dataSet) {
			/* 챗봇 트래킹 [S] */
			//adpick_webtracking({ site:'advertiser-name', event:'registered', match_key:'가입자 구별값' });
			$(".finish-client-name").text(dataSet.rsvUserName);
			$(".finish-phon-no").text(FinishSdCtrl.hpFormatHiddenByRegx(dataSet.rsvHpNo));
			
			$("#finish-model-nm >p").html(dataSet.modelNm);
			$("#finish-color-w").text(dataSet.colrNm);
			$("#finish-storage-w").text(dataSet.sizeNm);
			$("#finish-join-nm-w").text(dataSet.joinNm)
			$("#finish-resv-num-w").text(dataSet.reqSeqNo);
			//R3000004 U+Shop(택배받기), R3000006 U+Shop(매장받기)
			
			var folder = "/pc/img/preorderSeleted_IMG/";
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
				$("#finish-sub-title-w").css('display', 'block');
				$("#finish-sub-title-w2-w").css('display', 'none');
				$("#title_typeA-w").css('display', 'block');
				$("#title_typeB-w").css('display', 'none');
				$("#storeInfo-w").css('display', 'none');
				$("#adrv-link_s-w").css('display', 'inline-block');
				$("#adrv-link_p-w").css('display', 'none');
				$("#offline_txt-w").css('display', 'none');
			}else{
				$("#finish-sub-title-w").css('display', 'none');
				$("#finish-sub-title-w2-w").css('display', 'block');
				$("#title_typeA-w").css('display', 'none');
				$("#title_typeB-w").css('display', 'block');
				$("#storeInfo-w").css('display', 'table-row');
				$("#finish-store-nm-w").text(dataSet.rsvSaleRecvName);
				$("#adrv-link_p-w").css('display', 'inline-block');
				$("#adrv-link_s-w").css('display', 'none');
				$("#offline_txt-w").css('display', 'block');
				 
			}
			var uplusHost = /*[[${uplusUrl}]]*/ "";
			setTimeout(function() {
				$("#myModal_tab_02_pc").modal();
			}, 0);
		},
		
		close : function() {
//			$('#ytVideo')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*'); //유투브 영상 제어
			//$("#myModal_tab_02_pc").modal('hide');
			
			$(location).attr("href", "https://newfoldable.lguplus.com/");
			//$(location).attr("href", "/")
			//
		} 
		,close_modal : function() {
			$("#myModal02").modal('hide');
		},
		/* 폰번호 마스킹 */
		hpFormatHiddenByRegx : function(hp) {		
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
