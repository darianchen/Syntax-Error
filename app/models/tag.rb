class Tag < ApplicationRecord
    validates :title, presence: true, uniqueness: true

    has_many :question_tags,
        foreign_key: :tag_id,
        class_name: :QuestionTag,
        dependent: :destroy
    
    has_many :questions_tagged,
        through: :question_tags,
        source: :questions

    def creation
        self.created_at
    end

end
