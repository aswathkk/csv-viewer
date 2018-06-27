import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Header from './header';
import TableComponent from './TableComponent';

class App extends Component {
  state = {
    data: [],
    fields: [],
    allFields: []
  }

  loadFile = async (fileName, fields) => {
    fields.sort((a, b) => a - b);
    try {
      const response = await fetch(`/api/file/${fileName}?fields=${fields}`);
      const data = await response.json();
      this.setState({
        data: data,
        fields: fields.map(i => this.state.allFields[i])
      });
    } catch(e) {
      console.log(e);
    }
  }

  allFieldChange = (fields) => {
    this.setState({
      allFields: fields
    });
  }

  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Header onSubmit={this.loadFile} allFieldChange={this.allFieldChange} />
          </Grid>
          <Grid item xs={12}>
            <TableComponent
              fields = {this.state.fields}
              data = {this.state.data}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
