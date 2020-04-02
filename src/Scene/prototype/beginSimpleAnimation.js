import {Scene} from '@babylonjs/core/scene';

Scene.prototype.beginSimpleAnimation = function(animation) {
	let promise = animation.run(this);
	return {
		waitAsync() {
			return promise;
		},
	};
};
