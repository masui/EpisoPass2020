require 'base64'
require 'erb'
require 'json'

erbsrc = File.read("./src/episodas.erb")

json = File.read("./src/sampledata.json")
data = JSON.parse(json)

template = ERB.new erbsrc

puts "const encoded = `"
puts Base64.encode64(template.result)

print <<EOF
`

let buff = new Buffer(encoded, 'base64');
let dastemplate = buff.toString('utf8');

exports.dastemplate = dastemplate;
EOF
