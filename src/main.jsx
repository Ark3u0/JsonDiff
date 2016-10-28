// bugs:
// - handling of arrays

import Comparator from './compare.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

const { Component } = React;
const comparator = new Comparator();


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srcValue: '',
      cmpValue: '',
      outputTree: undefined,
      errorValue: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.updateStateForChangedInput(event);

    try {
      const srcJson = JSON.parse(this.state.srcValue);
      const cmpJson = JSON.parse(this.state.cmpValue);

      this.setState({
        outputTree: comparator.compare(srcJson, cmpJson)
      });
    } catch (parseException) {
      console.log(parseException);
    }
  }

  // Might need to consolidate to one setState call...
  updateStateForChangedInput(event) {
    const id = event.target.id;
    this.setState({[id + "Value"]: event.target.value});
  }


  render() {
    return (
     <div id="index">
       <input id="src"
              placeholder="source JSON"
              value={this.state.srcValue}
              onChange={this.handleChange}/>
       <input id="cmp"
              placeholder="comparison JSON"
              value={this.state.cmpValue}
              onChange={this.handleChange}/>
       <div id="output">
         <div>Source: {this.state.srcValue}</div>
         <div>Comparison: {this.state.cmpValue}</div>
       </div>
     </div>
   )
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('content')
);

