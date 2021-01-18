import React, {useState} from 'react'
import { Modal, Nav, Button } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Settings(props) {
    const [selectedTab, setSelectedTab] = useState("Expense") 
    const [selectedCategories, setSelectedCategories] = useState([])
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function handleClose(){
        props.handleClose()
        setSelectedTab("Expense")
    }

    function addCategory(){
        var categoriesToUpdate = selectedTab==="Expense" ? props.expenseCategories : props.incomeCategories;
        var categories = categoriesToUpdate.concat([{CategoryId: 0, CategoryName: "", Planned: 0}]);
        saveCategories(categories, selectedTab)
    }

    function deleteCategory(){
        var categories = [];
        var categoriesToUpdate = selectedTab==="Expense" ? props.expenseCategories : props.incomeCategories;
        for(var i = 0; i < categoriesToUpdate.length; i++){
            var category = categoriesToUpdate[i];
            if(!selectedCategories.includes(category.CategoryId))
                categories.push(category);
            else{
                var transactions = selectedTab==="Expense" ? props.expenseTransactions : props.incomeTransactions;
                for(var x = 0; x < transactions.length; x++){
                    if(transactions[x].CategoryId === category.CategoryId){
                        alert('One of the selected Categories to be deleted is used in one or more transactions. Please make sure to change existing transactions to not include this category. In an upcoming update, you will be able to select a different category from here to switch the transactions to.')
                        return;
                    }
                }
            } 


        }
        saveCategories(categories, selectedTab);
    }

    function CheckBoxCellRenderer(params){
        return <input   type="checkbox" 
                        onChange={() => {
                            var index = selectedCategories.indexOf(params.data.CategoryId); 
                            if(index == -1){
                                selectedCategories.push(params.data.CategoryId);
                            }else{
                                selectedCategories.splice(index, 1);
                            }
                            setSelectedCategories(selectedCategories);
                        }}
                />
    }

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    function onCellValueChanged(event){
        var categoriesToUpdate = selectedTab==="Expense" ? props.expenseCategories : props.incomeCategories;
        categoriesToUpdate[event.rowIndex] = event.data
        saveCategories(categoriesToUpdate, selectedTab);
    }

    function saveCategories(categories, categoryType){
        fetch('/UpdateCategories', {
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body: JSON.stringify({
                userId : props.user['userId'],
                categoryType : categoryType,
                categories : categories
            })
        })
        .then(response => response.json())
        .then(result => {
            if(categoryType === "Expense"){
                props.setExpenseCategories(result['categories'])
            }else{
                props.setIncomeCategories(result['categories'])
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Nav fill variant="tabs" defaultActiveKey="link-1" style={{marginBottom:15}}>
                <Nav.Item onClick={() => setSelectedTab("Expense")}>
                    <Nav.Link eventKey="link-1">Expense</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setSelectedTab("Income")}>
                    <Nav.Link eventKey="link-2">Income</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setSelectedTab("Profile")}>
                    <Nav.Link eventKey="link-3">Profile</Nav.Link>
                </Nav.Item>
            </Nav>
            {(selectedTab==="Expense" || selectedTab==="Income") && (
                <div>
                    <Grid container spacing={0}>
                        <Grid item xs={6}>
                            <h5 style={{marginTop:7}}>Categories</h5>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="danger" size="sm" style={{float:'right'}} onClick={deleteCategory}>Delete</Button>
                            <Button variant="primary" size="sm" style={{float:'right', marginRight:5}} onClick={addCategory}>Add</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' } }>
                                <AgGridReact
                                    rowData={selectedTab==="Expense" ? props.expenseCategories : props.incomeCategories}
                                    domLayout="autoHeight"
                                    onCellValueChanged={onCellValueChanged}
                                    onGridReady={onGridReady}
                                    frameworkComponents={{CheckBoxCellRenderer: CheckBoxCellRenderer}}
                                >
                                    <AgGridColumn headerName="" field="CategoryId" width={50} cellRendererFramework={CheckBoxCellRenderer} ></AgGridColumn>
                                    <AgGridColumn headerName="Name" field="CategoryName" editable></AgGridColumn>
                                    <AgGridColumn headerName="Planned" field="Planned" valueFormatter={(params) => {return "$" + params.data.Planned}} editable></AgGridColumn>
                                </AgGridReact>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}   
            {selectedTab==="Profile" && (
                <div>
                    <h1>Profile</h1>
                </div>
            )}    
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default Settings;