import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { withStyles } from '@material-ui/core/styles';

import FieldDropdown from './FieldDropdown';
import FileDropdown from './FileDropdown';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class Header extends Component {
  state = {
    files: [],
    data: [],
    fields: [],
    selectedField: [],
    fileName: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.fileName, this.state.selectedField.map(field => this.state.fields.indexOf(field)));
  }

  handleFileName = e => {
    this.setState({
      fileName: e.target.value,
      fields: this.state.data[e.target.value],
      selectedField: []
    });
    this.props.allFieldChange(this.state.data[e.target.value]);
  }

  handleFieldName = e => {
    this.setState({
      selectedField: e.target.value
    });
    
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/file');
      const data = await response.json();
      this.setState({
        files: Object.keys(data),
        data: data
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            CSV-Viewer
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FileDropdown
              items={this.state.files}
              label="File Name"
              name="fileName"
              onChange={this.handleFileName}
              value={this.state.fileName}
            />
            <FieldDropdown
              items={this.state.fields || []}
              label="Field Name"
              name="fieldName"
              disabled={this.state.fileName.length > 0 ? false : true}
              onChange={this.handleFieldName}
              value={this.state.selectedField}
            />
            <FormControl className={classes.formControl}>
              <Button type="submit" color="primary" variant="contained" disabled={(this.state.fileName.length > 0 && this.state.selectedField.length > 0) ? false : true}>
                <VisibilityIcon className={classes.leftIcon}/>
                View
              </Button>
            </FormControl>
          </form>
        </Toolbar>
      </AppBar>
    );
  }
};

export default withStyles(styles)(Header);
