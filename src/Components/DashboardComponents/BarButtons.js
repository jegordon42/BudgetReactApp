import React, {useState} from 'react';
import {ButtonGroup, Button, Form} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';

function BarButtons(props) {
  const titles = [['Total Expenses', 'Expenses By Category'],['Total Income', 'Income By Category']]

  function handleClick(button, buttonNum){
    if(button == "expenseIncome"){
      props.setExpenseIncomeButton(buttonNum); 
    }else if(button == "totalCategory"){
      props.setTotalCategoryButton(buttonNum); 
    }
    else if(button == "date"){
      props.setDateButton(buttonNum); 
    }
    props.setBarKey(props.barKey + 1)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={9}>
        <ButtonGroup size="sm" style={{display: "block", float:'left', marginBottom:2}}>
          <Button variant="success" active={props.dateButton == 0 ? true : false} onClick={() => handleClick("date", 0)}>Week</Button>
          <Button variant="success" active={props.dateButton == 1 ? true : false} onClick={() => handleClick("date", 1)}>Month</Button>
          <Button variant="success" active={props.dateButton == 2 ? true : false} onClick={() => handleClick("date", 2)}>Year</Button>
          <Button variant="success" active={props.dateButton == 3? true : false} onClick={() => handleClick("date", 3)}>Custom</Button>
        </ButtonGroup>
        <br/><br/>
        <div style={{display: "block", float:'left', height:30}}>
          {props.dateButton == 0 && (
            <input 
              style={{marginTop:5, width:215}}
              type="week"
              min="2018-W18" 
              max="2021-W26"
            />
          )}
          {props.dateButton == 1 && (
            <input 
              style={{marginTop:5, float:'left', width:215}}
              type="month"
              min="2018-01" 
              max="2021-02"
            />
          )}
          {props.dateButton == 2 && (
            <input 
              style={{marginTop:5, float:'left', width:215}}
              type="year"
              min="2017" 
              max="2021"
            />
          )}
          {props.dateButton == 3 && (
            <DateRangePicker 
              style={{marginTop:5, float:'left'}}
            />
          )}
        </div>
      </Grid>
      <Grid item xs={3}>
        <ButtonGroup size="sm" style={{float:'right', marginBottom:2}}>
          <Button variant="success" active={props.expenseIncomeButton == 0 ? true : false} onClick={() => handleClick("expenseIncome", 0)}>Expenses</Button>
          <Button variant="success" active={props.expenseIncomeButton == 1 ? true : false} onClick={() => handleClick("expenseIncome", 1)}>Income</Button>
        </ButtonGroup>
        <br/>
        <ButtonGroup size="sm" style={{float:'right'}}>
          <Button variant="success" active={props.totalCategoryButton == 0 ? true : false} onClick={() => handleClick("totalCategory", 0)}>Total</Button>
          <Button variant="success" active={props.totalCategoryButton == 1 ? true : false} onClick={() => handleClick("totalCategory", 1)}>By Category</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
        <h5 style={{float:'right', marginTop:30}}>{titles[props.expenseIncomeButton][props.totalCategoryButton]}</h5>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>        
  );
}

export default BarButtons;
