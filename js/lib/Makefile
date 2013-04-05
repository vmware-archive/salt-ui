# Download copies of all third-party libs and check hashes

all:
	-curl -K libs.txt
	-md5sum --check --quiet md5sums.txt

clean:
	-rm *.js
