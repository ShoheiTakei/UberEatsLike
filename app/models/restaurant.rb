class Restaurant < ApplicationRecord
    has_many :foods
    has_many :line_foods, through: :foods
  
    # :nameや:feeなどのカラムのデータが必ず存在する(存在しないとエラーになる)ことを定義しています。(presence: true)
    validates :name, :fee, :time_required, presence: true
    # こちらは:nameが最大30文字以下と制限しています。
    DEFAULT_NAME_LENGTH = 30
    validates :name, length: { maximum: DEFAULT_NAME_LENGTH }
    # こちらは:fee、つまり手数料が0以上であることと制限しています。配送手数料なので誤って-100などのマイナスの値が入ってしまうことを防ぐ意図があります。
    validates :fee, numericality: { greater_than: 0 }
  end