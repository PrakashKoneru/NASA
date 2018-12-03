import { updateImagesData } from './actions.types';

const initialState = {
  images: []
}

export default function counter(state = initialState, action) {
  switch (action.type) {
  case updateImagesData:
    return { ...state, images: action.payload }
  default:
    return state
  }
}
