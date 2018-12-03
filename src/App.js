import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchImagesAction } from './actions.creators';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    dateEntered: null
  }

  inputChange = ({ target: { value }}) => {
    this.setState({ dateEntered: value });
  }

  fetchData = () => this.props.fetchImagesAction(this.state.dateEntered)

  render() {
    const { images } = this.props;
    return (
      <div className="App">
        <input type="date" onChange={this.inputChange}/>
        <button onClick={this.fetchData}>Get Picture</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  images: state.images
})

export default connect(mapStateToProps, { fetchImagesAction })(App);
