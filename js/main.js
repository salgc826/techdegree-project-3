$(document).ready(function() {

  errorMessage = {
    'name': 'Please add a name', //errorMessage.name
    'email': 'Please add a email', //errorMessage.email
    'activities': 'Please add at least one activity', //errorMessage.activities
    'creditcard': 'Credit Card Number is wrong', //errorMessage.creditcard
    'zipcode': 'zipcode is wrong', //errorMessage.zipcode
    'cvv': 'cvv is wrong', //errorMessage.'cvv'
};

document.getElementById('name').focus();
$('.other-jobrole-fieldset').hide(); //hide the other job role intially
$('#colors-js-puns').hide();
$('.emailErrorMessage').hide();
});
