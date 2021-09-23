import React, { Fragment } from 'react';

export const Foods = ({ match }) => {
  return (
    <Fragment>
      フード一覧
      <p>restaurantsIdは {match.params.restaurantsId} です</p>
    </Fragment>
  );
};

// React Routerの場合matchオブジェクトを受け取り、match.params.hogeのかたちでパラメーターを抽出することができます。
// ここでは例えばhttp://localhost:3000/restaurants/1/foodsのようなURLでアクセスが来た場合に、
// 「restaurantsIdは 1 です」という文字列が画面に表示されることを期待します。
