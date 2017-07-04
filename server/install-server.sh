#!/bin/bash

# add ppa and install most recent stable nginx
add-apt-repository ppa:nginx/stable
apt-get update
apt-get install nginx

# add logging to existing nginx.conf
file=/etc/nginx/nginx.conf
sed -i -e '/access_log/r log' $file

# make directory for logs
mkdir /var/www/html/logs

# start and enable nginx
systemctl start nginx
systemctl enable nginx
systemctl reload nginx

