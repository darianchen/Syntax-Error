class Vote < ApplicationRecord
    validates :voter_id, :post_id, presence: true
    validates :vote, inclusion: { in: [true, false]}
    validates :post_type, inclusion: { in: [true, false]}
end