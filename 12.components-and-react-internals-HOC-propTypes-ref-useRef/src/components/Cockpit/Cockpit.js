import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // http request
      /* const timer = setTimeout(() => {
        alert('saved data into cloud!');
      }, 1000); */
      toggleBtnRef.current.click();
      return () => {
        //clearTimeout(timer);
        console.log('[Cockpit.js] clean up in useEffect');
      };
    }, []);
    useEffect(() => {
      console.log('[Cockpit.js] useEffect 2');
      return () => {
        console.log('[Cockpit.js] clean up in useEffect 2');
      };
    });

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
      btnClass = classes.Red;
    }
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    } 
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }
    return (
        <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button ref={toggleBtnRef}
            className={btnClass}
            onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};

export default React.memo(Cockpit);