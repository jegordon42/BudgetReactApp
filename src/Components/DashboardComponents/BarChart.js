import React, {useState} from 'react';
import {Bar} from 'react-chartjs-2';
import BarButtons from './BarButtons'
import * as constants from '../../constants'

function BarChart(props) {
  const [expenseIncomeButton, setExpenseIncomeButton] = useState(0)
  const [totalCategoryButton, setTotalCategoryButton] = useState(0)
  const [dateButton, setDateButton] = useState(1)

  function getBarChartDataByDay(startDate, endDate, transactions){
    var labels = []
    var actualData = []
    var datasets = []
    if(totalCategoryButton == 0){
      for(var curDate = startDate; curDate <= endDate; curDate.setDate(curDate.getDate() + 1)){
        labels.push(curDate.toLocaleDateString())
        actualData.push(0)
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = transactions[i]['Date']
        var index = labels.indexOf(curDate)
        if(index != -1)
          actualData[index] += transactions[i]['Amount']
      }
      datasets.push({
        label: 'Total Spending',
        data: actualData,
        stack: '1',
        backgroundColor: '#28a744',
        borderWidth:0
      })
    }else{
      var categories = expenseIncomeButton == 0 ? props.expenseCategories : props.incomeCategories;
      var categoryIds = []
      for(var i = 0; i < categories.length; i++){
        categoryIds.push(categories[i]['CategoryId'])
        actualData.push([])
      }
      for(var curDate = startDate; curDate <= endDate; curDate.setDate(curDate.getDate() + 1)){
        labels.push(curDate.toLocaleDateString())
        for(var i = 0; i < categories.length; i++){
          actualData[i].push(0)
        }
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = transactions[i]['Date']
        var labelIndex = labels.indexOf(curDate)
        if(labelIndex != -1){
          var categoryIndex = categoryIds.indexOf(Number(transactions[i]['CategoryId']))
          console.log(transactions[i]['CategoryId'])
          console.log(categoryIds)
          actualData[categoryIndex][labelIndex] += transactions[i]['Amount']
        }
      }
      for(var i = 0; i < categories.length; i++){
        datasets.push({
          label : categories[i]['CategoryName'],
          stack:'1',
          data : actualData[i],
          backgroundColor : constants.colors[i],
          borderWidth : 0
        });
      }
    }
    return {
      labels: labels,
      datasets: datasets
    }
  }

  function getBarChartDataByWeek(startDate, endDate, transactions){
    var labels = []
    var dateRanges = []
    var actualData = []
    var datasets = []
    if(totalCategoryButton == 0){
      for(var curDate = startDate; curDate <= endDate;){
        var nextDate =  new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 6)
        if(nextDate > endDate)
          nextDate = endDate;
        labels.push((curDate.getMonth() + 1).toString() + "/" + curDate.getDate().toString() + "-" + (nextDate.getMonth() + 1).toString() + "/" + nextDate.getDate().toString())
        dateRanges.push([curDate, nextDate])
        actualData.push(0)
        curDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 7);
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = new Date(transactions[i]['Date'])
        for(var index = 0; index < dateRanges.length; index++){
          if(curDate >= dateRanges[index][0] && curDate <= dateRanges[index][1]){
            actualData[index] += transactions[i]['Amount'];
            break;
          }
        }
      }
      datasets.push({
        label: 'Total Spending',
        data: actualData,
        stack: '1',
        backgroundColor: '#28a744',
        borderWidth:0
      })
    }else{
      var categories = expenseIncomeButton == 0 ? props.expenseCategories : props.incomeCategories;
      var categoryIds = []
      for(var i = 0; i < categories.length; i++){
        categoryIds.push(categories[i]['CategoryId'])
        actualData.push([])
      }
      for(var curDate = startDate; curDate <= endDate;){
        var nextDate =  new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 6)
        if(nextDate > endDate)
          nextDate = endDate;
        labels.push((curDate.getMonth() + 1).toString() + "/" + curDate.getDate().toString() + "-" + (nextDate.getMonth() + 1).toString() + "/" + nextDate.getDate().toString())
        dateRanges.push([curDate, nextDate])
        for(var i = 0; i < categories.length; i++){
          actualData[i].push(0)
        }
        curDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 7);
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = new Date(transactions[i]['Date'])
        for(var index = 0; index < dateRanges.length; index++){
          if(curDate >= dateRanges[index][0] && curDate <= dateRanges[index][1]){
            var categoryIndex = categoryIds.indexOf(Number(transactions[i]['CategoryId']))
            actualData[categoryIndex][index] += transactions[i]['Amount']
            break;
          }
        }
      }
      for(var i = 0; i < categories.length; i++){
        datasets.push({
          label : categories[i]['CategoryName'],
          stack:'1',
          data : actualData[i],
          backgroundColor : constants.colors[i],
          borderWidth : 0
        });
      }
    }
    return {
      labels: labels,
      datasets: datasets
    }
  }

  function getBarChartDataByMonth(startDate, endDate, transactions){
    var labels = []
    var dateRanges = []
    var actualData = []
    var datasets = []
    if(totalCategoryButton == 0){
      for(var curDate = startDate; curDate <= endDate;){
        var nextDate =  new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)
        nextDate.setDate(nextDate.getDate() - 1)

        var isLastDate = false;
        if(nextDate > endDate){
          nextDate = endDate;
          isLastDate = true
        }
        
        if(curDate.getDate() == 1 && !isLastDate)
          labels.push(constants.monthNames[curDate.getMonth()])
        else
          labels.push((curDate.getMonth() + 1).toString() + "/" + curDate.getDate().toString() + "-" + (nextDate.getMonth() + 1).toString() + "/" + nextDate.getDate().toString())
        
        dateRanges.push([curDate, nextDate])
        actualData.push(0)
        curDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = new Date(transactions[i]['Date'])
        for(var index = 0; index < dateRanges.length; index++){
          if(curDate >= dateRanges[index][0] && curDate <= dateRanges[index][1]){
            actualData[index] += transactions[i]['Amount'];
            break;
          }
        }
      }
      datasets.push({
        label: 'Total Spending',
        data: actualData,
        stack: '1',
        backgroundColor: '#28a744',
        borderWidth:0
      })
    }else{
      var categories = expenseIncomeButton == 0 ? props.expenseCategories : props.incomeCategories;
      var categoryIds = []
      for(var i = 0; i < categories.length; i++){
        categoryIds.push(categories[i]['CategoryId'])
        actualData.push([])
      }
      for(var curDate = startDate; curDate <= endDate;){
        var nextDate =  new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)
        nextDate.setDate(nextDate.getDate() - 1)
        var isLastDate = false;
        if(nextDate > endDate){
          nextDate = endDate;
          isLastDate = true
        }
        if(curDate.getDate() == 1 && !isLastDate)
          labels.push(constants.monthNames[curDate.getMonth()])
        else
          labels.push((curDate.getMonth() + 1).toString() + "/" + curDate.getDate().toString() + "-" + (nextDate.getMonth() + 1).toString() + "/" + nextDate.getDate().toString())
        dateRanges.push([curDate, nextDate])
        for(var i = 0; i < categories.length; i++){
          actualData[i].push(0)
        }
        curDate = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1)
      }
      for(var i = 0; i < transactions.length; i++){
        var curDate = new Date(transactions[i]['Date'])
        for(var index = 0; index < dateRanges.length; index++){
          if(curDate >= dateRanges[index][0] && curDate <= dateRanges[index][1]){
            var categoryIndex = categoryIds.indexOf(Number(transactions[i]['CategoryId']))
            actualData[categoryIndex][index] += transactions[i]['Amount']
            break;
          }
        }
      }
      for(var i = 0; i < categories.length; i++){
        datasets.push({
          label : categories[i]['CategoryName'],
          stack:'1',
          data : actualData[i],
          backgroundColor : constants.colors[i],
          borderWidth : 0
        });
      }
    }
    return {
      labels: labels,
      datasets: datasets
    }
  }

  function getBarChartData(){
    var transactions = expenseIncomeButton == 0 ? props.filteredExpenseTransactions : props.filteredIncomeTransactions;
    var startDate = new Date(props.startDate.getFullYear(), props.startDate.getMonth(), props.startDate.getDate())
    var endDate = new Date(props.endDate.getFullYear(), props.endDate.getMonth(), props.endDate.getDate())
    var numDaysInFilteredRange = Math.ceil((Math.abs(endDate - startDate)) / (1000 * 60 * 60 * 24)) + 1;
    if(numDaysInFilteredRange < 42)//6 weeks or lower
      return getBarChartDataByDay(startDate, endDate, transactions)
    if(numDaysInFilteredRange < 168)//6 months and lower
      return getBarChartDataByWeek(startDate, endDate, transactions)
    return getBarChartDataByMonth(startDate, endDate, transactions)//6 months and higher
  }

  return (
        <div>
          <BarButtons
            expenseIncomeButton = {expenseIncomeButton} setExpenseIncomeButton = {setExpenseIncomeButton}
            totalCategoryButton = {totalCategoryButton} setTotalCategoryButton = {setTotalCategoryButton}
            expenseTransactions = {props.expenseTransactions}
            incomeTransactions = {props.incomeTransactions}
            setFilteredTransactions = {props.setFilteredTransactions}
            dateButton = {dateButton} setDateButton = {setDateButton}
            startDate = {props.startDate} endDate = {props.endDate} setFilters = {props.setFilters}
            setBarKey = {props.setBarKey}
          />
          <div> 
          <Bar 
            height = {430}
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
                        min:0,
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

                        label += ': $' + Number(value).toFixed(2);
                        return label;
                    }
                }
            }
            }}
          />
          </div>
         
        </div>  
  );
}

export default BarChart;
