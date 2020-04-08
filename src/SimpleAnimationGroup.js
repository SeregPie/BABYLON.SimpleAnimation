import SimpleAnimation from './SimpleAnimation';

export default class extends SimpleAnimation {
	constructor() {
		super();
		Object.assign(this, {_animations: []});
	}
	add(...animations) {
		this._animations.push(...animations);
		return this;
	}
}
