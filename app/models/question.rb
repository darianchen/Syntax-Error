# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  body       :text             not null
#  views      :integer          default(0), not null
#  author_id  :bigint           not null
#  editor_id  :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
    validates :title, :body, :views, :author_id, presence: true

    has_many :answers, dependent: :destroy

    has_many :taggings,
        foreign_key: :question_id,
        class_name: :Tagging,
        dependent: :destroy

    has_many :tags,
        through: :taggings,
        source: :tags

    has_many :votes, dependent: :destroy, foreign_key: :post_id

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
        
end
