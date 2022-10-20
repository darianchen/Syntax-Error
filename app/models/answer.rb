# == Schema Information
#
# Table name: answers
#
#  id          :bigint           not null, primary key
#  body        :text             not null
#  answerer_id :bigint           not null
#  question_id :bigint           not null
#  editor_id   :bigint
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Answer < ApplicationRecord

    validates :body, :question_id, :answerer_id, presence:true

    belongs_to :answerer,
    primary_key: :id,
    foreign_key: :answerer_id,
    class_name: :User

    belongs_to :question

end
