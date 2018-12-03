import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchImagesAction } from './actions.creators';
import { connect } from 'react-redux';
import moment from 'moment';

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
        {images && images.map((image) => {
          const imageTakenOn = moment(image.date).format('YYYY/MM/DD');
          return (
            <div key={image.identifier}>
              <img
                src={`https://epic.gsfc.nasa.gov/archive/natural/${imageTakenOn}/png/epic_1b_${image.identifier}.png`}
                alt="Image not Found"
                height="300px"
                width="300px"
              />
            </div>
          )
        })}
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
