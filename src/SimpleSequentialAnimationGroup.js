import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	get duration() {
		return this._animations.reduce((r, {duration}) => r + duration, 0);
	}
	_run(...args) {
		return Promise
			.resolve()
			.then(() => {
				let promise = Promise.resolve();
				this._animations.forEach(animation => {
					promise = promise.then(() => animation.run(...args));
				});
				return promise;
			})
			.then(() => {
				// pass
			});
	}
}
