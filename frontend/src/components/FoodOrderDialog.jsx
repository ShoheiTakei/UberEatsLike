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

// まずMaterial UIのDialogは最低２つのpropsを受け取ります。
// １つがopenでboolean値、つまり開くか/閉じるかです。
// もう一つがonCloseで、こちらは関数を受け取ります。モーダルを閉じるために行う関数です。
export const FoodOrderDialog = ({ food, isOpen, onClose }) => {
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
      <DialogActions>// 数量を操作するアクションを入れる予定</DialogActions>
    </Dialog>
  );
};
