/*
Template:  		Quickai HTML5 Template
Written by: 	Harnish Design - (http://www.harnishdesign.net)
*/

(function ($) {
	"use strict";

	// Preloader
	$(window).on('load', function () {
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(333);
	});

	/*---------------------------------------------------
		Primary Menu
	----------------------------------------------------- */

	// Dropdown show on hover
	$('.primary-menu ul.navbar-nav li.dropdown, .login-signup ul.navbar-nav li.dropdown').on("mouseover", function () {
		if ($(window).width() > 991) {
			$(this).find('> .dropdown-menu').stop().slideDown('fast');
			$(this).bind('mouseleave', function () {
				$(this).find('> .dropdown-menu').stop().css('display', 'none');
			});
		}
	});

	// When dropdown going off to the out of the screen.
	$('.primary-menu .dropdown-menu, .login-signup .dropdown-menu').each(function () {
		var menu = $('#header .header-row').offset();
		var dropdown = $(this).parent().offset();
		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#header .header-row').outerWidth());
		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 5) + 'px');
		}
	});
	$(function () {
		$(".dropdown li").on('mouseenter mouseleave', function (e) {
			if ($(window).width() > 991) {
				var elm = $('.dropdown-menu', this);
				var off = elm.offset();
				var l = off.left;
				var w = elm.width();
				var docW = $(window).width();
				var isEntirelyVisible = (l + w + 30 <= docW);
				if (!isEntirelyVisible) {
					$(elm).addClass('dropdown-menu-right');
					$(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').addClass('arrow-right');
				} else {
					$(elm).removeClass('dropdown-menu-right');
					$(elm).parents('.dropdown:first').find('> a.dropdown-toggle > .arrow').removeClass('arrow-right');
				}
			}
		});
	});

	// Mobile Collapse Nav
	$('.primary-menu .dropdown-toggle[href="#"], .primary-menu .dropdown-toggle[href!="#"] .arrow, .login-signup .dropdown-toggle[href="#"], .login-signup .dropdown-toggle[href!="#"] .arrow').on('click', function (e) {
		if ($(window).width() < 991) {
			e.preventDefault();
			var $parentli = $(this).closest('li');
			$parentli.siblings('li').find('.dropdown-menu:visible').slideUp();
			$parentli.find('> .dropdown-menu').stop().slideToggle();
			$parentli.siblings('li').find('a .arrow.open').toggleClass('open');
			$parentli.find('> a .arrow').toggleClass('open');
		}
	});

	// DropDown Arrow
	$('.primary-menu, .login-signup').find('a.dropdown-toggle').append($('<i />').addClass('arrow'));

	// Mobile Menu Button Icon
	$('.navbar-toggler').on('click', function () {
		$(this).toggleClass('open');
	});


	// OTP Form (Focusing on next input)
	$("#otp-screen .form-control").keyup(function () {
		if (this.value.length == 0) {
			$(this).blur().parent().prev().children('.form-control').focus();
		}
		else if (this.value.length == this.maxLength) {
			$(this).blur().parent().next().children('.form-control').focus();
		}
	});

	/*---------------------------------------------
		Booking (Flights, Train, Bus, Hotels, )
	---------------------------------------------- */

	/* Flights Travellers and Class */
	$('#flightTravellersClass').on('click', function () {
		$('.travellers-dropdown').slideToggle('fast');
		/* Change value of Travellers and Class */
		$('.qty-spinner, .flight-class').on('change', function () {
			var ids = ['flightAdult', 'flightChildren', 'flightInfants'];
			var totalCount = ids.reduce(function (prev, id) {
				return parseInt($('#' + id + '-travellers').val()) + prev
			}, 0);
			var fc = $('input[name="flight-class"]:checked  + label').text();
			$('#flightTravellersClass').val(totalCount + ' - ' + fc);
		}).trigger('change');
	});

	/* Trains Travellers and Class */
	$('#trainTravellersClass').on('click', function () {
		$('.travellers-dropdown').slideToggle('fast');
		/* Change value of Travellers and Class */
		$('.qty-spinner, #train-class').on('change', function () {
			var ids = ['trainAdult', 'trainChildren', 'trainInfants'];
			var totalCount = ids.reduce(function (prev, id) {
				return parseInt($('#' + id + '-travellers').val()) + prev
			}, 0);
			var fc = $('#train-class option:selected').text();

			$('#trainTravellersClass').val(totalCount + ' - ' + fc);
		}).trigger('change');
	});

	/* Bus Seats */
	$('#busTravellersClass').on('click', function () {
		$('.travellers-dropdown').slideToggle('fast');
		/* Change value of Seats */
		$('.qty-spinner').on('change', function () {
			var ids = ['adult'];
			var totalCount = ids.reduce(function (prev, id) {
				return parseInt($('#' + id + '-travellers').val()) + prev
			}, 0);

			$('#busTravellersClass').val(totalCount + '  ' + 'Seats');
		}).trigger('change');
	});

	/* Hotels People / Rooms */
	$('#hotelsTravellersClass').on('click', function () {
		$('.travellers-dropdown').slideToggle('fast');
		/* Change value of People */
		$('.qty-spinner').on('change', function () {
			var ids = ['adult', 'children'];
			var totalCount = ids.reduce(function (prev, id) {
				return parseInt($('#' + id + '-travellers').val()) + prev
			}, 0) + ' ' + 'People';

			var idsRoom = ['hotels-rooms'];
			var totalCountRoom = idsRoom.reduce(function (prev, id) {
				return parseInt($('#hotels-rooms').val()) + prev
			}, 0) + ' ' + 'Room';

			$('#hotelsTravellersClass').val(totalCountRoom + ' / ' + totalCount);
		}).trigger('change');
	});

	/* Hide dropdown when clicking outside */
	$(document).on('click', function (event) {
		if (!$(event.target).closest(".travellers-class").length) {
			$(".travellers-dropdown").hide();
		}

		/* Hide dropdown when clicking on Done Button */
		$('.submit-done').on('click', function () {
			$('.travellers-dropdown').fadeOut(function () {
				$(this).hide();
			});
		});
	});

	/*---------------------------------------------------
	   Carousel (Owl Carousel)
	----------------------------------------------------- */
	$(".owl-carousel").each(function (index) {
		var a = $(this);
		$(this).owlCarousel({
			autoplay: a.data('autoplay'),
			autoplayTimeout: a.data('autoplaytimeout'),
			autoplayHoverPause: a.data('autoplayhoverpause'),
			loop: a.data('loop'),
			speed: a.data('speed'),
			nav: a.data('nav'),
			dots: a.data('dots'),
			autoHeight: a.data('autoheight'),
			autoWidth: a.data('autowidth'),
			margin: a.data('margin'),
			stagePadding: a.data('stagepadding'),
			slideBy: a.data('slideby'),
			lazyLoad: a.data('lazyload'),
			navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			animateOut: a.data('animateout'),
			animateIn: a.data('animatein'),
			video: a.data('video'),
			items: a.data('items'),
			responsive: {
				0: { items: a.data('items-xs'), },
				576: { items: a.data('items-sm'), },
				768: { items: a.data('items-md'), },
				992: { items: a.data('items-lg'), }
			}
		});
	});

	// Fixed Bootstrap Multiple Modal Issue
	$('body').on('hidden.bs.modal', function () {
		if ($('.modal.show').length > 0) {
			$('body').addClass('modal-open');
		}
	});

	/*---------------------------------------------------
	   tooltips
	----------------------------------------------------- */
	$('[data-toggle=\'tooltip\']').tooltip({ container: 'body' });

	/*---------------------------------------------------
	   Scroll to top
	----------------------------------------------------- */
	$(function () {
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 150) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
	});
	$('#back-to-top').on("click", function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
		return false;
	});


	$('.smooth-scroll a').on("click", function () {
		var sectionTo = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(sectionTo).offset().top - 50
		}, 600);
	});


	$(function () {
		'use strict';
		// Easy Responsive Tabs
		$('#verticalTab').easyResponsiveTabs({
			type: 'vertical', //Types: default, vertical, accordion
		});
		// Autocomplete
		// $('#hotelsFrom,#flightFrom,#flightTo,#trainFrom,#trainTo,#busFrom,#busTo,#carsCity').autocomplete({
		// 	minLength: 3,
		// 	delay: 100,
		// 	source: function (request, response) {
		// 		$.getJSON(
		// 			'http://gd.geobytes.com/AutoCompleteCity?callback=?&q=' + request.term,
		// 			function (data) {
		// 				response(data);
		// 			}
		// 		);
		// 	},
		// });
		// Hotels Check In Date
		$('#hotelsCheckIn').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#hotelsCheckIn').val(chosen_date.format('MM-DD-YYYY'));
		});

		// Hotels Check Out Date
		$('#hotelsCheckOut').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#hotelsCheckOut').val(chosen_date.format('MM-DD-YYYY'));
		});

		// Flight Depart Date
		$('#flightDepart').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
			isBefore: function (date) {
				console.log(date);
			}
		}, function (chosen_date) {
			console.log(chosen_date);
			$('#flightDepart').val(chosen_date.format('DD/MM/YYYY'));
			$('#strflightDepart').val(chosen_date.format('YYYY-MM-DD'));
		});

		// $("#from, #to").datepicker({
		// 	//defaultDate: "+1w",
		// 	changeMonth: false,
		// 	dateFormat: "d M yy",
		// 	numberOfMonths: 1,
		// 	minDate: 0,
		// 	buttonImage: true,
		// 	buttonImageOnly: true,
		// 	beforeShow: function() {
		// 		$(".ui-datepicker-calendar .ui-state-default").each(function () {
		// 			//add custome text to date cell
		// 			console.log('w');
		// 			$(this).html($(this).html() + "<br> Rs 500");
		// 		});
		// 	}
		// });
		$("#from, #to").datepicker({
			changeMonth: false,
			dateFormat: "dd/mm/yy",
			numberOfMonths: 2,
			minDate: 0,
			buttonImage: true,
			buttonImageOnly: true,
			beforeShow: function () {
				if (this.id == 'to') {
					// debugger;
					var dateMin = $('#from').datepicker("getDate");
					var TodateMin = $('#to').datepicker("getDate");
					if (TodateMin === null) {
						TodateMin = dateMin;
					}

					var rMin = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 0); // Min Date = Selected + 1d
					var rMax = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 180); // Max Date = Selected + 62d
					var c_out_date = new Date(TodateMin.getFullYear(), TodateMin.getMonth(), TodateMin.getDate()); // Min Date = Selected + 1d
					$('#to').datepicker("option", "minDate", rMin);
					$('#to').datepicker("option", "maxDate", rMax);
					$('#to').datepicker("setDate", c_out_date);
					$('#strflightReturn').val($.datepicker.formatDate('yy-mm-dd', c_out_date));
					$('#roundtrip').prop('checked', true);
				}
			},
			onSelect: function (selectedDate, inst) {
				var tripType = $('.tripType:checked').val(); // retrieve the value
				if (this.id == 'from') {
					var dateMin = $('#from').datepicker("getDate");

					var rMin = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 0); // Min Date = Selected + 1d
					var rMax = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 180); // Max Date = Selected + 62d
					var c_out_date = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 0); // Min Date = Selected + 1d
					var theDate = new Date(Date.parse($(this).datepicker('getDate')));
					var dateFormatted = $.datepicker.formatDate('DD', theDate);
					var FromFormatted = $.datepicker.formatDate('yy-mm-dd', theDate);
					$('#strflightDepart').val(FromFormatted);
					if (parseInt(tripType) === 2) {
						$('#to').datepicker("option", "minDate", rMin);
						$('#to').datepicker("option", "maxDate", rMax);

						$('#to').datepicker("setDate", c_out_date);
						$('.Return').html(dateFormatted);

					}
				} else {
					var dateMin = $('#to').datepicker("getDate");
					var c_out_date = new Date(dateMin.getFullYear(), dateMin.getMonth(), dateMin.getDate() + 0);
					var theDate = new Date(Date.parse(c_out_date));
					var dateFormatted = $.datepicker.formatDate('DD', theDate);
					var ToFormatted = $.datepicker.formatDate('yy-mm-dd', theDate);
					$('#strflightReturn').val(ToFormatted);
				}


			}
		});
		$(document).on('click', '.tripType', function () {
			var tripType = $(this).val();
			if (tripType == 2) {
				var from = $('#from').val();
				var strflightDepart = $('#strflightDepart').val();
				$('#to').val(from);
				$('#strflightReturn').val(strflightDepart);
			}
		});

		// Flight Return Date
		$('#flightReturn').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: $('#strflightDepart').val(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#flightReturn').val(chosen_date.format('DD/MM/YYYY'));
			$('#strflightReturn').val(chosen_date.format('YYYY-MM-DD'));
		});

		// Train Depart Date
		$('#trainDepart').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#trainDepart').val(chosen_date.format('MM-DD-YYYY'));
		});

		// Bus Depart Date
		$('#busDepart').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#busDepart').val(chosen_date.format('MM-DD-YYYY'));
		});

		// Cars Pick up Date
		$('#carsPickup').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#carsPickup').val(chosen_date.format('MM-DD-YYYY'));

		});

		// Cars Drop-off Date
		$('#carsDropoff').daterangepicker({
			singleDatePicker: true,
			autoApply: true,
			minDate: moment(),
			autoUpdateInput: false,
		}, function (chosen_date) {
			$('#carsDropoff').val(chosen_date.format('MM-DD-YYYY'));
		});

	});

	$(".searchairport").autocomplete({
		source: SITEURL,
		minLength: 0,
		autoFocus: true,
		select: function (event, ui) {
			var index = $(this).attr('index');
			var value = ui.item.value;
			console.log(value);
			var dddd = value.split('-');
			ui.item.value = dddd[0] + ' - ' + ui.item.AirportCode + '';
			$("#airportcode_" + index).val(ui.item.AirportCode);
			if (ui.item.CountryCode !== 'IN') {
				$("#international").val(1);
			} else {
				$("#international").val(0);
			}
		},
	}).focus(function () {
		$(this).val('');
		$(this).autocomplete('search');
	});



	// $("#slider-range").slider({
	// 	range: true,
	// 	min: 0,
	// 	max: 1200,
	// 	values: [125, 980],
	// 	slide: function (event, ui) {
	// 		$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
	// 	}
	// });
	// $("#amount").val("$" + $("#slider-range").slider("values", 0) +
	// 	" - $" + $("#slider-range").slider("values", 1));




})(jQuery);

var app = angular.module('AppHolidayfly', ['ngSanitize']);

app.filter('capitalize', function () {
	return function (input) {
		return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
	}
});

app.controller('holidayflyCtrl', ['$scope', '$http', '$location', '$filter', '$window', function ($scope, $http) {
	var TraceId = $('#TraceId').val();
	var url = '/flightdata/' + TraceId + '/';
	$scope.loadingFlight = true;
	$scope.PublishedFare = 'PublishedFare';
	$scope.limit = 0;
	$scope.filter = {};
	$scope.categories = ['AirlineName', 'StopCount'];
	$scope.reverse = false;
	$http({
		method: "GET",
		url: url,
		data: {},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest'
		}
	}).then(function successCallback(response) {
		$scope.loadingFlight = false;
		$scope.flightlistOutbound = response.data.outbound;
		$scope.flightlistInbound = response.data.inbound;

		$scope.FiltStop = response.data.FiltStop;
		$scope.FiltAirline = response.data.FiltAirline;
		$scope.Minprice = response.data.Minprice;
		$scope.Maxprice = response.data.Maxprice;

		$("#slider-range").slider({
			range: true,
			min: $scope.Minprice,
			max: $scope.Maxprice,
			values: [$scope.Minprice, $scope.Maxprice],
			slide: function (event, ui) {
				$("#amount").val("INR " + ui.values[0] + " - INR " + ui.values[1]);
				$("#hiddenamount").val(ui.values[0] + "-" + ui.values[1]);
			}
		});
		$("#amount").val("INR " + $("#slider-range").slider("values", 0) + " - INR " + $("#slider-range").slider("values", 1));
		$("#hiddenamount").val($("#slider-range").slider("values", 0) + "-" + $("#slider-range").slider("values", 1));

		//console.log(response.data.outbound);

	}, function errorCallback(response) {

	}).finally(function () {
		$scope.loadingFlight = false;
		$scope.limit = 10;
		$scope.orderby = 'PublishedFare';



	});

	$scope.filterByFlightMatching = function (data) {
		var matchesAND = true;
		for (var obj in $scope.filter) {
			if ($scope.filter.hasOwnProperty(obj)) {
				if (noSubFilter($scope.filter[obj])) continue;
				if (!$scope.filter[obj][data[obj]]) {
					matchesAND = false;
					break;
				}
			}
		}
		return matchesAND;
	};

	function noSubFilter(obj) {
		for (var key in obj) {
			if (obj[key]) return false;
		}
		return true;
	};

	$scope.getItems = function (obj, array) {
		return (array || []).map(function (w) {
			return w[obj];
		}).filter(function (w, idx, arr) {
			if (typeof w === 'undefined') {
				return false;
			}
			return arr.indexOf(w) === idx;
		});
	};
	$scope.loadMoreNew = function() {
        if ($scope.loadingFlight === false) {
            if ($scope.limit + 10 < $scope.flightlistOutbound.length) {
                $scope.limit += 10;
            } else {
                $scope.limit = $scope.flightlistOutbound.length;
            }
        }
    };
	$scope.FlightDetails = function (item, index) {
		$('#FlightdetailsDiv_' + index).show();
		$scope.FareDetails = item.FairRules[0];
		$scope.PriceIdsss = item.FairRules[0].PriceID;
	};
	$scope.MoreFare = function (item, index) {
		$('#MoreFareDiv_' + index).show();

	};
	$scope.Fare_Details = function (item, index) {
		$scope.FareDetails = item;
		$scope.PriceIdsss = item.PriceID;
	};
	$scope.crossIcons = function (index) {
		$('#FlightdetailsDiv_' + index).hide();
	};
	$scope.FarerulesCancellation = function (item,PriceID) {
		var url = "/farerulescancel/"+PriceID+'/';
		$scope.fareRulesCancel = true;
		$http({
			method: "GET",
			url: url,
			data: { item: item, PriceID: PriceID },
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(function successCallback(response) {
			console.log(response.data);
			if (response.data.status) {
				$scope.fareRulesCancel = false;
				$scope.FareRules_cancel = response.data.FareRules;
			} else {
				alert(response.data.message);
			}
		}, function errorCallback(response) {
			alert(response.data.message);
		});
	};
	//   $http.get("https://www.ineedtrip.com/flight/getflightsearch")
	//   .then(function(response) {
	//       $scope.myWelcome = response.data;
	//   });
}]);
