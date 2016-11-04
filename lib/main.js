var path = require('path');
var loaderUtils = require('loader-utils');
var tplPattern = /class="([^"']+)"/g;
var cssPattern = /\.\$\(([^()]+)\)/g;

function getHashDigest(str) {
	return loaderUtils.getHashDigest(str, 'md5', 'base64', 8);
}

module.exports = function(content) {
	var query = loaderUtils.parseQuery(this.query);
	var resourcePath = this.resourcePath.replace(query.root, '');
	var pathInfo = path.parse(resourcePath);

	if (query.type === 'html') {
		return content.replace(tplPattern, function(m, classname) {
			var classnames = classname.split(' ').map(function(name) {
				if (name.charAt(0) === '$') {
					name = path.join(pathInfo.dir, pathInfo.name, name.slice(1));
					return getHashDigest(name);
				} 
				return name;
			});
			return `class="${classnames.join(' ')}"`;
		});
	}

	else if (query.type === 'css') {
		return content.replace(cssPattern, function(m, classname) {
			var name = path.join(pathInfo.dir, pathInfo.name, classname);
			return `.${getHashDigest(name)}`;
		});
	}

	else 
		return content;
}