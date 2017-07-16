import os
import time
import uuid
import json
import urllib2

file = open('/var/log/nginx/access.json','r')

# while 1:
while True:
    fp = file.tell()
    line = file.readline()
    if not line:
        time.sleep(1)
        file.seek(fp)
    else:
        try:
            parsed_data = json.loads(line)
            response = urllib2.urlopen('https://freegeoip.net/json/%s' % parsed_data['remote_addr'])
            geoip_data = json.load(response)
            combined_data = parsed_data.copy()
            combined_data.update(geoip_data)
            request = json.dumps(combined_data)
            os.system("curl -X PUT http://DOMAIN_OR_IP_ADDRESS/nginlog/requests/%s -d '%s'" % (str(uuid.uuid4()), request))
        except:
            continue
