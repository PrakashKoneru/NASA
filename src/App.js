import React, { PureComponent } from 'react';
import { fetchImagesAction } from './actions.creators';
import { connect } from 'react-redux';
import moment from 'moment';
import Slider from "react-slick";
import './App.css';

class App extends PureComponent {
  state = {
    dateEntered: null
  }

  inputChange = ({ target: { value }}) => {
    this.setState({ dateEntered: value });
  }

  fetchData = () => this.props.fetchImagesAction(this.state.dateEntered)

  render() {
    const { images } = this.props;
    const sliderSettings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: images && images.length > 1
    };

    return (
      <div>
        <div className="sliderContainer">
          <Slider {...sliderSettings}>
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
          </Slider>
        </div>
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
