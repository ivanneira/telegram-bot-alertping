var TelegramBot = require('telegram-bot-api');
var ping = require('ping');

var api = new TelegramBot({
        token: '209928288:AAEfW4AvVO_rneKb1FBHSKc5_mDYUct-69Y',
        updates: {
            enabled: true,
            get_interval: 1000
    }
});
    

api.on('message', function(message){

	//ping a rockets-----------------------------------------------------------------------------------
	if(message.text == "rocket?"){

		var hosts = [
				'192.168.20.254',
				'192.168.20.253',
				'192.168.20.252'
			];

		hosts.forEach(function (host) {
		    ping.promise.probe(host)
		        .then(function (res) {

		            var resData = res.output.substring(res.output.indexOf("time"));
		            resData = resData.substring(0,resData.indexOf(" "));

		            api.sendMessage({
			    		chat_id: message.chat.id,
			    		text: "Rocket " + host + " -> " + resData,
			    		parse_mode:"Markdown"
			    	});
		        })
		        .done();
		});


	}

	//ping a p2p----------------------------------------------------------------------------------------
	if(message.text == "p2p?"){

		var hosts = [
				'192.168.20.251',
				'192.168.20.250'
			];

		hosts.forEach(function (host) {
		    ping.promise.probe(host)
		        .then(function (res) {

		            var resData = res.output.substring(res.output.indexOf("time"));
		            resData = resData.substring(0,resData.indexOf(" "));

		            api.sendMessage({
			    		chat_id: message.chat.id,
			    		text: "Bridge " + host + " -> " + resData,
			    		parse_mode:"Markdown"
			    	});
		        })
		        .done();
		});
	}

//ping personalizado---------------------------------------------------------------------------------------
	if(/^ping/.test(message.text)){

		var host = message.text.substr(5);

		console.log(host);

		if(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(host)){

			ping.promise.probe(host)
			.then(function(res){

				var resData = res.output.substring(res.output.indexOf("time"));
	            resData = resData.substring(4,resData.indexOf(" "));

				api.sendMessage({
		    		chat_id: message.chat.id,
		    		text: resData,
		    		parse_mode:"Markdown"
		    	});
			}).done();

		}else{
			api.sendMessage({
	    		chat_id: message.chat.id,
	    		text: "_le pifiaste al ip_",
	    		parse_mode:"Markdown"
	    	});
		}

	}
});

//Alertping----------------------------------------------------------------------------------
setInterval(function(){

	var hosts = [
			'192.168.20.254',
			'192.168.20.253',
			'192.168.20.252',
			'192.168.20.251',
			'192.168.20.250',
			'192.168.20.202'
		];


	hosts.forEach(function (host) {
		    ping.promise.probe(host)
		        .then(function (res) {

		        if(/unreachable/.test(res.output) || /100% loss/.test(res.output)){

			        api.sendMessage({
			    		chat_id: 14910151,
			    		text: "*La ip " + host + " no está respondiendo correctamente al ping*",
			    		parse_mode:"Markdown"
			    	});
		        }
	        })
	        .done();
		});
},10000);