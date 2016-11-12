import React from 'react';

import JSONInput from './jsonInput.jsx';
import parse from './parse.jsx';
import compare from './compare.jsx';

const { Component } = React;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcValue: '',
      srcJson: undefined,
      cmpValue: '',
      cmpJson: undefined,
      errorValue: ''};
  }

  render() {
    let srcJson, cmpJson;
    try {
      srcJson = parse(this.state.srcValue);
      cmpJson = parse(this.state.cmpValue);
    } catch (parseException) {
      console.log(parseException);
    }

    const diff = srcJson !== undefined && cmpJson !== undefined
      ? compare(srcJson, cmpJson).render()
      : null;

    return (
      <div id="index">
        <JSONInput placeholder="source JSON"
                   value={this.state.srcValue}
                   onChange={(event) => this.setState({srcValue: event.target.value})}/>
        <JSONInput placeholder="compare JSON"
                   value={this.state.cmpValue}
                   onChange={(event) => this.setState({cmpValue: event.target.value})}/>
        <div id="output">
          <div style={{fontWeight: "bold"}}>Output:</div>
          {diff}
        </div>
      </div>
    )
  }
}

module.exports = Index;