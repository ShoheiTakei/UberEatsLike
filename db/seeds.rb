# 3回Restaurant.new()させています
3.times do |n|
    # Restaurantクラスからrestaurantインスタンスを作成しています。
    # "testレストラン_0", "testレストラン_1"...となるようにします。
    # feeやtime_requiredは固定の値を設定します。
    restaurant = Restaurant.new(
        name: "testレストラン_#{n}",
        fee: 100,
        time_required: 10,
    )

    # それぞれのrestaurantに１つにつき12個のfoodを作成します。
    # restaurant.foods.buildとすることで、
    # Food.newすることなくリレーションを持ったfoodを生成することができます。
    12.times do |m|
        restaurant.foods.build(
            name: "フード名_#{m}",
            price: 500,
            description: "フード_#{m}の説明文です。"
        )
    end

    # restaurantインスタンスをsave!することで、
    # データをDBに書き込むことができます。
    restaurant.save!
end