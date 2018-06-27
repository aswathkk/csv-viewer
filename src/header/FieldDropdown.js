import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 220,
  }
});

class Dropdown extends Component {
  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl} disabled={this.props.disabled}>
        <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
        <Select
          value={this.props.value}
          onChange={this.props.onChange}
          inputProps={{
            name: this.props.name,
            id: this.props.id,
          }}
          multiple
        >
          {this.props.items.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>) }
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Dropdown);
