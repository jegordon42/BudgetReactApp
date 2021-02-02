import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';

function Metrics(props) {

  function getTotalSpent(){
    var total = 0;
    for(var i = 0; i < props.expenseTransactions.length; i++){
      total += props.expenseTransactions[i].Amount;
    }
    return total;
  }

  function getTotalIncome(){
    var total = 0;
    for(var i = 0; i < props.incomeTransactions.length; i++){
      total += props.incomeTransactions[i].Amount;
    }
    return total;
  }
  
  function getPlannedSpending(){
    var total = 0;
    for(var i = 0; i < props.expenseCategories.length; i++){
      total += props.expenseCategories[i].Planned;
    }
    return total;
  }

  function getPlannedIncome(){
    var total = 0;
    for(var i = 0; i < props.incomeCategories.length; i++){
      total += props.incomeCategories[i].Planned;
    }
    return total;
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <h4>${getPlannedIncome()}</h4>
        <h6 style={{marginTop:-10}}>Planned Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>${getPlannedSpending()}</h4>
        <h6 style={{marginTop:-10}}>Planned Spending</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>${(getPlannedIncome() - getPlannedSpending()).toFixed(2)}</h4>
        <h6 style={{marginTop:-10}}>Planned Savings</h6>
      </Grid>

      <Grid item xs={3}>
        <h4>${getTotalIncome()}</h4>
        <h6 style={{marginTop:-10}}>Actual Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>${getTotalSpent()}</h4>
        <h6 style={{marginTop:-10}}>Actual Spending</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>${(getTotalIncome() - getTotalSpent()).toFixed(2)}</h4>
        <h6 style={{marginTop:-10}}>Actually Saved</h6>
      </Grid>

      <Grid item xs={3}>
        <h6 style={{marginTop:-10}}>------------------------</h6>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <h6 style={{marginTop:-10}}>------------------------</h6>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={4}>
        <h6 style={{marginTop:-10}}>------------------------</h6>
      </Grid>

      <Grid item xs={3}>
        <h4>${(getPlannedIncome() - getTotalIncome()).toFixed(2)}</h4>
        <h6 style={{marginTop:-10}}>{((getTotalIncome()/getPlannedIncome()) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>${(getPlannedSpending() - getTotalSpent()).toFixed(2)}</h4>
        <h6 style={{marginTop:-10}}>{((getTotalSpent()/getPlannedSpending()) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Spent</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>${((getPlannedIncome() - getPlannedSpending()) - (getTotalIncome() - getTotalSpent())).toFixed(2)}</h4>
        <h6 style={{marginTop:-10}}>{(((getTotalIncome() - getTotalSpent())/(getPlannedIncome() - getPlannedSpending())) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Saved</h6>
      </Grid>
    </Grid>
  );
}

export default Metrics;
