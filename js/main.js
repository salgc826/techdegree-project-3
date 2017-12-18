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
// now this, this I like this solution
$("button").click(function(event) {
	isFormValid(event);
});

// checks the validity of the form
/*==== FORM VALIDATION ====*/

const mail = document.querySelector('#mail');
const name = document.querySelector('#name');
const form = document.getElementsByTagName('form')[0];
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const errorMsg = document.createElement('p');
errorMsg.id = 'error';
const zipLabel = document.querySelector('#zipLabel');
const cvvLabel = document.querySelector('#cvvLabel');

// NAME
function validateName (event) {
  if (!name.validity.valid) {
    event.preventDefault();
    name.style.setProperty('box-shadow', '0 0 0 1px red');
    name.previousElementSibling.style.color = 'red';
  }
  else {
    name.style.setProperty('box-shadow', '');
    name.previousElementSibling.style.color = '';
  }
}
// EMAIL
function validateEmail(event) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(mail.value) == false) {
    event.preventDefault();
    mail.style.setProperty('box-shadow', '0 0 0 1px red');
    mail.previousElementSibling.style.color = 'red';
  }
  else {
    mail.style.setProperty('box-shadow', '');
    mail.previousElementSibling.style.color = '';
  }
}
// ACTIVITIES
function validateActivities (event) {
  if (Array.from(activities).filter(el => el.checked).length < 1) {
    event.preventDefault();
    document.querySelector('.activities legend').style.color = 'red';
  }
  else {
    document.querySelector('.activities legend').style.color = '';
  }
}
// PAYMENT
function validatePayment (event) {
  if (paymentType.value == 'credit card') {
    if (ccNum.value == '') {
      event.preventDefault();
      ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
      ccNum.previousElementSibling.style.color = 'red';
      errorMsg.innerText = 'Please enter a credit card number.';
      ccNum.previousElementSibling.appendChild(errorMsg);
      zipLabel.classList.add('adjust');
      cvvLabel.classList.add('adjust');
      zipLabel.classList.remove('adjustPlus');
      cvvLabel.classList.remove('adjustPlus');
    }
    else if (ccNum.value.length < 13 || ccNum.value.length > 16 || isNaN(ccNum.value)) {
      event.preventDefault();
      ccNum.style.setProperty('box-shadow', '0 0 0 1px red');
      ccNum.previousElementSibling.style.color = 'red';
      errorMsg.innerText = 'Please enter a number that is between 13 and 16 digits long.';
      ccNum.previousElementSibling.appendChild(errorMsg);
      zipLabel.classList.remove('adjust');
      cvvLabel.classList.remove('adjust');
      zipLabel.classList.add('adjustPlus');
      cvvLabel.classList.add('adjustPlus');
    }
    else {
      ccNum.style.setProperty('box-shadow', '');
      ccNum.previousElementSibling.style.color = '';
      if (errorMsg) {
        ccNum.previousElementSibling.removeChild(errorMsg);
      }
      zipLabel.classList.remove('adjust');
      cvvLabel.classList.remove('adjust');
      zipLabel.classList.remove('adjustPlus');
      cvvLabel.classList.remove('adjustPlus');
    }
    if (!zip.validity.valid) {
      event.preventDefault();
      zip.style.setProperty('box-shadow', '0 0 0 1px red');
      zip.previousElementSibling.style.color = 'red';
    }
    else {
      zip.style.setProperty('box-shadow', '');
      zip.previousElementSibling.style.color = '';
    }
    if (!cvv.validity.valid) {
      event.preventDefault();
      cvv.style.setProperty('box-shadow', '0 0 0 1px red');
      cvv.previousElementSibling.style.color = 'red';
    }
    else {
      cvv.style.setProperty('box-shadow', '');
      cvv.previousElementSibling.style.color = '';
    }
  }
}

// ALL
function validate (event) {
  validateEmail(event);
  validateActivities(event);
  validateName(event);
  validatePayment(event);
}

// validate form on submit
form.addEventListener('submit', validate);
// real-time validation of email, name, activities
mail.addEventListener('input', validateEmail);
name.addEventListener('input', validateName);
activities.forEach(e => e.addEventListener('change', validateActivities))

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
