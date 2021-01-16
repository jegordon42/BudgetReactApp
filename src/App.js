import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)
  const [expenseCategories, setExpenseCategories] = useState([])
  const [incomeCategories, setIncomeCategories] = useState([])
  const [expenseTransactions, setExpenseTransactions] = useState([])
  const [incomeTransactions, setIncomeTransactions] = useState([])
  const [showSettings, setShowSettings] = useState(false)

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
        />
      }
      {currentPage === "dashboard" && 
        <Dashboard 
          user = {user} 
          setUser = {setUser}
          expenseCategories = {expenseCategories}
          setExpenseCategories = {setExpenseCategories}
          incomeCategories = {incomeCategories}
          setIncomeCategories = {setIncomeCategories}
          expenseTransactions = {expenseTransactions}
          setExpenseTransactions = {setExpenseTransactions}
          incomeTransactions = {incomeTransactions}
          setIncomeTransactions = {setIncomeTransactions}
          showSettings = {showSettings} 
          setShowSettings = {setShowSettings}
          setPage = {setCurrentPage}
        />
      }
    </div>
  );
}

export default App;
