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

// button mousedown function which checks validation
$("button").click(function(event) {
	isFormValid(event);
});

// checks the validity of the form
function isFormValid(event) {
	resetFormColors();
	var invalidateForm = false;
	if (!nameEntered()) {
		$("label[for='name']").text("Name: (Please provide your name)").css("color", "red");
		invalidateForm = true;
	}
	if (!validEmailAddress()) {
		$("label[for='mail']").text("Email: (Please provide a valid email address)").css("color", "red");
		invalidateForm = true;
	}
	if (!activitySelected()) {
		$(".activities legend").css("color", "red");
		invalidateForm = true;
	}
	if (!teeShirtSelected()) {
		console.log("invalide tee-shirt");
		console.log($("#design").val());
		$(".shirt legend").append("<p>Don't forget to pick a T-Shirt</p>");
		$(".shirt legend p").css("color", "red");
		invalidateForm = true;
	}
	if ($("#payment").val() === "select_method") {
		$("fieldset:last legend").css("color", "red");
		invalidateForm = true;
	}
	if ($("#payment").val() === "credit card") {
		if(!validCreditCard($("#cc-num").val()) || $("#cc-num").val() === "") {
			$("#credit-card label[for='cc-num']").css("color", "red");
			invalidateForm = true;
		}
		if (!ccvAndZipEntered()) {
			$("#credit-card label[for='zip']").css("color", "red");
			$("#credit-card label[for='cvv']").css("color", "red");
			invalidateForm = true;
		}
	}
	if (invalidateForm) {
		event.preventDefault();
	}
}

// function which checks if a name has been entered
function nameEntered() {
	return ($("#name").val() !== "") ? true : false;
}

// function which checks the validity of the email address
function validEmailAddress() {
	var validEmail = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
	return validEmail.test($("#mail").val());
}

// function which checks to see if a t-shirt has been selected .
function tShirtSelected() {
		return (!($("#design").val() == "Select Theme")) ? true : false;
}

// function which determines if an activity has been selected by user
function activitySelected() {
	var selectedActivityCount = 0;
	$.each($("input[type='checkbox']"), function() {
		if ($(this).prop("checked")) {
			selectedActivityCount += 1;
		}
	});
	return (selectedActivityCount > 0) ? true : false;
}

// function which determins if a zip code and 3 digit ccv number has been selected
function ccvAndZipEntered() {
	var zipVal = /^\d{5}$|^\d{5}-\d{4}$/;
	var cvvVal = /^\d{3}$/;
	return zipVal.test($("#zip").val()) && cvvVal.test($("#cvv").val());
}

// functioin which checks the validity of the credit card number entered
function validCreditCard(value) {
  // accept only digits, dashes or spaces
	if (/[^0-9-\s]+/.test(value)) return false;
	// The Luhn Algorithm.
	var nCheck = 0, nDigit = 0, bEven = false;
	value = value.replace(/\D/g, "");
	for (var n = value.length - 1; n >= 0; n--) {
		var cDigit = value.charAt(n),
			  nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}
		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) === 0;
}

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
