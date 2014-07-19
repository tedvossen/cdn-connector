/**
 * Content Delivery Network VendorInterface
 *
 * @param {VendorEndpoint} endpoint
 * @param {string} token
 * @interface
 */
function VendorInterface(endpoint, token) {}

/**
 * The setContainer methods specifies which "root" container the vendor should
 * use when querying the endpoint. In most cases, each client or project has a
 * dedicated container in which objects are stored.
 *
 * @access public
 * @param {Container} container
 */
VendorInterface.prototype.setContainer = function (container) {};

/**
 * The getName method is used to generate a unique link for each different
 * vendor. This way the core application can distinguish between requests to
 * different CDN providers.
 *
 * @access public
 * @return {string}
 */
VendorInterface.prototype.getName = function () {};

/**
 * @param {XMLHttpRequest|window.ActiveXObject} http
 * @param {function} cb
 * @return {Array}
 */
VendorInterface.prototype.getContainerObjects = function (http, cb) {};