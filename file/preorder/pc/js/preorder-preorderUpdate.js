//사전예약관련 js
$(document).ready(function(){
	
});

/** 사전 수정하기 UI 컨트롤 */
const PreorderUpdateCtrl = (function(){
	return {
	 
        // 모달 레이어 열기
        open: function (initTab, from) {
            this.reset();

            if (PreorderList.preorderStatus === 'over') {
                const message = "사전예약이 종료되었습니다.";
                return alert(message);
            }

            this.from = from;
            $("#myModal01Update").modal('show');
            
            var index = 0;  // 
            //if ("PH001" == $("#reserveFormUpdate #orgCmpnMdl").val()){   //iPhone SE3 
           // 	index = 0;
           // }
             
            //기본세팅(사용자 정보로 조회)
            this.choiceModel(index
                , $("#reserveFormUpdate #resvSaleCode").val()
                , $("#reserveFormUpdate #orgCmpnMdl").val()
                , $("#reserveFormUpdate #modelNm").val()
                , true);
        },
        // 모달 레이어 닫기
        close: function () {
            $("#myModal01Update").modal('hide');
            // 모달 내 선택, 입력 값 초기화
            this.reset();

            //폼데이터 초기화
            $('#reserveFormUpdate').find("input[type=hidden]").val("");
        },
        // 모달 입력값 초기화
        reset: function () {
            // 선택 값 초기화
            $("#myModal01Update .sel_opt").each(function (i, sel) {
                $(sel).find('li').removeClass('on');
                $($(sel).find('li').get(0)).addClass('on');
            });
        },
        choiceModel: function (modelIndex, resvSaleCode, modTypCd, modTypCdDesc, openFlag) { //현재 선택된 단말정보를 세팅

            $("#reserveFormUpdate #resvSaleCode").val(resvSaleCode);
            $("#reserveFormUpdate #modTypCd").val(modTypCd);
            $("#reserveFormUpdate #modelNm").val(modTypCdDesc);
            
        	
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
                	
                    $("#preOrderUpdate_optBox").html(data);
                    // 옵션 선택
                    $('.sel_opt li button').on('click', function () {
                        const $choiceLi = $(this).closest('li');
                        if ($choiceLi.hasClass('disable')) {
                            return false;
                        } else {
                            $choiceLi.addClass('on').siblings('li').removeClass('on');
                        }

                        // 색상 선택 시 텍스트 변경
                        const $choiceUl = $(this).closest('.sel_opt');
                        $choiceUl.parent().find('.on_txt').text($(this).text());
                    });
                    
                }, error: function () {
                    alert("오류가 발생하였습니다.");
                }
            });

        },
        // 유효성 검사
        validate: function (rcepMthd) {
            return new Promise(function (resolve, reject) {

                const $selectedTab = $("#myModal01Update");

                // STEP-1 : 모델 검사
                const cmpnId = $("#reserveFormUpdate #cmpnId").val();
                const modelNm = $("#reserveFormUpdate #modelNm").val();
                const cmpnMdlNmText = $("#reserveFormUpdate #cmpnMdlNmText").val();
                const modTypCd = $("#reserveFormUpdate #modTypCd").val();
                const resvSaleCode = $("#reserveFormUpdate #resvSaleCode").val();
                const rsvSaleNo = $("#reserveFormUpdate #rsvSaleNo").val();

                const $selectedModel = $selectedTab.find('.modelNm').find('li.on');
                const selectedModelNm =  $selectedModel.find('button').text();

                // STEP-2 : (폰) 저장공간, (워치) 사이즈
                const $selectedSize = $selectedTab.find('.sizeCd').find('li.on');
                const sizeCd = $selectedSize.attr('data-size-cd');
                const sizeNm = $selectedSize.find('button').text();

                // STEP-3 : 가입유형
                const $selectedJoin = $selectedTab.find('.resvMnpStat').find('li.on');
                const joinCd = $selectedJoin.attr('data-resv-mnp-stat');
                const joinNm = $selectedJoin.find('button').text();

                // STEP-3 : 기기 색상
                const $colorDiv = $selectedTab.find('.color').find('li.on');
                const colrCd = $colorDiv.attr('data-colr-cd');
                const colrNm = $.trim($colorDiv.find('button').text());
                if(typeof colrCd == "undefined" || colrCd == null || colrCd == ""){
                	alert("변경하실 색상을 선택해주세요 ") 
					return false;
                }
                
                const giftCode = $("#giftList option:selected").attr('data-gift-cd');
                const giftNm = $("#giftList option:selected").val();
                const apimGiftCode = $("#apim-gift-cd").val();
                console.log(apimGiftCode);
                
                return resolve({
                    rsvSaleNo: rsvSaleNo,//예약판매번호
                    cmpnId: cmpnId,		//이벤트코드
                    cmpnMdl: modTypCd, 	//모델번호
                    cmpnCapa: sizeCd,	//용량코드
                    cmpnColr: colrCd,	//색상코드
                    rqstDivs: joinCd,	//가입형태
                    cmpnGift:  giftCode,//기프트 정보
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
        //매장용신청
        submit: function () {
            this.validate().then(function (submitData) {

            	//console.log(submitData);
            	
            	if( submitData.apimGiftCode !="S2301" && submitData.cmpnGift=="S2301" ){
            		
            		alert("노스페이스 백(6종 랜덤,개별배송)사은품은  품절되었습니다.\n다른사은품을 선택해주세요"); return false;
            	}
            	
            	var modelNmTxt = submitData.cmpnMdlNmText;
            	/*확인 메세지 세팅 [S] */
                var confirmMsg = modelNmTxt + "\n";
                confirmMsg += submitData.sizeNm + " / " + submitData.joinNm + " / " + submitData.colrNm +  "을(를) 선택하셨습니다.\n";
                confirmMsg += "선택하신 정보로 사전예약 내역을 수정하시겠습니까?";
                /* 확인 메세지 세팅 [F] */

                if (!confirm(confirmMsg)) return;
                
                APIM.updateReserve(submitData);
            },
            function (err) {
                console.error('ommmi error', err);
            });
        } 

	}//[END return]
	
})();	
