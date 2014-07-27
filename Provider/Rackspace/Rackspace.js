/**
 * @param {RackspaceEndpoint} endpoint
 * @param {string} token
 * @implements {VendorInterface}
 * @constructor
 */
function Rackspace(endpoint, token) {
    this.endpoint = endpoint;
    this.token = token;
    this.container = null;
}

Rackspace.prototype.getName = function () {
    return 'rackspace';
};

/**
 * @access public
 * @param {Container} container
 * @return {Rackspace}
 */
Rackspace.prototype.setContainer = function (container) {
    if (! (container instanceof Container)) {
        throw 'Variable "container" must be an instance of Container.';
    }

    this.container = container;
    return this;
};

/**
 * @access public
 * @param {XMLHttpRequest|window.ActiveXObject} http
 * @param {function} callback
 */
Rackspace.prototype.getContainerObjects = function (http, callback) {
    var url = this.endpoint + '/' + this.container.getName() + '?format=json';

    http.onreadystatechange = function() {
        switch (http.readyState) {
            case 0:
            case 1:
            case 2:
            case 3:
                break;
            case 4:
                this.handleResponse(http, callback);
                break;
            default:
                throw new Error('Received unknown ready state from request.');
        }
    }.bind(this);

    http.open('GET', url, true);
    http.setRequestHeader('X-Auth-Token', this.token);
    http.send();
};

/**
 * @access private
 * @param {object} httpRequest
 * @param {function} callback
 */
Rackspace.prototype.handleResponse = function (httpRequest, callback) {
    var response = httpRequest.responseText;

    if (200 === httpRequest.status) {
        try {
            var responseObject = JSON.parse(response);
        } catch(e) {
            return callback(
                new Error('Could not parse JSON response: ' + e.message)
            );
        }

        var container = this.convertResponseToContainer(responseObject);
        return callback(null, container);
    }

    if (401 === httpRequest.status) {
        return callback(new Error('Authentication error: ' + response));
    }

    return callback(new Error('Received unknown status from endpoint.'));
};

/**
 * @access private
 * @param {string} responseObject
 * @return {Container}
 */
Rackspace.prototype.convertResponseToContainer = function (responseObject) {
    for (var i in responseObject) {
        if (! responseObject.hasOwnProperty(i)) {
            continue;
        }

        var item = responseObject[i];

        // Increase container size with size of current object
        this.container.addSize(item['bytes']);

        var object = new ContainerObject();
        object.setHash(item['hash']);
        object.setLastModified(item['last_modified']);
        object.setSize(item['bytes']);
        object.setType(item['content_type']);

        var path = item['name'].split('/');
        object.setName(path.pop());
        object.setPath(path.join('/'));

        var objectTarget = this.container.makeDirectory(path);
        objectTarget.addObject(object);
        objectTarget.addSize(object.getSize());
    }

    return this.container;
};