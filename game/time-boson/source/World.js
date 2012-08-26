
lychee.define('game.World').requires([
	'game.entity.Player'
]).includes([
	'lychee.Events'
]).exports(function(lychee, global) {

	var _game = game;

	var Class = function(level, settings, game) {

		this.game = game;
		this.settings = lychee.extend({}, this.defaults, settings);

		lychee.Events.call(this, 'world');

	};


	Class.prototype = {

		defaults: {
			width: 10,
			height: 10,
			tile: 32
		},

		load: function(level) {

			var base = this.game.settings.base;

			var urls = [
				base + '/world/' + level + '.json'
				// base + '/world/player.png'
			];


			this.preloader = new lychee.Preloader({
				timeout: 3000
			});

			this.preloader.bind('ready', function(assets) {

				this.assets = assets;

				this.init(assets[urls[0]]);

			}, this);

			this.preloader.bind('error', function(urls) {
				if (lychee.debug === true) {
					console.warn('Preloader error for these urls: ', urls);
				}
			}, this);

			this.preloader.load(urls);

		},

		reset: function() {

			this.__entities = [];
			this.__linkedEntities = {};

		},

		init: function(data) {

			this.reset();


			for (var e = 0, l = data.entities.length; e < l; e++) {

				var raw = data.entities[e];
				var type = raw.entity || null;
				var id = raw.id || null;

				if (type !== null) {

					var entity = new _game.entity[type](raw.data);
					this.__entities.push(entity);

					if (id !== null) {
						this.__linkedEntities[id] = entity;
					}

				}

			}


			this.trigger('ready', []);

		},

		getEntityById: function(id) {

			id = typeof id === 'string' ? id : null;

			if (id !== null) {
				return this.__linkedEntities[id] || null;
			}

			return null;

		}

	};


	return Class;

});
