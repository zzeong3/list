rotate = function(images){
  $(function(){
    $.each(images, function(i,v){
      $('.rotatebox.type1 .images').append('<img src="' + v + '" data-nth="' + i + '" />');
    });
    $('.rotatebox.type1 .images img').css({'z-index':'1', 'display':'none'});
    $('.rotatebox.type1 .images img').first().css({'z-index':'2', 'display':'block'});
    $('.rotatebox.type1 .slider').slider({
      min: 0,
      max: images.length,
      value: 0,
      slide: function(evt, ui){
        target = ui.value % images.length;
        $('.rotatebox.type1 .images img').css({'z-index':'1', 'display':'none'});
        $('.rotatebox.type1 .images img[data-nth=' + target + ']').css({'z-index':'2', 'display':'block'});
      },
    });
  });
};

rotate2 = function(images){
	  $(function(){
	    $.each(images, function(i,v){
	      $('.rotatebox.type2 .images').append('<img src="' + v + '" data-nth="' + i + '" />');
	    });
	    $('.rotatebox.type2 .images img').css({'z-index':'1', 'display':'none'});
	    $('.rotatebox.type2 .images img').first().css({'z-index':'2', 'display':'block'});
	    $('.rotatebox.type2 .slider').slider({
	      min: 0,
	      max: images.length,
	      value: 0,
	      slide: function(evt, ui){
	        target = ui.value % images.length;
	        $('.rotatebox.type2 .images img').css({'z-index':'1', 'display':'none'});
	        $('.rotatebox.type2 .images img[data-nth=' + target + ']').css({'z-index':'2', 'display':'block'});
	      },
	    });
	  });
	};

rotate3 = function(images){
	  $(function(){
	    $.each(images, function(i,v){
	      $('.rotatebox.type3 .images').append('<img src="' + v + '" data-nth="' + i + '" />');
	    });
	    $('.rotatebox.type3 .images img').css({'z-index':'1', 'display':'none'});
	    $('.rotatebox.type3 .images img').first().css({'z-index':'2', 'display':'block'});
	    $('.rotatebox.type3 .slider').slider({
	      min: 0,
	      max: images.length,
	      value: 0,
	      slide: function(evt, ui){
	        target = ui.value % images.length;
	        $('.rotatebox.type3 .images img').css({'z-index':'1', 'display':'none'});
	        $('.rotatebox.type3 .images img[data-nth=' + target + ']').css({'z-index':'2', 'display':'block'});
	      },
	    });
	  });
	};