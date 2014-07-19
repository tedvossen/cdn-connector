/**
 * Container Entity
 *
 * The Container normalizes the response from a vendor endpoint. Instead of
 * using the response from an HTTP request directly, each vendor should use a
 * Container to pass information to the CDN methods.
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 *
 * @param {string} name
 */
function Container(name)
{
    this.name = name;
    this.size = 0;
    this.rootDirectory = new Directory('/');
}

/**
 * @access private
 * @param {number} integer
 * @return bool
 */
Container.prototype.isInteger = function (integer) {
    return ('number' === typeof integer && 0 === integer % 1);
};

/**
 * @access public
 * @param {Array|string} path
 * @return {Directory}
 */
Container.prototype.makeDirectory = function (path) {
    if ('string' === typeof path) {
        path = path.split('/');
    }

    var parent = this.getRootDirectory();
    var fullPath = [];

    while (path.length > 0) {
        var name = path.shift();
        fullPath.push(name);

        var sub = new Directory(name)
            .setFullPath(fullPath.join('/'));

        parent = parent.addDirectory(sub);
    }

    return parent;
};

/**
 * @access public
 * @return {Directory}
 */
Container.prototype.getRootDirectory = function () {
    return this.rootDirectory;
};

/**
 * @access public
 * @return {string}
 */
Container.prototype.getName = function () {
    return this.name;
};

/**
 * @access public
 * @param {number} size
 * @return {Container}
 */
Container.prototype.addSize = function (size) {
    if (! this.isInteger(size)) {
        throw 'Size must be an integer (in bytes).';
    }

    this.size = (this.size + size);
    return this;
};

/**
 * @access public
 * @return {number}
 */
Container.prototype.getSize = function () {
    return this.size;
};

/**
 * @access public
 * @return {string}
 */
Container.prototype.getSizeHumanReadable = function () {
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var size = this.getSize();
    while (size > 1024) {
        size = size / 1024;
        units.shift();
    }

    size = (Math.round(size * 100) / 100);

    return size + ' ' + units.shift();
};

Container.prototype.toString = function () {
    return JSON.stringify(this);
};