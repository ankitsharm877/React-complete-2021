import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './Person.module.css';
import Aux from '../../../hoc/Auxiliary';
import withClassWrap from '../../../hoc/withClassWrap';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] renderring...');
        return (
            <React.Fragment>
                <AuthContext.Consumer>
                {context => context.authenticated ? <p>Authenticated</p> : <p>Please log in</p> }
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    type="text" 
                    /* ref={(inputEl) => {this.inputElement = inputEl}} */
                    ref={this.inputElementRef}
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </React.Fragment>
             /*  <Aux>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Aux> */
        )
    }
    
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
    isAuthenticated: PropTypes.bool
};

export default withClassWrap(Person, styles.Person);