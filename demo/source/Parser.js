
lychee.define('demo.Parser').requires([
	'demo.Main',
	'lychee.Parser',
	'lychee.ui.*'
]).exports(function(lychee, global) {


	var Class = function(settings) {

		this.settings = lychee.extend({}, this.defaults, settings);


		this.__ast = null;
		this.__parser = null;


		this.__input = new lychee.ui.Textarea(this.settings.code, function() {
			this.__refresh();
		}, this);

		this.__output = new lychee.ui.Textarea('');


		demo.Main.get('navi').add('Exigent Mode', new lychee.ui.Checkbox(this.settings.exigent, function(state) {
			this.settings.state = state;
			this.__refresh();
		}, this));

		demo.Main.get('navi').add(null, new lychee.ui.Button('refresh', function() {
			this.__refresh();
		}, this), true);


		demo.Main.get('main').add(this.__input);
		demo.Main.get('main').add(this.__output);


		this.__refresh();

	};


	Class.prototype = {

		defaults: {
			code: null,
			exigent: false
		},

		__notify: function(error) {

			var notification = document.createElement('p');
			notification.className = 'notification';

			var message = 'Position ' + error.position;
			message += ' , Line ' + error.line;
			message += ' , Column ' + error.column;
			message += ':<br>"' + error.message + '"';

			notification.innerHTML = message;


			demo.Main.get('main').addFirst(notification);


			setTimeout(function() {
				notification.parentNode.removeChild(notification);
			}, 10000);

		},

		__refresh: function() {

			var code = this.__input.get();
			var error = null;

			this.__parser = new lychee.Parser(code, {
				exigent: this.settings.exigent
			});

			this.__ast = [];


			try {
				this.__ast = this.__parser.getAST();
			} catch(err) {
				error = err;
			}


			if (error !== null) {
				this.__notify(error);
			}



			var str = JSON.stringify(
				this.__ast,
				null,
				' '
			);

			this.__output.set(str);

		}

	};


	return Class;

});

