import React, {useState} from 'react'
import { Modal, Nav, Button } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import readXlsxFile from 'read-excel-file'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function ImportTransaction(props) {
    const [rows, setRows] = useState(null)
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    
    function readFile(){
        console.log(props.user)
        return;
        var input = document.getElementById('input')
    
        readXlsxFile(input.files[0]).then((rows) => {
          console.log(rows)
        })
      }

    function handleImport(){
        fetch('https://budgetflaskapp.azurewebsites.net/UpdateSettings', {
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body: JSON.stringify({
                userId : 123
            })
        })
        .then(response => response.json())
        .then(result => {
            props.   handleClose()
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
            <Modal.Title>Import {props.TransactionType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <Grid container spacing={0}>
                <Grid item xs={12}>
                    <input type="file" />
                </Grid>
                <Grid item xs={12}>
                    {rows && (
                        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' } }>
                            <AgGridReact
                                domLayout="autoHeight"
                            >
                                <AgGridColumn headerName="" field="TransactionId" width={50} ></AgGridColumn>
                                <AgGridColumn headerName="Category" field="CategoryName" width={125} editable></AgGridColumn>
                                <AgGridColumn headerName="Description" field="Description" width={250} editable></AgGridColumn>
                                <AgGridColumn headerName="Amount" field="Amount" width={125} editable></AgGridColumn>
                                <AgGridColumn headerName="Date" field="Date" width={125} editable></AgGridColumn>
                            </AgGridReact>
                        </div>
                    )}
                    
                </Grid>
            </Grid> 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleImport}>Import</Button>
            <Button variant="secondary" onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default ImportTransaction;