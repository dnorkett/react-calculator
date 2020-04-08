import React from 'react';
import './index.css';
import Display from './Display';
import Buttons from './Buttons';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      formulaValue: '',
      previousValue: '',            
    };
    this.allClear = this.allClear.bind(this);
    this.numberClick = this.numberClick.bind(this);
    this.operatorClick = this.operatorClick.bind(this);
    this.decimalClick = this.decimalClick.bind(this);
    this.equalsClick = this.equalsClick.bind(this);
  }

  allClear() {
    this.setState({
      displayValue: '0',
      formulaValue: ''
    })
  }

  numberClick(e) {
    if (this.state.displayValue == '0'){
      this.setState({
        displayValue: e.target.value,
        formulaValue: this.state.formulaValue + e.target.value,
        previousValue: e.target.value
      })
    } else if (this.state.previousValue == '=') {
      this.setState({
        displayValue: e.target.value,
        formulaValue: e.target.value,
        previousValue: e.target.value
      })
    } else if (this.state.displayValue == '+' || this.state.displayValue == '-' || this.state.displayValue == '*' || this.state.displayValue == '/') {
      this.setState({
        displayValue: e.target.value,
        formulaValue: this.state.formulaValue + e.target.value,
        previousValue: e.target.value
      })
    } else {    
      this.setState({
        displayValue: this.state.displayValue + e.target.value,
        formulaValue: this.state.formulaValue + e.target.value,
        previousValue: e.target.value
      })
    }
  }

  operatorClick(e) {       
    if (this.state.previousValue == '=') {
      this.setState({
        formulaValue: this.state.displayValue + e.target.value,
        displayValue: e.target.value,        
        previousValue: e.target.value
      })
    } else if (this.state.displayValue == '+' || this.state.displayValue == '-' || this.state.displayValue == '*' || this.state.displayValue == '/') {
        if (this.state.previousValue === "-" && this.state.formulaValue.slice(-2,-1) === "*") {
          this.setState({            
            displayValue: e.target.value,
            formulaValue: this.state.formulaValue.slice(0,-2) + e.target.value,
            previousValue: e.target.value
        })
        } else if (e.target.value == '-' && this.state.previousValue != '-') {
            this.setState ({
              displayValue: e.target.value,
              formulaValue: this.state.formulaValue + e.target.value,
              previousValue: e.target.value              
            })
          } else {
            this.setState({              
              displayValue: e.target.value,
              formulaValue: this.state.formulaValue.slice(0,-1) + e.target.value,
              previousValue: e.target.value
          })
        }  
    } else {
    this.setState({
      displayValue: e.target.value,
      formulaValue: this.state.formulaValue + e.target.value,
      previousValue: e.target.value
      })    
    }
  }

  decimalClick(e) {
    if (this.state.previousValue != e.target.value && !this.state.displayValue.includes(e.target.value)) {
      this.setState({
        displayValue: this.state.displayValue + e.target.value,
        formulaValue: this.state.formulaValue + e.target.value,
        previousValue: e.target.value
      });
    }    
  }

  equalsClick(e) {    
    if (this.state.previousValue != '=') {      
      let answer = eval(this.state.formulaValue);

      this.setState({
        formulaValue: this.state.formulaValue + e.target.value + answer,
        displayValue: answer,
        previousValue: e.target.value
      });
    }
  }

  
  render() {
    return (
      <div id="calculator">        
        <Display formula={this.state.formulaValue} output={this.state.displayValue}/>
        <Buttons allClear={this.allClear} numberClick={this.numberClick} operatorClick={this.operatorClick} decimalClick={this.decimalClick} equalsClick={this.equalsClick}/>
      </div>
    );
  }
}

export default App;
