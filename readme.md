cdn-connector
=============

The CDN Connector is a Javascript library that helps you normalize the response
from different cloud storage providers. Communication is done over HTTP(s).

Usage
-----

1. Load the required Javascript files in your web application.

    ``` html
    <script src="//your-domain.tld/cdn-connector/cdn.js"></script>
    <script src="//your-domain.tld/cdn-connector/Rackspace/Rackspace.js"></script>
    ```

    And optionally the convenience methods (jQuery).

    ``` html
    <script src="//your-domain.tld/cdn-connector/cdn-jquery.js"></script>
    ```

2. Instantiate the constructor for the desired cloud storage provider.

    ``` js
    var rackspace = new Rackspace(
        new RackspaceEndpoint({string} account, {string} region),
        {string} token
    );
    ```

    See [`Rackspace Cloud Files™ Developer Guide`](http://docs.rackspace.com/files/api/v1/cf-devguide/content/Service-Access-Endpoints-d1e003.html)
    for more information on regionalized API endpoints.

    Note: the CDN Connector doesn't have authentication methods because of
    security issues (use a cURL request, or similar, to fetch the token).

3. Instantiate the CDN Connector.

    ``` js
    var cdn = new CDN(rackspace, new Container({string} name));
    ```

    The convenience methods can be loaded afterwards, be sure to call them after
    the page has loaded properly.

    ``` js
    jQuery(document).ready(function() {
        $(element).listRootDirectories(cdn);
    });
    ```

License
-------

The CDN Connector is released under the GPLv2 license (or later) from the Free
Software Foundation. A copy of the license can be found in the LICENSE file.
