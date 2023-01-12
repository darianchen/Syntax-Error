@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :title, :body, :author_id, :editor_id, :created_at
        json.votes_attributes question.votes.where(type_post: false).each do |vote|
            json.extract! vote, :id, :post_id, :voter_id, :vote
        end
        json.tags_attributes @taggs[question.id].each do |tag|
            json.extract! tag, :id, :name
        end
    end
end