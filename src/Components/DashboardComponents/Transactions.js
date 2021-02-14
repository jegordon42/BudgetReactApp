import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TransactionsGrid from './TransactionsGrid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Transactions(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}><h3 style={{margin:0}}>Transactions</h3></Grid>
      <Grid item xs={4}></Grid>

      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <TransactionsGrid 
            user = {props.user}
            gridKey = {props.gridKey}
            TransactionType = "Expenses"
            transactions = {props.expenseTransactions}
            setTransactions = {props.setExpenseTransactions}
            filteredTransactions = {props.filteredExpenseTransactions}
            setFilteredTransactions = {props.setFilteredTransactions}
            categories = {props.expenseCategories}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <TransactionsGrid 
            user = {props.user}
            gridKey = {props.gridKey}
            TransactionType = "Income"
            transactions = {props.incomeTransactions} setTransactions = {props.setIncomeTransactions}
            filteredTransactions = {props.filteredIncomeTransactions} setFilteredTransactions = {props.setFilteredTransactions}
            categories = {props.incomeCategories}
          />
        </Paper>
      </Grid>
    </Grid>     
  );
}

export default Transactions;
