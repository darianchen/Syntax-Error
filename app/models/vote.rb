class Vote < ApplicationRecord
    validates :voter_id, :post_id, presence: true
    validates :vote, inclusion: { in: [true, false] }
    validates :voter_id, uniqueness: {scope: :post_id}

    belongs_to :post

    belongs_to :voter,
        foreign_key: :voter_id,
        class_name: :User
end
