/**
 * ubot(챗봇) 스크립트 - Mobile ver
 * 
 * @author Medialog
 * @date 20181024
 */
var trackTos_uid;
var trackTos_cookie;
// 챗봇 URL
var CHAT_URL = "https://iphone-xs-chat.uplus.co.kr";

//챗봇 인스턴스
var ubot;

/* tracking script 불러오기 [S] */
$.getScript(CHAT_URL+"/tracking/tracking.js?v=" + $.now(), function() {
	var $def = $.Deferred();
	if (typeof $.DefaultTos === 'undefined') {
		var attempts = 0;
		var interval = setInterval(function() {
			if (typeof $.DefaultTos !== 'undefined') {
				window.clearInterval(interval);
				$def.resolve();
			}
			else if (attempts >= 10000) {
				window.clearInterval(interval);
				$def.reject('Something went wrong');
			}
			attempts++;
//				console.log("attempts", attempts);
		}, 100);
	} 
	else {
		$def.resolve();
	}
	return $def.promise();
}).then(function() {
	$.DefaultTos( location.hostname );
	
	trackTos_uid = $.getUUIDTos();
	trackTos_cookie = $.getCOOKIETos();
	
	ubot = new Ubot();
	$(document).trigger('tracking-ready');

}).fail(function() {
	console.error("[Uplus] Failed to initialize CHATBOT.");
});
/* tracking script 불러오기 [F] */

var TrackingCd = {
		// 모델 비교하기 ( 로딩 후 호출 )
		SPEC          : 'click1',
		// 요금 조회하기 ( 로딩 후 호출 )
		PRICE_INFO    : 'click2',
		// 할인반환금  ( 로딩 후 호출 )
		REFER         : 'click3',
		// 제품 상세보기 ( 로딩 후 호출 )
		DETAIL        : 'click4',
		// 혜택보기 ( 로딩 후 호출 )
		BENEFIT       : 'click5',
		// 사전예약 한눈에 보기 ( 로딩 후 호출 )
		GUIDE         : 'click6',
		// 챗창 실행 ( 로딩 후 호출 )
		CHAT          : 'click7',
		// Uplus shop 호출
		UPLUS_SHOP    : 'click8',
		// 빌보드 배너 > 아이폰 사전예약하기
		PREORDER_PHONE_FROM_BILLBOARD : 'm_click8_1',
		// 빌보드 배너 > 애플워치 사전예약하기
		PREORDER_WATCH_FROM_BILLBOARD : 'm_click1_1',
		// 빌보드 배너 > 애플워치 사전예약하기
		CLOSE_PREORDER_WATCH_FROM_BILLBOARD : 'm_click18_5',
		// 메인 페이지 > 아이폰 신제품 자세히 보기 모달
		DETAIL_PHONE_FROM_MAIN        : 'm_click9_1',
		// 메인 페이지 > 아이폰 신제품 자세히 보기 모달 > 닫기
		CLOSE_DETAIL_PHONE_FROM_MAIN  : 'm_click9_2',
		// 메인 페이지 > 애플워치4 자세히 보기 모달
		DETAIL_WATCH_FROM_MAIN        : 'm_click3_1',
		// 메인 페이지 > 애플워치4 자세히 보기 모달 > 닫기
		CLOSE_DETAIL_WATCH_FROM_MAIN  : 'm_click3_5',
		
		// 메인 페이지_아이폰 혜택(디폴트)
		INDEX_PHONE       : 'm_click14_1',
		// 메인 페이지_아이폰 혜택(디폴트) 이탈
		CLOSE_INDEX_PHONE : 'm_click14_2',
		// 메인 페이지 > 애플워치 혜택
		INDEX_WATCH       : 'm_click2_1',
		// 메인 페이지 > 애플워치 혜택 > 이탈
		CLOSE_INDEX_WATCH : 'm_click2_5',
		
		// 제품 상세보기 > 애플워치
		DETAIL_WATCH_IN    : 'm_click4_1',
		// 제품 상세보기 > 애플워치 > 이탈
		DETAIL_WATCH_OUT   : 'm_click4_5',
		
		// 혜택보기 > 애플워치
		BENEFIT_WATCH_IN     : 'm_click5_1',
		// 혜택보기 > 애플워치 > 이탈
		BENEFIT_WATCH_OUT    : 'm_click5_5',
		
		// 모델 비교하기 > 애플워치 
		SPEC_WATCH_IN     : 'm_click6_1',
		// 모델 비교하기 > 애플워치 > 이탈
		SPEC_WATCH_OUT     : 'm_click6_5',
		
		// 사전예약 한 눈에 보기 > 애플워치 
		GUIDE_WATCH_IN     : 'm_click6_1',
		// 사전예약 한 눈에 보기 > 애플워치  > 이탈
		GUIDE_WATCH_OUT     : 'm_click6_5',
		
		// 예약 신청서 작성 iPhone XS  ( 클릭시 호출 )
		ORDER_FORM        : 'complete_form',
		// 예약 신청서 작성 iPhone XR( 클릭시 호출 )
		ORDER_FORM_2      : 'complete_form_2',
		// 예약 신청서 작성 watch ( 클릭시 호출 )
		ORDER_FORM_3      : 'complete_form_3',
		// 사전예약 완료 iPhone XS ( 클릭시 호출 )
		COMPLETE_RESV   : 'complete_rsv',
		// 사전예약 완료 iPhone XR ( 클릭시 호출 )
		COMPLETE_RESV_2 : 'complete_rsv_2',
		// 사전예약 완료 watch ( 클릭시 호출 )
		COMPLETE_RESV_3 : 'complete_rsv_3'
}

/** 
 * Chat bot
 * @author Medialog
 */
function Ubot() {
	// 챗봇 말풍선 유지시간 : 10초
	var BANN_REMAIN_SEC = 10000;
//	var BANN_REMAIN_SEC = 3000;
	// 챗봇 주소
	var chatbotDefaultUrl = CHAT_URL+"/chat.php";
	var _ubot = {};
	
	// 채팅창이 열려있는지
	_ubot.chatOpened = false;
	
	// 챗봇 쿼리 
	_ubot.chatbotQuery = $.query.empty();
	_ubot.chatbotQuery = _ubot.chatbotQuery.set('uid1', trackTos_uid);
	_ubot.chatbotQuery = _ubot.chatbotQuery.set('uid2', trackTos_cookie);
	_ubot.chatbotQuery = _ubot.chatbotQuery.set('channel', 'M');
	
	// Ubot 영역
	var $ubotArea = $("#ubotArea");
	var $gnbChatbotIcon = $('#ubotArea .ubot_icon'),
		ubotContHeight = $(window).height() - 206;
	
	var $tooltip   = $('#ubotArea .chatbot_tooltip'); // 툴팁(말풍선)
	var $choiceBox = $('#ubotArea .choice_box'); // 배너박스 - 이름 잘못지음
	
	var boxTimeout;
	
	/*
	 * [[ 노출 배너 결정 ]]
	 * (없음) : 말풍선
	 * onCoffee : 커피 (default)
	 * onCard : 제휴카드
	 * onCs : CS 말풍선	
	 * onUsed : 중고폰
	 * onWatch : onWatch
	 */
	
	/*
	 * 배너 노출 우선순위 
	 * - 1 : 상담사 채팅
	 * - 2 : 월 납부금
	 * - 3 : 애플워치
	 */
	
	/**
	 * 기본 챗봇 배너 열기
	 */
	_ubot.openDefaultBanner = function() {
		// 기존에 채팅이 열려있을 경우 취소
		if( _ubot.chatOpened ) return;
		// 말풍선 열려있을 경우 숨기기
		$tooltip.hide();
		var bannerClass = 'onCoffee',	// 배너 클래스
			bannerNum   = 1;			// 배너 번호
		
		// 워치 점수 조회
		var watchScore = $.Watch_ScoreTos();
//		console.info("watchScore : ", watchScore);
		/* dummy  watchScore = 36;*/
		if( watchScore > 35 ) {
			bannerClass = 'onWatch';
			bannerNum = 4;
		}
		
		// 상담 챗이 열려있었을 경우 대비하여 상담사 호출값 초기화
		_ubot.chatbotQuery = _ubot.chatbotQuery.remove('callchk');
		// 배너값 호출 쿼리에 세팅
		_ubot.chatbotQuery = _ubot.chatbotQuery.set('banner', bannerNum);
		//  배너 세팅
		$ubotArea.attr('class', 'chatbot-icon '+bannerClass);

		// iframe 미리 세팅
		
		// 배너 열기 (일정 시간뒤 배너 사라짐)
		$choiceBox.fadeIn();

		clearTimeout( boxTimeout );
		boxTimeout = setTimeout(function(){
			// 배너 사라지고 나면 말풍선 띄우기
			$ubotArea.attr('class', 'chatbot-icon');
			setDefaultChatbotQuery();
			$tooltip.show();
			$choiceBox.fadeOut();
		}, BANN_REMAIN_SEC);
	}
	
	/**
	 * 제휴카드 & 노출보상 배너 출력
	 */
	_ubot.openBanner = function() {
		// 기존에 채팅이 열려있을 경우 취소
		if( _ubot.chatOpened ) return;
		// 말풍선 열려있을 경우 숨기기
		$tooltip.hide();
		var bannerClass = '',	// 배너 클래스
			bannerNum;			// 배너 번호
		
		var currHour = new Date().getHours();
		switch(currHour) {
		// 제휴카드(월 납부금) 노출 시간대
		case 0:case 1:case 4:case 5:case 8:case 9:case 12:case 13:case 16:case 17:case 20:case 21:
			bannerClass = 'onCard'; bannerNum = 2; break;
		
		// 중고보상 노출 시간대
		case 2:case 3:case 6:case 7:case 10:case 11:case 14:case 15:case 18:case 19:case 22:case 23:
			bannerClass = 'onUsed'; bannerNum = 3; 
			break;
		}
		
		// 상담 챗이 열려있었을 경우 대비하여 상담사 호출값 초기화
		_ubot.chatbotQuery = _ubot.chatbotQuery.remove('callchk');
		// 배너값 호출 쿼리에 세팅
		_ubot.chatbotQuery = _ubot.chatbotQuery.set('banner', bannerNum);
		
		// 다른 배너가 열려있었을 경우 닫기
		$choiceBox.hide();
		
		// 배너 세팅
		$ubotArea.attr('class', 'chatbot-icon '+bannerClass);

		// 배너 열기 (일정 시간뒤 배너 사라짐)
		$choiceBox.slideDown();
		
		clearTimeout( boxTimeout );
		boxTimeout = setTimeout(function(){
			// 배너 사라지고 나면 말풍선 띄우기
			$ubotArea.attr('class', 'chatbot-icon');
			setDefaultChatbotQuery();
			$tooltip.show();
			$choiceBox.slideUp();
		}, BANN_REMAIN_SEC);
	};
	
	
	/**
	 * 상담사 배너
	 */
	_ubot.openCsBanner = function() {
		chatbotTracking('banner_show');
		// 기존에 채팅이 열려있을 경우 취소
		if( _ubot.chatOpened ) return;
		// 말풍선 열려있을 경우 숨기기
		$tooltip.hide();
		var bannerClass = 'onCs',	// 배너 클래스
			bannerNum;			// 배너 번호
		
		// 상담 챗이 열려있었을 경우 대비하여 상담사 호출값 초기화
		_ubot.chatbotQuery = _ubot.chatbotQuery.set('callchk', 'Y');
		// 배너값 호출 쿼리에 세팅
		_ubot.chatbotQuery = _ubot.chatbotQuery.remove('banner');
		
		// 다른 배너가 열려있었을 경우 닫기
		$choiceBox.hide();
		
		// 배너 세팅
		$ubotArea.attr('class', 'chatbot-icon '+bannerClass);

		// 배너 열기 (일정 시간뒤 배너 사라짐)
		$choiceBox.fadeIn();

		clearTimeout( boxTimeout );
		boxTimeout = setTimeout(function(){
			// 배너 사라지고 나면 말풍선 띄우기
			$ubotArea.attr('class', 'chatbot-icon');
			setDefaultChatbotQuery();
			$tooltip.show();
			$choiceBox.fadeOut();
		}, BANN_REMAIN_SEC);
	};
	
	// 상담원 배너 호출 여부 확인
	_ubot.consultantCheck = function() {
		$.consultantTos(function(openCs) {
//			alert('[DEV] 상담사 호출 배너 : ' + openCs);
			/*dummy openCs = true;*/
			if( openCs ) {
				_ubot.openCsBanner();
			} else {
				_ubot.chatbotQuery = _ubot.chatbotQuery.set('callchk','N');
			}
		});
	};
	
	_ubot.chatbotQuery = _ubot.chatbotQuery.set('banner', 1);
	
	// 해당 시간대의 배너 선택시 호출할 chatbot iframe URL
	var defaultChatbotQuery = $.extend(_ubot.chatbotQuery); // 객체 복사
	
	// 말풍선 영역
	var classList = $ubotArea.attr('class').split(/\s+/);
	
	// 선택박스 있을 경우
	var hasChoiceBox = classList.length > 1;
	$choiceBox.toggle(hasChoiceBox);
	
	return init();
	/***/
	/* 초기화 */
	function init() {
		bindEvent();
		
		$ubotArea.show();
		$tooltip.hide();
		
		setTimeout(function(){
			_ubot.openDefaultBanner();
			_ubot.consultantCheck();
		},300);
		
		return _ubot;
	}
	/* ubot 이벤트 바인딩 */
	function bindEvent() {
		// 챗봇 아이콘 클릭
		$('#ubotArea .icon_chat').click(function(){
			openUbotChat();
			return false;
		});
		
		$tooltip.on('click', function(){
			openUbotChat();
			return false;
		});

		$choiceBox.on('click', function(){
			openUbotChat();
			return false;
		});

		// 챗봇 대화창 닫기 버튼
		$('#ubotArea .ubot_cont .close').on('click', function(){
			_ubot.closeChat();
		});
	}; // bindEvent
	
	function openUbotChat() {
		var chatUrl = chatbotDefaultUrl + _ubot.chatbotQuery.toString();
		window.open(chatUrl, '_blank');
	}
	
	function setDefaultChatbotQuery() {
		_ubot.chatbotQuery = _ubot.chatbotQuery.remove('callchk');
		_ubot.chatbotQuery = _ubot.chatbotQuery.set('banner', 1);
	}
	
	function jumpSet(){
		setTimeout(jumpUp,0);
		setTimeout(jumpDown, 300);
		setTimeout(jumpUp,700);
		setTimeout(jumpDown, 1000);
	}
	
	function jumpUp(){
		$gnbChatbotIcon.addClass('hover');
	}
	function jumpDown(){
		$gnbChatbotIcon.removeClass('hover');
	}	
};
/* // Chat bot */

// 트래킹 코드 전송
function chatbotTracking(content){
	try {
		$.TrackingTos(content);
		console.info("chatbot tracking contents : '"+content+"'");
	} catch (e) {
		console.error("챗봇 트래킹 script 오류", e);
	}
}

// 챗봇 상담 여부 체크
function consultantCheck() {
	ubot.consultantCheck(); // 일단 급한대로 ....
}
