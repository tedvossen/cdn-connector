/**
 * RackspaceEndpoint Entity
 *
 * @param {string} account
 * @param {string} region
 * @implements {VendorEndpoint}
 * @constructor
 */
function RackspaceEndpoint(account, region) {
    this.account = account;
    this.endpoint = this.getDomainByRegion(region);
    this.protocol = 'https';
    this.version = 'v1';
}

/**
 * @access private
 * @param {string} region
 * @return {string}
 */
RackspaceEndpoint.prototype.getDomainByRegion = function (region) {
    switch (region.toLowerCase()) {
        case 'ord':
            return 'storage101.ord1.clouddrive.com';
        case 'dfw':
            return 'storage101.dfw1.clouddrive.com';
        case 'hkg':
            return 'storage101.hkg1.clouddrive.com';
        case 'lon':
            return 'storage101.lon3.clouddrive.com';
        case 'iad':
            return 'storage101.iad3.clouddrive.com';
        case 'syd':
            return 'storage101.syd2.clouddrive.com';
        default:
            throw 'Got unknown region "' + region + '".';
    }
};

/**
 * @access public
 * @param {boolean} [secure=true]
 * @return {RackspaceEndpoint}
 */
RackspaceEndpoint.prototype.setSecure = function (secure) {
    if (! (secure instanceof Boolean)) {
        secure = true;
    }

    this.protocol = secure ? 'https' : 'http';
    return this;
};

/**
 * @access public
 * @param {string} version
 * @return {RackspaceEndpoint}
 */
RackspaceEndpoint.prototype.setVersion = function (version) {
    if (!(version instanceof String)) {
        throw 'Variable "version" must be an instance of String.';
    }

    this.version = version;
    return this;
};

/**
 * @access public
 * @return {string}
 */
RackspaceEndpoint.prototype.toString = function () {
    return this.protocol + '://' + this.endpoint + '/' + this.version
        + '/' + this.account;
};