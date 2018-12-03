import { fetchImages } from './actions.types';

export const fetchImagesAction = (payload) => {
  return ({
    type: fetchImages,
    payload
  });
};
