import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	get duration() {
		return this._animations.reduce((r, {duration}) => Math.max(r, duration), 0);
	}
	_run(...args) {
		return Promise
			.all(this._animations.map(animation => animation.run(...args)))
			.then(() => {
				// pass
			});
	}
}
