class Tag < ApplicationRecord
    validates :name, presence: true, uniqueness: true

    has_many :taggings,
        foreign_key: :tag_id,
        class_name: :Tagging,
        dependent: :destroy
    
    has_many :questions_tagged,
        through: :taggings,
        source: :questions

    def creation
        self.created_at
    end

end