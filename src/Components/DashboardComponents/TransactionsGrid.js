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

  function saveTransactions(transactions){
    fetch('/UpdateTransactions', {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body: JSON.stringify({
            userId : props.user['userId'],
            transactionType : props.TransactionType.replace('es', 'e'),
            transactions : transactions
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
    })
    .catch(e => {
        console.log(e);
    });
  }

  function addTransaction(){
      var today = new Date();
      today.setDate(today.getDate())
      var transactions = [{TransactionId: 0, CategoryId: props.categories[0].CategoryId, Description: "", Amount : 0, Date : today.toLocaleDateString()}].concat(props.transactions)
      saveTransactions(transactions);
  }

  function deleteTransactions(){
    var transactions = [];
    for(var i = 0; i < props.transactions.length; i++){
        var transaction = props.transactions[i];
        if(!selectedTransactions.includes(transaction.TransactionId))
          transactions.push(transaction);
    }
    saveTransactions(transactions);
}

  function CategoryCellRenderer(params){
    return <Form.Control as="select" defaultValue={params.value} style={{width:'100%'}} onChange={(event)=>{params.setValue(event.target.value)}}>
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

  function onCellValueChanged(event){
    var transactions = props.transactions;
    transactions[event.rowIndex] = event.data;
    saveTransactions(transactions);
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
                rowData = {props.transactions}
                onGridReady = {onGridReady}
                onCellValueChanged = {onCellValueChanged}
              >
                <AgGridColumn headerName="" field="TransactionId" maxWidth={50} resizable cellRendererFramework={CheckBoxCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Category" field="CategoryId" width={200} editable resizable cellRendererFramework={CategoryCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Description" field="Description" maxWidth={300} editable resizable cellRendererFramework={LeftAlignedCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Amount" field="Amount" width={100} editable resizable cellRendererFramework={MoneyCellRenderer}></AgGridColumn>
                <AgGridColumn headerName="Date" field="Date" width={130} editable resizable cellRendererFramework={DateCellRenderer}></AgGridColumn>
              </AgGridReact>
          </div>
          <ImportTransaction show={showImport} TransactionType={props.TransactionType} handleClose={() => {setShowImport(false)}} />
      </Grid>
    </Grid> 
  );
}

export default TransactionsGrid;
