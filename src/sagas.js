import { takeEvery, all } from 'redux-saga/effects'
import { fetchImages } from './actions.types';

function* fetchImagesData({ type, payload }) {
  yield console.log('here would be the actual logic to perform API calls');
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchImages, fetchImagesData)
  ])
}