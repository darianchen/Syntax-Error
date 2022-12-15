class Answer  < ApplicationRecord

    validates :description, presence: true

    belongs_to :user,
        class_name: :User,
        foreign_key: :answerer_id,
        optional: true
    
    belongs_to :question,
        class_name: :Question,
        foreign_key: :question_id,
        optional: true

end