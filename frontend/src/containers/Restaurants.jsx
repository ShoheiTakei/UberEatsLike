import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

// apis
import { fetchRestaurants } from '../apis/restaurants';

// reducers
import {
  initialState,
  restaurantsActionTypes,
  restaurantsReducer,
} from '../reducers/restaurants';

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

export const Restaurants = () => {
  // useStateでいうところのstateと、それを更新するためのupdate関数に近い宣言と覚えておけばいいでしょう。
  // ちなみにここも命名は自由ですので、例えばrestaurantsState, restaurantsDispatchなどと変えることもできます。
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    // dispatchはstateを直接変更するためのものではありません。stateとは依存しない関数です。
    // dispatchはreducerを通じて間接的に、stateを変更させます
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants().then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        // ペイロードデータ=通信に含まれるデータのこと
        payload: {
          restaurants: data.restaurants,
        },
      })
    );
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {state.restaurantsList.map((restaurant) => (
        <div>{restaurant.name}</div>
      ))}
    </Fragment>
  );
};
