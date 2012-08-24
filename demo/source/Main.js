
lychee.define('demo.Main').exports(function(lychee, global) {

	var _elements = {
		main: document.getElementById('demo-main') || null,
		navi: document.getElementById('demo-navi') || null,
		log: document.getElementById('demo-log') || null
	};


	var Module = {

		get: function(id) {

			if (Module.WRAPPERS[id] !== undefined) {
				return Module.WRAPPERS[id];
			}


			return null;

		},

		log: function(text, reverse, force) {

			reverse = reverse === true ? true : false;
			force = force === true ? true : false;

			if (_elements.log !== null && force === false) {

				var item = document.createElement('li');
				item.innerHTML = text;

				if (reverse === true) {
					_elements.log.appendChild(item);
				} else {
					_elements.log.insertBefore(item, _elements.log.firstChild);
				}

			} else {

				console.log(text);

			}

		},

		__add: function(id, element, before) {

			before = before || null;

			if (!element) return;

			if (element.addTo) {
				element.addTo(_elements[id]);
			} else if (element instanceof HTMLElement) {

				if (before !== null) {
					_elements[id].insertBefore(element, before);
				} else {
					_elements[id].appendChild(element);
				}

			}

		}

	};


	Module.WRAPPERS = {

		navi: {

			add: function(label, element, force) {

				label = typeof label === 'string' ? label : null;
				force = force === true ? true : false;

				if (label !== null) {

					var _label = document.createElement('label');
					_label.innerHTML = label;
					Module.__add('navi', _label);

				}


				if (element !== null) {
					Module.__add('navi', element);
				}


				if (label !== null || force === true) {
					Module.__add('navi', document.createElement('br'));
				}

			}

		},

		main: {

			add: function(element) {
				Module.__add('main', element);
			},

			addFirst: function(element) {
				Module.__add('main', element, _elements.main.firstChild);
			}

		}

	};

	return Module;

});

