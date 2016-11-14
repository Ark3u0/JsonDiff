
import React from 'react';

const { Component } = React;

class ErroneousInputMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="errorMessage">
      {this.props.inputToBeDefined === undefined ? this.props.errorMessage : null}
    </div>
  }
}

module.exports = ErroneousInputMessage;