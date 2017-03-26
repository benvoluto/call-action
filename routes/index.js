var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var config = require("../config");

var client = twilio(config.accountSid, config.authToken);

module.exports = function(app) {
    app.set('view engine', 'jade');

    app.use(express.static(path.join(process.cwd(), 'public')));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(morgan('combined'));

    app.get('/', function(request, response) {
        response.render('index');
    });
    app.get('/action/:action', function(request, response) {
        response.render(request.params.action);
    });

    app.post('/call', function(request, response) {
        var targetNumber = request.body.targetNumber;
        var url = 'http://' + request.headers.host + '/outbound/' + encodeURIComponent(targetNumber)

        client.makeCall({
            to: request.body.phoneNumber,
            from: config.twilioNumber,
            url: url
        }, function(err, message) {
            console.log(err);
            if (err) {
                response.status(500).send(err);
            } else {
                response.send({
                    message: 'We will be calling your phone shortly to connect you.'
                });
            }
        });
    });

    app.post('/outbound/:targetNumber', function(request, response) {
        var targetNumber = request.params.targetNumber;
        var twimlResponse = new twilio.TwimlResponse();

        twimlResponse.say('We are connecting you now. Thank you ' +
                          'for taking action. ',
                          { voice: 'alice' });

        twimlResponse.dial(targetNumber);

        response.send(twimlResponse.toString());
    });
};
