all: compile pack embed scp

install:
	npm install
pack:
	webpack
embed:
	ruby embed.rb index.html > episopass.html

compile:
	coffee -c episopass.coffee
	coffee -c crypt.coffee

clean:
	rm -r -f bundle.js

scp:
	scp episopass.html pitecan.com:/www/www.pitecan.com/tmp

