var $wrap = $('#list');
var url_list = 'data/list.json';
var iso;
var url = url_list;


//처음 로딩시 interest 이미지 출력
call_data(url);


//검색 버튼 클릭시 검색어를 넣어서 검색 이미지 출력
$('.btnSearch').on('click',function(e){
    e.preventDefault();
    url = url_list;
    tags = $('#search').val();
    page_num = 1;

    $('.paging a').removeClass('on');
    $('.paging a').eq(0).addClass('on');

    call_data(url);
});


//페이징 버튼 클릭시
$('.paging a').on('click',function(e){
    e.preventDefault();

    page_num = $(this).index()+1;
    call_data(url);

    $('.paging a').removeClass('on');
    $(this).addClass('on');
})


//데이타 호출함수
function call_data(url){
    $.ajax({
        url : url,
        dataType : 'json',
        data : {
            format : 'json',
            nojsoncallback : 1
        }
    })
    .success(function(data){     
        create_dom(data);
    })
    .error(function(){
        alert('Fail to Load Data!!!');
    });
}


//DOM 생성함수
function create_dom(data){
    $wrap.parent().removeClass('on');
    $wrap.empty();

    var item = data.data;
    //console.log(item);

    $(item).each(function(){
        var img = '../images/portfolio/'+this.img+'.png';
        var category = this.category;
        var tit = this.tit;
        var link = this.link;
        var period = this.period;
        var persent = this.persent;
        var tags = this.tags;
        var desc = this.desc;
    
    
        $wrap
            .append(
                $('<li class="item">')
                    .append(
                        $('<div class="inner">')
                            .append(
                                $('<a target="_blank" class="thumb" title="새창으로 페이지 이동">').attr({ href : link })
                                .append(
                                    $('<span class="inner_thumb">')
                                    .append(
                                        $('<img>').attr({ src : img })
                                    )
                                ),
                                $('<dl class="list_item">')
                                    .append(
                                        $('<dt class="screen_out">').text('프로젝트명'),
                                        $('<dd class="name">')
                                            .append(
                                                $('<a target="_blank" title="새창으로 페이지 이동">').attr({ href : link })
                                                    .append(
                                                        $('<span class="txt_category">').text(category),
                                                        $('<span class="txt_tit">').text(tit),
                                                    )
                                            ),
                                        $('<dt class="screen_out">').text('프로젝트 진행기간'),
                                        $('<dd class="period">').text(period),
                                        $('<dt class="txt_persent">').text('참여도'),
                                        $('<dd class="num_persent">').text(persent),
                                        $('<dt class="screen_out">').text('관련태그'),
                                        $('<dd class="tag">').text(tags),
                                        $('<dt class="screen_out">').text('프로젝트 설명'),
                                        $('<dd class="desc">').text(desc),
                                    )    
                            )
                    )
            );//$wrap append ends

        setTimeout(function(){
            iso_layout('#list'); 

            setTimeout(function(){
                $wrap.parent().addClass('on');
            },300);
        },300);  
        
    }); 
}

//isotope 함수
function iso_layout(target){
    iso = new Isotope( target, {     
        itemSelector: '.item'  ,
        columnWidth :  '.item',
        transitionDuration: '0.8s',
        percentPosition : true               
    }); 
}
