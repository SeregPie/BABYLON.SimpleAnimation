import SimpleAnimation from './SimpleAnimation';

export default class extends SimpleAnimation {
	constructor() {
		super();
		Object.assign(this, {_children: []});
	}
	add(...children) {
		this._children.push(...children);
		return this;
	}
}
