#!/usr/bin/env python3
import os,sys
import errno

def main():
    if len(sys.argv) == 1:
        name = input("What is the name of the component you want to create?\n> ")
        ui = False
        if input("Is {} going to be a UI Component? Type true or hit enter[false]\n> ".format(name)) == "true":
            ui = True
        if ui:
            create_ui_component(name)
        else:
            create_component(name)

    elif len(sys.argv) != 2:
        sys.stderr.write("Expected only 1 argument but received " + str(len(sys.argv) -1) + "\n")
    else:
        create_component(sys.argv[1])

index_js_template = """import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

export default () => <div />
"""
    
def create_ui_component(component):
    component = component[0].upper() + component[1:]
    path = "./ui/" + component + ".jsx"
    file = open(path, "w")
    file.write(index_js_template)
    file.close()
    print("UI Component: {} has been created".format(component))

def create_component(component):
    component = component[0].upper() + component[1:]
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
    fpath = "./" + component + "/index.jsx"
    file = open(fpath, "w")
                         
    file.write(index_js_template)
    file.close()

    print("Component: {} has been created".format(component))
    
if __name__ == "__main__":
    main()
