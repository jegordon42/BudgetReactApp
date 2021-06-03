import React, {useState} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';

function PieButtons(props) {
  const pieTitles = [
    ['Actual Expenses By Category', 'Planned Expenses By Category', 'Actual Vs. Planned Expenses'],
    ['Actual Income By Category', 'Planned Income By Category', 'Actual Vs. Planned Income']
  ]

  function handleClick(button, buttonNum){
    if(button == "IncomeExpense"){
      props.setPieIncomeExpenseButton(buttonNum); 
    }else if(button == "ActualPlanned"){
      props.setPieActualPlannedButton(buttonNum); 
    }
    props.setPieKey(props.pieKey + 1)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={7}>
        {/* <Button 
            variant="secondary" 
            active={props.pieIncomeExpenseButton == 0 ? true : false} 
            onClick={() => handleClick("IncomeExpense", 0)}
            style={{float:'left'}}
            size="sm"
          >
            <span>
            <SettingsIcon style={{fontSize:15, marginTop:-2}}/>{' '}
             Edit Categories
            </span>
        </Button> */}
        <br/>
        <h5 style={{float:'left', marginTop:10, marginBottom:10}}>
          {pieTitles[props.pieIncomeExpenseButton][props.pieActualPlannedButton]}
        </h5>
      </Grid>
      <Grid item xs={5}>
      <ButtonGroup size="sm" style={{float:'right', marginBottom:2}}>
          <Button 
            variant="success" 
            active={props.pieIncomeExpenseButton == 0 ? true : false} 
            onClick={() => handleClick("IncomeExpense", 0)}
          >
            Expenses
          </Button>
          <Button 
            variant="success" 
            active={props.pieIncomeExpenseButton == 1 ? true : false} 
            onClick={() => handleClick("IncomeExpense", 1)}
          >
            Income
          </Button>
        </ButtonGroup>
        <ButtonGroup size="sm" style={{float:'right'}}>
          <Button 
            variant="success" 
            active={props.pieActualPlannedButton == 0 ? true : false} 
            onClick={() => handleClick("ActualPlanned", 0)}
          >
            Actual
          </Button>
          <Button 
            variant="success" 
            active={props.pieActualPlannedButton == 1 ? true : false} 
            onClick={() => handleClick("ActualPlanned", 1)}
          >
            Planned
          </Button>
          <Button 
            variant="success" 
            active={props.pieActualPlannedButton == 2 ? true : false} 
            onClick={() => handleClick("ActualPlanned", 2)}
          >
            Compared
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

export default PieButtons;
