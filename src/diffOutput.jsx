import React from 'react';

import compare from './compare.jsx';

const { Component } = React;

class DiffOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcJson: this.props.srcJson,
      cmpJson: this.props.cmpJson
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.srcJson !== undefined && nextProps.cmpJson !== undefined;
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
       srcJson: nextProps.srcJson,
       cmpJson: nextProps.cmpJson
     });
  }

  render() {
    const diff = this.state.srcJson !== undefined && this.state.cmpJson !== undefined
      ? compare(this.state.srcJson, this.state.cmpJson).render()
      : null;

    return <div id="output">
      <div style={{fontWeight: "bold"}}>Output:</div>
      {diff}
    </div>
  }
}

module.exports = DiffOutput;
