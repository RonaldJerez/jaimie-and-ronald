var affix_desktop = 160;

$(document).ready(function(){
	var hash = window.location.hash;
	var map_loaded = false;
	
	if (hash) {
		$("#nav .nav a[href='"+hash+"']").trigger("click");
	}
	
	$("#nav .nav").on("shown", function(e){
		var target = $(e.target).attr("href");
		var pos = $(target).position().top - 50;
		
		$("html, body").animate({scrollTop: pos}, 300);
		
		// analytics tracking
		ga("send", "event", {"eventCategory": "Section View", "eventAction": target.substring(1)});
		
		if (!map_loaded && target == "#info") {
			$("#map").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps/ms?t=m&amp;msa=0&amp;msid=213480164619931622304.0004dcb02d7385eac6315&amp;source=embed&amp;ie=UTF8&amp;ll=40.51928,-74.347143&amp;spn=0.027861,0.045748&amp;z=14&amp;output=embed"></iframe>');
			map_loaded = true;
		}
	});
	
	/*$(".photo").on("click", function(){
		
	});*/

	
	// internet explorer always causing trouble
	if ($.browser.msie) {
		if ($.browser.version == 8) {
			$(".accordion-toggle").on("click", function(e){
				var target = $($(this).attr("href"));
				
				if (target.is("in"))
					target.removeClass("in").hide();
				else
					target.addClass("in").show();
			});
			
			// move everything down to accomodate the info bar
			affix_desktop = 160;
			$("body").css("margin-top", 40);
			
			$("#badbrowser").show().find(".ie8").show();
		} else if ($.browser.version < 8) {
			$("#badbrowser .ie7").show();
			$("#badbrowser").show().siblings().hide();
		}
	}
	
	$("#front-slide").carousel('cycle');
	$("#nav-container").affix({offset: {top : setAffix}});
	
}).on("viewphoto", function(e, data){
	// tracking photo view
	var info = data.split("/");
	ga("send", "event", {"eventCategory": "Photo View", "eventAction": info[1], "eventLabel": info[2]});
});

var setAffix = function() {
	var width = $(window).width(); // screen width
	var offset; // amount to offset the top by
	
	if (width > 767)
		offset = affix_desktop;
	else if (width > 600)
		offset = 125;
	else
		offset = 100;
	
	return offset;
};
