import SimpleAnimationGroup from './SimpleAnimationGroup';

export default class extends SimpleAnimationGroup {
	get duration() {
		return this._children.reduce((r, {duration}) => Math.max(r, duration), 0);
	}
	_run(...args) {
		return Promise
			.all(this._children.map(child => child.run(...args)))
			.then(() => {
				// pass
			});
	}
}
