/**
 * Directory Entity
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 *
 * @param {string} name
 * @constructor
 */
function Directory(name)
{
    this.name = name;
    this.fullPath = '';
    this.size = 0;
    this.directories = [];
    this.objects = [];
}

/**
 * @access public
 * @param {Directory} directory
 * @return {Directory}
 */
Directory.prototype.addDirectory = function (directory) {
    if (! (directory instanceof Directory)) {
        throw 'Variable "directory" must be an instance of Directory.';
    }

    for (var i = 0, l = this.directories.length; i < l; ++i) {
        if (directory.getName() === this.directories[i].getName()) {
            return this.directories[i];
        }
    }

    this.directories.push(directory);
    return directory;
};

/**
 * @access public
 * @return {Directory[]}
 */
Directory.prototype.getDirectories = function () {
    return this.directories;
};

/**
 * @access public
 * @return {string}
 */
Directory.prototype.getFullPath = function () {
    return this.fullPath;
};

/**
 * @access public
 * @param {string} path
 * @return {Directory}
 */
Directory.prototype.setFullPath = function (path) {
    if ('string' !== typeof path) {
        throw 'Variable "path" should be a string.';
    }

    this.fullPath = path;
    return this;
};

/**
 * @access public
 * @return {string}
 */
Directory.prototype.getName = function () {
    return this.name;
};

/**
 * @access public
 * @param {string} name
 * @return {Directory}
 */
Directory.prototype.setName = function (name) {
    this.name = name;
    return this;
};

/**
 * @access public
 * @param {ContainerObject} object
 * @return {Directory}
 */
Directory.prototype.addObject = function (object) {
    if (! (object instanceof ContainerObject)) {
        throw 'Variable "object" must be an instance of ContainerObject.';
    }

    this.objects.push(object);
    return this;
};

/**
 * @access public
 * @return {ContainerObject[]}
 */
Directory.prototype.getObjects = function () {
    return this.objects;
};

/**
 * @access public
 * @param {number} size
 * @return {Directory}
 */
Directory.prototype.addSize = function (size) {
    if ('number' !== typeof size || 0 !== size % 1) {
        throw 'Size must be an integer (in bytes).';
    }

    this.size = (this.size + size);
    return this;
};