import React, {useState} from 'react';
import * as ReactDOM from 'react-dom';
import {
  Chart,
  ChartTitle,
  ChartTooltip,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem
} from '@progress/kendo-react-charts';

function Compared(props) {

  function filteredDateRangeAdjustment(){
    var numDaysInFilteredRange = Math.ceil((Math.abs(props.endDate - props.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    if([28, 29, 30, 31].includes(numDaysInFilteredRange)) 
      return 1;
    return numDaysInFilteredRange / (365 / 12) //Average month length
  }

  const tooltipRender = ({ point }) => {
    const { value } = point;

    return (
      <span>
        Planned: ${ value.target.toFixed(2) }
        <br />
        Actual: ${ value.current.toFixed(2) }
        <br />
        Diff: ${ (value.target - value.current).toFixed(2) }
      </span>
    )
  };

  function getActualAmount(transactions, categoryId){
    var total = 0;
    for(var i = 0; i < transactions.length; i++){
      if(transactions[i].CategoryId == categoryId){
        total += transactions[i].Amount;
      }
    }
    return total;
  }

  return (
    <div style={{height:240, overflow: 'scroll'}}>
      {props.pieIncomeExpenseButton === 0 && props.expenseCategories.map((category) => {
        var actualAmount = getActualAmount(props.expenseTransactions, category.CategoryId);
        var planned = category.Planned * filteredDateRangeAdjustment()
        var max = actualAmount < planned ? planned * 2 : ((actualAmount / planned) + 1) * planned
        return (
          <Chart style={{ height: 80 }}>
            <ChartTitle text={category.CategoryName} align="left"/>
            <ChartSeries >
                <ChartSeriesItem type="bullet" color="#4361EE" data={[[actualAmount, planned]]} />
            </ChartSeries>
            <ChartValueAxis>
              <ChartValueAxisItem 
                majorGridLines={{ visible: false }} 
                minorTicks={{ visible: false }} 
                min={0} 
                max={max} 
                labels={{format: "${0}"}} 
                plotBands={[{from: 0, to: planned, color: 'lightgreen', opacity: .3}, {from: planned, to: max, color: '#FFC6FF', opacity: .2}]} 
              />
            </ChartValueAxis>
            <ChartTooltip render={tooltipRender} background="white"/>
          </Chart>)
        })}
      {props.pieIncomeExpenseButton === 1 && props.incomeCategories.map((category) => {
        var actualAmount = getActualAmount(props.incomeTransactions, category.CategoryId);
        var planned = category.Planned * filteredDateRangeAdjustment()
        var max = actualAmount < planned ? planned * 2 : ((actualAmount / planned) + 1) * planned
        return (
          <Chart style={{ height: 80 }}>
            <ChartTitle text={category.CategoryName} align="left"/>
            <ChartSeries >
                <ChartSeriesItem type="bullet" color="#4361EE" data={[[actualAmount, planned]]} />
            </ChartSeries>
            <ChartValueAxis>
              <ChartValueAxisItem 
                majorGridLines={{ visible: false }} 
                minorTicks={{ visible: false }} 
                min={0} 
                max={max} 
                labels={{format: "${0}"}} 
                plotBands={[{from: 0, to: planned, color: '#FFC6FF', opacity: .3}, {from: planned, to: max, color: 'lightgreen', opacity: .2}]}
              />
            </ChartValueAxis>
            <ChartTooltip render={tooltipRender} background="white"/>
          </Chart>)
        })}
    </div>
  );
}

export default Compared;
