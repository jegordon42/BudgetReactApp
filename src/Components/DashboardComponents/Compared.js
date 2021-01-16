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

  const tooltipRender = ({ point }) => {
    const { value } = point;

    return (
      <span>
        Planned: ${ value.target }
        <br />
        Actual: ${ value.current }
        <br />
        Diff: ${ value.target - value.current }
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
        var max = actualAmount < category.Planned ? category.Planned * 2 : ((actualAmount / category.Planned) + 1) * category.Planned
        return (
          <Chart style={{ height: 80 }}>
            <ChartTitle text={category.CategoryName} align="left"/>
            <ChartSeries >
                <ChartSeriesItem type="bullet" color="#4361EE" data={[[actualAmount, category.Planned]]} />
            </ChartSeries>
            <ChartValueAxis>
              <ChartValueAxisItem 
                majorGridLines={{ visible: false }} 
                minorTicks={{ visible: false }} 
                min={0} 
                max={max} 
                labels={{format: "${0}"}} 
                plotBands={[{from: 0, to: category.Planned, color: 'lightgreen', opacity: .3}, {from: category.Planned, to: max, color: '#FFC6FF', opacity: .2}]} 
              />
            </ChartValueAxis>
            <ChartTooltip render={tooltipRender} background="white"/>
          </Chart>)
        })}
      {props.pieIncomeExpenseButton === 1 && props.incomeCategories.map((category) => {
        var actualAmount = getActualAmount(props.incomeTransactions, category.CategoryId);
        var max = actualAmount < category.Planned ? category.Planned * 2 : ((actualAmount / category.Planned) + 1) * category.Planned
        return (
          <Chart style={{ height: 80 }}>
            <ChartTitle text={category.CategoryName} align="left"/>
            <ChartSeries >
                <ChartSeriesItem type="bullet" color="#4361EE" data={[[actualAmount, category.Planned]]} />
            </ChartSeries>
            <ChartValueAxis>
              <ChartValueAxisItem 
                majorGridLines={{ visible: false }} 
                minorTicks={{ visible: false }} 
                min={0} 
                max={max} 
                labels={{format: "${0}"}} 
                plotBands={[{from: 0, to: category.Planned, color: '#FFC6FF', opacity: .3}, {from: category.Planned, to: max, color: 'lightgreen', opacity: .2}]}
              />
            </ChartValueAxis>
            <ChartTooltip render={tooltipRender} background="white"/>
          </Chart>)
        })}
    </div>
  );
}

export default Compared;
