module Api
    module V1
      class RestaurantsController < ApplicationController
        def index
        # Restaurantモデルを全て取得して、restaurantsという変数に代入します。
          restaurants = Restaurant.all
            
        #   そして、render json: {}というかたちでJSON形式でデータを返却しています。
        # そして、最後のstatus: :okとすることで、リクエストが成功したこと、200 OKと一緒にデータを返すようになります。
          render json: {
            restaurants: restaurants
          }, status: :ok
        end
      end
    end
  end