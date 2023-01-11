class Vote < ApplicationRecord
    validates :voter_id, :post_id, presence: true
    validates :vote, inclusion: { in: [true, false]}
end