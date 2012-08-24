
lychee.define('lychee.ASTCompressor').requires([
	'lychee.ASTScope',
	'lychee.ASTWalker'
]).exports(function(lychee, global) {

	var Class = function(ast, settings) {

		this.settings = lychee.extend({}, this.defaults, settings);


		if (Object.prototype.toString.call(ast) === '[object Array]') {
			this.__ast = ast;
		} else {
			this.__ast = [];
		}


		this.__walker = new lychee.ASTWalker();

		this.__currentScope = null;
		this.__previousScope = null;
		this.__globalScope = null;

	};


	Class.prototype = {

		/*
		 * PUBLIC API
		 */
		defaults: {
			mangle: true,
			root: false,
			defines: null,
			except: null,
			functions: true
		},

		walk: function(current) {

			var type = current[0];
			var result = null;

			if (lychee.debug === true) {
				console.log('walk: ' + type);
			}

			if (this.WALKERS[type] !== undefined) {
				result = this.WALKERS[type].call(this, current);
			} else {
//				result = this.WALKERS['DEFAULT'].call(this, current);
			}

			return result || current;

		},

		getAST: function() {

			// var uncompressedAST = this.__ast;
			// var compressedAST = this.__walker.walkWith(uncompressedAST, this.walk, this);

			var uncompressedAST = this.__walker.walk(this.__ast);

console.log('COMPRESSING AST:', uncompressedAST);

			var compressedAST = this.walk(uncompressedAST);


console.log('DONE.', compressedAST);

		},


		/*
		 * PRIVATE API
		 */
		WALKERS: {

			'DEFAULT': function(current) {

				if (current[1] && current[1].length) {
					this.walk(current[1]);
				}

				return current;

			},

			'ROOT': function(current) {

				this.__stack = [];

				var scope = new lychee.ASTScope(current, null);
				this.__stack.push(scope);


				if (current[1] !== null) {

					for (var a = 0, l = current[1].length; a < l; a++) {
						this.walk(current[1][a]);
					}

				}

			},

			'stat': function(current) {
				this.walk(current[1]);
			},

			'call': function(current) {

				this.walk(current[1]);
				// this.__getScope.setArguments(current[2]);

			},

			'function': function(current) {

				console.log('function', current);

				this.__onFunctionStart(current);


				// walk the function body
				for (var b = 0, l = current[3].length; b < l; b++) {
					this.walk(current[3][b]);
				}

				this.__onFunctionEnd(current);

			},

			'var': function(current) {

				var list = current[1];
				var scope = this.__getScope();
				for (var l = 0, ll = list.length; l < ll; l++) {

					// name, type, ast
					scope.addLocalReference(list[l][0], list[l][1][0], list[l][1]);

				}


console.log('var>>>', current);

			}

		},

		__onFunctionStart: function(func) {

			var parent = this.__getScope();
			var scope = new lychee.ASTScope(func, parent);

			this.__stack.push(scope);

		},

		__onFunctionEnd: function(func) {
			this.__stack.pop();
		},

		__getScope: function() {

			if (this.__stack.length >= 1) {
				return this.__stack[this.__stack.length - 1];
			}


			return null;

		}


	};


	return Class;

});
