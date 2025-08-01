//사전예약관련 js
$(document).ready(function(){
    //휴대폰명 두줄처리
    $('.sel_opt.modelNm li').each(function (i) {
        var txtNum = $(this).find('a').text().length;
        if (txtNum > 14) {
            $(this).find('a').css({
                'line-height': '16px',
                'display': 'table-cell',
                'vertical-align': 'middle'
            });
        }
    });
});

/** 사전 수정하기 UI 컨트롤 */
const PreorderUpdateCtrl = (function(){
	
	return {
		
	    status: /*[[${preorderStatus}]]*/ '',
	    from: '',	// 
	    resvSaleCode: /*[[${deviceList.get(0).resvSaleCode}]]*/ '',
	    modTypCd: /*[[${deviceList.get(0).modTypCd}]]*/ '',
	    modTypCdDesc: /*[[${deviceList.get(0).modTypCdDesc}]]*/ '',

        // 모달 레이어 열기
        open: function (initTab, from) {

            this.reset();
 
            PreorderUpdateCtrl.from = from;

            if (!isGnbStat()) {
                getScrollY();
            } else {
                //네비 오픈된 상태
                $('html').attr('style', '');
                $('body').attr('style', '');
            }

            //스크롤 이슈S - 퍼블
            $(window).scrollTop(0);
            $('#wrap').hide();
            //스크롤 이슈E - 퍼블

            // 다른 모달이 열려있었을 경우 닫기
            $('.modal').modal('hide');
            $("#myModal01Update_MW").modal('show');
            
            var index = 0;  //
            
            if ("PH001" == $("#reserveFormUpdate #orgCmpnMdl").val()){   //iPhone SE3
            	index = 0;
            }

            
            //기본세팅(사용자 정보로 조회)
            this.choiceModel(index
                , $("#reserveFormUpdate #resvSaleCode").val()
                , $("#reserveFormUpdate #orgCmpnMdl").val()
                , $("#reserveFormUpdate #modelNm").val()
                , true);
        },
        // 모달 레이어 닫기
        close: function () {
            $("#myModal01Update_MW").modal('hide');
            // 모달 내 선택, 입력 값 초기화
            this.reset();
            if ($("header .menu").hasClass("close")) {
                $('html').attr('style', 'overflow:hidden !important; height:100%');
                $('body').attr('style', 'overflow:hidden !important; height:100%');
            }
            $('#wrap').show();
            setScrollY();

            //폼데이터 초기화
            $('#reserveFormUpdate').find("input[type=hidden]").val("");
        },
        // 모달 입력값 초기화
        reset: function () {
            // 선택 값 초기화
            $("#myModal01Update_MW .sel_opt").each(function (i, sel) {
                $(sel).find('li').removeClass('on');
                $($(sel).find('li').get(0)).addClass('on');
            })
        },
        choiceModel: function (modelIndex, resvSaleCode, modTypCd, modTypCdDesc, openFlag) {
            $("#resvSaleCode").val(resvSaleCode);
            $("#modTypCd").val(modTypCd);
            $("#modelNm").val(modTypCdDesc);

            const params = {
            		"cmpId"		: $("#reserveFormUpdate #cmpnId").val(),
                    "modelIndex": modelIndex,
                    "cmpnMdl"	: modTypCd,
                    "cmpnCapa"	: $("#reserveFormUpdate #orgCmpnCapa").val(),
                    "cmpnColr"	: $("#reserveFormUpdate #orgCmpnColr").val(),
                    "cmpnColrNm": $("#reserveFormUpdate #orgCmpnColrNm").val(),
                    "rqstDivs"	: $("#reserveFormUpdate #orgRqstDivs").val(),
                    "cmpnGift"	: $("#reserveFormUpdate #orgCmpnGift").val(),
                    "openFlag"	: openFlag
            };
            $.ajax({
                url: "/preOrderUpdate/choiceModel"
                , type: "POST"
                , data: params
                , cache: false
                , success: function (data) {
                	
                    $("#preOrderUpdate_optBox_MW").html(data);

                    // 옵션 선택
                    $('.sel_opt li button').on('click', function () {
                        var $choiceLi = $(this).closest('li');
                        if ($choiceLi.hasClass('disable')) {
                            return false;
                        } else {
                            $choiceLi.addClass('on').siblings('li').removeClass('on');
                        }
                        
                        // 색상 선택 시 텍스트 변경
                        var $choiceUl = $(this).closest('.sel_opt');
                        $choiceUl.parent().find('.on_txt').text($(this).text());
                        
//		        		return false;
                    });

                    //휴대폰명 두줄처리
                    $('.sel_opt.modelNm li').each(function (i) {
                        var txtNum = $(this).find('a').text().length;
                        if (txtNum > 14) {
                            $(this).find('a').css({
                                'line-height': '16px',
                                'display': 'table-cell',
                                'vertical-align': 'middle'
                            });
                        }
                    });

                }, error: function () {
                    alert("오류가 발생하였습니다.");
                }
            });
        },
        // 유효성 검사
        validate: function (rcepMthd) {
            return new Promise(function (resolve, reject) {

                var $selectedTab = $("#preOrderUpdate_tab_A");

                // STEP-1 : 모델 검사
                const cmpnId = $("#reserveFormUpdate #cmpnId").val();
                const cmpnMdlNmText = $("#reserveFormUpdate #cmpnMdlNmText").val();
                
                var modelNm = $("#modelNm").val();
                var modTypCd = $("#modTypCd").val();
                var resvSaleCode = $("#resvSaleCode").val();
                const rsvSaleNo = $("#reserveFormUpdate #rsvSaleNo").val();

                const $selectedModel = $selectedTab.find('.modelNm').find('li.on');
                const selectedModelNm =  $selectedModel.find('button').text();

                
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
                
                if(typeof colrCd == "undefined" || colrCd == null || colrCd == ""){
                	alert("변경하실 색상을 선택해주세요 ") 
					return false;
                }
                
                const giftCode = $("#giftList_NW option:selected").attr('data-gift-cd');
                const giftNm = $("#giftList_NW option:selected").val();
                const apimGiftCode = $("#apim-gift-cd").val();
                console.log(apimGiftCode);
                
                
                return resolve({
                    rsvSaleNo: rsvSaleNo,//예약판매번호
                    cmpnId: cmpnId ,//이벤트코드
                    cmpnMdl: modTypCd, 	//모델번호
                    cmpnCapa: sizeCd,	//용량코드
                    cmpnColr: colrCd,	//색상코드
                    rqstDivs: joinCd,	//가입형태
                    cmpnGift: giftCode, //기프트 정보
                    memo: "", 	//메모
                    chnlCd: 'R3000006', 	//인입채널코드

                    //alert문구 구성
                    cmpnMdlNmText: selectedModelNm,
                    sizeNm: sizeNm,
                    colrNm: colrNm,
                    joinNm: joinNm,
                    giftNm: giftNm,
                    apimGiftCode: apimGiftCode
                });
            })
        },
        // 사전예약 요청 전송
        submit: function () {
            // 유효성 검사 후 조회
            this.validate('D01').then(function (submitData) {

            	if( submitData.apimGiftCode !="S2301" && submitData.cmpnGift=="S2301" ){
            		
            		alert("노스페이스 백(6종 랜덤,개별배송)사은품은  품절되었습니다.\n다른사은품을 선택해주세요"); return false;
            	}
 	
            	var modelNmTxt = submitData.cmpnMdlNmText;
             	/**확인 메세지 세팅 [S] */
                 var confirmMsg = modelNmTxt + "\n";
                 confirmMsg += submitData.sizeNm + " / " + submitData.joinNm + " / " + submitData.colrNm +  "을(를) 선택하셨습니다.\n";
                 confirmMsg += "선택하신 정보로 사전예약 내역을 수정하시겠습니까?";
                 /* 확인 메세지 세팅 [F] */

                 if (!confirm(confirmMsg)) return;
                 // 사전예약 요청
                  APIM.updateReserve(submitData);
         },
          function (err) {
              console.error('submit error', err);
          });
        } 

	}//[END return]
	
})();	
