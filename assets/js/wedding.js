$(document).ready(function(){
	var hash = window.location.hash;
	
	if (hash) {
		$("#nav .nav a[href='"+hash+"']").trigger("click");
	}
	
	$("#front-slide").carousel('cycle');

	$("#nav-container").affix({offset: {top : setAffix}});
	
	$("#nav .nav").on("shown", function(e){
		var pos = $($(e.target).attr("href")).position().top - 50;
		$("html, body").animate({scrollTop: pos}, 300);
	});
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
