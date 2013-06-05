$(document).ready(function(){
	var hash = window.location.hash;
	var map_loaded = false;
	
	if (hash) {
		$("#nav .nav a[href='"+hash+"']").trigger("click");
	}
	
	$("#front-slide").carousel('cycle');

	$("#nav-container").affix({offset: {top : setAffix}});
	
	$("#nav .nav").on("shown", function(e){
		var pos = $($(e.target).attr("href")).position().top - 50;
		$("html, body").animate({scrollTop: pos}, 300);
		
		if (!map_loaded && $(e.target).attr("href") == "#info") {
			$("#map").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps/ms?t=m&amp;msa=0&amp;msid=213480164619931622304.0004dcb02d7385eac6315&amp;source=embed&amp;ie=UTF8&amp;ll=40.51928,-74.347143&amp;spn=0.027861,0.045748&amp;z=14&amp;output=embed"></iframe>');
			map_loaded = true;
		}
	});
	
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
			
			$("body").css("margin-top", 48);
			$("#badbrowser").show().find(".ie8").show();
		} else if ($.browser.version < 8) {
			$("#badbrowser .ie7").show();
			$("#badbrowser").show().siblings().hide();
		}
	}
	
	
});

var setAffix = function() {
	var width = $(window).width(); // screen width
	var offset; // amount to offset the top by
	
	if (width > 767)
		offset = 160;
	else if (width > 600)
		offset = 125;
	else
		offset = 100;
	
	return offset;
};
