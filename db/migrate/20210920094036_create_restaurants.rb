class CreateRestaurants < ActiveRecord::Migration[6.0]
  def change
    create_table :restaurants do |t|
      # t.テーブルのカラム型 :カラム名, オプション...
      # 一番初めはstring型のnameというカラムを作成し、オプションとしてnullにはできないようにするという意味
      t.string :name, null: false
      t.integer :fee, null: false,default: 0
      t.integer :time_required, null: false
      # 自動的にcreated_atとupdated_atの2つのカラムを作成する
      t.timestamps
    end
  end
end
