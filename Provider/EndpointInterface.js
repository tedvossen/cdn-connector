/**
 * VendorEndpoint Interface
 *
 * @param {string} account
 * @interface
 */
function VendorEndpoint(account) {}

/**
 * @access public
 * @param {boolean} [secure=true]
 * @return {VendorEndpoint}
 */
VendorEndpoint.prototype.setSecure = function (secure) {};

/**
 * @access public
 * @param {string} version
 * @return {VendorEndpoint}
 */
VendorEndpoint.prototype.setVersion = function (version) {};

/**
 * @access public
 * @return {string}
 */
VendorEndpoint.prototype.toString = function() {};