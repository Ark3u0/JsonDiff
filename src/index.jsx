import React from 'react';
import StyleSheet from './master.scss';

import JSONInput from './jsonInput.jsx';
import DiffOutput from './diffOutput.jsx'
import ErroneousInputMessage from './erroneousInputMessage.jsx';

import parse from './parse.jsx';

const { Component } = React;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcValue: '',
      srcJson: undefined,
      cmpValue: '',
      cmpJson: undefined
    };
  }

  render() {
    return (
      <div id="index">
        <JSONInput placeholder="source JSON"
                   value={this.state.srcValue}
                   onChange={(event) => {
                      let srcJson = undefined;
                      try {
                        srcJson = parse(event.target.value);
                      } catch (parseException) {
                        console.log(parseException);
                      }
                      this.setState({srcValue: event.target.value, srcJson: srcJson});
                   }}/>
        <JSONInput placeholder="comparison JSON"
                   value={this.state.cmpValue}
                   onChange={(event) => {
                      let cmpJson = undefined;
                      try {
                        cmpJson = parse(event.target.value);
                      } catch (parseException) {
                        console.log(parseException);
                      }
                      this.setState({cmpValue: event.target.value, cmpJson: cmpJson});
                   }}/>
        <ErroneousInputMessage inputToBeDefined={this.state.srcJson} errorMessage="Source JSON input is invalid."/>
        <ErroneousInputMessage inputToBeDefined={this.state.cmpJson} errorMessage="Comparison JSON input is invalid."/>
        <DiffOutput srcJson={this.state.srcJson} cmpJson={this.state.cmpJson}/>
      </div>
    )
  }
}

module.exports = Index;