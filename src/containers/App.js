import React, {Component} from 'react';

import classes from './App.module.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import AuthContext from '../context/auth-context';

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
        persons: [
            {id: 'id1', name: 'Max', age: 28},
            {id: 'id2', name: 'Manu', age: 29},
            {id: 'id3', name: 'Stephanie', age: 26}
        ],
        showPersons: false,
        authenticated: false
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const personT = {
            ...this.state.persons[personIndex] /*... crea una copia de todos los atributos y nueva instancia de Person en ese indice*/
        };

        personT.name = event.target.value;

        const personsT = [...this.state.persons];
        personsT[personIndex] = personT;

        this.setState((prevState, props) => {
            return {
                persons: personsT
            };
        });
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    deletePersonHandler = (personIndex) => {
        //const personsT = this.state.persons.slice();
        const personsT = [...this.state.persons];
        personsT.splice(personIndex, 1);
        this.setState({persons: personsT});
    };

    loginHandler = () => {
        this.setState({authenticated: true});
    };


    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = (

                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}/>
            );
        }

        return (
            <div className={classes.App}>
                <AuthContext.Provider
                    value={{
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }}
                >
                    <Cockpit
                        title={this.props.appTitle}
                        persons={this.state.persons}
                        showPersons={this.state.showPersons}
                        clicked={this.togglePersonsHandler}/>

                    {persons}
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
