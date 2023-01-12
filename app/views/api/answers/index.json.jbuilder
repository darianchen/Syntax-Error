@answers.each do |answer|
    json.set! answer.id do
        json.extract! answer, :id, :description, :answerer_id, :question_id, :editor_id, :created_at, :updated_at
        json.votes_attributes answer.votes.where(type_post: true).each do |vote|
            json.extract! vote, :id, :post_id, :voter_id, :vote
        end
    end
end