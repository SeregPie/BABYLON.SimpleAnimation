import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	get duration() {
		return this._children.reduce((r, {duration}) => r + duration, 0);
	}
	_run(...args) {
		return Promise
			.resolve()
			.then(() => {
				let promise = Promise.resolve();
				this._children.forEach(child => {
					promise = promise.then(() => child.run(...args));
				});
				return promise;
			})
			.then(() => {
				// pass
			});
	}
}
