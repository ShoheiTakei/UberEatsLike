import React, { Fragment, useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import { NewOrderConfirmDialog } from '../components/NewOrderConfirmDialog';
import Skeleton from '@material-ui/lab/Skeleton';

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';
import { postLineFoods, replaceLineFoods } from '../apis/line_foods';

// images
import MainLogo from '../images/logo.png';
import { FoodOrderDialog } from '../components/FoodOrderDialog';
import FoodImage from '../images/food-image.jpg';

// constants
import { HTTP_STATUS_CODE } from '../constants';
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
  const initialState = {
    isOpenOrderDialog: false,
    selectedFood: null,
    selectedFoodCount: 1,
    // isOpenNewOrderDialogはNewOrderConfirmDialogコンポーネントをレンダリングする/しないのフラグです。
    isOpenNewOrderDialog: false,
    // existingRestaurantNameとnewRestaurantNameは
    // それぞれNewOrderConfirmDialogコンポーネントにprops経由で渡したい元々仮注文に入っていた店舗名と、新しく入った店舗名です
    existingRestaurantName: '',
    newRestaurantName: '',
  };
  const [state, setState] = useState(initialState);
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const history = useHistory();

  // React Routerの場合matchオブジェクトを受け取り、match.params.hogeのかたちでパラメーターを抽出することができます。
  // ここでは例えばhttp://localhost:3000/restaurants/1/foodsのようなURLでアクセスが来た場合に、
  // 「restaurantsIdは 1 です」という文字列が画面に表示されることを期待します。
  useEffect(() => {
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

  const submitOrder = () => {
    postLineFoods({
      // selectedFoodやselectedFoodCountはフードitemをクリックしたとき、モーダルでカウントを変更した時にセットされているはずです。
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    })
      .then(() => history.push('/orders'))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          });
        } else {
          throw e;
        }
      });
  };

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    })
      // history.push('/orders')が実行されたタイミングで/ordersページ、つまり注文ページへと遷移します。実際はOrders.jsxがレンダリングされます。
      .then(() => history.push('/orders'));
  };

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
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    selectedFood: food,
                    isOpenOrderDialog: true,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
        {/* state.isOpenOrderDialog && <Hoge /> ようにすることで
      &&より前の値がtrueの場合に、&&よりあとの要素をレンダリングするようJSXが認識します。
      つまり下記の例の場合、state.isOpenOrderDialogがtrueの場合にFoodOrderDialogコンポーネントをレンダリングしてくれるようになります。 */}
      </FoodsList>
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
          onClickOrder={() => submitOrder()}
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
      {state.isOpenNewOrderDialog && (
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          // モーダルの外側(黒い部分)をクリックすると、onCloseに渡した関数setState({...state, isOpenOrderDialog: false })が実行されて
          // stateが更新され、モーダルに渡したstate.isOpenOrderDialogがfalseになります。そして結果的にモーダルも閉じる、という仕組みです。
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      )}
    </Fragment>
  );
};
