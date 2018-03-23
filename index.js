"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const defaultFallBackResponse = "defaultFallBackResponse";
const webHookSource = "webHookSource";
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
    source: webHookSource
  });
}

if(action == "ValidateCustomerAccount")
  {
    var accountNumber = req.body.result.parameters.Account_number
  
    if (!isNumeric(accountNumber)){
      returnSpeech = "Hmmm...'" + accountNumber + "' does not appear to be a valid account number.";
    }
    else
    {
      returnSpeech = "Great, An OTP has been sent to your mobile number. Please enter the OTP";
    }      
  }
  else if(action == "ValidateCustomerOTP"){

    return res.json({
      speech: "",
        messages: [
            {
            type: 0,
            speech: "Just a sec... validating OTP...",
            },
            {
            type: 0,
            speech: "Great, OTP checks out fine"
            }
            ],
            source: webHookSource
         })

  }
  else
  {
  return res.json({
    speech: "Sorry I don't understand",
    displayText: "Sorry I don't understand",
    source: webHookSource
  });
}
    
  return res.json({
    speech: returnSpeech,
    displayText: returnSpeech,
    source: webHookSource
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

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
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
