import React, {useState} from 'react';
import './App.css';

import uuid from 'uuid/v4'

import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const initialExpenses = [
    {id: uuid(), charge: 'rent', amount: 1000},
    {id: uuid(), charge: 'car rent', amount: 5000},
    {id: uuid(), charge: 'flat rent', amount: 20000},
    {id: uuid(), charge: 'black sea rent', amount: 2500},
];

function App() {
    // *** state values ***
    // all expenses, add expense
    const [expenses,setExpenses] = useState(initialExpenses);

    // single expense
    const [charge, setCharge] = useState('');

    // single amount
    const [amount, setAmount] = useState('');

    // alert
    const [alert, setAlert] = useState({show:false});

    // *** functionality ***
    // handle charge
    const handleCharge = e =>{
        console.log(`charge: ${e.target.value}`);
        setCharge(e.target.value)
    };

    // handle amount
    const handleAmount = e =>{
        console.log(`amount: ${e.target.value}`);
        setAmount(e.target.value)
    };

    // handle alert
    const handleAlert = ({type, text}) => {
        setAlert({show:true, type, text});
        setTimeout(()=>{
            setAlert({show:false})
        }, 3000)
    };

    // handle submit
    const handleSubmit = e =>{
        e.preventDefault();
        if (charge !== '' && amount > 0){
            const singleExpense = {id:uuid(), charge, amount};
            setExpenses([...expenses, singleExpense]);
            setAmount('');
            setCharge('');
            setAlert({type: 'success', text: 'item added'})
        } else {
            //    handleAlert
            setAlert({type: 'danger', text: 'empty value!'})
        }
    };

    // clear all items
    const clearItems = () => {
        console.log(`Clear all items`)
    };

    // handle delete
    const handleDelete = (id) => {
        console.log(`Delete item with id: ${id}`)
    };

    // handle edit
    const handleEdit = (id) => {
        console.log(`Edit item with id: ${id}`)
    };

    return (
        <div>
            {alert.show && <Alert type={alert.type} text={alert.text}/>}
            <h1>Budget calculator</h1>
            <main className="App">
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleCharge={handleCharge}
                    handleSubmit={handleSubmit}
                />
                <ExpenseList
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                />
            </main>

            <h1>
                Total spending:
                <span className="total">
                    ${expenses.reduce((acc, curr) => {
                        return (acc += parseInt(curr.amount));
                    }, 0)}
                </span>
            </h1>
        </div>
    );
}

export default App;
