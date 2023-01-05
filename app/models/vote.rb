class Vote < ApplicationRecord
    validates :voter_id, :post_id, presence: true
    validates :voter_id, uniqueness: {scope: :post_id}
    validates :vote, inclusion: { in: [true, false]}

    belongs_to :question,
        foreign_key: :post_id,
        class_name: :Question

    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: :User,
        optional: true
end