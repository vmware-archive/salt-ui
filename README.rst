=======
salt-ui
=======

A single-page web application to provide a real-time graphical interface into a
running Salt infrastructure.

NOTE: this software is still pre-alpha.

http://salt-ui.readthedocs.org/

Requirements
============

Support for ES5 is required. This means any modern browser or > IE9.

Development
===========

To develop on salt-ui itself:

1.  Clone the salt-ui repository
2.  Download required third-party libs::

        cd /path/to/salt-ui
        cd ./js/libs
        curl -K libs.txt

3.  (Optional) Verify third-party libs::

        md5sum --check --quiet md5sums.txt
