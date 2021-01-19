import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    const Ingredients = [];
    for(let ingredName in props.ingredients){
        Ingredients.push(
            { 
                name : ingredName,
                amount : props.ingredients[ingredName]
            }
        );
    }
    const ingredientOutput = Ingredients.map(ing =>{
        return <span key={ing.name}
            style={{
                textTransform : 'capitalize',
                display : 'inline-block',
                margin : '0 8px',
                border : '1px solid #ccc',
                padding : '5px'
            }}>{ing.name} ({ing.amount})</span>
    })

    return (
    <div className={classes.Order}>
        <p>Ingredients : {ingredientOutput}</p>
        <p>Price <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>)
};

export default Order;