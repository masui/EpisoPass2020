all: compile template index pack embed scp

install:
	npm install
pack:
	webpack
embed:
	ruby bin/embed.rb src/index.html > dist/episopass.html

compile:
	coffee -c src/editor.coffee
	coffee -c src/crypt.coffee

index:
	erb src/index.erb > src/index.html

# episodas.erb, sampledata.json から dastemplate.js をつくる
template: src/episodas.erb src/sampledata.json
	ruby bin/dastemplate.rb > src/dastemplate.js

clean:
	rm -r -f bundle.js

scp:
	scp dist/episopass.html pitecan.com:/www/www.pitecan.com/tmp

