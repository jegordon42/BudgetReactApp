import React, {useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {ButtonGroup, Button} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';

function BarChart(props) {
  const [expenseIncomeButton, setExpenseIncomeButton] = useState(0)
  const [totalCategoryButton, setTotalCategoryButton] = useState(0)
  const titles = [['Total Expenses', 'Expenses By Category'],['Total Income', 'Income By Category']]
  const colors = [
    '#FFADAD',
    '#FFD6A5',
    '#FDFFB6',
    '#CAFFBF',
    '#9BF6FF',
    '#A0C4FF',
    '#BDB2FF',
    '#FFC6FF',
    '#F72585',
    '#7209B7',
    '#4361EE'
  ];

  function getBarChartData(){
    var transactions = expenseIncomeButton == 0 ? props.expenseTransactions : props.incomeTransactions;
    
    if(transactions.length == 0)
      return {};

    var firstDate = new Date(transactions[0]['Date'])
    var lastDate = new Date(transactions[0]['Date'])
    for(var i = 0; i < transactions.length; i++){
      var curDate = new Date(transactions[i]['Date'])
      if(curDate < firstDate){
        firstDate = curDate;
      }
      if(curDate > lastDate){
        lastDate = curDate;
      }
    }
    var labels = []
    var actualData = []
    var plannedData = []
    var datasets = []
    if(totalCategoryButton == 0){
      for(var curDate = firstDate; curDate <= lastDate; curDate.setDate(curDate.getDate() + 1)){
        labels.push(curDate.toLocaleDateString())
        actualData.push(0)
        plannedData.push(200)
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = transactions[i]['Date']
        var index = labels.indexOf(curDate)
        actualData[index] += transactions[i]['Amount']
      }
      datasets.push({
        label: 'Total Spending',
        data: actualData,
        stack: '1',
        backgroundColor: '#CAFFBF',
        borderWidth:0
      })
      // datasets.push({
      //   label: 'Planned Spending',
      //   data: plannedData,
      //   stack:'2',
      //   backgroundColor: '#CAFFBF',
      //   borderWidth:0
      // })
    }else{
      var categories = expenseIncomeButton == 0 ? props.expenseCategories : props.incomeCategories;
      var categoryIds = []
      for(var i = 0; i < categories.length; i++){
        categoryIds.push(categories[i]['CategoryId'])
      }
      for(var i = 0; i <= categories.length; i++){
        actualData.push([])
      }
      for(var curDate = firstDate; curDate <= lastDate; curDate.setDate(curDate.getDate() + 1)){
        labels.push(curDate.toLocaleDateString())
        for(var i = 0; i <= categories.length; i++){
          actualData[i].push(0)
        }
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = transactions[i]['Date']
        var labelIndex = labels.indexOf(curDate)
        var categoryIndex = categoryIds.indexOf(transactions[i]['CategoryId'])
        actualData[categoryIndex][labelIndex] += transactions[i]['Amount']
      }
      for(var i = 0; i < categories.length; i++){
        datasets.push({
          label : categories[i]['CategoryName'],
          stack:'1',
          data : actualData[i],
          backgroundColor : colors[i],
          borderWidth : 0
        });
      }
    }
    
    return {
      labels: labels,
      datasets: datasets
    }
  }

  function handleClick(button, buttonNum){
    if(button == "expenseIncome"){
      setExpenseIncomeButton(buttonNum); 
    }else if(button == "totalCategory"){
      setTotalCategoryButton(buttonNum); 
    }
    props.setBarKey(props.barKey + 1)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <br/><br/>
        <h5 style={{float:'right'}}>{titles[expenseIncomeButton][totalCategoryButton]}</h5>
      </Grid>
      <Grid item xs={3}></Grid>
      <Grid item xs={3}>
        <ButtonGroup size="sm" style={{float:'right', marginBottom:2}}>
          <Button variant="success" active={expenseIncomeButton == 0 ? true : false} onClick={() => handleClick("expenseIncome", 0)}>Expenses</Button>
          <Button variant="success" active={expenseIncomeButton == 1 ? true : false} onClick={() => handleClick("expenseIncome", 1)}>Income</Button>
        </ButtonGroup>
        <br/>
        <ButtonGroup size="sm" style={{float:'right'}}>
          <Button variant="success" active={totalCategoryButton == 0 ? true : false} onClick={() => handleClick("totalCategory", 0)}>Total</Button>
          <Button variant="success" active={totalCategoryButton == 1 ? true : false} onClick={() => handleClick("totalCategory", 1)}>By Category</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <div>
          <Bar 
            height = {355}
            key = {props.barKey}
            data={getBarChartData}
            options={{
              maintainAspectRatio:false,
              legend:{
                display:true,
                position:'right'
              },
              scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return '$' + value;
                        }
                    }
                }]
              },
              tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        var value = tooltipItem.value;

                        label += ': $' + value;
                        return label;
                    }
                }
            }
            }}
          />
        </div>
        
      </Grid>
    </Grid>        
  );
}

export default BarChart;
