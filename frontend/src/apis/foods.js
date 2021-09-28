import axios from 'axios';
// まずimport { foodsIndex } from '../urls/index'で
// URL文字列を返す関数をimportしています。
import { foodsIndex } from '../urls/index';

export const fetchFoods = (restaurantId) => {
  return axios
    .get(foodsIndex(restaurantId))
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
};
