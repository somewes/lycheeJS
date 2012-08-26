
lychee.define('game.state.Game').requires([
	'game.World'
]).includes([
	'lychee.game.State',
]).exports(function(lychee, global) {

	var _game = game;

	var Class = function(game) {

		lychee.game.State.call(this, game, 'menu');

		this.__input = this.game.input;
		this.__loop = this.game.loop;
		this.__renderer = this.game.renderer;

		this.__clock = 0;
		this.__entities = {};
		this.__locked = false;

		this.init();

	};


	Class.prototype = {

		init: function() {

			this.__entities.hint = new game.entity.Text(
				'Loading...',
				this.game.fonts.normal, {
					position: {
						x: 'center',
						y: -200
					}
				}
			);

		},

		enter: function() {

			lychee.game.State.prototype.enter.call(this);


			this.__locked = true;

			this.__entities.hint.setPosition({
				y: -200
			});


			var width = this.game.settings.width;
			var height = this.game.settings.height;
			var tile = this.game.settings.tile;


			this.__world = new _game.World('level1', {
				width: Math.floor(width / tile),
				height: Math.floor(height / tile)
			}, this.game);

			this.__world.bind('ready', function() {

				this.__entities.hint.setText('Ready!');

				this.__locked = false;

				if (lychee.debug === true) {
					console.log('game.World', this.__world);
				}

			}, this);


			this.__entities.hint.setTween(500, {
				y: 60
			}, lychee.game.Entity.TWEEN.easeOut);


			this.__input.bind('touch', this.__processTouch, this);
			this.__renderer.start();


			this.__world.load('level1');

		},

		leave: function() {

			this.__renderer.stop();
			this.__input.unbind('touch', this.__processTouch);


			lychee.game.State.prototype.leave.call(this);

		},

		update: function(clock, delta) {

			for (var e in this.__entities) {
				if (this.__entities[e] === null) continue;
				this.__entities[e].update(clock, delta);
			}

			this.__clock = clock;

		},

		render: function(clock, delta) {

			this.__renderer.clear();


			for (var e in this.__entities) {
				if (this.__entities[e] === null) continue;
				this.__renderer.renderText(this.__entities[e]);
			}


			this.__renderer.flush();

		},

		__processTouch: function(position, delta) {

			if (this.__locked === true) return;

			if (this.game.settings.sound === true) {
				this.game.jukebox.play('click');
			}

		}

	};


	return Class;

});
