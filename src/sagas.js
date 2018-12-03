import { takeLatest, all, call, put } from 'redux-saga/effects'
import { fetchImages, updateImagesData } from './actions.types';
import axios from 'axios';
import moment from 'moment';

const submitDate = (date) => axios.get(`https://epic.gsfc.nasa.gov/api/enhanced/date/${date}`);

function* fetchImagesData({ type, payload }) {
  try {
    const currentYear = moment().year();
    const currentTime =  moment().valueOf();
    const dateVal = payload.slice(4);
    const currentBdayTime = moment(`${currentYear}${dateVal}`).valueOf();
    let closestBirthDate = currentTime - currentBdayTime >= 0 ? `${currentYear}${dateVal}` : `${currentYear - 1}${dateVal}`;
    while (true) {
      const { data } = yield call(submitDate, moment(closestBirthDate).format('YYYY-MM-DD'));
      if (data.length > 0) {
        yield put({ type: updateImagesData, payload: data })
        break;
      } else {
        closestBirthDate = moment(closestBirthDate).add(1,'days').format('YYYY-MM-DD');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(fetchImages, fetchImagesData)
  ])
}