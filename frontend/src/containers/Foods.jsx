import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@material-ui/lab/Skeleton';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

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

const submitOrder = () => {
  console.log('登録ボタンが押された!');
};

export const Foods = ({ match }) => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);

  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    // selectedFoodCountとは、selectedFoodがいくつ選ばれているか？という数量を表す値です。
    selectedFoodCount: 1,
  };

  const [state, setState] = useState(initialState);

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
          // foodsState.foodsListにはAPIから取得したフード一覧が入ります。
          // その数だけFoodWrapperを描画します。
          // onClickFoodWrapperに渡しているのは一旦ただのconsole.log()です。
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {/* state.isOpenOrderDialog && <Hoge /> ようにすることで
      &&より前の値がtrueの場合に、&&よりあとの要素をレンダリングするようJSXが認識します。
      つまり下記の例の場合、state.isOpenOrderDialogがtrueの場合にFoodOrderDialogコンポーネントをレンダリングしてくれるようになります。 */}
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          // 先ほど作った関数を渡します
          onClickOrder={() => submitOrder()}
          // モーダルの外側(黒い部分)をクリックすると、onCloseに渡した関数setState({...state, isOpenOrderDialog: false })が実行されて
          // stateが更新され、モーダルに渡したstate.isOpenOrderDialogがfalseになります。そして結果的にモーダルも閉じる、という仕組みです。
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}
    </Fragment>
  );
};
