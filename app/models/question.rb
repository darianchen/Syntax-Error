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

    
    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
        
end
