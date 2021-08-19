$('document').ready(function(){
	$(".next2 , .next3, .next4").animate({
		opacity: 0,
		left: "+=50",
	}, 10);
	$(".prev2, .prev3, .prev4").animate({
		opacity: 0,
		left: "-=50",
	}, 10);

	$(".arrowswiper2").hover( function() {
		$(".next2").animate({
			opacity: 1,
			left: "-=50",
		}, 400);

		$(".prev2").animate({
			opacity: 1,
			left: "+=50",
		}, 400);


	},  function() {
		$(".next2").animate({
			opacity: 0,
			left: "+=50",
		}, 400);

		$(".prev2").animate({
			opacity: 0,
			left: "-=50",
		}, 400);

	} );

	$(".arrowswiper3").hover( function() {
		$(".next3").animate({
			opacity: 1,
			left: "-=50",
		}, 400);

		$(".prev3").animate({
			opacity: 1,
			left: "+=50",
		}, 400);


	},  function() {
		$(".next3").animate({
			opacity: 0,
			left: "+=50",
		}, 400);

		$(".prev3").animate({
			opacity: 0,
			left: "-=50",
		}, 400);

	} );


	$(".arrowswiper4").hover( function() {
		$(".next4").animate({
			opacity: 1,
			left: "-=50",
		}, 400);

		$(".prev4").animate({
			opacity: 1,
			left: "+=50",
		}, 400);


	},  function() {
		$(".next4").animate({
			opacity: 0,
			left: "+=50",
		}, 400);

		$(".prev4").animate({
			opacity: 0,
			left: "-=50",
		}, 400);

	} );
});

	var swiper1 = new Swiper('.swiper1', {
      effect: 'coverflow',
      grabCursor: true,
      loop:false,
      centeredSlides: true,
      initialSlide:1,
      setWrapperSize:true,
      spaceBetween:30,
      slidesPerView:'auto',
      coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination1',
      },
	});

    var swiper2 = new Swiper('.swiper2', {
		grabCursor: true,
      loop:true,
      centeredSlides: true,
      initialSlide:5,
      setWrapperSize:true,
	  spaceBetween:7,
	  slidesPerView:'5',
	  breakpoints: {
		480: {
		  slidesPerView: 2,
		},
		640: {
		  slidesPerView: 3,
		},
		760: {
			slidesPerView: 4,
		},
	  },
      navigation: {
        nextEl: '.next2',
		prevEl: '.prev2',
		hiddenClass: 'swiper-button-hidden',
      },
    });

    function app2(){
    for (var i=0 ; i<8 ; i++){
        debugger;
        swiper2.appendSlide(`
		<div class="swiper-slide" style="background-image:url(./content/begomercicont/img/Hair_Cosmetic.jpg)">
		<div class="jadid">
		  <span>جدید
			<span>
		</div>
		<div class="dec">
		  <span class="title">محصول شماره یک</span>
		  <span class="desc">
			<div class="row" style="margin-top:-10px;">
			  <div class="col-xs-9">
				<del>19,000,000</del>
				<span class="price">20,000,000
				  <span style="margin-right: -58px;">
					<i style="font-size:xx-small;float:left; margin-right:5px;">تومان</i>
			  </div>
			  <div class="col-xs-3">
			  <a class="cart"></a>
			  </div>
			</div>
			</span>
		</div>
		</div>`);
    }
    }
	app2();


    var swiper3 = new Swiper('.swiper3', {
		grabCursor: true,
      loop:true,
      centeredSlides: true,
      initialSlide:5,
      setWrapperSize:true,
	  spaceBetween:7,
	  slidesPerView:'5',
	  breakpoints: {
		480: {
		  slidesPerView: 2,
		},
		640: {
		  slidesPerView: 3,
		},
		760: {
			slidesPerView: 4,
		},
	  },
      navigation: {
        nextEl: '.next3',
        prevEl: '.prev3',
      },
    });

    function app3(){
    for (var i=0 ; i<8 ; i++){
		swiper3.appendSlide(`
		<div class="swiper-slide" style="background-image:url(./content/begomercicont/img/Hair_Cosmetic.jpg)">
		<div class="jadid">
		  <span>جدید
			<span>
		</div>
		<div class="dec">
		  <span class="title">محصول شماره یک</span>
		  <span class="desc">
			<div class="row" style="margin-top:-10px;">
			  <div class="col-xs-9">
				<del>19,000,000</del>
				<span class="price">20,000,000
				  <span style="margin-right: -58px;">
					<i style="font-size:xx-small;float:left; margin-right:5px;">تومان</i>
			  </div>
			  <div class="col-xs-3">
			  <a class="cart"></a>
			  </div>
			</div>
			</span>
		</div>
		</div>`);
    }
    }
	app3();



    var swiper4 = new Swiper('.swiper4', {
		grabCursor: true,
      loop:true,
      centeredSlides: true,
      initialSlide:5,
      setWrapperSize:true,
	  spaceBetween:7,
	  slidesPerView:'5',
	  breakpoints: {
		480: {
		  slidesPerView: 2,
		},
		640: {
		  slidesPerView: 3,
		},
		760: {
			slidesPerView: 4,
		},
	  },
      navigation: {
        nextEl: '.next4',
        prevEl: '.prev4',
      },
    });

    function app4(){
    for (var i=0 ; i<8 ; i++){
        debugger;
        swiper4.appendSlide(`
		<div class="swiper-slide" style="background-image:url(./content/begomercicont/img/Hair_Cosmetic.jpg)">
		<div class="jadid">
		  <span>جدید
			<span>
		</div>
		<div class="dec">
		  <span class="title">محصول شماره یک</span>
		  <span class="desc">
			<div class="row" style="margin-top:-10px;">
			  <div class="col-xs-9">
				<del>19,000,000</del>
				<span class="price">20,000,000
				  <span style="margin-right: -58px;">
					<i style="font-size:xx-small;float:left; margin-right:5px;">تومان</i>
			  </div>
			  <div class="col-xs-3">
			  <a class="cart"></a>
			  </div>
			</div>
			</span>
		</div>
		</div>`);
    }
    }
	app4();





var sec	;
var min	;
var hour;
var day	;
var year;
var date1;
$(document).ready(function() {


setTimeout(function(){
			sec		= royalCountdown0.second;
			min		= royalCountdown0.minute;
			hour	= royalCountdown0.hour;
			day		= royalCountdown0.day;
			mounth	= royalCountdown0.month - 1;
			year	= royalCountdown0.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count0parent .nbackinfo").css("display", "block");
			$("#count0parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown0.container).html("");
			royalCountdown0.bgColor = "red";
			royalCountdown0.digitColor = "white";
			royalCountdown0.isDynamicColor = false;
			royalCountdown0.Start();}


			sec		= royalCountdown1.second;
			min		= royalCountdown1.minute;
			hour	= royalCountdown1.hour;
			day		= royalCountdown1.day;
			mounth	= royalCountdown1.month - 1;
			year	= royalCountdown1.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count1parent .nbackinfo").css("display", "block");
			$("#count1parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown1.container).html("");
			royalCountdown1.bgColor = "red";
			royalCountdown1.digitColor = "white";
			royalCountdown1.isDynamicColor = false;
			royalCountdown1.Start();}


			sec		= royalCountdown2.second;
			min		= royalCountdown2.minute;
			hour	= royalCountdown2.hour;
			day		= royalCountdown2.day;
			mounth	= royalCountdown2.month - 1;
			year	= royalCountdown2.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count2parent .nbackinfo").css("display", "block");
			$("#count2parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown2.container).html("");
			royalCountdown2.bgColor = "red";
			royalCountdown2.digitColor = "white";
			royalCountdown2.isDynamicColor = false;
			royalCountdown2.Start();}


			sec		= royalCountdown3.second;
			min		= royalCountdown3.minute;
			hour	= royalCountdown3.hour;
			day		= royalCountdown3.day;
			mounth	= royalCountdown3.month - 1;
			year	= royalCountdown3.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count3parent .nbackinfo").css("display", "block");
			$("#count3parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown3.container).html("");
			royalCountdown3.bgColor = "red";
			royalCountdown3.digitColor = "white";
			royalCountdown3.isDynamicColor = false;
			royalCountdown3.Start();}


			sec		= royalCountdown4.second;
			min		= royalCountdown4.minute;
			hour	= royalCountdown4.hour;
			day		= royalCountdown4.day;
			mounth	= royalCountdown4.month - 1;
			year	= royalCountdown4.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count4parent .nbackinfo").css("display", "block");
			$("#count4parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown4.container).html("");
			royalCountdown4.bgColor = "red";
			royalCountdown4.digitColor = "white";
			royalCountdown4.isDynamicColor = false;
			royalCountdown4.Start();}

},10)


setInterval(function (){
	sec		= royalCountdown0.second;
			min		= royalCountdown0.minute;
			hour	= royalCountdown0.hour;
			day		= royalCountdown0.day;
			mounth	= royalCountdown0.month - 1;
			year	= royalCountdown0.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count0parent .nbackinfo").css("display", "block");
			$("#count0parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown0.container).html("");
			royalCountdown0.bgColor = "red";
			royalCountdown0.digitColor = "white";
			royalCountdown0.isDynamicColor = false;
			royalCountdown0.Start();}


			sec		= royalCountdown1.second;
			min		= royalCountdown1.minute;
			hour	= royalCountdown1.hour;
			day		= royalCountdown1.day;
			mounth	= royalCountdown1.month - 1;
			year	= royalCountdown1.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count1parent .nbackinfo").css("display", "block");
			$("#count1parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown1.container).html("");
			royalCountdown1.bgColor = "red";
			royalCountdown1.digitColor = "white";
			royalCountdown1.isDynamicColor = false;
			royalCountdown1.Start();}


			sec		= royalCountdown2.second;
			min		= royalCountdown2.minute;
			hour	= royalCountdown2.hour;
			day		= royalCountdown2.day;
			mounth	= royalCountdown2.month - 1;
			year	= royalCountdown2.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count2parent .nbackinfo").css("display", "block");
			$("#count2parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown2.container).html("");
			royalCountdown2.bgColor = "red";
			royalCountdown2.digitColor = "white";
			royalCountdown2.isDynamicColor = false;
			royalCountdown2.Start();}


			sec		= royalCountdown3.second;
			min		= royalCountdown3.minute;
			hour	= royalCountdown3.hour;
			day		= royalCountdown3.day;
			mounth	= royalCountdown3.month - 1;
			year	= royalCountdown3.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count3parent .nbackinfo").css("display", "block");
			$("#count3parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown3.container).html("");
			royalCountdown3.bgColor = "red";
			royalCountdown3.digitColor = "white";
			royalCountdown3.isDynamicColor = false;
			royalCountdown3.Start();}


			sec		= royalCountdown4.second;
			min		= royalCountdown4.minute;
			hour	= royalCountdown4.hour;
			day		= royalCountdown4.day;
			mounth	= royalCountdown4.month - 1;
			year	= royalCountdown4.year;
			date1 = new Date(year,mounth,day,hour,min,sec);
			var date2 = new Date();
			var diff = date1-date2;
			if (diff<0){
        	$("#count4parent .nbackinfo").css("display", "block");
			$("#count4parent .backinfo").css("display", "none");
      		}
			else if (diff<3600000){
			$(royalCountdown4.container).html("");
			royalCountdown4.bgColor = "red";
			royalCountdown4.digitColor = "white";
			royalCountdown4.isDynamicColor = false;
			royalCountdown4.Start();}

},20000)



});