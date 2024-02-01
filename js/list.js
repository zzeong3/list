var $wrap = $('#list');
var url_list = 'data/list.json';
var iso;
var url = url_list;

//처음 로딩시 interest 이미지 출력
call_data(url);

//데이타 호출함수
function call_data(url) {
	$.ajax({
		url: url,
		dataType: 'json',
		data: {
			format: 'json',
			nojsoncallback: 1,
		},
	})
		.success(function (data) {
			create_dom(data);
		})
		.error(function () {
			alert('Fail to Load Data!!!');
		});
}

//DOM 생성함수
function create_dom(data) {
	$wrap.parent().removeClass('on');
	$wrap.empty();

	var item = data.data;
	//console.log(item);

	$(item).each(function () {
		var img = 'images/portfolio/' + this.img + '.png';
		var category = this.category;
		var tit = this.tit;
		var link = this.link;
		var period = this.period;
		var persent = this.persent;
		var tags = this.tags;
		var desc = this.desc;

		$wrap.append(
			$('<li class="item">').append(
				$('<div class="inner">').append(
					$('<a class="thumb" target="_blank" title="새창으로 페이지 이동">')
						.attr({ href: link })
						.append($('<span class="inner_thumb">').append($('<img>').attr({ src: img }))),
					$('<dl class="list_item">').append(
						$('<dt class="screen_out">').text('프로젝트명'),
						$('<dd class="name">').append(
							$('<a target="_blank" title="새창으로 페이지 이동">').attr({ href: link }).append($('<span class="txt_category">').text(category), $('<span class="txt_tit">').text(tit))
						),
						$('<dt class="screen_out">').text('프로젝트 진행기간'),
						$('<dd class="period">').text(period),
						$('<dt class="txt_persent">').text('참여도'),
						$('<dd class="num_persent">').text(persent),
						$('<dt class="screen_out">').text('관련태그'),
						$('<dd class="tag">').text(tags),
						$('<dt class="screen_out">').text('프로젝트 설명'),
						$('<dd class="desc">').append(
							$('<div class="cont_desc">').append(
								$('<div class="inner_desc">')
									.html(desc.replace(/\n/g, '<br>'))
									.append(
										$('<button type="button" class="btn_close">')
											.on('click', function () {
												$(this).closest('.item').removeClass('active');
											})
											.append($('<span class="screen_out">').text('프로젝트 상세설명 닫기'))
									)
							)
						)
					),
					$('<button type="button" class="btn_detail">')
						.on('click', function () {
							$('.item').removeClass('active');
							$(this).closest('.item').addClass('active');
						})
						.append($('<span class="screen_out">').text('프로젝트 상세설명'))
				)
			)
		); //$wrap append ends

		setTimeout(function () {
			iso_layout('#list');

			setTimeout(function () {
				$wrap.parent().addClass('on');
			}, 300);
		}, 300);
	});
}

//isotope 함수
function iso_layout(target) {
	iso = new Isotope(target, {
		itemSelector: '.item',
		columnWidth: '.item',
		transitionDuration: '0.8s',
		percentPosition: true,
	});
}
