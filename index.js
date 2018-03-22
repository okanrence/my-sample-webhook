"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

// restService.post("/v1/query", function(req, res) {
//   var accountNumber =
//     req.body.result &&
//     req.body.result.parameters &&
//     req.body.result.parameters.accountNumber
//       ? req.body.result.parameters.accountNumber
//       : null;
// var returnSpeech = "invalid account"
// if(accountNumber !== null){
//   if (accountNumber == "0765094061" )
//     returnSpeech = "Great, Account verified"
// }
    
//   return res.json({
//     speech: returnSpeech,
//     displayText: returnSpeech,
//     source: "webhook-sample"
//   });
// });

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
