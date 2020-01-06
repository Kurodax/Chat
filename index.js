const express = require('express');
const app = express();
const assert = require('assert');
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlencodedParser);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/js', express.static(__dirname + '/js'));

Client.connect(url, {useNewUrlParser: true}, function(err, client) {
	assert.equal(null, err);
	console.log('banco de dados conectado com sucesso.');

	db = client.db(dbName);
});

app.listen(3000);
console.log('servidor rodando em: localhost:3000');
//INTERFACE #########################################################################
app.get('/', urlencodedParser, function(req, res) {
	try {
		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		const data = fs.readFileSync('./home.html', 'utf8');
		res.send(data);
	}catch(e) {
		console.log({error: 'erro de requisição 0'});
	}
});
app.get('/home', urlencodedParser, function(req, res) {
	try {
		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		const data = fs.readFileSync('./home.html', 'utf8');
		res.send(data);
	}catch(e) {
		console.log({error: 'erro de requisição 0'});
	}
});

// Janela do Chatbot
app.get('/chatbot', urlencodedParser, function(req, res) {
	try {
		let code_user = -1;
		if(req.query.code_user) code_user = Number(req.query.code_user);

		res.set('Content-Type', 'text/html');
		const fs = require('fs');
		let data = fs.readFileSync('./chatbot.html', 'utf8');
		data = data.replace('[code_user]', code_user);
		res.send(data);
	}catch(e) {
		console.log({error: 'erro de requisição 10'});
	}
});
//###################################################################################

function cod() {
	try {
		const data = new Date();
		const ano = data.getFullYear();
		const mes = data.getMonth();
		const dia = data.getDate();
		const hora = data.getHours();
		const minuto = data.getMinutes();
		const segundo = data.getSeconds();
		const milesegundos = data.getMilliseconds();
		const result = Number(parseFloat(Number(ano+''+mes+''+dia+''+hora+''+minuto+''+segundo+''+milesegundos)/2).toFixed(0));
		return result;
	}catch(e) {
		return 0;
	}
}

const insertData = function(objJSON, callback) {
	try {
		const collection = db.collection('chatbot');
		collection.insertOne(objJSON, function(err, result) {
			assert.equal(null, err);
			callback(result);
		});
	}catch(e) {
		console.log({error: 'erro de requisição 29'});
	}
}

const updateData = function(objJSON, callback) {
	try {
		const collection = db.collection('chatbot');
		const code_current = objJSON.code_current;
		collection.updateOne({code_current: code_current}, {$set: objJSON}, function(err, result) {
			assert.equal(null, err);
			callback(result);
		});
	}catch(e) {
		console.log({error: 'erro de requisição 30'});
	}
}

const deleteData = function(objJSON, callback) {
	try {
		const collection = db.collection('chatbot');
		collection.deleteOne(objJSON, function(err, result) {
			assert.equal(null, err);
			callback(result);
		});
	}catch(e) {
		console.log({error: 'erro de requisição 31'});
	}
}

const findData = function(objJSON, callback) {
	try {
		const collection = db.collection('chatbot');
		collection.find(objJSON).toArray(function(err, result) {
			assert.equal(null, err);
			callback(result);
		});
	}catch(e) {
		console.log({error: 'erro de requisição 32'});
	}
}

app.get('/chatbot/question', urlencodedParser, function(req, res) {
	try {
		let objJSON = {};
		if(req.query.code_user) objJSON.code_user = Number(req.query.code_user); else objJSON.code_user = 0;
		if(req.body.activate) objJSON.activate = Number(req.body.activate); else objJSON.activate = 1;
		if(req.query.code_before) objJSON.code_before = Number(req.query.code_before); else objJSON.code_before = 0;
		if(req.query.input) objJSON.input = req.query.input; else objJSON.input = '';

		questionData(objJSON, function(result) {
			res.send(result);
		});
	}catch(e) {
		console.log({error: 'erro de requisição 33'});
	}
});

const abreviacoes = function(Input='') {
	try {
		Input = Input.toString().trim();
		let result = Input.replace(/ vc /g, 'você');
		result = result.replace(/ tb /g, 'também');
		result = result.replace(/ oq /g, 'o que');
		result = result.replace(/ dq /g, 'de que');
		result = result.replace(/ td /g, 'tudo');
		result = result.replace(/ pq /g, 'por quê');
		result.toString().trim();
		return result;
	}catch(e) {
		return Input;
		console.log({error: 'erro de requisição 35'});
	}
};