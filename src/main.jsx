import compare from './compare.jsx';
import JSONInput from './jsonInput.jsx';

import React from 'react';
import ReactDOM from 'react-dom';

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
      srcJson = JSON.parse(this.state.srcValue);
      cmpJson = JSON.parse(this.state.cmpValue);
    } catch (parseException) {
      console.log(parseException);
    }

    const diff = !!srcJson && !!cmpJson
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
       {diff}
     </div>
   )
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('content')
);

