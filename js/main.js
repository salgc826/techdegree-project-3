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
//Check if credit card number is valid or not with the Luhn check algorithm
function checkcc(number) {
  var len = number.length,
  mul = 0,
  prodArr = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
  ],
  sum = 0;

  while (len--) {
    sum += prodArr[mul][parseInt(number.charAt(len), 10)];
    mul ^= 1;
  }

  return sum % 10 === 0 && sum > 0;
}

//Program at least one of your error messages so that more information is provided depending on the error.
//This function does 4 different checks on submit and displays a custom error message.
//To test all of the error messages out, try submitting the form with the following expressions: " ", "@", "123456", "510510510510510"
//And finally, try these valid card numbers: "5105105105105100", "4111111111111111", "4012888888881881" or even your own card number!
function validateCC() {
  var ccnum = $("#cc-num").val();
  if(ccnum.length < 1) {
      $("label[for=cc-num]").text("Card Number: Can't be blank.").css("color", "red");
  } else if (/[^0-9]+/.test(ccnum)) {
    $("label[for=cc-num]").text("Card Number: Please enter digits only.").css("color", "red");
  } else if (ccnum.length < 13 || ccnum.length > 16) {
    $("label[for=cc-num]").text("Card Number: Must be between 13 and 16 digits.").css("color", "red");
  } else if (!checkcc(ccnum)) {
    $("label[for=cc-num]").text("Card Number: Your card number is invalid.").css("color", "red");
  } else {
    $("label[for=cc-num]").text("Card Number:").css("color", "black");
    return true;
  }
}

//Live email onkeyup verification based on the regex before submitting the form.
//If the field is not empty and it does not pass the regex test, display error message. Otherwise, put default styling.
  $("#mail").keyup(function(){
  var email = $("#mail").val();
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($("#mail").val().length > 1 && regex.test(email) ) {
      $("label[for=mail").text("Email:").css("color", "black");
  } else {
      $("label[for=mail").text("Email: (please provide a valid email address)").css("color", "red");
  }
});

//Give properties to each one of the fields and if any of them are wrong or empty, then prevent the form submission.
function validateForm() {

  //Name field can't be blank
  function validateName() {
  if ($("#name").val().length < 1) {
    $('html, body').animate({
      scrollTop: $("label[for=name]").offset().top
    }, 2000);
      $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
      $("input:text:visible:first").focus();
    } else {
      $("label[for=name]").text("Name:").css("color", "");
      return true;
    }
  } validateName();

  //In the name field onkeyup, display or remove error message.
  $("#name").keyup(function(){
  if ($("#name").val().length > 0) {
    $("label[for=name]").text("Name:").css("color", "");
    return true;
  } else {
    $("label[for=name]").text("Name: (please provide your name)").css("color", "red");
  }
  });

//Validate email when you submit the form by passing the regex test.
  function validateEmail() {
    var email = $("#mail").val();
    if ($("#mail").val().length > 1) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     if (regex.test(email)) {
        $("label[for=mail").text("Email:").css("color", "black");
        return true;
      }
    } else {
        $("label[for=mail").text("Email: (please provide a valid email address)").css("color", "red");
    }
  } validateEmail();

  //At least one activity must be checked from the list under "Register for Actitivities."
  function validateActivities() {
    if ($("input:checkbox:checked").length < 1) {
        $(".activities legend").text("Register for activities: (please select an activity)").css("color", "red");
    } else {
          $(".activities legend").text("Register for activities:").css("color", "");
          return true;
    }
  } validateActivities();

//T-Shirt theme must be selected. If not, throw error.
  function validateShirtInfo() {
    if($("#design").val() === "Select Theme") {
        $("#validateShirt").remove();
        $(".shirt legend").append("<p id='validateShirt' style='font-size : 15px'>Please choose your T-Shirt</p>").css("color", "#ff0000");
    } else {
       $("#validateShirt").remove();
       $(".shirt legend").css("color", "#000");
       return true;
    }
  } validateShirtInfo();

//Payment option must be selected.
  function validatePaymentOption() {
  if ($('#payment').val() === "select_method"){
      $("label[for=payment]").text("I'm going to pay with: Please select a payment option.").css("color", "red");
  } else {
      $("label[for=payment]").text("I'm going to pay with:").css("color", "black");
      return true;
    }
} validatePaymentOption();
//Must enter a valid zip number of 5 digits. The regex says "digits only"
  function validateZip() {
    var zipval = $("#zip").val();
    if (zipval.length !== 5 || /\D+/g.test(zipval)) {
      $("label[for=zip]").text("Zip Code: Invalid Zip").css({'color': 'red', 'font-size': '15px'});
    } else {
      $("label[for=zip]").text("Zip Code:").css("color", "black");
      return true;
    }
  } validateZip();
//Must enter a valid CVV number of 3 digits. The regex says "digits only"
  function validateCVV() {
    var cvvval = $("#cvv").val();
    if (cvvval.length !== 3 || /\D+/g.test(cvvval)) {
      $("label[for=cvv]").text("CVV: Invalid CVV").css({'color': 'red', 'font-size': '15px'});
    } else {
      $("label[for=cvv]").text("CVV:").css("color", "black");
      return true;
    }
  } validateCVV();

//Return True if all fields are correct, else return false to prevent the submission of the form
var paymentVal = $("#payment").val();
  if (paymentVal === "credit card" && validateCVV() && validateZip() && validateCC() && validateShirtInfo() && validateActivities() && validateEmail() && validateName()) {
    return true;
  } else if (paymentVal === "bitcoin" || paymentVal === "paypal" && validateShirtInfo() && validateActivities() && validateEmail() && validateName()) {
    return true;
  } else {
    return false;
  }
}

//On sumbmit, prevent default and call all the form validation functions.
$("form").submit(function(e){
  if(!validateForm()) {e.preventDefault();}
      validateForm();
      validateCC();
  });

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
