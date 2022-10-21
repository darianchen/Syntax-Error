@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :title, :body, :author_id, :editor_id, :created_at
    end
end