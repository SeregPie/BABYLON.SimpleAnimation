import Object_is from './is';
import String_is from '../String/is';

export default function(object, path) {
	if (String_is(path)) {
		path = path.split('.');
	}
	for (let i = 0, ii = path.length; i < ii; i++) {
		if (!Object_is(object)) {
			return;
		}
		object = object[path[i]];
	}
	return object;
}
