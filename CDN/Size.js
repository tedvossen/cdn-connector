/**
 * Size Entity
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 *
 * @param {number} size
 */
function Size(size)
{
    this.size = size;
}

/**
 * @return {string[]}
 */
Size.prototype.getUnits = function () {
    return ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
};

/**
 * @return {string}
 */
Size.prototype.getHumanReadable = function () {
    var units = this.getUnits();

    var size = this.size;
    while (size >= 1000) {
        size = size / 1024;
        units.shift();
    }

    size = (Math.round(size * 100) / 100);

    return size + ' ' + units.shift();
};
