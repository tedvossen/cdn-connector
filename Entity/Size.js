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
 * @return {string}
 */
Size.prototype.getHumanReadable = function () {
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var size = this.size;
    while (size > 1024) {
        size = size / 1024;
        units.shift();
    }

    size = (Math.round(size * 100) / 100);

    return size + ' ' + units.shift();
};