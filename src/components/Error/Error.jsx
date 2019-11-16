import React from 'react';
import './Error.css';
import PropTypes from 'prop-types';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLine: 1
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  };

  handleKeyPress = (event) => {
    if (event.keyCode === 32 || event.keyCode === 13) {
      this.nextLine();
    };
  }

  showLine(num) {
    if(num <= this.state.currentLine){
      return 'message-show';
    } else {
      return 'message-hide';
    }
  }

  isCurrent(num) {
    if(num === this.state.currentLine) {
      return <span id="underscore">_</span>
    } else {
      return null;
    };
  }

  nextLine() {
    if(this.state.currentLine === 8) {
      this.props.exitSpecial();
    } else {
      this.setState((state) => {
        return { currentLine: state.currentLine + 1};
      });
    };
  }
  
  render() {
    return (
      <div className="error">
          <ul>
              <li className="message-show">> WARNING: an unexpected error occured</li>
              <li className={this.showLine(1)}>> Unable to transfer data to requested destination.{this.isCurrent(1)}</li>  
              <li className={this.showLine(2)}>> Connection attempt unsuccessful.{this.isCurrent(2)}</li>
              <li className={this.showLine(3)}>> Alternative destination triggered a forced redirect. Unable to override.{this.isCurrent(3)}</li>
              <li className={this.showLine(4)}>> Destination branch classification: Extreme Danger. Strongly advised to not connect under any circumstances.{this.isCurrent(4)}</li>
              <li className={this.showLine(5)}>> Attempting to return to previous branch...{this.isCurrent(5)}</li>
              <li className={this.showLine(6)}>> Rollback Attempt unsuccessful.{this.isCurrent(6)}</li>
              <li className={this.showLine(7)}>> Severing connection to network to prevent further corruption.{this.isCurrent(7)}</li>
              <li className={this.showLine(8)}>> Thank you for using Needle's Eye Enterprises. We wish you the best of luck in your impending death.{this.isCurrent(8)}</li>
            </ul>
      </div>
    );
  }
}

Error.propTypes = {
  exitSpecial: PropTypes.func
}

export default Error;