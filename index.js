"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const defaultFallBackResponse = "defaultFallBackResponse";
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/v1/query", function(req, res) {

try{

  var returnSpeech = "I'm sorry i didnt get that. can you please retry?";

  var action = req.body.result &&
  req.body.result.action ? req.body.result.action : defaultFallBackResponse
  
if(action == defaultFallBackResponse){

  return res.json({
    speech: "No Action Context",
    displayText: "No Action Context",
    source: "webhook-sample"
  });
}

if(action == "ValidateCustomer")
  {
    // var accountNumber = req.body.result &&
    // req.body.result.parameters &&
    // req.body.result.parameters.Account_number
    //   ? req.body.result.parameters.Account_number
    //   : null;

    
    returnSpeech = "Great, An OTP has been sent to your mobile number. Please enter the OTP";
      
  }
  // else if(action == "ValidateOTP"){
  //   returnSpeech = "k";

  // }
  else
  {
     
  return res.json({
    speech: "Sorry I don't understand",
    displayText: "Sorry I don't understand",
    source: "webhook-sample"
  });
}
    
  return res.json({
    speech: returnSpeech,
    displayText: returnSpeech,
    source: "webhook-sample"
  });
}
catch(err){
  return res.json({
    speech: err,
    displayText: err,
    source: "webhook-sample"
  });
}

});




restService.get("/v1/query", function(req, res) {
  var accountNumber = req.query['accountNumber'] ? req.query['accountNumber'] : "Invalid Account" ;
  
  return res.json({
    speech: accountNumber,
    displayText: accountNumber,
    source: "webhook-sample"
  });
});


// restService.get("/v1/query", function(req, res) {
//   var speech = req.query['username'];
//   return res.json({
//     speech: speech,
//     displayText: speech,
//     source: "webhook-echo-sample"
//   });
// });


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
