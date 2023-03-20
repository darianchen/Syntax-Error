json.question do
    json.extract! @question, :id, :title, :body, :views, :author_id, :editor_id, :created_at, :updated_at
    json.tags_attributes @question.tags.each do |tag|
        json.extract! tag, :id, :name
    end
end