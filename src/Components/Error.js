import React, {useState} from 'react'
import { Modal, Nav, Button } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Error(props) {
    
    return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
            <Modal.Title>OOPSIE!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.message}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default Error;