//formatter
const FormatRegxW = (function(){
	return {
		dateFormat : function(exs) {
			const pattern = /^(\d{4})-?(\d{2})-?(\d{2})$/;
			let result = "";
			if (!exs)
				return result;

			if (pattern.test(exs)) {
				result = exs.replace(pattern, '$1-$2-$3');
			} else {
				result = "***";
			}
			return result;
		},
		hpFormatHiddenByRegx : function(hp) {
			const pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d(\d{3})$/;
			let result = "";
			if (!hp)
				return result;

			if (pattern.test(hp)) {
				result = hp.replace(pattern, '$1-$2**-*$3');
			} else {
				result = "***";
			}
			return result;
			
		}
	}
})();	

//사전예약 APIM
const APIM_W = (function(){
	return {
		alrdyRsrvd : function(resvSaleCode,rsvUserName,rsvHpNo) { //가능여부 조회
			const params = {
					cmpnId : resvSaleCode,
					rsvUserName     : rsvUserName,
					rsvHpNo   : rsvHpNo
				};

			
			const apiUrl = "/apimApi/getPsblYn";
			const promise = $.ajax({
				url: apiUrl,
				type: "POST",
				data : params
			});
			return promise;
		},
		
		/**
		 * 사전예약 요청 
		 */
		requestReserve : function( submitData ) {
			const apiUrl = "/apimApi/postPreSaleJoin";
			$.ajax({
				url: apiUrl,
				type: "POST",
				data : submitData,
				beforeSend : function() {
					//$MlSpinner.show();
				},
				
				
				success : function(result) {
					
					if(result.status === "OK") {
						const rsltCd = result.data.body.rsltInfo.rsltCd;
						const rsltMsg = result.data.body.rsltInfo.rsltMsg;
						
 
						//if( rsltCd === "00") {
						if( rsltCd === "00" || (rsltCd === 99 && rsltMsg === '전략단말예약 문자발송 실패')) {
							submitData.reqSeqNo =  result.data.body.presaleRegInfo.rsvSaleNo;
							PreorderSdCtrl.close_modal();
							FinishSdCtrl.open(submitData);

							//매장용 수정하기
							if("R3000006" === submitData.chnlCd){
								PreorderStoreApplyWatchCtrl.close();
							}
							dataLayer.push({'event': "compEvt",
								"comp_evt_name" : "사전예약 신청", 
								"comp_evt_content" : submitData.modelNm+" |"+ submitData.reqSeqNo});
							
							
						}else if( result.data.body.rsltInfo.rsltCd === "99" ) {
							alert(result.data.body.rsltInfo.rsltMsg);
							PreorderSdCtrl.close_modal();
						}
						
					}
					//status: 'FAIL', message: '사전예약 기간이 종료되었습니다.'
					else if(result.data === "TerminateApimPost") {
						alert(result.message);
						PreorderSdCtrl.close_modal();
					}
					else resvErrCb();
				},
				error : resvErrCb,
				complete : function() {
					//$MlSpinner.hide();
				}
			});
			/** 에러 콜백 */
			function resvErrCb() {
				alert("사전예약 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해주십시오.");
			}
			
		},
		updateReserve: function(submitData){
			
			const apiUrl = "/apimApi/putPreSaleUpdate";
			$.ajax({
				url: apiUrl,
				type: "POST",
				data : submitData,
				success : function(result) {
					if(result.status === "OK") {
						const rsltCd = result.data.body.rsltInfo.rsltCd;
						const rsltMsg = result.data.body.rsltInfo.rsltMsg;

						if(rsltCd === '00'){
							alert('사전예약정보가 수정되었습니다.');
							PreorderUpdateWatchCtrl.close();
							ListCtrl.goResvList();
						}
					}
					else resvErrCb();
				},
				error : resvErrCb,
				complete : function() {
					//$MlSpinner.hide();
				}
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
					token: ""
					, cmpnId: resvSaleCode
					, rsvSaleNo: reqSeqNo
				},                 // HTTP 요청과 함께 서버로 보낼 데이터,
				success: function (result) {

					if (result.data.body.rsltInfo.rsltCd === "00") {
						ListCtrl.goResvList();
					} else {
						alert(result.data.body.rsltInfo.rsltMsg);
					}
				},
				error: function (xhr, status, error) {
					alert("서버통신이 지연되고 있습니다.\n잠시 후 다시 시도해 주시기 바랍니다.");
				}
			});

		}
		,presalesPsblModalShow: function(){
			console.log('presalesPsblModalShow') ;
			$("#checkHistory").modal('show').each(function(){
				$(this).css('z-index','1051')
				$('.modal-backdrop.in').addClass('over')
				$('.close,.btn_hide').on('click',function(){
					$('.modal-backdrop.in').removeClass('over')
				})
			});
			
		}
		,presalesPsblModalShowPC: function(){
			console.log('presalesPsblModalShowPC') ;
			$("#checkHistory").modal('show').each(function(){
				$(this).css('z-index','1051')
				$('.modal-backdrop.in').addClass('over')
				$('.close,.btn_hide').on('click',function(){
					$('.modal-backdrop.in').removeClass('over')
				})
			});
			
		}
		
	}//return	
})();


function reject(){
	console.log('reject.........');
	$(location).attr("href", "/")
}
