import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ImportTransaction from './ImportTransaction'
import { GridApi } from 'ag-grid-community';

function TransactionsGrid(props) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([])

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.sizeColumnsToFit(); 
  }

  function addFilteredOutTransactions(transactions){
    var transactionIds = []
    for(var i = 0; i < transactions; i++){
      transactionIds.push(transactions[i].TransactionId)
    }
    for(var i = 0; i < props.transactions; i++){
      if(!transactionIds.includes(props.transactions[i].TransactionId))
        transactions.push(props.transactions[i])
    }
  }

  function onCellValueChanged(event){
    fetch('/UpdateTransaction', {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify({
            transaction : event.data
        })
    })
    .then(response => response.json())
    .then(result => {
      var transactions = props.filteredTransactions;
      transactions[event.rowIndex] = event.data;
      addFilteredOutTransactions(transactions)
      props.setTransactions(transactions)
      props.setFilteredTransactions(transactions, props.TransactionType.replace('es', 'e'))
    })
    .catch(e => {
        console.log(e);
    });
  }

  function addTransaction(){
    fetch('/AddTransactions', {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify({
          userId : props.user['userId'],
          transactionType : props.TransactionType.replace('es', 'e'),
          transactionsToAdd : [{TransactionId: 0, CategoryId: props.categories[0].CategoryId, Description: "", Amount : 0, Date : (new Date()).toLocaleDateString()}]
        })
    })
    .then(response => response.json())
    .then(result => {
      var transactions = result['transactions'];
      for(var i = 0; i < transactions.length; i++){
        var date = new Date(transactions[i]['Date']);
        date.setDate(date.getDate() + 1)
        transactions[i]['Date'] = date.toLocaleDateString()
      }
      props.setTransactions(transactions)
      props.setFilteredTransactions(transactions, props.TransactionType.replace('es', 'e'))
    })
    .catch(e => {
        console.log(e);
    });
  }

  function deleteTransactions(){
    fetch('/DeleteTransactions', {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify({
          transactionIdsToDelete : selectedTransactions
        })
    })
    .then(response => response.json())
    .then(result => {
      var transactions = [];
      for(var i = 0; i < props.transactions.length; i++){
          var transaction = props.transactions[i];
          if(!selectedTransactions.includes(transaction.TransactionId))
            transactions.push(transaction);
      }
      props.setTransactions(transactions)
      props.setFilteredTransactions(transactions, props.TransactionType.replace('es', 'e'))
    })
    .catch(e => {
        console.log(e);
    });
}

  function CategoryCellRenderer(params){
    return <Form.Control as="select" defaultValue={params.value} style={{width:'100%'}} onChange={(event)=>{params.setValue(event.target.value)}}>
            {props.categories.map((category) => 
              <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
            )}
          </Form.Control>
  }

  function CategoryFilter(){
    return <Form.Control as="select" style={{width:'100%'}}>
              <option key={0} value={0}>All</option>
              {props.categories.map((category) => 
                <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>
              )}
            </Form.Control>
  }
  function LeftAlignedCellRenderer(params){
    return <p style={{textAlign:'left'}}>{params.value}</p>
  }

  function MoneyCellRenderer(params){
    return <p style={{textAlign:'left'}}>${params.value}</p>
  }

  function DateCellRenderer(params){
    var date = new Date(params.value);
    return <p style={{textAlign:'left'}}>{date.toLocaleDateString()}</p>
  }

  function CheckBoxCellRenderer(params){
    return <input   type="checkbox" 
                    onChange={() => {
                        var index = selectedTransactions.indexOf(params.data.TransactionId); 
                        if(index == -1){
                          selectedTransactions.push(params.data.TransactionId);
                        }else{
                          selectedTransactions.splice(index, 1);
                        }
                        setSelectedTransactions(selectedTransactions);
                    }}
            />
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={7}>
          <h5 style={{marginTop:7, marginRight:20,float:'right'}}>{props.TransactionType}</h5>
      </Grid>
      <Grid item xs={5}>
          <Button variant="danger" size="sm" style={{float:'right'}} onClick={deleteTransactions}>Delete</Button>
          <Button variant="primary" size="sm" style={{float:'right', marginRight:5}} onClick={() => {setShowImport(true)}}>Import</Button>
          <Button variant="primary" size="sm" style={{float:'right', marginRight:5}} onClick={addTransaction}>Add</Button>
      </Grid>
      <Grid item xs={12}>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' } }>
              <AgGridReact
                key = {props.gridKey}
                rowData = {props.filteredTransactions}
                onGridReady = {onGridReady}
                onCellValueChanged = {onCellValueChanged}
              >
                <AgGridColumn headerName="" field="TransactionId" maxWidth={50} resizable cellRendererFramework={CheckBoxCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Category" field="CategoryId" width={200} editable resizable cellRendererFramework={CategoryCellRenderer} filterFramework={CategoryFilter} sortable ></AgGridColumn>
                <AgGridColumn headerName="Description" field="Description" editable resizable cellRendererFramework={LeftAlignedCellRenderer} filter='agDateColumnFilter'></AgGridColumn>
                <AgGridColumn headerName="Amount" field="Amount" width={130} editable resizable cellRendererFramework={MoneyCellRenderer} filter='agNumberColumnFilter'></AgGridColumn>
                <AgGridColumn headerName="Date" field="Date" width={130} editable resizable cellRendererFramework={DateCellRenderer} filter='agDateColumnFilter'></AgGridColumn>
              </AgGridReact>
          </div>
          <ImportTransaction show={showImport} user={props.user} setTransactions={props.setTransactions} setFilteredTransactions={props.setFilteredTransactions} TransactionType={props.TransactionType} categories={props.categories} setShowImport={setShowImport} />
      </Grid>
    </Grid> 
  );
}

export default TransactionsGrid;
