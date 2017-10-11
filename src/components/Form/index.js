import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import update from 'immutability-helper';

import utils from '../../lib/utils';

import './style.css';

export default class Form extends Component {
    constructor(props) {
        super(props);

        let tempState = { elements: {}, elementArr: [] };
        for (let element of props.elements) {
            tempState.elementArr.push(element);
            if (Array.isArray(element)) {
                element.forEach((ele) => {
                    tempState[ele.name] = '';
                    tempState.elements[ele.name] = ele;
                });
                continue;
            }
            tempState[element.name] = element.value || '';
            tempState.elements[element.name] = element;
        }

        tempState.submit = props.submit;
        this.state = tempState;

        this.createFormElement = this.createFormElement.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit() {
        let formData = {};
        Object.keys(this.state.elements).forEach(element => {
            formData[element] = this.state[element];
        });

        if (this.state.submit)
            this.state.submit(formData);
    }

    validate(name) {
        if (this.state.elements[name].validate) {
            let invalid = this.state.elements[name].validate(this.state[name]);
            let element = this.state.elements[name];
            element.indicator = invalid ? 'error' : 'success';
            element.message = invalid;

            const newState = update(this.state, {
                elements: { [name]: { $set: element } }
            });

            this.setState(newState);
        }
    }

    createFormElement(element, i) {
        if (Array.isArray(element)) {
            return (
                <div key={i} className='row'>
                    {
                        element.map((ele, idx) => {
                            ele.size = 12 / element.length;
                            return this.createFormElement(ele, parseInt(`${i}${idx}`, 10));
                        })
                    }
                </div>
            );
        }

        var divclass = classNames('form-group', {
            [`has-${element.indicator}`]: element.indicator,
            'has-feedback': element.indicator,
            [`col-sm-${element.size}`]: element.size !== undefined,
        },
        );

        const validationSign = `glyphicon-${element.indicator === 'success' ? 'ok' : 'remove'}`;
        let labelTitle = element.title || utils.toTitleCase(element.name);

        return (
            <div key={i} className={divclass}>
                <label htmlFor={element.name}>{labelTitle}:</label>
                <input type={element.type} className="form-control" id={element.name} name={element.name} placeholder={element.placeholder} value={this.state[element.name]} onChange={this.handleInputChange} onBlur={() => { this.validate(element.name) }} />
                {element.indicator && <span className={classNames("glyphicon", validationSign, "form-control-feedback")} aria-hidden="true"></span>}
                {element.indicator && <span id={`${element.name}InputStatus`} className="sr-only">{element.indicator}</span>}
                {element.message && <span id="helpBlock2" className="help-block">{element.message === true ? labelTitle : element.message}</span>}
            </div>
        );
    };

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (

            <form>
                <h1>{this.props.title || 'Hello!'}</h1>
                {this.props.errors && <p style={{ color: 'red' }}>{this.props.errors}</p>}
                {
                    this.state.elementArr.map(this.createFormElement)
                }
                <div onClick={this.submit}>
                    {this.props.button}
                </div>
            </form>

        );
    }

}

Form.defaultProps = {
    button: <button type="submit">Submit</button>,
};

Form.propTypes = {
    button: PropTypes.element,
}
