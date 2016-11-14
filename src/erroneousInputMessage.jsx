
import React from 'react';

const { Component } = React;

class ErroneousInputMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div style={styles.errorMessage}>
      {this.props.inputToBeDefined === undefined ? this.props.errorMessage : null}
    </div>
  }
}

const styles = {
  errorMessage: {
    color: 'red',
    fontWeight: 'bold'
  }
};

module.exports = ErroneousInputMessage;