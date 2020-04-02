import {Animation} from '@babylonjs/core/Animations/animation';
import SimpleAnimation from './SimpleAnimation';

import getDeep from './helpers/getDeep';
import guessAnimationType from './helpers/guessAnimationType';

export default class extends SimpleAnimation {
	constructor({
		target,
		property,
		type,
		from,
		to,
		duration,
		easing,
	}) {
		super();
		Object.assign(this, {
			duration,
			easing,
			from,
			property,
			target,
			to,
			type,
		});
	}
	_run(scene) {
		return Promise.resolve().then(() => {
			let fps = 60;
			let {
				duration,
				easing,
				from,
				property,
				target,
				to,
				type,
			} = this;
			if (from === undefined) {
				from = getDeep(target, property);
			}
			if (type === undefined) {
				type = guessAnimationType(from);
			}
			let animation = new Animation(
				'',
				property,
				fps,
				type,
				Animation.ANIMATIONLOOPMODE_CONSTANT,
			);
			let fromFrame = 0;
			let toFrame = fromFrame + Math.round(duration / 1000 * fps);
			let keys = [
				{
					frame: fromFrame,
					value: from,
				},
				{
					frame: toFrame,
					value: to,
				},
			];
			animation.setKeys(keys);
			if (easing !== undefined) {
				animation.setEasingFunction(easing);
			}
			let animatable = scene.beginDirectAnimation(
				target,
				[animation],
				fromFrame,
				toFrame,
			);
			return animatable.waitAsync();
		});
	}
}
