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
    // *** functionality ***
    const handleCharge = e =>{
        console.log(`charge: ${e.target.value}`);
        setCharge(e.target.value)
    };
    const handleAmount = e =>{
        console.log(`amount: ${e.target.value}`);
        setAmount(e.target.value)
    };
    const handleSubmit = e =>{
        e.preventDefault();
        if (charge !== '' && amount > 0){
            const singleExpense = {id:uuid(), charge, amount};
            setExpenses([...expenses, singleExpense]);
        } else {
        //    handleAlert
        }
    };

    return (
        <div>
            <Alert/>
            <h1>Budget calculator</h1>
            <main className="App">
                <ExpenseForm
                    charge={charge}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleCharge={handleCharge}
                    handleSubmit={handleSubmit}
                />
                <ExpenseList expenses={expenses}/>
            </main>

            <h1>
                Total spending:
                <span className="total">
                    ${expenses.reduce((acc, curr) => {
                        return (acc += curr.amount);
                    }, 0)}
                </span>
            </h1>
        </div>
    );
}

export default App;
