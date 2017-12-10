$(document).ready(function() {

  errorMessage = {
    'name': 'Please add a name', //errorMessages.name
    'email': 'Please add a email', //errorMessages.email
    'activities': 'Please add at least one activity', //errorMessages.activities
    'creditcard': 'Credit Card Number is wrong', //errorMessages.creditcard
    'zipcode': 'zipcode is wrong', //errorMessages.zipcode
    'cvv': 'cvv is wrong', //errorMessages.'cvv
  };

  document.getElementById('name').focus();
  $('.other-jobrole-fieldset').hide(); //hide the other job role initially
  $('#colors-js-puns').hide();
  $('.emailErrorMessage').hide();
});

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu
document.getElementById('title').onchange = function() {
  //get the selected text
  const selectedValue = this.selectedIndex;
  const inputText = this.children[selectedValue].innerHTML.trim();
  //if selected text is other
  if (inputText === 'Other') {
    //add textfield
    $('.other-jobrole-fieldset').show();
  }
};

//http://jsfiddle.net/9Jz7p/1/
$( "#design" ).select(function() {
  //$( "div" ).text( "Something was selected" ).show().fadeOut( 1000 );
console.log('test');
});

$('#design').on('change', function() {
  let SelectedDesign = $(this).val(); //get value of selected design
  const designOptions = $('#color option'); //select the design

  //if option 2 or 3 is chosen -> show the field()
if (SelectedDesign === 'js puns' || SelectedDesign === 'heart js') {
  $('#colors-js-puns').show();
} else {
  $('#colors-js-puns').hide();
}



  $(designOptions).show();
  if (SelectedDesign === 'js puns') { //
    console.log('js puns');
    for (let i = 3; i < 6; i++) { //remove the first 3 options
      $(designOptions[i]).remove();
      console.log(designOptions[i]);

    }
  }
  if (SelectedDesign === 'heart js') {
    console.log('heart js');
    for (let i = 0; i < 3; i++) { //remove the last 3 options
      $(designOptions[i]).remove();
      console.log(designOptions[i]);
    }
  }


});

//THE Price info
const activitieVars = $('.activities').find('input');
const priceTag = '<div id="price">0</div>'; //create the pricetag
$(priceTag).insertAfter('.activities'); //insert After the fieldset

$(activitieVars).change(function() { //detect checkbox change
  calculateTotalPrice();
});

function calculateTotalPrice() {
  let TotalPrice = 0; //initial price
  $("input[type=checkbox]:checked").each(function() { //only the checked fields
    TotalPrice += Number($(this).data('price')); //sum
  });
  $('#price').text(TotalPrice); //display the TotalPRice
}

//check time collision
var EventDay = $(activitieVars).data('day');
var EventTime = $(activitieVars).data('starttime');

$('.activities').on('change', function() {
  //2 and 4 are the same  --
  console.log('change activity option');
  const activityOptions = $('.activities input'); //select the first checkboxOption
  const activityOption_1 = activityOptions[1];

  // third checkboxOption
  const activityOption_2 = activityOptions[3];
  if (activityOption_1.checked === true) {
    $(activityOption_2).attr('disabled', true);;
  } else {
    $(activityOption_2).attr('disabled', false);;
  }

  if (activityOption_2.checked === true) {
    $(activityOption_1).attr('disabled', true);;
  } else {
    $(activityOption_1).attr('disabled', false);;

  }
});

let errorNameCount = 0; //initial value
function validateName() {
  console.log('validating name');
  if ($('#name').val().length === 0) { //if input has no value
    errorNameCount++;
    if (errorNameCount <= 1) {
      const errorMessageName = '<span style="color: red" class="errorMessageName">' + errorMessage.name + '</span>'
      $(errorMessageName).insertAfter($('#name'));
    }
    console.log('errorNameCount: ' + errorNameCount);
  } else {
    errorNameCount = 0; //reset error counter
    $('.errorMessageName').hide(); //hide the error message
  }
}

function validateEmail() {
  //validate email:
  let EmailVal = $('#mail').val();
  const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if (testEmail.test(EmailVal) || ($('#mail').val().length !== 0)) { //if is email and not empty
    console.log('email passed');
    $('.emailErrorMessage').hide();
  } else {
    console.log('email failed');
    $('.emailErrorMessage').show();

  } //end email validation
}

let priceErrorCount = 0;
function validatePrice() {
  //if total value is 0 no activity has been checked
  const CheckPrice = Number($('#price').text());
  console.log(CheckPrice);
  const errorMessageActivities = '<span style="color: red" class="errorMessageActivities">Please select activity</span>';
  if (CheckPrice === 0) {
    priceErrorCount++;
    if (priceErrorCount <= 1) {
      $(errorMessageActivities).insertAfter($('.activities'));
    }
  } else {
    $('.errorMessageActivities').hide();
  }
}

function validateCreditCard() {
  $('.errorMessageCreditCard').remove();
  if ($('#payment').val() === 'credit card') { //if creditcard is selected
    console.log('cc selected');
    if (!($('#cc-num').val().length <= 16 && $('#cc-num').val().length >= 13)) { //must be between 13 and 16 chars and numbers only #TODO: Numbers only
      console.log('cc-number can not be empty and must be between 13 and 16 letters');
      const errorMessageCreditCard = '<span style="color: red" class="errorMessageCreditCard">cc-number can not be empty and must be between 13 and 16 letters</span>';
      $(errorMessageCreditCard).insertAfter($('#cc-num'));
    }
    if (!$('#cc-num').val().match(/^\d[\d\s]+\d$/)) { //if its not a number
      console.log('not valid cc number');
      const errorMessageCreditCard = '<span style="color: red" class="errorMessageCreditCard">not a valid number</span>';
      $(errorMessageCreditCard).insertAfter($('#cc-num'));
    }
  }
} //End validateCreditCard


function validateZip() {
  $('.errorMessageZip').remove();
  if ($('#payment').val() === 'credit card') { //if creditcard is selected
    if (!($('#zip').val().length === 5) && $('#zip').val().match(/^\d[\d\s]+\d$/)) { //must be 5 chars and numbers only #TODO: Numbers only
      console.log('zip must be 5 numbers');
      const errorMessageZIP = '<span style="color: red" class="errorMessageZip">zip must be 5 numbers</span>';
      $(errorMessageZIP).insertAfter($('#zip'));
    }

    if (!$('#zip').val().match(/^\d[\d\s]+\d$/)) { //if its not a number
      console.log('not valid cc number');
      const errorMessageZIP = '<span style="color: red" class="errorMessageZip">not a valid number</span>';
      $(errorMessageZIP).insertAfter($('#zip'));
    }
  }
} //End validateCreditCard

function validateCVV(){
  if ($('#payment').val() === 'credit card') { //if creditcard is selected
    $('.errorMessageCVV').remove();
    if (!($('#cvv').val().length === 3)) { //must be 3 chars and numbers only #TODO: Numbers only
        const errorMessageCVV = '<span style="color: red" class="errorMessageCVV">cvv must be 3 numbers</span>'
        $(errorMessageCVV).insertAfter($('#cvv'));
    }

    if (!$('#cvv').val().match(/^\d[\d\s]+\d$/)) { //if its not a number
      console.log('not valid number');
      const errorMessageZIP = '<span style="color: red" class="errorMessageZip">not a valid number</span>';
      $(errorMessageZIP).insertAfter($('#cvv'));
    }
  }
}

//call all the function in master function
function validateForm() {
  validateName();
  validateEmail();
  validatePrice();
  validateCreditCard();
  validateZip();
  validateCVV();
} //end form validation



//validate on keyUp for email
// on focus show the error messages
$("#mail").focus(function() {
  $('.emailErrorMessage').show();
});

$("#mail").keyup(function() {
  ValidateEmailInput();
});

function ValidateEmailInput() {
  console.log('validating...');
  let EmailVal = $('#mail').val();
  const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i; //regex for email
  if (testEmail.test(EmailVal)) {
    console.log('email passed');
    $('.emailErrorMessage').hide(); //hide the message when passed
  }
}

$("form").on("submit", function(event) {
  event.preventDefault();
  validateForm();
});
