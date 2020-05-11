import React, {Component} from 'react';

import classes from './App.module.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import AuthContext from '../context/auth-context';
import {connect} from 'react-redux';

import * as actionTypes from '../store/actions';

class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[App.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[App.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[App.js] componentWillUnmount');
    }

    state = {
        showPersons: false,
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    /*
    loginHandler = () => {
        this.setState({authenticated: true});
    };*/


    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = (

                <Persons
                    persons={this.props.persons}
                    clicked={this.props.onDeletePerson}
                    changed={this.props.onPersonNameChanged}/>
            );
        }

        return (
            <div className={classes.App}>
                <AuthContext.Provider
                    value={{
                        authenticated: this.props.genAuth,
                        login: this.props.onLogin
                    }}
                >
                    <Cockpit
                        title={this.props.appTitle}
                        persons={this.props.persons}
                        showPersons={this.state.showPersons}
                        clicked={this.togglePersonsHandler}/>

                    {persons}
                </AuthContext.Provider>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        genAuth: state.generalReducer.authenticated,  //ctr es el nombre del Reducer en index.js para counter
        persons: state.personReducer.persons
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => dispatch({type: actionTypes.LOGIN}),
        onDeletePerson: (personIndex) => dispatch({type: actionTypes.DELETE_PERSON, personIndex:personIndex}),
        onPersonNameChanged: (event, id) => dispatch({type: actionTypes.PERSON_NAME_CHANGED, id:id, value: event.target.value}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
