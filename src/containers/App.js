import React, {Component} from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';


class App extends Component {

    state = {
        persons: [
            {id: 'id1', name: 'Max', age: 28},
            {id: 'id2', name: 'Manu', age: 29},
            {id: 'id3', name: 'Stephanie', age: 26}
        ],
        showPersons: false
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

        this.setState({
            persons: personsT
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


    render() {

        let persons = null;
        let btnClass = '';

        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangedHandler}/>
                </div>
            );

            btnClass = classes.Red;
        }

        const classesT = [];

        if (this.state.persons.length <= 2) {
            classesT.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            classesT.push(classes.bold);
        }

        return (
            <div className={classes.App}>
                <h1>Hi, I'm a React App</h1>
                <p className={classesT.join(' ')}>This is really working!</p>
                <button
                    className={btnClass}
                    onClick={this.togglePersonsHandler}>Switch Name
                </button>
                {
                    persons
                }
            </div>
        );
    }
}

export default App;
