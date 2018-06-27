import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TableComponent extends Component {
  render() {
    if(this.props.fields.length > 0)
      return (
        <Paper className="paper-table">
          <Table>
            <TableHead>
              <TableRow>
                {this.props.fields.map(field => <TableCell key={field}>{field}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.data.map(row => (
                  <TableRow key={row}>
                    { row.map(cell => <TableCell key={cell}>{cell}</TableCell>) }
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Paper>
      );
    else
      return (<div></div>);
  }
}

export default TableComponent;
