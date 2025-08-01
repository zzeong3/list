//사전예약관련 js
$(document).ready(function(){
	  $("#searchStoreKey").keyup(function (e) {
          if (e.keyCode === 13) StoreCtrl.searchStore(1);
      });
});

 /** 매장 검색 팝업 UI 컨트롤 */
const StoreCtrl = (function(){

	let callStoreGubun;
	let operName = "";	//방문매장명
	let operCode = "";	//운영자코드
	let storeCode = "";	//방문매장코드
	let storeName = "";
	let phoneNo = "";
	let callCmpnMdl;  //사은품 구분을 위해 선택한 모델코드
	
	return {
		closeStoreModal: function () {
            if (callStoreGubun === "order") {
                if (!confirm("신청을 종료하시겠습니까?\n[신청 완료]를 하지 않고 종료할 경우 현재 작성된 데이터는 삭제됩니다.\n현재페이지에 있으려면[취소]를 클릭하십시오.")) {
                    return;
                } else {
                    $("#storeModal").modal('hide');
// 				PreorderCtrl.reset();
// 				StoreCtrl.clearStoreModal();
                }
            } else if (callStoreGubun === "early") {
                if (!confirm("신청을 종료하시겠습니까?\n[신청 완료]를 하지 않고 종료할 경우 현재 작성된 데이터는 삭제됩니다.\n현재페이지에 있으려면[취소]를 클릭하십시오.")) {
                    return;
                } else {
                    $("#storeModal").modal('hide');
// 				PreorderCtrl.reset();
// 				StoreCtrl.clearStoreModal();
                }
            } else {
                $("#storeModal").modal('hide');
// 			StoreCtrl.clearStoreModal();
            }
        },
        // [다음] 버튼 클릭시 매장찾기로 연결
        searchStoreForm: function (callGubun,selectCmpnMdl,selectCmpnId,selectCmpnCapa) {
            callStoreGubun = callGubun;
            callCmpnMdl = selectCmpnMdl;
            callCmpnId = selectCmpnId;
            callCmpnCapa =selectCmpnCapa;
            
            if (callStoreGubun === "early") {
                $("#storeModalTitle").text("얼리버드 신청");
                $('#joinCompleteBtn').text("얼리버드 신청 완료");
                EarlyCtrl.validate().then(function (submitData) {
                        $("#myModalEarly").modal('hide');
                        //$("#storeModal").modal({data-backdrop:'static',data-keyboard:'false'});
                        $("#storeModal").modal('show');
                        $("#joinCompleteBtn").show();
                        return;
                    },
                    function (err) {
                        console.error('next error', err);
                    });
            } else if (callStoreGubun === "order") {
                $("#storeModalTitle").text("사전예약 신청");
                $('#joinCompleteBtn').text("사전예약 완료");
                PreorderCtrl.validate().then(function (submitData) {
                        $("#myModal01_5g").modal('hide');                        
                        $("#storeModal").modal('show');
                        $("#joinCompleteBtn").show();
                        return;
                    },
                    function (err) {
                        console.error('next error', err);
                    });
                //사용
            } else if (callStoreGubun === "search") {
                $("#storeModalTitle").text("가까운 매장 찾기");                
                $("#storeModal").modal('show');
                $("#joinCompleteBtn").hide();
                $('.searchNonTxt').hide();
                //신청서 진행
            } else if (callStoreGubun === "apply") {
                $('html').attr('style', '');
                $('body').attr('style', '');
                $("#storeModalTitle").text("가까운 매장 찾기");
                $("#storeModal").modal('show');                
                $("#joinCompleteBtn").show();
                $('.searchNonTxt').hide();
                StoreCtrl.toggleRegion('store');
            
            }else if (callStoreGubun === "applyWatch") {
            	
            	 $('html').attr('style', '');
                 $('body').attr('style', '');
                 $("#storeModalTitle").text("가까운 매장 찾기");
                 $("#storeModal").modal('show');
                 $("#joinCompleteBtn").show();
                 $('.searchNonTxt').hide();
                 StoreCtrl.toggleRegion('store');
                
            }else {
                $("#storeModal").modal('show');
                $("#joinCompleteBtn").show();
            }

            //전체 조회
            //전체 조회    
            if (callStoreGubun === "apply") {
            	$("#searchResult").html($("#searchResult_default").html());
            }else{
            	this.searchStore(1);	
            }
            
            
            //주소 default 설정
            const defaultFullAddress = '서울 용산구 한강대로 32';
           // this.searchAddressToCoordinate(defaultFullAddress);
        },
        searchStore: function (page) {
            const keyWord = $("#searchStoreKey").val();

            $('#searchRegionBtn').removeClass('on').text('지역 검색');
            $('#areaselect').hide();
            $('#searchStoreInput').show();
            $('#searchStoreBtn').addClass('on');

            if (keyWord === "" ) {
                //   alert("주소 또는 매장명을 입력해 주세요.");
                this.clearStoreModal();
                $("#searchResult").html($("#searchResult_default").html());
                return false;
             }
            
            
            if(typeof page == "undefined" || page == null || page === ""){
                page = 1;
            }

            const params = {
                "keyword": keyWord,
                "pageNo": Number(page),
                "size": 3,
                "sort": "storeName"
            };

            $.ajax({
                url: "/store/searchKeyword"
                , type: "POST"
                , data: params
                , cache: false
                , success: function (data) {
                    //선택 초기화
                    operName = "";
                    operCode = "";
                    $("#searchResult").html(data);

                    //search로 검색하는 경우 radio버튼 hidden처리
                    if (callStoreGubun == "search") {
                        $("#searchStoreInput").hide();
                        $("#searchStoreBtn").removeClass('on');

                        $("#storeRadioDiv").hide();
                        $("#storeRadioCol").hide();
                        $("input:radio[name='storeCode']").parents("td").hide();
                    }
                    $("#joinCompleteBtn").css('display', 'block');

                }, error: function () {
                    alert("오류가 발생하였습니다.");
                }
            });
        },
        // 매장 선택
        selectStore: function (lsStoreCode, lsStoreName, lsOperCode, lsOperName, lsFullAddress, lsPhoneNo) {
            //selectStore: function (storeNm, operCode,storeCode,fullAddress) {
            storeCode = lsStoreCode;
            storeName = lsStoreName;
            operName = lsOperName;
            operCode = lsOperCode;
            phoneNo = lsPhoneNo

            $("#tmpStoreName").val(lsStoreName);
            //this.searchAddressToCoordinate(lsFullAddress);
        },
        //매장 초기화
        deleteSelectStore: function () {
        	 $('input[name=storeCode]').prop('checked',false);
             storeCode = '';
             storeName = '';
             operName = '';
             operCode = '';
             phoneNo = '';
            $("#tmpStoreName").val("");
            //this.searchAddressToCoordinate(lsFullAddress);
        },
        toggleRegion: function (gubun) {
            //$('#areaselect').toggle();
            operName = "";	//방문매장명
            operCode = "";	//운영자코드
            $("#searchStoreKey").val('');
            $("#searchResult").html('');

            if (gubun === "store") {
                $('#areaselect').hide();
                $("#searchStoreKey").val('');
                $("#searchTitle").text('주소/매장 검색');
                $('#searchSubMsg').show();
                $('#searchRegionBtn').removeClass('on').text('지역 검색');
                $('#searchStoreBtn').addClass('on')
                $('#areaselect').hide();
                $('#searchStoreInput').show();
                //  StoreCtrl.clearStoreModal();
                //전체 조회
                this.searchStore(1);
            } else {
                $('#searchRegionBtn').addClass('on')
                $('#searchStoreBtn').removeClass('on')
                $('#searchStoreInput').hide();
                $("#searchTitle").text('지역 검색');
                $('#searchSubMsg').hide();
                $('#areaselect').show();
                $('#searchRegionBtn').text('지역 검색');
                $("#schAddress1 option:eq(0)").prop("selected", true)
                $("#schAddress2").empty();
                $("#schAddress2").append("<option value=''>시/군/구 선택</option>");


            }
			
        },
        selectAddress1: function () {
            const schAddress1 = $('#schAddress1').val();
            const params = {
                "schAddress1": $('#schAddress1').val()
            };
            
            if (schAddress1 !== "") {
	            $.ajax({
	                url: "/store/searchAddress2"
	                , type: "POST"
	                , data: params
	                , cache: false
	                , success: function (data) {
	                    //$("#searchResult").html(data);
	                    $("#schAddress2").empty();
	                    $("#schAddress2").append("<option value=''>시/군/구 선택</option>");
	                    for (var i = 0; i < data.length; i++) {
	                        var add2Option = "<option value='" + data[i] + "'>" + data[i] + "</option>";
	                        $("#schAddress2").append(add2Option);
	                    }
	
	                }, error: function () {
	                    alert("오류가 발생하였습니다.");
	                }
	            });
            }else{
                $("#schAddress2").empty();
                $("#schAddress2").append("<option value=''>시/군/구 선택</option>");
                $("#schAddress3").empty();
                $("#schAddress3").append("<option value=''>동 선택</option>");
            	$("#searchResult").html($("#searchResult_default").html());
            	
            	console.log("schAddress2 nullllllllllllll");

            }
        },
        //2depth검색
        selectAddress2: function () {
            const schAddress1 = $('#schAddress1').val();
            const schAddress2 = $('#schAddress2').val();

            if (schAddress2 !== "") {
                var params = {
                    "schAddress1": $('#schAddress1').val(),
                    "schAddress2": $('#schAddress2').val()
                };

                
                $.ajax({
                    url: "/store/searchAddress3"
                    , type: "POST"
                    , data: params
                    , cache: false
                    , success: function (data) {
                  
                        $("#schAddress3").empty();
                        $("#schAddress3").append("<option value=''>동 선택</option>");
                        $("#schAddress3").append("<option value='all'>전체 선택</option>");

                        for (let i = 0; i < data.length; i++) {
                            const add3Option = "<option value='" + data[i] + "'>" + data[i] + "</option>";
                            $("#schAddress3").append(add3Option);
                        }

                    }, error: function () {
                        alert("오류가 발생하였습니다.");
                    }
                });
            }else{
            	
            	$("#schAddress3").empty();
                $("#schAddress3").append("<option value=''>동 선택</option>");
             	$("#searchResult").html($("#searchResult_default").html());
             	console.log("schAddress2 nullllllllllllll");
            	
            }
        },
        //3차검색 
        selectAddress3: function (page) {
            
        	if(typeof page == "undefined" || page == null || page === ""){
        		page = 1;
        	}
        	
        	const schAddress1 = $('#schAddress1').val();
            const schAddress2 = $('#schAddress2').val();
            const schAddress3 = $('#schAddress3').val();

            if (schAddress2 !== "" && schAddress3 !== "" ) {
                const params = {
                    "schAddress1": schAddress1,
                    "schAddress2": schAddress2,
                    "schAddress3": schAddress3,
                    "pageNo": Number(page),
                    "size": 3,
                    "sort": "storeName"
                };
                $.ajax({
                    url: "/store/searchStoreByRegion"
                    , type: "POST"
                    , data: params
                    , cache: false
                    , success: function (data) {
                        //선택 초기화
                        operName = "";
                        operCode = "";
                        $("#searchResult").html(data);

                        //search로 검색하는 경우 radio버튼 hidden처리
                        if (callStoreGubun === "search") {
                            $("#storeRadioDiv").hide();
                            $("#storeRadioCol").hide();
                            $("input:radio[name='storeCode']").parents("td").hide();
                        }


                    }, error: function () {
                        alert("오류가 발생하였습니다.");
                    }
                });
            }else{
              	$("#searchResult").html($("#searchResult_default").html());
            	console.log("TTTTTTTTTTTTTTTTT");
            }
        },
        clearStoreModal: function () {
            operName = "";	//방문매장명
            operCode = "";	//운영자코드
            $("#searchStoreKey").val('');
            $("#searchResult").html('');
            $('#areaselect').hide();
            $('#searchRegionBtn').removeClass('on');
            $('#searchStoreBtn').addClass('on');

            $('#searchRegionBtn').text('지역 검색');
            $("#schAddress1 option:eq(0)").prop("selected", true)
            $("#schAddress2").empty();
            $("#schAddress2").append("<option value=''>시/군/구 선택</option>");
            $("#map").hide();
        },
        completeStore: function () {

            if (callStoreGubun === "order") {
                PreorderCtrl.submit();
            } else if (callStoreGubun === "early") {
                EarlyCtrl.submit();
            } else if (callStoreGubun === "list") {
                //var storeCode = $("input:radio[name='storeCode']:checked").val();
                //reserveDlrChange(storeCode, operName, operCode);
                StoreCtrl.closeStoreModal();
            } else if (callStoreGubun === "apply") {

                //사전예약 진행 
                if ($("input:radio[name='storeCode']:checked").length > 0 
                	|| (typeof storeCode == "undefined" || storeCode == null || storeCode !== "")) {

                	const storeName = $("#tmpStoreName").val();
                    StoreCtrl.closeStoreModal();
                    var params = {
                    	"callCmpnMdl": callCmpnMdl,
                        "storeCode": storeCode,
                        "operName": operName,
                        "operCode": operCode,
                        "storeName": storeName,
                        "rsvSaleRecvHpno": phoneNo,
                    };

                    $.ajax({
                        url: "/preOrderStore/openApplyModal"
                        , type: "POST"
                        , data: params
                        , cache: false
                        , success: function (data) {

                            $("#storeOrder_optBox").html(data);
                            PreorderCtrl.close_modal();
                            PreorderStoreApplyCtrl.open();

                        }, error: function () {
                            alert("오류가 발생하였습니다.");
                        }
                    });
                } else {
                    alert('매장을 선택하세요 ');
                }
            }
            else if (callStoreGubun === "applyWatch") {
                //operName, operCode,storeCode
                if ($("input:radio[name='storeCode']:checked").length > 0 &&
                    (typeof storeCode != "undefined" && storeCode != null && storeCode !== "")) {
                    
                    StoreCtrl.closeStoreModal();
                    var params = {
                    		"callCmpnCapa" : callCmpnCapa,
                        	"callcmpnId": callCmpnId,
                        	"callCmpnMdl": callCmpnMdl,
                            "storeCode": storeCode,
                            "operName": operName,
                            "operCode": operCode,
                            "storeName": storeName,
                            "rsvSaleRecvHpno": phoneNo,
                    };
                    
                    $.ajax({
                        url: "/watch/preOrderStore/openApplyModal"
                        , type: "POST"
                        , data: params
                        , cache: false
                        , success: function (data) {
                            $("#storeOrder_optBox_watch").html(data);
                            PreorderWatchCtrl.close();
                            PreorderStoreApplyWatchCtrl.open();
                        }, error: function () {
                            alert("오류가 발생하였습니다.");
                        }
                    });
                } else {
                    alert('매장을 선택하세요 ');
                }
            }
        },
        /*
        searchAddressToCoordinate: function (address) {

            naver.maps.onJSContentLoaded = this.initGeocoder;
            naver.maps.Event.once(map, 'init_stylemap', this.initGeocoder);

            naver.maps.Service.geocode({
                query: address
            }, function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('totalCount' + response.v2.meta.totalCount);
                }

                const htmlAddresses = [],
                    item = response.v2.addresses[0],
                    point = new naver.maps.Point(item.x, item.y);

                if (item.roadAddress) {
                    htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                }

                $("#map").show();

                const map = new naver.maps.Map("map", {
                    useStyleMap: true,
                    center: new naver.maps.LatLng(point),
                    zoom: 15,
                    minZoom: 6,
                    zoomControl: true,
                    scroolWheel: true,

                    // 줌 컨트롤 오른쪽 위로 위치 설정
                    zoomControlOptions: {
                        position: naver.maps.Position.TOP_RIGHT // 오른쪽 위로 설정
                    },

                    // 일반ㆍ위성 지도보기 컨트롤 표시, 지정하지 않으면 false 가 기본값
                    mapTypeControl: true
                });

                const markerOptions = {
                    position: new naver.maps.LatLng(point),
                    map: map,
                    icon: {
                        url: '../mobile/img/common/apimap_icon_uplus.png',
                        anchor: new naver.maps.Point(0, 0)
                    }
                };
                const marker = new naver.maps.Marker(markerOptions);
            });
        },
        initGeocoder: function () {
            if (!map.isStyleMapReady) {
                return;
            }
        },
        */
        checkPage: function (page, searchParam) {
        	this.deleteSelectStore();
            if (searchParam === 'searchKeyword') {
                this.searchStore(page);
            } else {
                this.selectAddress3(page);
            }
        }
		

	}
	
})();	
