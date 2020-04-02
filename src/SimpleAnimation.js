import {Observable} from '@babylonjs/core/Misc/observable';

export default class {
	constructor() {
		Object.assign(this, {
			onAnimationEndObservable: new Observable(),
			onAnimationStartObservable: new Observable(),
		});
	}
	run(...args) {
		return Promise
			.resolve()
			.then(() => {
				this.onAnimationStartObservable.notifyObservers();
			})
			.then(() => this._run(...args))
			.then(() => {
				this.onAnimationEndObservable.notifyObservers();
			});
	}
}
