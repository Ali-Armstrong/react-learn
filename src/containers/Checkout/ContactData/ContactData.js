import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm : {
            name : {
                elemtype : 'input',
                elemconfig : {
                    type : 'text',
                    placeholder : 'Enter your name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elemtype : 'input',
                elemconfig : {
                    type : 'text',
                    placeholder : 'Enter your Street'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode : {
                elemtype : 'input',
                elemconfig : {
                    type : 'text',
                    placeholder : 'Enter your Zip Code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6,
                    maxLength : 6
                },
                valid : false,
                touched : false
            },
            country : {
                elemtype : 'input',
                elemconfig : {
                    type : 'text',
                    placeholder : 'Enter your Country'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elemtype : 'input',
                elemconfig : {
                    type : 'email',
                    placeholder : 'Enter your Email'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elemtype : 'select',
                elemconfig : {
                    options : [
                        {value : 'fastest', display : 'Fastest'},
                        {value : 'cheapest', display : 'Cheapest'}
                    ],
                    placeholder : 'Choose your Delivery Method'
                },
                value : 'fastest',
                valid : true,
                validation : {}
            }
        },
        loading : false,
        isFormValid : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true})
        const orderData = {}
        for(let elem in this.state.orderForm){
            orderData[elem] = this.state.orderForm[elem].value
        }
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : orderData            
        }
        axios.post('/orders.json',order)
            .then((data)=>{
                console.log("Response data =>",data)
                this.setState({loading : false})
                this.props.history.push('/');
            }).catch((err)=>{
                console.log("Error data =>",err)
                this.setState({loading : false})
            }
        );
    }

    validate(value,config){
        let isValid = false;
        //console.log(value,config)
        if(config.required){
            isValid = value.trim() !== '';
        }

        if(config.minLength){
            isValid = value.length >= config.minLength && isValid
        }

        if(config.maxLength){
            isValid = value.length <= config.maxLength && isValid
        }
        return isValid;
    }

    onChangeHandler = (event,elemId) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        //console.log(updatedForm,elemId)
        const updatedFormElem = {
            ...updatedForm[elemId]
        }
        updatedFormElem.value = event.target.value;
        updatedFormElem.valid = this.validate(event.target.value, updatedFormElem.validation);
        updatedFormElem.touched = true;
        //console.log(updatedFormElem)
        updatedForm[elemId] = updatedFormElem;

        let formIsValid = true;
        for(let inputIdentified in updatedForm){
            formIsValid = updatedFormElem[inputIdentified].valid && formIsValid
        }

        updatedForm.isFormValid = formIsValid

        
        this.setState({orderForm : updatedForm})
    }

    render(){
        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form>
                {formElements.map(elem =>(
                    <Input 
                        key = {elem.id}
                        elemtype = {elem.config.elemtype}
                        elemconfig = {elem.config.elemconfig}
                        value = {elem.config.value}
                        invalid = {!elem.config.valid}
                        shouldValidate = {elem.config.validation}
                        touched = {elem.config.touched}
                        changed = {(event)=>{this.onChangeHandler(event, elem.id)}}/>
                ))}
                <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;