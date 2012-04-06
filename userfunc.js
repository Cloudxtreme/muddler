function validateEmail(email, cb) { 
  var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  cb(re.test(email));
}

exports.validateEmail = validateEmail;