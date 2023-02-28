count = 0
@questions.each do |question|
    json.set! count do
        json.extract! question, :id, :title, :body, :author_id, :editor_id, :created_at
        json.votes_attributes question.votes.where(post_type: false).each do |vote|
            json.extract! vote, :id, :post_id, :voter_id, :vote
        end
        json.tags_attributes @tags[question.id].each do |tag|
            json.extract! tag, :id, :name
        end
        json.answer_count question.answers.count
        json.author question.author.display_name
        json.total_pages @total_pages
    end
    count = count + 1
end