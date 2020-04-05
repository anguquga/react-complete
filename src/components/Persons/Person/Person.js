import React, {useEffect, useRef} from 'react';

import classes from './Person.module.css';
import AuthContext from '../../../context/auth-context';


const person = (props) => {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    console.log('[Person.js] rendering ...');
    return (
        <div className={classes.Person}>
            <AuthContext.Consumer>
                {context => context.authenticated ? <p>Authenticated</p> : <p>Please Log in!</p>}
            </AuthContext.Consumer>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input ref={inputRef} type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;