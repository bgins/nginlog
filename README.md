# nginlog

nginlog is an nginx traffic analysis tool. A server component logs HTTP requests
and an AngularJS client application displays the data in charts and a map.

## Status
This application is stable, but needs testing and a better authentication
mechanism for communication between the client and server. The data
visualizations can be expanded upon and improved. Please see the issues for more
details.

## Setup
On the server, nginx is configured to log requests in JSON. A Python script
reads the JSON log entries and inserts them into a CouchDB database. Please see
[SERVER.md](server/SERVER.md) for more details on server installation.

To setup the client, set the server endpoint
in [visualization.service.js](client/app/services/visualization.service.js).
Install the project dependencies from the `client` directory.

```npm install```

Run the server.

```node server.js```

The application will run on `localhost:8080`. 

Note that the Google GeoChart requires a Google API if this application is
deployed to a server.
