import SimpleAnimation from './SimpleAnimation';

export default class extends SimpleAnimation {
	constructor(duration) {
		super();
		Object.assign(this, {duration});
	}
	_run() {
		return new Promise(resolve => {
			let {duration} = this;
			setTimeout(resolve, duration);
		});
	}
}
