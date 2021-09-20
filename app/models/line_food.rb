class LineFood < ApplicationRecord
    belongs_to :food
    belongs_to :restaurant
    belongs_to :order, optional: true
  
    validates :count, numericality: { greater_than: 0 }
  
    # Railsのscopeはモデルそのものや関連するオブジェクトに対するクエリを指定することができます。
    # そしてその返り値は必ずActiveRecord_Relationとなります。
    # 上記のscopeでは全てのLineFoodからwhereでactive: trueなもの一覧をActiveRecord_Relationのかたちで返してくれます。
    scope :active, -> { where(active: true) }
    scope :other_restaurant, -> (picked_restaurant_id) { where.not(restaurant_id: picked_restaurant_id) }
  
    # こちらはインスタンスメソッドです。
    # 特定のline_foodインスタンスがもつfoodの金額と、数量をかけあわせたline_foodの合計価格を求めるものです。
    # これはコントローラーではなく、モデルに記述することで、様々な箇所から呼び出すことができます。
    def total_amount
      food.price * count
    end
  end