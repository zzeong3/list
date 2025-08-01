$(document).ready(function(){
	/* ------UI CTRL-------- */
	/*check_불필요???	
 * $('.pre_tit input').on('click', function(e){
		if($('input:checkbox[id="agree-galaxyS20"]').is(":checked"))
		{
			$("#agreeLabel").addClass('on');
		}else{
			$("#agreeLabel").removeClass('on');
		}
	});*/
	/* -------------- */
	PreorderSdCtrl.init();
})
var submit_M_Data;
/** 사전 예약하기 UI 컨트롤 */
const PreorderSdCtrl = (function(){
	return {
		
		// 초기화
		init : function() {
			this.bindEvent();
		}
		// 이벤트 바인딩
		,bindEvent : function() {
			// 고객 이름 동기화
			$(".clientNm").on('blur', function() {
				const foreignerYn = $(".pState input[type=radio]:checked").next().text();
				if(foreignerYn === '내국인'){
					$(this).val($(this).val().replace(/ /g,''));
				}
			});
	
			$('#localW').prop('checked', true);
			$(".pState").on('click', function() {
				const foreignerYn = $(".pState input[type=radio]:checked").next().text();
				
				if(foreignerYn !== ''){
					$(".clientNm").blur();
				}
				if(foreignerYn === '내국인'){
					$("#inputTest2").val("");
					$("#inputTest2").unbind('keypress');
					$("#inputTest2").bind('keypress', function(){
						var inputVal = $(this).val();
						$(this).val(inputVal.replace(/[^(ㄱ-힣)]/gi, ''));
					       
					});
				}
				
				if(foreignerYn === '외국인'){  //inputTest1
					$("#inputTest2").val("");
					$("#inputTest2").unbind('keypress');
					
					$("#inputTest2").bind('keypress', function(){
						var inputVal = $(this).val();
						$(this).val(inputVal.replace(/[^(a-zA-Z)]/gi, ''));
					       
					});
				}
			});
			
			
			// 고객 휴대폰번호 입력값 refine
			$(".clientPhoneNo").on('input', function() {
				$(this).val($(this).val().replace(/[^0-9]/, ''));
			});
			// 고객 휴대폰번호 동기화
			$(".clientPhoneNo").on('blur', function() {
				var inputPhone = $(this).val();
				$(".clientPhoneNo").val(inputPhone);
			});
			
		}//[END] bindEvent
        ,changeimg : function(val){
            var seletedEL = val;
            var folder = "/pc/img/preorderSeleted_IMG/"
            var seletedMD = $(".modelNm .on").find("button").attr("data-model");
            var seletedMD2 = $(".modelNm2 .on").find("button").attr("data-model");
            var listCk = val.parent().parent();
            var imgUrl= $("#tab");
            var imgUrl2= $("#watch");
            var imgUrl3= $("#watch");
            if(listCk.hasClass("modelNm")){
                var changeNM = seletedEL.attr("data-model");
                imgUrl.attr("src", folder  + "tab" +"_"+  changeNM + ".png" );
                console.log( changeNM )                
                if(changeNM == "PH002" || changeNM == "PH003") {
                	$(".benefit_img").hide();
                } else if(changeNM == "PH001"){
                	$(".benefit_img").show();
                }
            }
            if(listCk.hasClass("modelNm2")){
                var changeNM2 = seletedEL.attr("data-model");
                imgUrl2.attr("src", folder  + "watch" +"_"+  changeNM2 + ".png" );
                console.log( changeNM2 )
            }
            if(listCk.hasClass("phoneC-watch")){
                var changeCL = seletedEL.parent().attr("data-colr-cd");
                imgUrl3.attr("src",folder + "watch" +"_"+ seletedMD2 +"_"+ changeCL + ".png" );
                console.log(changeCL)
            }
        }
		,open : function( initType) {
			pageCall("기기예약|zflipfold5|신청서","기기예약 갤럭시 Z6 사전예약 ");
			
			if( PreorderSd.status == 'over') {
				var message = "사전예약이 종료되었습니다.";
				return alert(message);
			}
			
			this.reset(initType); //탭화면이 기본 
	 
				$("#in_preorder_p_w").css('display', 'block');
				$("#out_preorder_p_w").css('display', 'none');
				$("#in_finish_p_w").css('display', 'block');
				$("#out_finish_p_w").css('display', 'none');
			 
			//PreorderSdCtrl.from = from;
			$("#myModal_sd_01_pc").modal('show'); //myModal_sd_01_pc
			$(".modal-backdrop").remove();  //check_임시 추가
			$("body").css("overflow","hidden");
			
		}//[END] oepn
		,open_outlink : function (){  //독립 
			
			pageCall("기기예약|zflipfold5|신청서","기기예약 갤럭시 Z6 사전예약 ");
			
			if( PreorderSd.status == 'over') {
				var message = "사전예약이 종료되었습니다.";
				return alert(message);
			}

			this.reset(articleObject);
			
			
			$("#in_preorder_p_w").css('display', 'none');
			$("#out_preorder_p_w").css('display', 'block');
			$("#in_finish_p_w").css('display', 'none');
			$("#out_finish_p_w").css('display', 'block');
			
			
			//PreorderSdCtrl.from = from;
			$("#myModal_sd_01_pc").modal('show'); //myModal_sd_01_pc
			$(".modal-backdrop").remove();  //check_임시 추가
			$("body").css("overflow","hidden");
			
			
		}
		,goMain:function(){
			//$("#in_preorder_p_w").css('display', 'block');
			//$("#out_preorder_p_w").css('display', 'none');
			//$("#in_pre_store_appy_p_w").css('display', 'block');
			//$("#out_pre_store_appy_p_w").css('display', 'none');
			//$("#in_finish_p_w").css('display', 'block');
			//$("#out_finish_p_w").css('display', 'none');
			$(location).attr("href", "/")
			
		}//[END] goMain
		
		,close : function(initType) {
			//$("#myModal_sd_01_pc").modal('hide');
			//$("body").css("overflow","");
			//this.reset();// 모달 내 선택, 입력 값 초기화
			$(location).attr("href", "/")
		}//[END] close
		,close_modal : function(initType) {
			$("#myModal_sd_01_pc").modal('hide');
			$("body").css("overflow","");
			this.reset();// 모달 내 선택, 입력 값 초기화
			//$(location).attr("href", "/")
		}//[END] close
			
		,reset : function(initType) { // check 공용 모달 초기화
			$("#myModal_sd_01_pc .sel_opt").each(function(i, sel) {
				$(sel).find('li').removeClass('on');
				$($(sel).find('li').get(0)).addClass('on');
			});
			// 이름, 휴대폰 번호 초기화
			$('#myModal_sd_01_pc .clientNm, #myModal_sd_01_pc .clientPhoneNo').val('');
			// 개인정보 제공 동의 초기화 //미성년자일 초기화
			$('#myModal_sd_01_pc .agreeCheck').prop('checked', false).next().removeClass('on');
			$('#myModal_sd_01_pc .pre_toggle').removeClass('on').text('읽어보기');
			$(".warningtxt").css('display','none');
			console.log(initType);
			
			$("#preorder_sd_btn_area button").removeClass('active'); //
			if(initType==="tab"){
				PreorderSdCtrl.choiceModelTab('0', PreorderSd.resvSaleCodeTab,PreorderSd.modTypCdTab,PreorderSd.modTypCdDescTab);
				$("#preorder_sd_btn_area button:first-child").addClass('active');
				$(".main_device_img").children('#tab').css('display','block').siblings().css('display','none');
				$(".benefit_img").show();
				
			}else if(initType==="watch"){
				PreorderSdCtrl.choiceModelWatch('0', PreorderSd.resvSaleCodeWatch,PreorderSd.modTypCdWatch,PreorderSd.modTypCdDescWatch);
				$("#preorder_sd_btn_area button:last-child").addClass('active');
				$(".main_device_img").children('#watch').css('display','block').siblings().css('display','none');
				$(".benefit_img").hide();
				
			}else{
				PreorderSdCtrl.choiceModelTab('0', PreorderSd.resvSaleCodeTab,PreorderSd.modTypCdTab,PreorderSd.modTypCdDescTab);
				$("#preorder_sd_btn_area button:first-child").addClass('active');
				$(".main_device_img").children('#tab').css('display','block').siblings().css('display','none');
				$(".benefit_img").show();
			}
			
			
		} //[END] reset
		,choiceModelTab : function(modelIndex,resvSaleCode,modTypCd,modTypCdDesc){

			$("#reserveWForm #resvSaleCode").val(resvSaleCode);
			$("#reserveWForm #modTypCd").val(modTypCd);
			$("#reserveWForm #modelNm").val(modTypCdDesc);
			var params = {
				"modelIndex"	: modelIndex
			};
			$.ajax({
				url: "/tab/preOrder/choiceModel"
				, type: "POST"
				, data : params
				, cache : false
				, success: function(data) {
					$("#preOrder_optBox_sd").html(data);
					PreorderSdCtrl.bindEvent();	
					
					// 옵션 선택
					$('.sel_opt li button').on('click', function(){
						var $choiceLi = $(this).closest('li');
						if($choiceLi.hasClass('disable')){
							return false;
						} else {
							$choiceLi.addClass('on').siblings('li').removeClass('on');
						}
						
						//모델 변경시 이미지 체인지
						PreorderSdCtrl.changeimg($(this));
						// 색상 선택 시 텍스트 변경
						var $choiceUl = $(this).closest('.sel_opt');
						$choiceUl.parent().find('.on_txt').text( $(this).text() );
						//return false;
					});

					//console.log(data); check작업 
					//PreorderSdCtrl.choiceSize('0');
					
				}, error : function() {
					alert("오류가 발생하였습니다.");
				}
			});
	} //[END] choiceModelTab
	
	,choiceModelWatch : function(modelIndex,resvSaleCode,modTypCd,modTypCdDesc){

		$("#reserveWForm #resvSaleCode").val(resvSaleCode);
		$("#reserveWForm #modTypCd").val(modTypCd);
		$("#reserveWForm #modelNm").val(modTypCdDesc);
		
		var params = {
			"modelIndex"	: modelIndex
		};
		$.ajax({
			url: "/watch/preOrder/choiceModel"
			, type: "POST"
			, data : params
			, cache : false
			, success: function(data) {
				$("#preOrder_optBox_sd").html(data);

				PreorderSdCtrl.bindEvent();					
				
				// 옵션 선택
				$('.sel_opt li button').on('click', function(){
					var $choiceLi = $(this).closest('li');
					if($choiceLi.hasClass('disable')){
						return false;
					} else {
						$choiceLi.addClass('on').siblings('li').removeClass('on');
					}
					
					//모델 변경시 이미지 체인지
					   PreorderSdCtrl.changeimg($(this));             
					// 색상 선택 시 텍스트 변경
					var $choiceUl = $(this).closest('.sel_opt');
					$choiceUl.parent().find('.on_txt').text( $(this).text() );
					//return false;
				});

				//console.log(data); check작업 
				//PreorderSdCtrl.choiceSize('0');
				
			}, error : function() {
				alert("오류가 발생하였습니다.");
			}
		});
	
	} 	//[END] choiceModelWatch
	
	// 사전예약 요청 전송 > 사전예약완료
	,submit : function() {
		// 유효성 검사 후 조회
		
		this.validate('D01').then(function(submitData) {
			
				
					/* 확인 메세지 세팅 [S] */
					var confirmMsg =submitData.modelNm+"\n";
					confirmMsg += submitData.sizeNm+" / "+submitData.joinNm+ " / "+ submitData.colrNm+"을(를) 선택하셨습니다.\n";
					confirmMsg += submitData.rsvUserName+"님,  "+submitData.rsvHpNo+"로 사전예약 신청됩니다.\n";
					confirmMsg += "사전예약을 접수 완료 하시겠습니까?";
					/* 확인 메세지 세팅 [F] */

					if( !confirm( confirmMsg ) ) return;
					// 사전예약 요청
					PreorderSdCtrl.close_modal();
					APIM_W.requestReserve(submitData);
					
				},
				function(err) {
					console.error('submit error',err);
				});
	} //[e]submit
	
	// 유효성 검사
	,validate : function(rcepMthd) {
		return new Promise( function(resolve, reject) {
			var $selectedTab = $("#myModal_sd_01_pc");
			var validateFalg = true;
			// STEP-1 : 모델 검사
			var modelNm =  $("#reserveWForm #modelNm").val();
			var modTypCd =  $("#reserveWForm #modTypCd").val();
			var resvSaleCode = $('#reserveWForm #resvSaleCode').val();

			var $selectedModel = $selectedTab.find('.modelNm').find('li.on');
			//	var modTypCd = $selectedSize.attr('data-model-cd');

			// STEP-2 : (폰) 저장공간, (워치) 사이즈
			var $selectedSize = $selectedTab.find('.sizeCd').find('li.on');
			var sizeCd = $selectedSize.attr('data-size-cd');
			var sizeNm = $selectedSize.find('button').text();

			// STEP-3 : 가입유형
			var $selectedJoin = $selectedTab.find('.resvMnpStat').find('li.on');
			var joinCd = $selectedJoin.attr('data-resv-mnp-stat');
			var joinNm = $selectedJoin.find('button').text();

			// STEP-3 : 기기 색상
			var $colorDiv = $selectedTab.find('.color').find('li.on');
			var colrCd = $colorDiv.attr('data-colr-cd');
			var colrNm = $.trim($colorDiv.find('button').text());

			// STEP-4 : 신청자 이름
			var $name = $selectedTab.find('.clientNm');
			if( $name.val().isEmpty() ) {
				$("#warningtNmTxt2").css('display','block');
				$("#warningtNmTxt2").text("이름을 입력해주세요.");
				validateFalg = false;
				
			} else if($name.val().length < 2) {
				$("#warningtNmTxt2").css('display','block');
				$("#warningtNmTxt2").text("이름을 최소 2자 이상 입력해 주세요.");
				validateFalg = false;
			}else{
				$("#warningtNmTxt2").css('display','none');	
			}
			// STEP-5 : 신청자 휴대폰 번호
			var phoneRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
			var $phoneNo = $selectedTab.find('.clientPhoneNo');
			if( $phoneNo.val().isEmpty() ) {
				$("#warningtPhTxt2").css('display','block');
				$("#warningtPhTxt2").text("휴대폰번호를 입력해주세요.");
				validateFalg = false;
			} else if( !phoneRegex.test($phoneNo.val()) ) {
				$("#warningtPhTxt2").css('display','block');
				$("#warningtPhTxt2").text("잘못된 휴대폰번호입니다. 정확한 번호를 입력하세요.");
				validateFalg = false;
			}else{
				$("#warningtPhTxt2").css('display','none');
			}
			// STEP-6 : 개인정보 수집 및 이용 동의( server side에서도 병행할 것 )
			var $chkAgree = $("#agree-pi-w");
			if( !$chkAgree.is(":checked") ) {
				$("#warningtAgreeTxt2").css('display','block');
				validateFalg = false;
			}
			if(validateFalg == false) {
				return reject();
			}else{
				$(".warningtxt").css('display','none');	
			}
			
			// STEP-7 : pns_ke
			//var pns_key =  $("#pns_key").val();
			
			var chkAgreeCardTxt = "";
			var $chkAgreeCard = $("#agree-card-w2");
			if( $chkAgreeCard.is(":checked") ) {
				chkAgreeCardTxt = "신한스마트플랜카드";
			}
			
			// STEP-7 : 
			var chkMarketAgreeTxt =   $("#agree-pi-w2").is(":checked")?"마케팅동의:Y":" 마케팅동의:N";
			
			
			if(rcepMthd=="D01") {
				// 신청가능여부 체크
				var chkAlrdyRsrvd = APIM_W.alrdyRsrvd(resvSaleCode, $name.val(), $phoneNo.val());
				chkAlrdyRsrvd.then(
						// success
						function(result) {
							// API 호출 실패
							if( result.status != 'OK' ) {
								alert(result.message);
								return reject();
							}
							// API 호출 결과
							var responseCode = result.data.body.rsltInfo.rsltCd;
							if(responseCode != '00') {
								alert(result.data.HEADER.responseMessage);
								return reject();
							}

							if( result.data.body.presaleRegInfo.reqYn == 'N' ) {
								//var alrtMsg = "1인당 사전예약 가능 횟수는 3회로 제한 됩니다.";
								//alert(alrtMsg);
								$("#preorderModelName").text(result.data2.modelNm);
								APIM.presalesPsblModalShowPC();
								
								// 고객 정보 초기화
								$(".clientNm, .clientPhoneNo").val('');
								// 개인정보 수집 동의 초기화
								$(".agreeCheck").prop('checked', false).next().removeClass('on');
								return reject();

							}else if ( result.data.body.presaleRegInfo.reqYn  == 'F' ) {
								var alrtMsg = "매장에서 사전예약 신청 및 가입신청서 작성 시 온라인에서 추가적인 사전예약 신청이 불가합니다.";
								alert(alrtMsg);
								// 고객 정보 초기화
								$(".clientNm, .clientPhoneNo").val('');
								// 개인정보 수집 동의 초기화
								$(".agreeCheck").prop('checked', false).next().removeClass('on');
								return reject();
							}

							return resolve({
								cmpnId      : resvSaleCode,	 //이벤트 코드
								cmpnMdl      : modTypCd,	 //이벤트 코드
								cmpnCapa : sizeCd,					// 용량
								cmpnColr : colrCd,  //색상
								cmpnGift :  '', //사은품코드  -필수아님
								rcepMthd :'D01',//rcepMthd	신청방법	string	Y	D02	D01:택배, D02:매장,D03:직영점, D04:용산개통센터,D05:마곡개통센터
								rqstDivs :joinCd,  //가입형태	string
								chnlCd :  'R3000004',
								rsvUserName : $name.val(),					// 신청자 이름
								rsvHpNo : $phoneNo.val(),			// 신청자 휴대폰 번호
								//alert문구 구성
								modelNm      : modelNm,
								sizeNm : sizeNm,
								colrNm : colrNm,
								joinNm : joinNm,
								//pns_key광고
								pns_key:'',
								memo:chkAgreeCardTxt+chkMarketAgreeTxt
							});
						},
						// error
						function() {
							alert('사전예약 요청 중 에러가 발생했습니다.\n잠시 후 다시 시도해주십시오.');
							return reject();
						}
				);  //end then
			}else{
				return resolve({
					cmpnId      : resvSaleCode,	 //이벤트 코드
					cmpnMdl      : modTypCd,	 //이벤트 코드
					cmpnCapa : sizeCd,					// 용량
					cmpnColr : colrCd,  //색상
					cmpnGift :  '', //사은품코드  -필수아님
					rcepMthd :'D02',//D02	D01:택배, D02:매장,D03:직영점, D04:용산개통센터,D05:마곡개통센터
					rqstDivs :joinCd,  //가입형태	string
					chnlCd :  'R3000006',
					rsvUserName : $name.val(),					// 신청자 이름
					rsvHpNo : $phoneNo.val(),			// 신청자 휴대폰 번호
					
					//alert문구 구성
					modelNm      : modelNm,
					sizeNm : sizeNm,
					colrNm : colrNm,
					joinNm : joinNm,
					pns_key :'' 
					
				});
			}
		})
	}//[e]

}
})();
		