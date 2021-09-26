import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsLists: [],
};

export const restaurantsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

// stateとは初期状態であれば先ほど定義したinitialStateが、あるいは加工後のstateが入ります。
// またactionにはreducerを使う側が指定したrestaurantsActionTypesのいずれかが入ります。
// そして、restaurantsReducerは指定されたaction.typeに沿って、加工されたstateを返します。それが以下の部分です。
export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
};
