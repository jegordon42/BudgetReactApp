import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Settings from './DashboardComponents/Settings'
import PieChart from './DashboardComponents/PieChart'
import PieButtons from './DashboardComponents/PieButtons'
import BarChart from './DashboardComponents/BarChart'
import Transactions from './DashboardComponents/Transactions'
import Metrics from './DashboardComponents/Metrics'
import Compared from './DashboardComponents/Compared'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [pieKey, setPieKey] = useState(1)
  const [barKey, setBarKey] = useState(1)
  const [gridKey, setGridKey] = useState(1)
  const [pieIncomeExpenseButton, setPieIncomeExpenseButton] = useState(0)
  const [pieActualPlannedButton, setPieActualPlannedButton] = useState(props.expenseTransactions.length == 0 ? 1 : 0)

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Paper className={classes.paper} style={{height:610}}>
            <BarChart
              barKey = {barKey} setBarKey = {setBarKey}
              expenseCategories = {props.expenseCategories}
              incomeCategories = {props.incomeCategories}
              expenseTransactions = {props.expenseTransactions}
              incomeTransactions = {props.incomeTransactions}
              filteredIncomeTransactions = {props.filteredIncomeTransactions}
              filteredExpenseTransactions = {props.filteredExpenseTransactions}
              setFilteredTransactions = {props.setFilteredTransactions}
              startDate = {props.startDate} endDate = {props.endDate} setFilters = {props.setFilters}
            />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <Metrics 
              expenseTransactions = {props.filteredExpenseTransactions}
              incomeTransactions = {props.filteredIncomeTransactions}
              expenseCategories = {props.expenseCategories}
              incomeCategories = {props.incomeCategories}
              startDate = {props.startDate} endDate = {props.endDate}
            />
          </Paper>
          <br/>
          <Paper className={classes.paper} style={{display:'flex', flexDirection:'column', height:365 }}> 
            <PieButtons
              pieKey = {pieKey}
              setPieKey = {setPieKey}
              pieIncomeExpenseButton = {pieIncomeExpenseButton}
              setPieIncomeExpenseButton = {setPieIncomeExpenseButton}
              pieActualPlannedButton = {pieActualPlannedButton}
              setPieActualPlannedButton = {setPieActualPlannedButton}
            />
           {pieActualPlannedButton != 2 && (
              <PieChart
                pieKey = {pieKey}
                pieIncomeExpenseButton = {pieIncomeExpenseButton}
                pieActualPlannedButton = {pieActualPlannedButton}
                incomeCategories = {props.incomeCategories}
                expenseCategories = {props.expenseCategories}
                expenseTransactions = {props.filteredExpenseTransactions}
                incomeTransactions = {props.filteredIncomeTransactions}
                startDate = {props.startDate} endDate = {props.endDate}
              />
          )}
          {pieActualPlannedButton === 2 && (
            <Compared
              pieIncomeExpenseButton = {pieIncomeExpenseButton}
              incomeCategories = {props.incomeCategories}
              expenseCategories = {props.expenseCategories}
              expenseTransactions = {props.filteredExpenseTransactions}
              incomeTransactions = {props.filteredIncomeTransactions}
              startDate = {props.startDate} endDate = {props.endDate}
            />
          )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>  
            <Transactions 
              user = {props.user}
              gridKey = {gridKey}
              expenseTransactions = {props.expenseTransactions} setExpenseTransactions = {props.setExpenseTransactions}
              incomeTransactions = {props.incomeTransactions} setIncomeTransactions = {props.setIncomeTransactions}
              filteredExpenseTransactions = {props.filteredExpenseTransactions}
              filteredIncomeTransactions = {props.filteredIncomeTransactions}
              setFilteredTransactions = {props.setFilteredTransactions}
              expenseCategories = {props.expenseCategories}
              incomeCategories = {props.incomeCategories}
            />
          </Paper>
        </Grid>
      </Grid>
      <Settings 
        show={props.showSettings} 
        user={props.user}
        incomeTransactions={props.incomeTransactions}
        expenseTransactions={props.expenseTransactions}
        expenseCategories={props.expenseCategories} setExpenseCategories = {props.setExpenseCategories}
        incomeCategories = {props.incomeCategories} setIncomeCategories = {props.setIncomeCategories}
        handleClose={() => {props.setShowSettings(false); setGridKey(gridKey + 1)}}
      />
    </div>
  );
}

export default Dashboard;
