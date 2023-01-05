class Tagging < ApplicationRecord
    validates :question_id, :tag_id, presence: true
    validates :question_id, uniqueness: {scope: :tag_id}
    
    belongs_to :questions,
        foreign_key: :question_id,
        class_name: :Question

    belongs_to :tags,
        foreign_key: :tag_id,
        class_name: :Tag
end