import { updateImagesData, fetchingImagesData, bearthDayCheck } from './actions.types';

const initialState = {
  images: [],
  fetchingImagesData: false,
  bearthDayCheck: ''
}

export default function counter(state = initialState, action) {
  switch (action.type) {
  case updateImagesData:
    return { ...state, images: action.payload }
  case fetchingImagesData:
    return { ...state, fetchingImagesData: action.payload }
  case bearthDayCheck:
    return { ...state, bearthDayCheck: action.payload }
  default:
    return state
  }
}
