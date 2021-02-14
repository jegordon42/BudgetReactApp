import React, {useState} from 'react';
import {ButtonGroup, Button, Form} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { DateRangePicker } from '@progress/kendo-react-dateinputs';

Date.prototype.getWeek = function (dowOffset) {
      dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; 
      var newYear = new Date(this.getFullYear(),0,1);
      var day = newYear.getDay() - dowOffset; 
      day = (day >= 0 ? day : day + 7);
      var daynum = Math.floor((this.getTime() - newYear.getTime() - 
      (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
      var weeknum;
      if(day < 4) {
          weeknum = Math.floor((daynum+day-1)/7) + 1;
          if(weeknum > 52) {
              var nYear = new Date(this.getFullYear() + 1,0,1);
              var nday = nYear.getDay() - dowOffset;
              nday = nday >= 0 ? nday : nday + 7;
              weeknum = nday < 4 ? 1 : 53;
          }
      } else { weeknum = Math.floor((daynum+day-1)/7);}
      return weeknum;
  };

function BarButtons(props) {
  const titles = [['Total Expenses', 'Expenses By Category'],['Total Income', 'Income By Category']]

  function handleClick(button, buttonNum){
    if(button == "expenseIncome"){
      props.setExpenseIncomeButton(buttonNum); 
    }else if(button == "totalCategory"){
      props.setTotalCategoryButton(buttonNum); 
    }
    else if(button == "date"){
      setDefaultDate(buttonNum)
      props.setDateButton(buttonNum); 
    }
    props.setBarKey(props.barKey + 1)
  }

  function setDefaultDate(buttonNum){
    var today = new Date()
    switch(buttonNum){
      case 0:
        var num = today.getDay() >= 1 ? 0 : 1
        today.setDate(today.getDate()  - num)
        setDateWeek(today.getFullYear(), today.getWeek())
        break;
      case 1:
        setDateMonth(today.getFullYear(), today.getMonth())
        break;
      case 2:
        setDateYear("Year To Date")
        break;
      case 3:
        setDateCustom(new Date(today.getFullYear(), 0, 1), today)
        break;
    }
  }

  function setDateWeek(year, week){
    var days = (1 + (week - 1) * 7) + 3;
    var newStartDate = new Date(year, 0, days);
    var newEndDate = new Date(year, 0, days + 6)
    props.setFilters(newStartDate, newEndDate)
  }

  function setDateMonth(year, month){
    var newStartDate = new Date(year, month, 1)
    var newEndDate = new Date(year, month + 1, 1)
    newEndDate.setDate(newEndDate.getDate() - 1)
    props.setFilters(newStartDate, newEndDate)
  }

  function setDateYear(year){
    if(year == "Year To Date"){
      var newStartDate = new Date((new Date()).getFullYear(), 0, 1)
      var newEndDate = new Date()
    }else{
      var newStartDate = new Date(Number(year), 0, 1);
      var newEndDate = new Date(Number(year) + 1, 0, 1);
      newEndDate.setDate(newEndDate.getDate() - 1)
    }
    props.setFilters(newStartDate, newEndDate)
  }

  function setDateCustom(newStartDate, newEndDate){
    props.setFilters(newStartDate, newEndDate)
  }

  function getDate(format){
    var today = props.endDate;
    var formattedDate = today.getFullYear().toString()
    if(format == "week"){
      formattedDate += (today.getWeek() - 1 >= 10 ? "-W" : "-W0")
      formattedDate += (today.getWeek() - 1).toString()
      return formattedDate
    }else if(format == "month"){
      formattedDate += (today.getMonth() + 1 >= 10 ? "-" : "-0")
      formattedDate += (today.getMonth() + 1).toString()
      return formattedDate
    }else if(format == "custom"){
      return { start: props.startDate, end: today }
    }
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
            <Form.Control style={{marginTop:5, width:215}} type="week" min="2020-W1" max="2022-W1" defaultValue ={getDate("week")} onChange={(event)=>setDateWeek(Number(event.target.value.substring(0,4)), Number(event.target.value.substring(6)))}/>
          )}
          {props.dateButton == 1 && (
            <Form.Control style={{marginTop:5, width:215}} type="month" min="2020-01" max="2022-01" defaultValue ={getDate("month")} onChange={(event)=>setDateMonth(Number(event.target.value.substring(0,4)), Number(event.target.value.substring(5)) - 1)}/>
          )}
          {props.dateButton == 2 && (
            <Form.Control as="select" style={{marginTop:5, width:215}} onChange={(event) => setDateYear(event.target.value)}>
              <option>Year To Date</option>
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
            </Form.Control>
          )}
          {props.dateButton == 3 && (
            <DateRangePicker defaultValue ={getDate("custom")} onChange={(event)=> {if(event.target.value['start'] && event.target.value['end']){setDateCustom(event.target.value['start'], event.target.value['end'])}}}/>
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
      <Grid item xs={2}></Grid>
      <Grid item xs={7}>
        <h5 style={{marginTop:25}}>{titles[props.expenseIncomeButton][props.totalCategoryButton]}</h5>
        <h5 style={{marginTop:-10, marginBottom:0}}>{props.startDate.toLocaleDateString('en-US') + " to " + props.endDate.toLocaleDateString('en-US')} </h5>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>        
  );
}

export default BarButtons;
