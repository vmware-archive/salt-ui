# Build production versions of the salt-ui JavaScript and CSS

all: libs

# js:
	# r.js -o js/build.js

# css:
	# recess --compress less/saltui.less > js/salt.min.css

libs:
	make -C js/lib all

clean:
	make -C js/lib clean
