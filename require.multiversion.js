/**
 * @license MIT http://mu-lib.mit-license.org/
 */
define(function () {
	"use strict";

	/**
	 * RequireJS multiversion plugin
	 * @class mu-lib.requirejs.multiversion
	 * @static
	 * @alias plugin.requirejs
	 */

	var UNDEFINED;
	var RE = /(.+?)#(.+)$/;
	var RE_EMPTY = /^empty:/;
	var CONTEXTS = require.s.contexts;

	return {
		"load" : function (name, parentRequire, onload) {
			var context;
			var matches;

			// if name matches RE
			// matches[0] : module name with context - "module/name#context"
			// matches[1] : module name - "module/name"
			// matches[2] : context name - "context"
			if ((matches = RE.exec(name)) !== null) {
				name = matches[1];
				context = matches[2];

				if (context in CONTEXTS) {
					parentRequire = CONTEXTS[context].require;
				}
			}

			if (RE_EMPTY.test(parentRequire.toUrl(name + ".js"))) {
				onload(UNDEFINED);
			}
			else {
				parentRequire([ name ], function (module) {
					onload(module);
				}, onload.error);
			}
		}
	};
});
