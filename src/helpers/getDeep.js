export default function(object, path) {
	path = path.split('.');
	for (let i = 0, ii = path.length; i < ii; i++) {
		object = object[path[i]];
	}
	return object;
}
