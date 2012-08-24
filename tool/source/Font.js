
lychee.define('tool.Font').requires([
	'demo.Main',
	'tool.FontGenerator',
	'lychee.ui.*'
]).exports(function(lychee, global) {


	var Class = function(settings) {

		this.settings = lychee.extend({}, this.defaults, settings);

		this.__generator = new tool.FontGenerator(null);
		this.__generator.bind('ready', this.show, this);

		this.__lightbox = new lychee.ui.Lightbox('demo-lightbox', 'Exported Font');
		demo.Main.get('main').add(this.__lightbox);


		this.__initUI();

	};


	Class.prototype = {

		defaults: {
			font: 'Arial',
			size: 64,
			color: '#fff',
			style: 'normal',
			spacing: 5,
			outline: 2,
			outlineColor: '#000',
			background: 'transparent',
			firstChar: 32,
			lastChar: 127,
			spritemap: global.tool.FontGenerator.SPRITEMAP.x,

			backend: null

		},



		/*
		 * PUBLIC API
		 */
		show: function(data) {

			if (data === null) return false;

			if (lychee.debug === true) {
				console.log('show', data);
				document.body.style.overflow = 'auto';
			}


			if (
				Object.prototype.toString.call(data) === '[object Object]'
				&& this.__lightbox !== null
			) {

				this.__lightbox.set(null);


				var code, desc, wrapper;

				desc = document.createElement('h3');
				desc.innerHTML = '1. Save Image:';
				this.__lightbox.add(desc);


				wrapper = document.createElement('div');
				wrapper.id = 'demo-lightbox-wrapper';


				var code = '// Preload image(s), then create lychee.Font instance:\n\n';


				if (data.images) {

					for (var i = 0, l = data.images.length; i < l; i++) {
						wrapper.appendChild(data.images[i]);
					}

					code += '// @images {Array}\n';
					code += 'new lychee.Font(\n\timages,\n\t' + data.settings + '\n);';

				} else if (data.sprite) {

					wrapper.appendChild(data.sprite);

					code += '// @image {Image}\n';
					code += 'new lychee.Font(\n\timage,\n\t' + data.settings + '\n);';

				}

				this.__lightbox.add(wrapper);


				desc = document.createElement('h3');
				desc.innerHTML = '2. Use lychee.Font:';
				this.__lightbox.add(desc);


				var textarea = new lychee.ui.Textarea(code);
				this.__lightbox.add(textarea);


				this.__lightbox.show();


				if (
					this.settings.backend !== null
					&& this.settings.spritemap === tool.FontGenerator.SPRITEMAP.none
					&& window.confirm('Do you want to send the sliced images to the server?\nThis will store them in the same folder.') === true
				) {
					this.__sendToBackend(data.images);
				}


				return true;

			}


			return false;

		},


		/*
		 * PRIVATE API
		 */
		__initUI: function() {

			var select = null;
			var options = null;


			var navi = demo.Main.get('navi');


			navi.add('Font Family', new lychee.ui.Input('text', this.settings.font, function(value) {
				this.settings.font = value;
			}, this));

			navi.add('Font Size', new lychee.ui.Input('number', this.settings.size, function(value) {
				this.settings.size = value;
			}, this));


			select = new lychee.ui.Select(function(value) {
				this.settings.style = value;
			}, this);

			new lychee.ui.Option('normal', 'normal').addTo(select);
			new lychee.ui.Option('bold', 'bold').addTo(select);
			new lychee.ui.Option('italic', 'italic').addTo(select);

			select.set(this.settings.style);

			navi.add('Font Style', select);


			navi.add('Color', new lychee.ui.Input('text', this.settings.color, function(value) {
				if (value.charAt(0) === '#') {
					this.settings.color = value;
				} else {
					return false;
				}
			}, this));

			navi.add('Spacing', new lychee.ui.Input('number', this.settings.spacing, function(value) {
				this.settings.spacing = value;
			}, this));

			navi.add('Outline', new lychee.ui.Input('number', this.settings.outline, function(value) {
				this.settings.outline = value;
			}, this));

			navi.add('Outline Color', new lychee.ui.Input('text', this.settings.outlineColor, function(value) {
				if (value.charAt(0) === '#') {
					this.settings.outlineColor = value;
				} else {
					return false;
				}
			}, this));


			select = new lychee.ui.Select(function(value) {
				var _value = global.tool.FontGenerator.SPRITEMAP[value] || this.settings.spritemap;
				this.settings.spritemap = _value;
			}, this);

			new lychee.ui.Option('none (single images)', 'none').addTo(select);
			new lychee.ui.Option('horizontal (x)', 'x').addTo(select);
			new lychee.ui.Option('quadratic (xy)', 'xy').addTo(select);

			select.set(this.settings.spritemap);

			navi.add('Spritemap', select);


			navi.add('Debug Mode', new lychee.ui.Checkbox(false, function(state) {
				lychee.debug = state;
			}, this));


			navi.add(null, new lychee.ui.Button('export', function() {
				this.__generator.export(this.settings);
			}, this));

		},

		__sendToBackend: function(images) {

			if (this.settings.backend !== null) {

				var url = this.settings.backend;
				var id = this.settings.firstChar;

				for (var i = 0, l = images.length; i < l; i++) {

					var data = images[i].src;

					var xhr = new XMLHttpRequest();
					xhr.open('POST', url, false);
					xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
					xhr.send('id=' + id + '&data=' + data);

					id++;

				}

			}

		}

	}


	return Class;

});

