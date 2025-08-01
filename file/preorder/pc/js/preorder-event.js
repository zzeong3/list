var doubleSubmitFlag = false;
function doubleSubmitCheck(){
    if(doubleSubmitFlag){
        return doubleSubmitFlag;
    }else{
        doubleSubmitFlag = true;
        return false;
    }
}


const EVENT = (function(){
	return {
		//
		getInstance: function() {
			return $('#joinEvtModal'); // 수정필요
		}
		,goPreorder :function(){
			 window.open("https://www.lguplus.com/mypage/prebook", "_blank");  
		}
		
		,CallredMsg : function(type,txt){
			$(".red-msg").css('display','none');
			if(type) {
				$('#'+type+'').css('display','block');
				$('#'+type+'').text(txt);
			}
		}
		,oepnEvtPag: function() { //이벤트 참여 모달 초기화 
			EVENT.CallredMsg();
			
			$("#certification_btn").show();
			$("#certification_complete").hide();
			$('#pre_data_list > li').not(0).remove();
			//check
			$(".resetForm").attr("disabled","disabled");
			$('.resetForm').each(function(i, el) {
				if($(el).prop('type') == 'radio') {
					$(el).prop('checked',false);
				}
				else if($(el).prop('type') == 'checkbox') {
					$(el).prop('checked',false);
					$(el).siblings('label').removeClass('on');
				}
				else {
					//console.log($(el).prop('id'));
					$(el).val('');
				}
			});
			
		}
		,requestCertification : function() {
			//PC ie ker 관련 이슈 해결을 위한 opener 강제 정의
			window.name = "kmcCerti";
			var popUrl = "/certification/requestCertification?callId=event";
			var left = (screen.width / 2) - (450 / 2);
			var top = (screen.height / 2) - (600 / 2);
			var title = "KMCISWindow";
			var popOption = "fullscreen=no,menubar=no,status=no,toolbar=no,titlebar=yes,location=no,width=450, height=550, resizable=no, scrollbars=no,top="+top+",left="+left;
			window.open(popUrl,title,popOption);
				
		}
		,openEvtAfterKmc : async function(ty) {
			
			modalAlertClose('joinConfirm');
			
			doubleSubmitFlag = false;
			
			var chkAlrdyRsrvdEvt = APIM.alrdyRsrvdEvt( $("#userNm").val(), $("#hpNo").val());
			chkAlrdyRsrvdEvt.then(
					function(result) {
						console.log(result);
						if(result.data.totalCnt ==0 ){
							
							$('#failPopup').modal();														
							
						}else if( result.data.reSizeTotalCnt == 0 && result.data.otherChnlCdCnt  > 0 ){
							$('#joinPossible').modal(); 
							
						}else if(result.data.reSizeTotalCnt >0 ){
							
							$('#joinEvtModal').modal();
							$("#certification_btn").css('display','none')
							$("#certification_complete").css('display','block');
							$("#joinEvtBtn").removeAttr("disabled");
							$("#joinEvtBtn").addClass("on");
							$("#joinEvtBtn").attr("onclick","EVENT.joinEvt(); ");
							$("#pre_userNm").text($("#userNm").val());
							
							var arr = result.data2.body.presaleRegInfo ; 
							var selectItem = $('#pre_data_list').children()[0];
							
							var folder = "/pc/img/event/" ;
							
							arr.forEach (function (el, index) {
								var $res = $(selectItem).clone();
								 
								$res.find('.pre_data_cmpnMdlNmText').text(el.cmpnMdlNm)
								$res.find('.pre_data_cmpnColr').text(el.cmpnColrNm)
								$res.find('.pre_data_rqstDivs').text(el.rqstDivsNm)
								$res.find('.pre_data_cmpId').text(el.detailCmpId)
								
								
								var premdImg ="S24_"+el.cmpnMdl+"_"+el.cmpnColr;
								$res.find('.model_img.pre_data_model_img').find('img').attr("src",folder + premdImg+ ".png" );
								$res.find('span.reserve-num.pre_data_rsvSaleNo').text(el.rsvSaleNo)
								$res.find('input[type=radio]').attr("value", el.rsvSaleNo+","+el.detailCmpId);
								$res.find('input[type=radio]').attr("id", "pre_data_radio_" + index);
								$res.find("label").attr("for","pre_data_radio_" + index);
								$('#pre_data_list').append($res)
							});
							
							 
							$('#pre_data_list > li').eq(0).css('display', 'none');
							$('#pre_data_list > li').eq(1).find('input').attr("checked",true);
						}
							
					}
					,function() {
						alert('사전예약 요청 중 에러가 발생했습니다.\n잠시 후 다시 시도해주십시오.');
						//return reject();
					}
				);  //end then
		
		}
		,validate : function(){
			var $frm = EVENT.getInstance() ;
			var $agree1 = $frm.find('[id="agree_event01"]');
			var $agree2 = $frm.find('[id="agree_event02"]');
			
			if(!$agree1.is(":checked")) {
				EVENT.CallredMsg('warning_evt_join_agee','이벤트 참여를 위해 필수 약관에 동의가 필요합니다.');
				return false;
			}else if(!$agree2.is(":checked")) {
				EVENT.CallredMsg('warning_evt_join_agee','이벤트 참여를 위해 필수 약관에 동의가 필요합니다.');
				return false;
			}
			//사전예약 번호 체크
			var rsvNm = $.trim($("input:radio[name='preDataRadioButton']:checked").val());
			if(rsvNm == ""){
				alert("사전예약번호를 선택하세요");
				return false;		
			}
			return true;
		}
		
		,joinEvt: function() {
			
			//preorderNo
			if(! EVENT.validate("#modalForm01")) return false; //check
			// $("#evtCmpId").val(), $("#userNm").val(), $("#hpNo").val()
			var jsonFormData = CommonUtils.getFormDataToJson('#modalForm01');
			
			test = $("input:radio[name='preDataRadioButton']:checked").val().split(","); 
			console.log(test[0]); // 결과값 : 2018
			console.log(test[1]); // 결과값 : 11
			
			
			
			jsonFormData.preorderNo = test[0];
			jsonFormData.evtCmpId = test[1];
			jsonFormData.eventId = $("#eventId").val();
			jsonFormData.userNm =  $("#userNm").val();
			jsonFormData.hpNo =  $("#hpNo").val();
			
			console.log(jsonFormData);
			var $agree1 = $('[id="agree_event01"]');
			var $agree2 = $('[id="agree_event02"]');
			$agree1.is(":checked") ? jsonFormData.agreeYn1="Y"  : jsonFormData.agreeYn1="N" ;
			$agree2.is(":checked") ? jsonFormData.agreeYn2="Y"  : jsonFormData.agreeYn2="N" ;
			$.ajax({
				url: "/event/joinEvent"
				, type: "POST"
				, data : jsonFormData
				, cache : false
				, success: function(res) {
					
					if(res.status == "OK"){
						dataLayer.push({'event': "compEvt", "comp_evt_name" : "Galaxy Foldable6 사전 예약 이벤트", "comp_evt_content" : "Galaxy Foldable6 사전 예약 경품 이벤트"});
						setTimeout(function(){
							
							$("#completed_result_msg > span.name > strong").html(res.data2.userNm);
							//completed_result_ms2
							$("#completed_result_ms2 > span").html(res.data2.cmpnMdlNm);
							var imgPath = "/pc"+res.data2.evtGift.giftImagePath;
							var imgAlt = "당첨 선물";
							$("#completed_result_img").attr("src",imgPath).attr("alt",imgAlt);
							$("#completed_result_gift_nm").text(res.data2.evtGift.giftName);

							$('#joinEvtModal').modal('hide');
							$("#confirmGift").modal("toggle"); //당첨오픈							
						},3000);
												
					}
				}, error : function() {
					 doubleSubmitFlag = false;
					alert("오류가 발생하였습니다.");
					//ALARM.initEvtForm();
					EVENT.oepnEvtPag();
					Modalhide();
					
				}
			});
			
		}
		//이벤트 당첨 경품 확인하기 팝업 오픈
		,openConfirmGift : function(ty) { 
			$('#confirmEvtModal').modal();
			$("#confirmEventId").val(ty);
			EVENT.confirmGiftResetForm();
			
		}//[E]getEventWinnerBoard
		//이벤트 당첨 경품 확인하기 팝업창 
		,confirmGiftResetForm: function() {
			$("#confirmUserNm").val("");
			$("#confirmHpNo").val("");
			$(".info-txt").css('display','none');
		} //[E]confirmGiftResetForm 		

		//이벤트 당첨 경품 확인하기 로직
		,confirmGift: function() { 
			var userNm = $("#confirmUserNm").val();
			var hpNo = $("#confirmHpNo").val();
			var phoneRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
			var eventId  = $("#confirmEventId").val();
						
			if(userNm === ""){
				$("#warning_evt_confirm_nm").css('display','block');
				$("#warning_evt_confirm_nm").text("이름은 필수 입력 항목입니다.");
				return;
			}else if(userNm.length < 2){
				$("#warning_evt_confirm_nm").css('display','block');
				$("#warning_evt_confirm_nm").text("최소 두 자 이상 입력해 주세요.");
				return;
			}
			else if(hpNo === "" || hpNo.length < 10){
				$(".info-txt").css('display','none');
				$("#warning_evt_confirm_hp").css('display','block');
				$("#warning_evt_confirm_hp").text("휴대폰 번호는 필수 입력 항목입니다.");
				return;		
			}else if(!phoneRegex.test(hpNo) ){
				$(".info-txt").css('display','none');
				$("#warning_evt_confirm_hp").css('display','block');
				$("#warning_evt_confirm_hp").text("올바르지 않은 휴대폰 번호입니다.");
				validateFalg = false;
			}
				
			$(".info-txt").css('display','none');
			
			var params = {
					"eventId" :'flipfold6'
					,"userNm"	: userNm
					, "hpNo" : hpNo
				};
			
			$.ajax({
				url: "/event/confirmGift"
				, type: "POST"
				, data : params
				, cache : false
				, success: function(res) {
					if(res.status == "OK"){
						if(res.data=="00"){	//참여 내역이 없음
							$("#completed_result_msg > span.name > strong").html(res.data2.userNm);
							$("#completed_result_ms2 > span").html(res.data2.cmpnMdlNm);
							var imgPath = "/pc"+res.data2.evtGift.giftImagePath;
							var imgAlt = "당첨 선물";
							$("#completed_result_img").attr("src",imgPath).attr("alt",imgAlt);
							$("#completed_result_gift_nm").text(res.data2.evtGift.giftName);
											
							$("#confirmGift").modal("toggle"); //당첨오픈										
							$('#confirmEvtModal').modal('hide');
											
						}else{	//실패처리
							if(res.data=="90"){	//참여 내역이 없음
								$('#confirmEvtModal').modal('hide');
								$("#not_event").modal("toggle");	
								 
							}
						}
					}
					}, error : function() {
						 
						$('#confirmEvtModal').modal('hide');
						$("#failMsg").html("이벤트 당첨확인에 실패 하였습니다.<br>관리자에 문의하세요.");
						$("#failPopup").modal("toggle");		
					}
				});	
			 
			
			
			}//[E]confirmGift
			
	} //[e]return
})();


const EVT_MSG = (function(){
	return {
		//14세미만 
		isChild : function(){
			Modalhide();
			modalAlertPop("alert_14_info"); 
			EVENT.oepnEvtPag();
		}
		,isDuplicate:function(){
			Modalhide();
			modalAlertPop("myModalalert_alreadyWin2");
		}
		
	} //[e]return
})();

