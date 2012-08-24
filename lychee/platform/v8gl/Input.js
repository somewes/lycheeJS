
lychee.define('Input').tags({
	platform: 'v8gl'
}).includes([
	'lychee.Events'
]).exports(function(lychee, global) {

	var _alreadyBound = false;
	var _support = {};

	var Class = function(settings) {

		this.settings = lychee.extend({}, this.defaults, settings);
		this.reset();

		lychee.Events.call(this, 'input');
		this.__init();

	};


	Class.prototype = {

		defaults: {
			delay: 200,
			fireModifier: false,
			fireSwipe: false
		},

		KEYMAP: {
		},



		/*
		 * PRIVATE API
		 */
		__init: function() {

			var that = this;

			if (_alreadyBound === true) return;


			var supportsMouse = 'mouseFunc' in global.glut && 'motionFunc' in global.glut;
			if (supportsMouse === true) {

				if (this.settings.fireSwipe === true) {

					glut.mouseFunc(function(button, state, x, y) {

						if (button === glut.LEFT_BUTTON) {

							if (state === glut.DOWN) {
								that.__processTouch(x, y);
							} else if (state === glut.UP) {
								that.__processSwipe('end', x, y);
							}

						}

					});

					glut.motionFunc(function(x, y) {
						that.__processSwipe('move', x, y);
					});

				} else {

					glut.mouseFunc(function(button, state, x, y) {

						if (button === glut.LEFT_BUTTON && state === glut.DOWN) {
							that.__processTouch(x, y);
						}

					});

				}

			}


			var supportsKeyboard = false;
			var supportsTouch = false;
			var supportsPointer = false;


			_support.keyboard = supportsKeyboard;
			_support.mouse = supportsMouse;
			_support.touch = supportsTouch;
			_support.pointer = supportsPointer;

			_alreadyBound = true;


			if (lychee.debug === true) {

				var message = 'lychee.Input: Supported input methods are ';

				var methods = [];

				if (supportsKeyboard) methods.push('Keyboard');
				if (supportsMouse) methods.push('Mouse');
				if (supportsTouch) methods.push('Touch');
				if (supportsPointer) methods.push('Pointer');

				if (methods.length === 0) methods.push("NONE");

				message += methods.join(', ');

				console.log(message);

			}

		},

		__processTouch: function(x, y) {

			var delta = Date.now() - this.__last.touch;
			if (delta < this.settings.delay) {
				return;
			}


			this.trigger('touch', [ { x: x, y: y }, delta ]);


			for (var id in this.__touchareas) {

				var toucharea = this.__touchareas[id];
				if (toucharea === null) continue;

				if (
					x > toucharea.x1 && x < toucharea.x2
					&& y > toucharea.y1 && y < toucharea.y2
				) {
					this.trigger('toucharea-' + toucharea.id, [ delta ]);
				}

			}

			this.__last.touch = Date.now();


			if (this.__swipe === null && this.settings.fireSwipe === true) {

				this.trigger('swipe', [ 'start', { x: x, y: y }, delta ]);

				this.__swipe = {
					x: x,
					y: y
				};

			}

		},

		__processSwipe: function(state, x, y) {

			if (this.__swipe === null) return;

			var delta = Date.now() - this.__last.swipe;
			if (delta < this.settings.delay) {
				return;
			}


			var position = {
				x: x,
				y: y
			};

			var swipe = {
				x: position.x - this.__swipe.x,
				y: position.y - this.__swipe.y
			};


			if (state === 'move') {

				this.trigger('swipe', [ 'move', position, delta, swipe ]);

			} else if (state === 'end') {

				this.trigger('swipe', [ 'end', position, delta, swipe ]);
				this.__swipe = null;

			}

			this.__last.swipe = Date.now();

		},



		/*
		 * PUBLIC API
		 */
		reset: function() {

			this.__touchareas = {};
			this.__swipe = null;
			this.__last = {
				key: Date.now(),
				touch: Date.now(),
				swipe: Date.now()
			};

		},

		get: function(key) {
			return this.settings[key] || null;
		},

		getSupport: function() {
			return _support;
		},

		set: function(key, value) {

			if (this.settings[key] !== undefined) {

				value = value !== undefined ? value : this.defaults[key];
				this.settings[key] = value;

				return true;

			}


			return false;

		},

		addToucharea: function(id, box) {

			id = typeof id === 'string' ? id : null;

			if (id !== null && Object.prototype.toString.call(box) === '[object Object]') {

				var toucharea = {
					id: id,
					x1: box.x1 || 0,
					x2: box.x2 || Infinity,
					y1: box.y1 || 0,
					y2: box.y2 || Infinity
				};

				this.__touchareas[toucharea.id] = toucharea;

				return true;

			}


			return false;

		},

		removeToucharea: function(id) {

			id = typeof id === 'string' ? id : null;

			if (id !== null && this.__touchareas[id] !== undefined) {

				this.__touchareas[id] = null;
				return true;

			}


			return false;

		}

	};


	return Class;

});

