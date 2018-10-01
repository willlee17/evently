import React, { Component } from 'react';
import { connect } from 'react-redux';
import {incrementCounter, decrementCounter} from './testActions';
import { Button } from 'semantic-ui-react';

const mapStateToProps = (state) => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

class TestComponent extends Component {
  render() {
    return(
      <div>
        <h1>Test Area!</h1>
        <h3>The data is: {this.props.data}</h3>
        <Button onClick={this.props.incrementCounter} color='green' content="UP!!!"/>
        <Button onClick={this.props.decrementCounter} color='red' content="DOWN!!!"/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
