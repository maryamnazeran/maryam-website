var autoSelect = function(){
	var currentURL = window.location;
	var selectOpacity = 1;
	if(currentURL.hash == "#Gallery"){
		$("#sectionGallery").css("opacity", 1);
		gotoPage((905 + 435), 'sectionGallery', selectOpacity);
	}else if(currentURL.hash == "#Services"){
		$("#sectionServices").css("opacity", 1);
		gotoPage((1810 + 870), 'sectionServices', selectOpacity);
	}else if(currentURL.hash == "#Contact"){
		$("#sectionContact").css("opacity", 1);
		gotoPage((2720 + 1320), 'sectionContact', selectOpacity);
	}else{
		$("#sectionHome").css("opacity", 1);
		gotoPage(0, 'sectionHome', selectOpacity);
	}
	
}
var gotoPage = function(marginLeft, liID, opacity){
	$('#caruselWrapper').animate({
		scrollLeft : marginLeft
	},  850, 'easeInOutExpo', function(){
		$("#" + liID). animate({opacity: opacity}, 200);
		//hack fix all
		$(".bigCarusel li").css("opacity", 1);
	});                
	
	return false;
}

var initLayouts = function(){
	// adjust width fake :D // stupid thing
	var tempWidth = (($("body").width() - 850) / 2) - 50;
	$("#sectionfake").width(tempWidth);
}

var servicesSlide = function(moveTo){
	
	$('.contentTextSlide').stop().animate({
		scrollTop : moveTo
	},  350, 'easeInOutExpo', function(){
		
	});
}


jQuery(document).ready(function(){

	$('.nav').click(function () {
		var moveTo = 0;
		var stepSize = 795;
		var direction = $(this).attr('class').replace("nav ", "");
		var currentPage = $(this).parent().parent().css('height','100%');
		var currentPos = currentPage.find('.galleryCarusel').scrollLeft();
		var limitSize = ((currentPage.find(".imgSlideshow").size() / 3) * stepSize) - stepSize;
		
		if(direction == 'next'){
			if(currentPos < limitSize){
				moveTo = currentPos + stepSize;
			}else{
				moveTo = 0;
			}
		} else if(direction == 'prev'){
			if(currentPos > 0){
				moveTo = currentPos - stepSize;
			}else{
				moveTo = 0;
			}
		}
		
		currentPage.find('.galleryCarusel').stop().animate({
			scrollLeft : moveTo
		},  350, 'easeInOutExpo', function(){
			
		});
		
	});

});



function str_replace (search, replace, subject, count) {
    var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
            f = [].concat(search),
            r = [].concat(replace),
            s = subject,
            ra = r instanceof Array, sa = s instanceof Array;
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i=0, sl=s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j=0, fl=f.length; j < fl; j++) {
            temp = s[i]+'';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length-s[i].length)/f[j].length;}
        }
    }
    return sa ? s : s[0];
}

var currentShow = '';
var currentClasa = '';
var caruselFilter = function(clasa){
	$(".imgSlideshow").css('display', 'none');
	currentClasa = clasa;
	currentShow += "," + clasa;
	$(currentShow).css('display', 'block');
	
	$(".galleryMenu").animate({
		opacity : 0,
		bottom: '150px'
	}, {duration: 300, easing: 'easeOutBack'});
}

$(window).resize(function() {
	initLayouts();
});

$(document).ready(function(){
						   
	$(".bigCarusel li").css("opacity", 1);
	initLayouts();
	autoSelect();
	var clickOpacity = 1;
	
	$(".galleryMenu").css('opacity', 0);
	$(".categoriesBtn").click(function(){
		if($(".galleryMenu").css('opacity') == 0){
			$(".galleryMenu").animate({
				opacity : 1,
				bottom: '160px'
			}, {duration: 400, easing: 'easeOutBack'});
		}else{
			$(".galleryMenu").animate({
				opacity : 0,
				bottom: '150px'
			}, {duration: 400, easing: 'easeOutBack'});
		}
		return;
	});
	
	$("a.galleryLightbox").fancybox({
		'titleShow'     : true,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic'
	});
	
	$('.galleryMenu-row').click(function(){
		if($(this).find(".checkbox").hasClass('checkboxSelected')){
			$(this).find(".checkbox").removeClass('checkboxSelected');
			$(this).find(".checkbox").css('background-position', '0px -19px');
			var temcurrentShow = str_replace("," + currentClasa, "", currentShow);
			$(".imgSlideshow").css('display', 'block');
			//$(temcurrentShow).css('display', 'block');
		}
		$(this).find(".checkbox").addClass('checkboxSelected');
	});	
	
	$('.menuservices ul li').click(function(){
		$(".menuservices a").removeClass('selected');
		$(this).find("a").addClass('selected').css('position','relative');
	});
	
	$('#btnHome').click(function(){
		gotoPage(0, 'sectionHome', clickOpacity);
	});
	$('#btnGallery').click(function(){
		gotoPage((905 + 435), 'sectionGallery', clickOpacity);
	});
	$('#btnServices').click(function(){
		gotoPage((1810 + 870), 'sectionServices', clickOpacity);
	});
	$('#btnContact').click(function(){
		gotoPage((2720 + 1320), 'sectionContact', 1);
	});
}); 