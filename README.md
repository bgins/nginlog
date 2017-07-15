# nginlog

## Deploy logging on the server
These instructions assume Ubuntu 16.04 and will install the latest stable nginx
and the latest couchdb in the repository. Currently, this is CouchDB 1.61.

Add the PPAs for nginx and couchdb.
```
sudo add-apt-repository ppa:nginx/stable
sudo add-apt-repository ppa:couchdb/stable
```

Update repository listings and install nginx and couchdb.
```
sudo apt-get update
sudo apt-get install nginx couchdb
```

Change the permissions on couchdb resources.
```
sudo chown -R couchdb:couchdb /usr/bin/couchdb /etc/couchdb /usr/share/couchdb
sudo chmod -R 0770 /usr/bin/couchdb /etc/couchdb /usr/share/couchdb
```

Add a new logging\_format directive and access\_log directive to `nginx.conf`, which is located in `/etc/nginx`. These directives need to go in the `http` block.
```
log_format json escape=json '{ "time_local": "$time_local", '
 '"time_iso8601": "$time_iso8601", '
 '"msec": "$msec", '
 '"request_time": "$request_time", '
 '"remote_addr": "$remote_addr", '
 '"remote_user": "$remote_user", '
 '"host": "$host", '
 '"request": "$request", '
 '"status": "$status", '
 '"http_referrer": "$http_referrer", '
 '"http_user_agent": "$http_user_agent", '
 '"geoip_city": "$geoip_city", '
 '"geoip_city_continent_code": "$geoip_city_continent_code", '
 '"geoip_city_country_name": "$geoip_city_country_name", '
 '"geoip_latitude": "$geoip_latitude", '
 '"geoip_longitude": "$geoip_longitude", '
 '"uri": "$uri", '
 '"ancient_browser": "$ancient_browser", '
 '"modern_browser": "$modern_browser" }';

access_log /var/log/nginx/access.json json;
```

Add a nginx proxy configuration to route requests to couchdb. In the server block for your site, make a new `location` block. If you are just testing this out, you can add it to the `default` site.
```
location /nginlog {
    if ( $remote_addr = "127.0.0.1" ) { access_log off; }
    if ( $remote_addr = "DOMAIN_NAME" ) { access_log off; }
    if ( $remote_addr = "SERVER_IP" ) { access_log off; }
    if ( $remote_addr = "CLIENT_IP" ) { access_log off; }

    rewrite /nginlog/(.*) /$1 break;
    proxy_pass http://localhost:5984;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```
Fill in DOMAIN_NAME, SERVER\_IP, and CLIENT\_IP as needed. This will prevent nginx from logging requests to couchdb. Check that your changes nginx configuration are correct by running `sudo nginx -t`.

Add a bind directive to `local.ini` in `/etc/couchdb`. Find the `[httpd]` block and add the line `bind_address = 0.0.0.0`. Note that this allows anyone to access the database and you may want to refine it. We will restrict external users to read-only access.

Start and enable nginx, then reload the changes.
```
systemctl start nginx
systemctl enable nginx
systemctl reload nginx
```
Restart couchdb.
```
systemctl restart couchdb
```

Now visit `SERVER_IP/nginlog/_utils/index.html`. Assuming couchdb 1.61, you will see the Futon web interface. Secure the database by setting up an admin. In the bottom right corner of the interface you will see a "Welcome to the Admin party!" note and a link to "Fix this". Set up an admin username and password. 

