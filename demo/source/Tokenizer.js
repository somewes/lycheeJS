
lychee.define('demo.Tokenizer').requires([
	'demo.Main',
	'lychee.Tokenizer',
	'lychee.ui.*'
]).exports(function(lychee, global) {


	var Class = function(settings) {

		this.settings = lychee.extend({}, this.defaults, settings);


		this.__tokens = null;
		this.__tokenizer = new lychee.Tokenizer(this.settings.code);


		this.__input = new lychee.ui.Textarea(this.settings.code, function() {
			this.__refresh();
		}, this);
		this.__input.bind('select', this.__onSelect, this);
		demo.Main.get('main').add(this.__input);


		this.__output = new lychee.ui.Textarea('');
		demo.Main.get('main').add(this.__output);


		demo.Main.get('navi').add(null, new lychee.ui.Button('refresh', function() {
			this.__refresh();
		}, this), true);


		this.__refresh();

	};


	Class.prototype = {

		defaults: {
			code: null
		},

		__onSelect: function(start, end) {

			this.__refresh();


			var found = null;
			var maybe = null;
			for (var t = 0, l = this.__tokens.length; t < l; t++) {

				var token = this.__tokens[t];

				if (
					token.position >= start - 1
					&& token.endposition <= end + 1
				) {
					maybe = token;
				}


				if (
					token.position === start
					&& token.endposition === end
				) {
					found = token;
					break;
				}

			}


			if (found === null && maybe !== null) {
				found = maybe;
			}


			if (found !== null) {

				var lines = this.__output.get().split('\n');
				var count = 0;

				for (var l = 0, ll = lines.length; l < ll; l++) {

					var line = lines[l].replace(/^\s+|\s+$/g,'');
					if (line === '"endposition": ' + found.endposition + ',') {
						break;
					}

					count++;

				}


				// endposition is the 5th property of each token
				this.__output.scrollTo(count - 6);

			}


		},

		__refresh: function() {

			this.__tokens = [];
			this.__tokenizer.reset(this.__input.get());


			var token = null;
			while (token = this.__tokenizer.next()) {

				this.__tokens.push(token);

				if (token && token.type === 'EOF') {
					break;
				}

			}


			var str = JSON.stringify(
				this.__tokens,
				null,
				'\t'
			);

			this.__output.set(str);

		}

	};


	return Class;

});

