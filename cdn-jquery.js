/**
 * Convenience methods for manipulating the HTML DOM with data fetched with the
 * CDN Connector. Be sure to load the CDN Connector first.
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 */
(function ($) {

    /** @var {string} baseUrl */
    var baseUrl = '/cdn/';

    /**
     * Sets the base URL for links for the current vendor.
     *
     * @access public
     * @param {VendorInterface} vendor
     */
    function setBaseUrl(vendor) {
        baseUrl = '/cdn/' + vendor.getName() + '/';
    }

    /**
     * @access public
     * @param {CDN} cdn
     */
    $.fn.listRootDirectories = function (cdn) {
        setBaseUrl(cdn.getVendor());

        cdn.listRootDirectories(function(error, directories) {
            if (error) {
                $(this).replaceWith($('<p>').text(error.message));
                return;
            }

            if (! directories || 0 === directories.length) {
                var message = 'No directories found in current container.';
                $(this).replaceWith($('<p>').text(message));
                return;
            }

            for (var i = 0, l = directories.length; i < l; ++i) {
                var item = getContainerListItem(directories[i]);
                $(this).append(item);
            }
        }.bind(this));
    };

    /**
     * Function to create a list item (with anchor) for an object/pseudo-
     * directory in a Container. An optional parameter "clickHandler" can be
     * provided to this function. If no click handler is given, the function
     * will insert a default (which prevents a click on the anchor).
     *
     * @access private
     * @param {ContainerObject|Directory} item
     * @param {function} [clickHandler]
     * @return {jQuery}
     */
    function getContainerListItem(item, clickHandler) {
        var anchor = getAnchor(item);

        if (! clickHandler || 'function' !== typeof clickHandler) {
            clickHandler = function (event) {
                event.preventDefault();
            }
        }

        anchor.on('click', clickHandler);

        return $('<li>').append(anchor);
    }

    /**
     * @access private
     * @param {ContainerObject|Directory} item
     * @return {jQuery}
     */
    function getAnchor(item) {
        if (item instanceof ContainerObject) {
            return getContainerObjectAnchor(item);
        } else if (item instanceof Directory) {
            return getDirectoryAnchor(item);
        }

        return $;
    }

    /**
     * @access private
     * @param {ContainerObject} object
     * @return {jQuery}
     */
    function getContainerObjectAnchor(object) {
        var name = object.getName(),
            path = object.getFullName();

        var $anchor = $('<a>')
            .addClass('')
            .attr({
                'data-uploadArea': 'true',
                'data-uploadPath': baseUrl + path,
                'href': baseUrl + path + '#last'
            })
            .text(name);

        $anchor.data('hash', object.getHash());
        $anchor.data('lastModified', object.getLastModified());
        $anchor.data('type', object.getType());

        return $anchor;
    }

    /**
     * @access private
     * @param {Directory} directory
     * @return {jQuery}
     */
    function getDirectoryAnchor(directory) {
        var name = directory.getName(),
            path = directory.getFullPath();

        return $('<a>')
            .addClass('asideOption')
            .attr({
                'data-uploadArea': 'true',
                'data-uploadPath': baseUrl + path,
                'href': baseUrl + path + '#last'
            })
            .text(name);
    }

})(jQuery);