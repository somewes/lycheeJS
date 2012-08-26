
lychee.define('game.Renderer').requires([
	'game.entity.Text',
	'game.entity.Player'
]).includes([
	'lychee.Renderer'
]).exports(function(lychee, global) {

	var Class = function(id) {

		lychee.Renderer.call(this, id);

		this.settings = lychee.extend({}, this.defaults);

	};

	Class.prototype = {

		renderText: function(entity) {

			var pos = entity.getPosition();
			this.drawText(entity.text, pos.x, pos.y, entity.font, null);

		}

	};


	return Class;

});

