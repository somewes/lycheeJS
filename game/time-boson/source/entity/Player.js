
lychee.define('game.entity.Player').includes([
	'lychee.game.Entity'
]).exports(function(lychee, global) {

	var Class = function(settings) {

		settings.shape = lychee.game.Entity.SHAPE.circle;
		settings.collision = lychee.game.Entity.COLLISION.A;

		lychee.game.Entity.call(this, settings);

	};


	Class.prototype = {

	};


	return Class;

});

