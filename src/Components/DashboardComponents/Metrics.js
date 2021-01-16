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
  
  function getPlannedSpending(){
    var total = 0;
    for(var i = 0; i < props.expenseCategories.length; i++){
      total += props.expenseCategories[i].Planned;
    }
    return total;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <h1>${getPlannedSpending()}</h1>
        <h6>Planned Spending</h6>
      </Grid>
      <Grid item xs={4}>
        <h1>${getTotalSpent()}</h1>
        <h6>Total Spent</h6>
      </Grid>
      <Grid item xs={4}>
        <h1>${(getPlannedSpending() - getTotalSpent()).toFixed(2)}</h1>
        <h6>Saved</h6>
      </Grid>
    </Grid>
  );
}

export default Metrics;
