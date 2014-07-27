/**
 * ContainerObject Entity
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 */
function ContainerObject()
{
    this.hash = '';
    this.lastModified = null;
    this.name = '';
    this.path = '';
    this.size = 0;
    this.type = null;
}

/**
 * @access public
 * @return {string}
 */
ContainerObject.prototype.getHash = function () {
    return this.hash;
};

/**
 * Set a unique hash for this Container Object.
 *
 * @access public
 * @param {string} hash
 * @return {ContainerObject}
 */
ContainerObject.prototype.setHash = function (hash) {
    if ('string' !== typeof hash) {
        throw 'Variable "hash" should be a string.';
    }

    this.hash = hash;
    return this;
};

/**
 * @access public
 * @return {Date|null}
 */
ContainerObject.prototype.getLastModified = function () {
    return this.lastModified;
};

/**
 * @access public
 * @param {Date|string} date
 * @return {ContainerObject}
 */
ContainerObject.prototype.setLastModified = function (date) {
    if ('string' === typeof date) {
        date = this.getDateFromDatestring(date);
    }

    this.lastModified = date;
    return this;
};

/**
 * @access public
 * @return {string}
 */
ContainerObject.prototype.getName = function () {
    return this.name;
};

/**
 * @access public
 * @return {string}
 */
ContainerObject.prototype.getFullName = function () {
    return this.getPath() + this.name;
};

/**
 * @access public
 * @param {string} name
 * @return {ContainerObject}
 */
ContainerObject.prototype.setName = function (name) {
    if ('string' !== typeof name) {
        throw 'Variable "name" should be a string.';
    }

    this.name = name;
    return this;
};

/**
 * @access public
 * @return {string}
 */
ContainerObject.prototype.getPath = function () {
    return this.path;
};

/**
 * This is the (pseudo-)path relative to the root. To get the full path of the
 * file, it should be joined with the name (of the object) with a slash ('/').
 *
 * @access public
 * @param {string} path
 * @return {ContainerObject}
 */
ContainerObject.prototype.setPath = function (path) {
    if ('string' !== typeof path) {
        throw 'Variable "name" should be a string.';
    }

    this.path = path.replace(/\/$/, '') + '/';
    return this;
};

/**
 * @access public
 * @return {number}
 */
ContainerObject.prototype.getSize = function () {
    return this.size;
};

/**
 * @access public
 * @param {number} size
 * @return {ContainerObject}
 */
ContainerObject.prototype.setSize = function (size) {
    if ('number' !== typeof size || 0 !== size % 1) {
        throw 'Variable "size" should be a number.';
    }

    this.size = size;
    return this;
};

/**
 * @access public
 * @return {string}
 */
ContainerObject.prototype.getType = function () {
    return this.type;
};

/**
 * @access public
 * @param {string} type
 * @return {ContainerObject}
 */
ContainerObject.prototype.setType = function (type) {
    if ('string' !== typeof type) {
        throw 'Variable "type" should be a string.';
    }

    // Check for a valid mime-type
    if (! type.match(/\w+\/\w+/)) {
        throw 'Variable "type" should be a valid mime type got: ' + type + '.';
    }

    this.type = type;
    return this;
};

/**
 * @access private
 * @param {string} dateString
 * @return {Date}
 */
ContainerObject.prototype.getDateFromDatestring = function (dateString) {
    // Check for UTC format
    if (dateString.match(/^\d{4}(-\d{2}){2}T\d{2}:\d{2}:\d{2}\.\d{1,6}$/)) {
        return new Date(dateString);
    }

    throw 'Variable "dateString" contained an unknown date format.';
};