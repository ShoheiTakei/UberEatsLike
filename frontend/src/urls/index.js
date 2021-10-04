const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`;
export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`;
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;

// このファイルの中で行っていることは、サーバーサイドで定義したURL文字列を返す定数をいくつか設定しています。
// foodsIndexはURL文字列の途中に任意のrestaurantIdが入るため、引数にrestaurantIdを受け取り、それを文字列の中に展開しています。
// 例えば、レストラン一覧のURLを示すrestaurantsIndexは最終的にはhttp://localhost:3000/api/v1/restaurantsという文字列になります。
// そしてこの文字列(URL)を後ほど作成する関数で参照します。
