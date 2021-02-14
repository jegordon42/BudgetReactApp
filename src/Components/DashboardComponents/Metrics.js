import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import AnimatedNumber from "animated-number-react";

function Metrics(props) {
  var formatValue = (value) => value.toFixed(2);

  function filteredDateRangeAdjustment(){
    var numDaysInFilteredRange = Math.ceil((Math.abs(props.endDate - props.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    if([28, 29, 30, 31].includes(numDaysInFilteredRange)) 
      return 1;
    return numDaysInFilteredRange / (365 / 12) //Average month length
  }

  function getTotalSpent(){
    var total = 0;
    for(var i = 0; i < props.expenseTransactions.length; i++){
      total += Number(props.expenseTransactions[i].Amount);
    }
    return total;
  }

  function getTotalIncome(){
    var total = 0;
    for(var i = 0; i < props.incomeTransactions.length; i++){
      total += Number(props.incomeTransactions[i].Amount);
    }
    return total;
  }
  
  function getPlannedSpending(){
    var total = 0;
    for(var i = 0; i < props.expenseCategories.length; i++){
      total += Number(props.expenseCategories[i].Planned);
    }
    return total * filteredDateRangeAdjustment();
  }

  function getPlannedIncome(){
    var total = 0;
    for(var i = 0; i < props.incomeCategories.length; i++){
      total += Number(props.incomeCategories[i].Planned);
    }
    return total * filteredDateRangeAdjustment();
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        <h4>$<AnimatedNumber value={getPlannedIncome()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>Planned Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>$<AnimatedNumber value={getPlannedSpending()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>Planned Spending</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>$<AnimatedNumber value={getPlannedIncome() - getPlannedSpending()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>Planned Savings</h6>
      </Grid>

      <Grid item xs={3}>
        <h4>$<AnimatedNumber value={getTotalIncome()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>Actual Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>$<AnimatedNumber value={getTotalSpent()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>Actual Spending</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>$<AnimatedNumber value={getTotalIncome() - getTotalSpent()} formatValue={formatValue} /></h4>
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
        <h4>$<AnimatedNumber value={getPlannedIncome() - getTotalIncome()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>{((getTotalIncome()/getPlannedIncome()) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Income</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>-</h2>
      </Grid>
      <Grid item xs={3}>
        <h4>$<AnimatedNumber value={getPlannedSpending() - getTotalSpent()} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>{((getTotalSpent()/getPlannedSpending()) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Spent</h6>
      </Grid>
      <Grid item xs={1}>
        <h2>=</h2>
      </Grid>
      <Grid item xs={4}>
        <h4>$<AnimatedNumber value={(getPlannedIncome() - getPlannedSpending()) - (getTotalIncome() - getTotalSpent())} formatValue={formatValue} /></h4>
        <h6 style={{marginTop:-10}}>{(((getTotalIncome() - getTotalSpent())/(getPlannedIncome() - getPlannedSpending())) * 100).toFixed(2)}%</h6>
        <h6 style={{marginTop:-10}}>Compared Saved</h6>
      </Grid>
    </Grid>
  );
}

export default Metrics;
