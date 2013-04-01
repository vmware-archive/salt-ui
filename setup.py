#!/usr/bin/env python
'''
Setup script for salt-ui
'''
import os

from setuptools import setup

salt_version = os.path.join(os.path.abspath(
    os.path.dirname(__file__)), 'saltui', 'version.py')

# pylint: disable-msg=W0122,E0602
exec(compile(open('saltui/version.py').read(), 'saltui/version.py', 'exec'))
VERSION = __version__
# pylint: enable-msg=W0122,E0602

NAME = 'saltui'
DESC = 'A graphical interface to Salt'

kwargs = dict()

kwargs.update(
    name=NAME,
    version=VERSION,
    description=DESC,
    author='Seth House',
    author_email='shouse@saltstack.com',
    url='http://saltstack.com',
    classifiers=[
        'Programming Language :: JavaScript',
        'Programming Language :: Python',
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Intended Audience :: Information Technology',
        'Intended Audience :: System Administrators',
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: POSIX :: Linux',
        'Topic :: System :: Distributed Computing'],
    packages=['saltui'],
)

setup(**kwargs)
