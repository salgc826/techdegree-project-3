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

/*Validation*/
//functions that validate the name field
function checkName(){
  if($("#name").val().length < 1){
    $("#name").addClass("warning");
  }else{
    $("#name").removeClass("warning");
  }
}

$("#name").focus(function(){
  $("#name").removeClass("noFirstInput");
  checkName();
});
$("#name").change(function(){
  checkName();
});

//functions that validate the email field using a regEx found on internet.
function checkMail(){
  var string = $("#mail").val();
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  //console.log(pattern.test(string));
  if(pattern.test(string)){
    //console.log(pattern.test(string));
    $("#mail").removeClass("noFirstInput");
    $("#mail").removeClass("warning");
  }else{
    $("#mail").addClass("warning");
  }
};

$("#mail").change(function(){
  checkMail();
});
$("#mail").focus(function(){
  $("#mail").addClass("warning");
  checkMail();
});

//functions that validate the checkboxes
function checkCheckbox(){
  if($(".activities input:checked").length > 0){
    $(".activities").removeClass("noFirstInput");
    $(".activities legend").removeClass("warning");
    $(".activities legend").css("color", "#184f68");
  }else{
    $(".activities legend").css("color", "red");
    $(".activities legend").addClass("noFirstInput");
  }
};

$(".activities").change(function(){
  checkCheckbox();
});

//functions that validate the credit card part of the form
function checkCC(){
  if($("#cc-num").val().length < 13 || $("#cc-num").val().length > 16){
    $("#cc-num").addClass("warning");
  }else{
    $("#cc-num").removeClass("warning");
  }
};
$("#cc-num").change(function(){
  checkCC();
});
$("#cc-num").focus(function(){
  checkCC();
});

//functions that validate the credit zip code of the form
function checkZip(){
  if($("#zip").val().length === 5){
    $("#zip").removeClass("warning");
  }else{
    $("#zip").addClass("warning");
  }
};
$("#zip").change(function(){
  checkZip();
});
$("#zip").focus(function(){
  checkZip();
});
//functions that validate the cvv part of the form
function checkCVV(){
  if($("#cvv").val().length === 3){
    $("#cvv").removeClass("warning");
  }else{
    $("#cvv").addClass("warning");
  }
};
$("#cvv").change(function(){
  checkCVV();
});
$("#cvv").focus(function(){
  checkCVV();
});


// function which resets the form colors on submission, so they are black if corrected
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
