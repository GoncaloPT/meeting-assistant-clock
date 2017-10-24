// server.js
var path = require('path');
global.appRoot = path.resolve(__dirname);


// set up ========================
var express = require('express'),
        app = express(), // create our app w/ express
        morgan = require('morgan'), // log requests to the console (express4)
        bodyParser = require('body-parser'), // pull information from HTML POST (express4)
        methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
		http = require ('http')

compression = require('compression');


app.set('port', (process.env.PORT || 5000));



// configuration =================
app.use(compression({
    filter: shouldCompress
}));

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}
app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());


//API

/*----------  Call Proxy  ----------*/

//tempo da parte
app.get('/api/assignment', function(req,response,next){
	 response.writeHead(200, {"Content-Type": "application/json"});
    var tempoParte = "12:00";
    var json = JSON.stringify(tempoParte);
    response.end(json);
});

//hora atual
app.get('/api/clock', function(req,response,next){
	 response.writeHead(200, {"Content-Type": "application/json"});
    var horaAtual = "12:00";
    var json = JSON.stringify(horaAtual);
    response.end(json);
	
	//call to Meeting assistant
	/*
		app.getJSON('http://localhost:1914/api?action=getclock&password=', function(jsonResponse){
			response.end(json);
		});
	*/
});
app.get('/api/textColor', function(req,response,next){
	 response.writeHead(200, {"Content-Type": "application/json"});
	 var textColor = "#FF0000"
    var json = JSON.stringify(textColor);
    response.end(json);
	
	//call to Meeting assistant
	/*
	app.getJSON('//http://localhost:1914/api?action=getassigment&password=', function(jsonResponse){
		response.end(json);
	});
	*/
});
// util method
app.getJSON = function(url, onResult)
{

   
    var req = port.request(url, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};



/*----------  Local Content  ----------*/
/*----------  end block  ----------*/



// listen (start app with node server.js) ======================================
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});