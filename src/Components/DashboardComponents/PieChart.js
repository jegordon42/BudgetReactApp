import React, {useState} from 'react';
import {Pie} from 'react-chartjs-2';
import * as constants from '../../constants'

function PieChart(props) {

  function filteredDateRangeAdjustment(){
    var numDaysInFilteredRange = Math.ceil((Math.abs(props.endDate - props.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    if([28, 29, 30, 31].includes(numDaysInFilteredRange)) 
      return 1;
    return numDaysInFilteredRange / (365 / 12) //Average month length
  }

  function getPieChartData(){
    var pieLabels = [];
    var pieData = [];

    var categories = props.pieIncomeExpenseButton == 0 ? props.expenseCategories : props.incomeCategories;
    var transactions = props.pieIncomeExpenseButton == 0 ? props.expenseTransactions : props.incomeTransactions;
    for(var i = 0; i < categories.length; i++){
      pieLabels.push(categories[i].CategoryName)
      if(props.pieActualPlannedButton == 1){
        pieData.push(categories[i].Planned * filteredDateRangeAdjustment())
      }else if(props.pieActualPlannedButton == 0){
        pieData.push(0)
        for(var x = 0; x < transactions.length; x++){
          if(transactions[x].CategoryId == categories[i].CategoryId){
            pieData[i] += transactions[x].Amount;
          }
        }
      }
    }

    var pieChartData = {
      labels: pieLabels,
      datasets: [
        {
          label: 'Categories',
          backgroundColor: constants.colors,
          data: pieData
        }
      ]
    }
    return pieChartData
  }

  return (
    <div>
        { ((props.pieIncomeExpenseButton == 0 && props.pieActualPlannedButton == 0 && props.expenseTransactions.length == 0) ||
          (props.pieIncomeExpenseButton == 1 && props.pieActualPlannedButton == 0 && props.incomeTransactions.length == 0)) && 
          <div style={{height:235}}>
            <br/><br/><br/>
            <h1>No Data available</h1>
          </div>
        }
        { (!((props.pieIncomeExpenseButton == 0 && props.pieActualPlannedButton == 0 && props.expenseTransactions.length == 0) ||
          (props.pieIncomeExpenseButton == 1 && props.pieActualPlannedButton == 0 && props.incomeTransactions.length == 0))) && 
          <Pie
            height = {270}
            data={getPieChartData()}
            options={{
              animation:{duration:1000, easing:'easeInOutCubic'},
              maintainAspectRatio:false,
              legend:{
                display:true,
                position:'right'
              },
              tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.labels[tooltipItem.index]
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

                        label += ': $' + Number(value).toFixed(2);
                        return label;
                    }
                }
              }
            }}
          />
        }
       
    </div>
  );
}

export default PieChart;
