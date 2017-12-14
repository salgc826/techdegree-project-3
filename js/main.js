// Set focus on the first text field
$( document ).ready( function(){
  $("#name").focus();
  hideParagraphs();
  hideColorOptions();
});

// Job Role section of the form. Reveal a text field when the "Other" option is selected from the "Job Role" drop down menu
var addJobTitleField = function() {
	$("fieldset:first").append("<input type='text' id='other-title' placeholder='Your Title'>");
};

// T-Shirt Info section of the form. For the T-Shirt color menu
var arrayOfColors = $.makeArray($("#color").children());

// function which removes all the color options
var removeAllColorOptions = function() {
	$("#color").children().remove();
};

// adds the event listener
$("#title").change(function(){
	if ($("#title").val() === "other"){
		addJobTitleField();
	} else {
		$("#other-title").remove();
	}
});

// this section changes the design color drop down menu
$("#design").change(function() {
	if ($("#design").val() === "Select Theme") {
	hideColorOptions();
} else {
	displayColorOptions();
	removeAllColorOptions();
	var jsPuns = "(JS Puns shirt only)";
	var hearJS = "(I";
	switch( $("#design").val() ) {
		case "js puns":
			arrayOfColors.forEach(function(colorChoice){
				var colorOption = colorChoice.innerHTML;
				if (colorOption.indexOf(jsPuns) !== -1) {
					$("#color").append(colorChoice);
				}
				$("#color")[0].selectedIndex = 0;
			});

			break;
		case "heart js":
			arrayOfColors.forEach(function(colorChoice){
				var colorOption = colorChoice.innerHTML;
				if (colorOption.indexOf(hearJS) !== -1) {
					$("#color").append(colorChoice);
				}
				$("#color")[0].selectedIndex = 0;
			});
			break;
		case "Select Theme":
				arrayOfColors.forEach(function(colorChoice){
					$("#color").append(colorChoice);
			});
				$("#color")[0].selectedIndex = 0;
	}
}
});

var totalCost = 0;
// this updates the total cost of the boxes selected
$('[type=checkbox]').change(function(){
	if ( $(this)['0'].checked && $(this)['0'].name === "all"){
		totalCost += 200;
	} else if (!($(this)['0'].checked) && $(this)['0'].name === "all") {
		totalCost -= 200;
	} else if ($(this)['0'].checked) {
		totalCost += 100;
	} else {
		totalCost -= 100;
	}
	var htmlString = "<p id='total'> Total $" + totalCost + "</p>";
	createTotal(htmlString, totalCost);
});

// function which creates the total at the bottom of the selections
var createTotal = function(htmlString, totalCost) {
	$("#total").remove();
	if (totalCost !== 0) {
		$(".activities").append($(htmlString));
	}
};

// this is the section where I disable activities that are scheduled at the same time.
var arrayOfActivities = $.makeArray($('.activities label'));

$('[type=checkbox]').change(function(){
	// don't like this so much, but it works
	if ($(this)['0'].name === 'js-libs' && $(this)['0'].checked) {
		arrayOfActivities[4].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'js-libs' && !$(this)['0'].checked) {
		arrayOfActivities[4].children['0'].disabled = false;

	} else if ($(this)['0'].name === 'node' && $(this)['0'].checked) {
		arrayOfActivities[2].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'node' && !$(this)['0'].checked) {
		arrayOfActivities[2].children['0'].disabled = false;

	} else if ($(this)['0'].name === 'js-frameworks' && $(this)['0'].checked) {
		arrayOfActivities[3].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'js-frameworks' && !$(this)['0'].checked) {
		arrayOfActivities[3].children['0'].disabled = false;

	} else if ($(this)['0'].name === 'express' && $(this)['0'].checked) {
		arrayOfActivities[1].children['0'].disabled = true;
	} else if ($(this)['0'].name === 'express' && !$(this)['0'].checked) {
		arrayOfActivities[1].children['0'].disabled = false;
	}

});

//changes what is displayed based on the payment option selected
$("#payment").change(function(){
	if ($(this).val() === "credit card") {
		hideParagraphs();
		$("#credit-card").removeClass("is-hidden");
	} else if ($(this).val() === "paypal") {
		$("#credit-card").addClass("is-hidden");
		$("fieldset:last div p")['0'].classList = "";
		$("fieldset:last div p")['1'].classList = "is-hidden";
	} else if ($(this).val() === "bitcoin") {
		$("#credit-card").addClass("is-hidden");
		$("fieldset:last div p")['0'].classList = "is-hidden";
		$("fieldset:last div p")['1'].classList = "";
	} else if ($(this).val() === "select_method") {
		$("#credit-card").removeClass("is-hidden");
	}
});

// Form cannot be submiited until the following requirements have been met:
//	1. Name field isn't blank
//	2. Email field contains validly formatted email address
//	3. At least one checkbox under "register for Activities" section must be selected
//	4. If "Credit Card" is the selected payment option, the three fields accept only numbers, a 16-digit credit card number, a 5-digit zip code,
//     and a 3-digit CVV

function is_name_field_blank() {
	if ($("#name").val() === "") {
		return true
	} else {
		return false
	}
}

function is_email_format_valid() {
	var valid_email_regex = /.+@.+\..+/
	return valid_email_regex.test($("#mail").val());
}

function is_an_activity_selected() {
	if ($(".activities input[type='checkbox']").is(":checked") || !$(".activities input.none[name='first']").is(":checked") || !$(".activities input.none[name='second']").is(":checked")) {
		$(".activity-error").hide();
		return true;
	} else {
		$(".activity-error").show();
		return false;
	}
}

function is_cc_a_number() {
	var cc_regex = /^\d{16}$/
	return cc_regex.test($("#cc-num").val())
}

function is_zip_a_number() {
	var zip_regex = /^\d{5}$/
	return zip_regex.test($("#zip").val())
}

function is_cvv_a_number() {
	var cvv_regex = /^\d{3}$/
	return cvv_regex.test($("#cvv").val())
}

function basic_info_entered() {
	if (is_an_activity_selected() && is_email_format_valid() && !is_name_field_blank()) {  // these conditions are checked left to right -- their order needs to be
		return true;																		 // reversed from the order a user typically works through the form
	} else {

		return false;  //more basic info is required
	};
}

function cc_info_copacetic() {
	if ($("#payment").prop("value") === "credit card") {
		if (is_cc_a_number() && is_zip_a_number() && is_cvv_a_number()) {
			return true				//cc info is good
		} else {
			return false		//something wrong with cc info
		};
	} else if (($("#payment").val() === "paypal") || ($("#payment").val() === "bitcoin")) {
		return true				// no cc info needed
	} else {
		 						// default "select payment method" is selected, so do nothing
	}
}

function determine_enabled() {
	if (basic_info_entered() && cc_info_copacetic()) {
		$("#register_btn").prop("disabled", false)
	} else {
		$("#register_btn").prop("disabled", true)
	}
}


// by default the register button is diabled, and the email-format error is hidden

$("#register_btn").prop("disabled", true);
$("#format-error").hide();

// every time one of the form elements changes, the register button may need to be enabled
// also, validation error messages are displayed where appropriate

$("#name").on("input", function () {

	if ($("#name").val() === "") {
		$("#name").next().show()
	} else {
		$("#name").next().hide()
	}

	determine_enabled()
});

$("#mail").on("input", function () {

	if (/.+@.+\..+/.test($("#mail").val())) {
		$("#format-error").hide();
	} else {
		$("#format-error").show();
	}

	if ($("#mail").val() === "") {
		$("#format-error").hide();
		$("#empty-error").show();
	} else {
		$("#empty-error").hide()

	}

	determine_enabled()
});

$(".activities input[type='checkbox']").on("change", function () {
	determine_enabled()
});

$(".activities input[name='first']").on("change", function () {
	determine_enabled()
})

$(".activities input[name='second']").on("change", function () {
	determine_enabled()
})

$("#payment").on("change", function () {
	determine_enabled()
})


$("#cc-num").on("change", function () {

	if (/^\d{16}$/.test($("#cc-num").val())) {
		$("#cc-num").next().hide();
	} else {
		$("#cc-num").next().show();
	}

	determine_enabled()
})


$("#zip").on("change", function () {

	if (/^\d{5}$/.test($("#zip").val())) {
		$("#zip").next().hide();
	} else {
		$("#zip").next().show();
	}

	determine_enabled()
})


$("#cvv").on("change", function () {

	if (/^\d{3}$/.test($("#cvv").val())) {
		$("#cvv").next().hide();
	} else {
		$("#cvv").next().show();
	};

	determine_enabled()
})
// resets the form colors on submission, so they are black if corrected
function resetFormColors() {
	$(".shirt legend p").remove();
	$("label[for='name']").text("Name:").css("color", "black");
	$("label[for='mail']").text("Email:").css("color", "black");
	$(".activities legend").css("color", "black");
	$("fieldset:last legend").css("color", "black");
	$("#credit-card label[for='cc-num']").css("color", "black");
	$("#credit-card label[for='zip']").css("color", "black");
	$("#credit-card label[for='cvv']").css("color", "black");
}

// this is the section which hides the payment infomation which is not selected.
function hideParagraphs() {
	return $("fieldset:last div p").addClass("is-hidden");
}

function hideColorOptions() {
	return $("#colors-js-puns").addClass("is-hidden");
}

function displayColorOptions() {
	return $("#colors-js-puns").removeClass("is-hidden");
}
