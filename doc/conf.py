# -*- coding: utf-8 -*-
# pylint: disable=C0103,W0622
'''
Sphinx documentation for salt-ui
'''
import json
import os
import sys

from sphinx.directives import TocTree

package_json = os.path.join(
        os.path.dirname(__file__),
        os.pardir,
        'package.json')

with open(package_json) as f:
    conf = json.load(f)

project = conf['name']
copyright = '2013 Salt Stack, Inc'

version = conf['version']
release = version

master_doc = 'index'
templates_path = ['_templates']
exclude_patterns = ['_build']

extensions = [
    'sphinx.ext.intersphinx',
]

intersphinx_mapping = {
    'salt': ('http://docs.saltstack.org/en/latest/', None),
    'saltapi': ('http://salt-api.readthedocs.org/en/latest/', None),
}

### HTML options
html_theme = 'default'

html_title = None
html_short_title = project

html_static_path = ['_static']
html_logo = 'salt-vert.png'
html_favicon = 'favicon.ico'
html_use_smartypants = False

html_use_index = True
html_last_updated_fmt = '%b %d, %Y'
html_show_sourcelink = False
html_show_sphinx = True
html_show_copyright = True
#html_use_opensearch = ''


### Latex options
latex_documents = [
    ('index', '{0}.tex'.format(project), project, 'Salt Stack, Inc', 'manual'),
]

latex_logo = '_static/salt-vert.png'


### epub options
epub_title = '{0} Documentation'.format(project)
epub_author = conf['author']
epub_publisher = epub_author
epub_copyright = '2013 Salt Stack, Inc'

epub_scheme = 'URL'
epub_identifier = 'http://saltstack.org/'

#epub_tocdepth = 3

###############################################################################

def _normalize_version(args):
    _, path = args
    return '.'.join([x.zfill(4) for x in (path.split('/')[-1].split('.'))])

class ReleasesTree(TocTree):
    option_spec = dict(TocTree.option_spec)

    def run(self):
        rst = super(ReleasesTree, self).run()
        entries = rst[0][0]['entries'][:]
        entries.sort(key=_normalize_version, reverse=True)
        rst[0][0]['entries'][:] = entries
        return rst

def setup(app):
    # Copy ReleasesTree directive from Salt for properly sorting release
    # numbers with glob
    app.add_directive('releasestree', ReleasesTree)
    # Copy crossref types from Salt for master/minion conf files
    app.add_crossref_type(directivename="conf_master", rolename="conf_master",
            indextemplate="pair: %s; conf/master")
    app.add_crossref_type(directivename="conf_minion", rolename="conf_minion",
            indextemplate="pair: %s; conf/minion")
