all: compile template pack embed scp

install:
	npm install
pack:
	webpack
embed:
	ruby bin/embed.rb src/index.html > dist/episopass.html

compile:
	coffee -c src/editor.coffee
	coffee -c src/crypt.coffee

template:
	ruby bin/dastemplate.rb > src/dastemplate.js

clean:
	rm -r -f bundle.js

scp:
	scp dist/episopass.html pitecan.com:/www/www.pitecan.com/tmp

