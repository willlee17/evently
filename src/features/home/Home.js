import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui text container">
              <h1 className="ui inverted stackable header">
                <img
                  className="ui image massive"
                  src="/assets/h_logo.png"
                  alt="logo"
                />
                <div className="content">Evently</div>
              </h1>
              <h2>Create and Join Events!</h2>
              <div onClick={() => this.props.history.push('/events')} className="ui huge white inverted button">
                Let's Go!
                <i className="right arrow icon" />
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Home
