import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.elemtype){
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elemconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')} 
                {...props.elemconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = <select 
                className={inputClasses.join(' ')} 
                value={props.value}
                onChange={props.changed}
                >
                    {props.elemconfig.options.map(op => (
                        <option 
                            key={op.value}
                            value={op.value}>
                            {op.display}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elemconfig} 
                value={props.value}
                onChange={props.changed}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

}

export default Input;