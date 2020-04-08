import {Animation} from '@babylonjs/core/Animations/animation';
import {
	Color3,
	Color4,
} from '@babylonjs/core/Maths/math.color';
import {Size} from '@babylonjs/core/Maths/math.size';
import {
	Matrix,
	Quaternion,
	Vector2,
	Vector3,
} from "@babylonjs/core/Maths/math.vector";

Animation.GuessAnimationType = function(value) {
	if (value instanceof Vector3) {
		return Animation.ANIMATIONTYPE_VECTOR3;
	}
	if (value instanceof Quaternion) {
		return Animation.ANIMATIONTYPE_QUATERNION;
	}
	if (value instanceof Matrix) {
		return Animation.ANIMATIONTYPE_MATRIX;
	}
	if (value instanceof Color3) {
		return Animation.ANIMATIONTYPE_COLOR3;
	}
	if (value instanceof Color4) {
		return Animation.ANIMATIONTYPE_COLOR4;
	}
	if (value instanceof Vector2) {
		return Animation.ANIMATIONTYPE_VECTOR2;
	}
	if (value instanceof Size) {
		return Animation.ANIMATIONTYPE_SIZE;
	}
	return Animation.ANIMATIONTYPE_FLOAT;
};
