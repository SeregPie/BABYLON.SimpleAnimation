export default function(target, path) {
	path = path.split('.');
	while (path.length) {
		target = target[path.shift()];
	}
	return target;
}
