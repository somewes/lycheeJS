
lychee.define('lychee.physics.Particle').requires([
	'lychee.physics.Vector'
]).exports(function(lychee, global) {

	var _physics = lychee.physics;

	var Class = function(data) {

		var settings = lychee.extend({}, this.defaults, data);

		this.__damping = settings.damping || 1;
		this.__invertedMass = null;


		this.setPropertyVector('position',     settings.position);
		this.setPropertyVector('acceleration', settings.acceleration);
		this.setPropertyVector('velocity',     settings.velocity);
		this.setPropertyVector('force',        settings.force);

		this.setMass(settings.mass);

	};


	Class.prototype = {

		update: function(clock, delta) {

			if (this.__inverseMass === null)  return;

			var dt = delta / 1000;
			if (dt > 0) {

				this.position.x += this.velocity.x * dt;
				this.position.y += this.velocity.y * dt;
				this.position.z += this.velocity.z * dt;


				this.velocity.x += (this.acceleration.x + this.force.x * this.__inverseMass) * dt;
				this.velocity.y += (this.acceleration.y + this.force.y * this.__inverseMass) * dt;
				this.velocity.z += (this.acceleration.z + this.force.z * this.__inverseMass) * dt;


				var damping = Math.pow(this.__damping, dt);

				this.velocity.x *= damping;
				this.velocity.y *= damping;
				this.velocity.z *= damping;


				this.force.clear();

			}

		},

		defaults: {
			damping: 0,

			position: {
				x: 0, y: 0, z: 0
			},
			acceleration: {
				x: 0, y: 0, z: 0
			},
			force: {
				x: 0, y: 0, z: 0
			},
			velocity: {
				x: 0, y: 0, z: 0
			}
		},

		getMass: function() {

			if (this.__invertedMass !== null) {
				return (1 / this.__invertedMass);
			}

			return Infinity;

		},

		setMass: function(mass) {

			if (mass !== 0) {
				this.__invertedMass = 1 / mass;
			}

		},

		setPropertyVector(property, data) {

			if (Object.prototype.toString.call(data) === '[object Object]') {

				this[property] = new _Vector(
					typeof data.x === 'number' ? data.x : 0,
					typeof data.y === 'number' ? data.y : 0,
					typeof data.z === 'number' ? data.z : 0
				);

			}

		}

	};


	return Class;

});

