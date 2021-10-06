import axios from 'axios';
import { lineFoods, lineFoodsReplace } from '../urls/index';

export const postLineFoods = (params) => {
  return axios
    .post(lineFoods, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};

// paramsオブジェクトの中身は、foodId: 1,count: 10,こんなかんじ
export const replaceLineFoods = (params) => {
  return axios
    .put(lineFoodsReplace, {
      food_id: params.foodId,
      count: params.count,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
};

export const fetchLineFoods = () => {
  return (
    axios
      .get(lineFoods)
      .then((res) => {
        return res.data;
      })
      // 中ではthrowしているのでここで例外が発生します。もし後続の処理があってもここで停止します。
      .catch((e) => {
        throw e;
      })
  );
};
