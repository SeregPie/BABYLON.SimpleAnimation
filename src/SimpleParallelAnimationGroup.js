import SimpleAnimationDelay from './SimpleAnimationDelay';
import SimpleAnimationGroup from './SimpleAnimationGroup';

let ALIGNMENT = {
	CENTER: 0,
	START: 1,
	END: 2,
};

export default Object.assign(class extends SimpleAnimationGroup {
	constructor({
		alignment = ALIGNMENT.CENTER,
	} = {}) {
		super();
		Object.assign(this, {alignment});
	}
	get duration() {
		let {_animations: animations} = this;
		return animations.reduce((r, {duration}) => Math.max(r, duration), 0);
	}
	_run(...args) {
		return Promise
			.resolve()
			.then(() => {
				let {
					_animations: animations,
					alignment,
					duration,
				} = this;
				let promises = [];
				animations.forEach(animation => {
					let delay = (() => {
						switch (alignment) {
							case ALIGNMENT.CENTER:
								return (duration - animation.duration) / 2;
							case ALIGNMENT.START:
								return 0;
							case ALIGNMENT.END:
								return duration - animation.duration;
						}
					})();
					let promise = Promise.resolve();
					if (delay) {
						promise = promise.then(() => (new SimpleAnimationDelay(delay)).run(...args));
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
}, {
	ALIGNMENT,
});
