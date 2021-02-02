import React, {useState} from 'react';
import {Bar} from 'react-chartjs-2';
import BarButtons from './BarButtons'

function BarChart(props) {
  const [expenseIncomeButton, setExpenseIncomeButton] = useState(0)
  const [totalCategoryButton, setTotalCategoryButton] = useState(0)
  const [dateButton, setDateButton] = useState(0)
  const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF', '#F72585', '#7209B7', '#4361EE'];

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

  return (
        <div>
          <BarButtons
            expenseIncomeButton = {expenseIncomeButton}
            setExpenseIncomeButton = {setExpenseIncomeButton}
            totalCategoryButton = {totalCategoryButton}
            setTotalCategoryButton = {setTotalCategoryButton}
            dateButton = {dateButton}
            setDateButton = {setDateButton}
            setBarKey = {props.setBarKey}
          />

          <Bar 
            height = {200}
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
  );
}

export default BarChart;
