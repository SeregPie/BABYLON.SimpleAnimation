import SimpleAnimationDelay from './SimpleAnimationDelay';
import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	constructor(calculateDelay) {
		super();
		Object.assign(this, {_calculateDelay: calculateDelay});
	}
	get duration() {
		let {
			_calculateDelay: calculateDelay,
			_children: children,
		} = this;
		let result = 0;
		let delay = 0;
		children.forEach((child, i, {length}) => {
			if (i) {
				delay += calculateDelay(i, length, child, children[i - 1]);
			}
			result = Math.max(result, delay + child.duration);
		});
		return result;
	}
	_run(...args) {
		return Promise
			.resolve()
			.then(() => {
				let {
					_calculateDelay: calculateDelay,
					_children: children,
				} = this;
				let promises = [];
				let delay = 0;
				children.forEach((child, i, {length}) => {
					let promise = Promise.resolve();
					if (i) {
						delay += calculateDelay(i, length, child, children[i - 1]);
						let animation = new SimpleAnimationDelay(delay);
						promise = promise.then(() => animation.run(...args));
					}
					promise = promise.then(() => child.run(...args));
					promises.push(promise);
				});
				return Promise.all(promises);
			})
			.then(() => {
				// pass
			});
	}
}
