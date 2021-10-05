module Api
    module V1
      class LineFoodsController < ApplicationController
        # railsではアクションの実行前にフィルタとしてbefore_action :フィルタアクション名を定義できます。
        # 今回の例で言えばcreateの実行前に、set_foodを実行することができます。
        # :onlyオプションをつけることで、特定のアクションの実行前にだけ追加するということができます。
        before_action :set_food, only: %i[create replace]

        def index
            line_foods = LineFood.active
            # このif ... else ... endではline_foodsが空かどうか？をチェックしています。
            # .exists?メソッドは対象のインスタンスのデータがDBに存在するかどうか？をtrue/falseで返すメソッドです。
            if line_foods.exists?
              render json: {
                line_food_ids: line_foods.map { |line_food| line_food.id },
                restaurant: line_foods[0].restaurant,
                count: line_foods.sum { |line_food| line_food[:count] },
                amount: line_foods.sum { |line_food| line_food.total_amount },
              }, status: :ok
            else
              render json: {}, status: :no_content
            end
          end
  
        def create
          if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
            return render json: {
              existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
              new_restaurant: Food.find(params[:food_id]).restaurant.name,
            }, status: :not_acceptable
          end
  
          set_line_food(@ordered_food)
  
          if @line_food.save
            render json: {
              line_food: @line_food
            }, status: :created
          else
            render json: {}, status: :internal_server_error
          end
        end
        def replace
            LineFood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
                line_food.update_attribute(:active, false)
            end

            set_line_food(@ordered_food)
            
            if @line_food.save
                render json: {
                    line_food: @line_food
                },status: :created
            else
                render json: {},status: :internal_saver_error
            end
        end
  
        private
  
        # set_foodはこのコントローラーの中でしか呼ばれないアクションです。そのため、privateにします。
        def set_food
            # また、set_foodの中ではparams[:food_id]を受け取って、対応するFoodを１つ抽出し、@ordered_foodというインスタンス変数に代入しています。
            # このあと実行されるcreateアクションの中でも@ordered_foodを参照することができます。
            # ちなみに、インスタンス変数は便利な一方で危険なものです。グローバルに定義するときのみ使うべきです。
            # というのも、インスタンス変数ということはどこからでも参照できることなので、思わぬ使われ方がされる可能性があるということです。
            # 逆にローカル変数(@をつけない変数)の場合、そのスコープ(範囲内)でしか使われないことが明確なのでそのような心配がありません。
          @ordered_food = Food.find(params[:food_id])
        end
  
        def set_line_food(ordered_food)
          if ordered_food.line_food.present?
            @line_food = ordered_food.line_food
            @line_food.attributes = {
              count: ordered_food.line_food.count + params[:count],
              active: true
            }
          else
            @line_food = ordered_food.build_line_food(
              count: params[:count],
              restaurant: ordered_food.restaurant,
              active: true
            )
          end
        end
      end
    end
  end