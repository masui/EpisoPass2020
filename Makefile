install:
	npm install
pack:
	webpack
embed:
	ruby embed.rb index.html > episopass.html

all: install pack

compile:
	coffee -c episopass.coffee
	coffee -c crypt.coffee

clean:
	rm -r -f bundle.js
