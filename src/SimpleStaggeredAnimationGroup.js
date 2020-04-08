import SimpleAnimationDelay from './SimpleAnimationDelay';
import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	constructor(calculateDelay) {
		super();
		Object.assign(this, {_calculateDelay: calculateDelay});
	}
	get duration() {
		let {
			_animations: animations,
			_calculateDelay: calculateDelay,
		} = this;
		let result = 0;
		let delay = 0;
		animations.forEach((animation, i, {length}) => {
			if (i) {
				delay += calculateDelay(i, length, animation, animations[i - 1]);
			}
			result = Math.max(result, delay + animation.duration);
		});
		return result;
	}
	_run(...args) {
		return Promise
			.resolve()
			.then(() => {
				let {
					_animations: animations,
					_calculateDelay: calculateDelay,
				} = this;
				let promises = [];
				let delay = 0;
				animations.forEach((animation, i, {length}) => {
					let promise = Promise.resolve();
					if (i) {
						delay += calculateDelay(i, length, animation, animations[i - 1]);
						let animationDelay = new SimpleAnimationDelay(delay);
						promise = promise.then(() => animationDelay.run(...args));
					}
					promise = promise.then(() => animation.run(...args));
					promises.push(promise);
				});
				return Promise.all(promises);
			})
			.then(() => {
				// pass
			});
	}
}
