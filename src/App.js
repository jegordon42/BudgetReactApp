import React, { useState } from 'react'
import "@progress/kendo-theme-bootstrap/dist/all.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error'

function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [expenseCategories, setExpenseCategories] = useState([])
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expenseTransactions, setExpenseTransactions] = useState([])
  const [incomeTransactions, setIncomeTransactions] = useState([])
  const [filteredExpenseTransactions, setFilteredExpenseTransactions] = useState([])
  const [filteredIncomeTransactions, setFilteredIncomeTransactions] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [startDate, setStartDate] = useState(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1))
  const [endDate, setEndDate] = useState(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0))

  function setFilters(newStartDate, newEndDate){
    var expenseTrans = [];
    var transaction;
    var transDate;
    for(var i = 0; i < expenseTransactions.length; i++){
      transaction = expenseTransactions[i];
      transDate = new Date(transaction['Date'])
      if(newStartDate <= transDate && newEndDate >= transDate)
      expenseTrans.push(transaction)
    }
    var incomeTrans = []
    for(i = 0; i < incomeTransactions.length; i++){
      transaction = incomeTransactions[i];
      transDate = new Date(transaction['Date'])
      if(newStartDate <= transDate && newEndDate >= transDate)
        incomeTrans.push(transaction)
    }
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setFilteredExpenseTransactions(expenseTrans)
    setFilteredIncomeTransactions(incomeTrans)
  }

  function setFilteredTransactions(transactions, transType){
    var trans = []
    for(var i = 0; i < transactions.length; i++){
      var transaction = transactions[i];
      var transDate = new Date(transaction['Date'])
      
      if(startDate <= transDate && endDate >= transDate)
        trans.push(transaction)
    }
    if(transType === "Expense")
      setFilteredExpenseTransactions(trans)
    else
      setFilteredIncomeTransactions(trans)
  }

  return (
    <div>
      <Header 
        page = {currentPage} 
        setPage = {setCurrentPage} 
        user = {user} 
        setUser = {setUser} 
        setShowSettings = {setShowSettings}
      />
      {currentPage === "login" && 
        <Login 
          setPage = {setCurrentPage} 
          setUser = {setUser} 
          setExpenseCategories = {setExpenseCategories} 
          expenseTransactions = {expenseTransactions}
          setIncomeCategories = {setIncomeCategories}
          setExpenseTransactions = {setExpenseTransactions} 
          setIncomeTransactions = {setIncomeTransactions}
          setFilteredTransactions = {setFilteredTransactions}
        />
      }
      {currentPage === "signUp" && 
        <SignUp 
          setPage = {setCurrentPage} 
          setUser = {setUser}
          setExpenseCategories = {setExpenseCategories} 
          expenseTransactions = {expenseTransactions}
          setIncomeCategories = {setIncomeCategories}
          setExpenseTransactions = {setExpenseTransactions} 
          setIncomeTransactions = {setIncomeTransactions}
          setFilteredTransactions = {setFilteredTransactions}
        />
      }
      {currentPage === "dashboard" && 
        <Dashboard 
          user = {user} setUser = {setUser}
          expenseCategories = {expenseCategories} setExpenseCategories = {setExpenseCategories}
          incomeCategories = {incomeCategories} setIncomeCategories = {setIncomeCategories}
          expenseTransactions = {expenseTransactions} setExpenseTransactions = {setExpenseTransactions}
          filteredExpenseTransactions = {filteredExpenseTransactions}
          filteredIncomeTransactions = {filteredIncomeTransactions}
          setFilteredTransactions = {setFilteredTransactions}
          incomeTransactions = {incomeTransactions} setIncomeTransactions = {setIncomeTransactions}
          startDate = {startDate} endDate = {endDate} setFilters={setFilters}
          showSettings = {showSettings} setShowSettings = {setShowSettings}
          setShowError = {setShowError} setErrorMessage = {setErrorMessage}
          setPage = {setCurrentPage}
        />
      }
      <Error
        show = {showError}
        message = {errorMessage}
        handleClose={() => {setShowError(false)}}
      />
    </div>
  );
}

export default App;
