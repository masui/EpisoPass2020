require 'base64'
require 'erb'
require 'json'

erbsrc = File.read("./src/episodas.erb")

json = File.read("./src/sampledata.json")
data = JSON.parse(json)

template = ERB.new erbsrc

puts template.result
