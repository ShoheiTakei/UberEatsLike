import React from 'react';
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import styled from 'styled-components';

// components
import { SubText } from './StyledText';
import { CountUpButton } from './Buttons/CountUpButton';
import { CountDownButton } from './Buttons/CountDownButton';
import { OrderButton } from './Buttons/OrderButton';

// images
import OrderHeaderImage from '../images/order-header.png';

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const CountNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

// まずMaterial UIのDialogは最低２つのpropsを受け取ります。
// １つがopenでboolean値、つまり開くか/閉じるかです。
// もう一つがonCloseで、こちらは関数を受け取ります。モーダルを閉じるために行う関数です。
export const FoodOrderDialog = ({
  food,
  isOpen,
  onClose,
  onClickCountUp,
  onClickCountDown,
  onClickOrder,
}) => {
  return (
    // Dialogコンポーネントはその中にDialogTitleやDialogContentなどの
    // Material UI提供のラッパーコンポーネントを含めることで、"それらしい"スタイルで描画してくれます。
    <Dialog open={isOpen} onClose={onClose}>
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      <DialogTitle>{food.name}</DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>{food.description}</SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountersWrapper>
          <CountItem>
            <CountDownButton
              onClick={() => onClickCountDown()}
              // 数量が1以下だったら、カウントダウンさせない
              isDisabled={countNumber <= 1}
            />
          </CountItem>
          <CountItem>
            <CountNum>{countNumber}</CountNum>
          </CountItem>
          <CountItem>
            <CountUpButton
              onClick={() => onClickCountUp()}
              // 数量が9以上だったら、カウントアップさせない
              isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
              {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>{`¥${countNumber * food.price}`}</PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  );
};
