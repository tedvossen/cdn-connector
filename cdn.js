/**
 * CDN Connector
 *
 * @author Ted Vossen <ted@nouve.nl>
 * @copyright Nouvé Ltd 2014
 *
 * @return CDN
 */
var CDN = (function () {
    'use strict';

    /**
     * @access public
     * @param {VendorInterface} vendor
     * @constructor
     */
    function CDN(vendor) {
        this.vendor = vendor;
    }

    /**
     * @access public
     * @return {VendorInterface}
     */
    CDN.prototype.getVendor = function () {
        return this.vendor;
    };

    /**
     * @access public
     * @param {function} callback
     */
    CDN.prototype.listRootDirectories = function (callback) {
        var http = this.getRequestHandler();

        this.vendor.getContainerObjects(http, function (error, container) {
            if (error) {
                return callback(error);
            }

            var directories = container.getRootDirectory()
                .getDirectories();

            return callback(null, directories);
        }.bind(this));
    };

    /**
     * @access private
     * @throws If browser doesn't support HTTP requests.
     * @return {XMLHttpRequest|window.ActiveXObject}
     */
    CDN.prototype.getRequestHandler = function () {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }

        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {}
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }

        throw 'Could not get HTTP request handler.';
    };

    /**
     * @param {VendorInterface} vendor
     * @param {Container} container
     * @return CDN
     */
    return function (vendor, container) {
        vendor.setContainer(container);
        return new CDN(vendor);
    }

})();