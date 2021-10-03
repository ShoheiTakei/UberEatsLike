import React, { Fragment, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@material-ui/lab/Skeleton';

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// constants
import { COLORS } from '../style_constants';
import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

// --- ここから追加 ---
const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = ({ match }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  useEffect(() => {
    // React Routerの場合matchオブジェクトを受け取り、match.params.hogeのかたちでパラメーターを抽出することができます。
    // ここでは例えばhttp://localhost:3000/restaurants/1/foodsのようなURLでアクセスが来た場合に、
    // 「restaurantsIdは 1 です」という文字列が画面に表示されることを期待します。
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(match.params.restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: {
          foods: data.foods,
        },
      });
    });
  }, []);

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {/* ここでは、12個のSkeletonコンポーネントを並べています。 
            [...Array(12).keys()=> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]となる*/}
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) => console.log(food)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
    </Fragment>
  );
};
