import React, {useEffect} from 'react';

import classes from "./Cockpit.module.css";


const cockpit = (props) => {

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
            alert('Saved data to Cloud');
        }, 1000);
        return () => {
            console.log('[Cockpit.js] cleanup work');
        }

    }, []);

    let btnClass = '';

    if (props.showPersons) {

        btnClass = classes.Red;
    }

    const classesT = [];

    if (props.persons.length <= 2) {
        classesT.push(classes.red);
    }
    if (props.persons.length <= 1) {
        classesT.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={classesT.join(' ')}>This is really working!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Switch Name
            </button>
        </div>
    );
};

export default cockpit;