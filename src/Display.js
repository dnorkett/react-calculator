import React from 'react';
import './index.css';

class Display extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div id="displayApp"> 
          <div id="formula">
            {this.props.formula}
          </div>
          <div id="display">
            {this.props.output}
          </div>
        </div>
      )
    }
  }

  export default Display;
