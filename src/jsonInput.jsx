
import React from 'react';

const { Component } = React;

class JSONInput extends Component {

  render() {
    return <input placeholder={this.props.placeholder}
                  value={this.props.value}
                  onChange={(event) => this.props.onChange(event)}/>
  }
}

module.exports = JSONInput;