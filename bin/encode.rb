require 'base64'

data = File.read("/home/tmasui/Passwords/Amazon_masui@pitecan.com.html")

puts Base64.encode64(data)

# => Tm93IGlzIHRoZSB0aW1lIGZvciBhbGwgZ29vZCBjb2RlcnMKdG8gbGVhcm4g
# 
