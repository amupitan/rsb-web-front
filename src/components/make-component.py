#!/usr/bin/env python3
import os,sys
import errno

if len(sys.argv) != 2:
    sys.stderr.write("Expected only 1 argument but received " + str(len(sys.argv) -1) + "\n")
else:
    component = sys.argv[1]
    path = "./" + component

    #create component directory
    try:
        os.mkdir( path, 0o755 )
    except OSError as exception:
        if exception.errno == errno.EEXIST:
            sys.stderr.write("Component: {} already exists\n".format(component))
            proceed = input("Type yes to override or anything else to exit\n> ")
            if proceed != 'yes':
                sys.exit(0)
        else:
            raise

    #create style.css
    fpath = "./" + component + "/style.css"
    file = open(fpath, "w")
    file.close()

    #create component.test.js
    fpath = "./" + component + "/" + component + ".test.js"
    file = open(fpath, "w")
    test_js_template = """import React from 'react';
import ReactDOM from 'react-dom';
import {} from './';

it('renders without crashing', () => {{
  const div = document.createElement('div');
  ReactDOM.render(<{} />, div);
}}); 
""".format(component, component)
    file.write(test_js_template)
    file.close()
    
    #create index.js
    fpath = "./" + component + "/index.js"
    file = open(fpath, "w")
    index_js_template = """import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';
"""
                         
    file.write(index_js_template)
    file.close()
    
    
