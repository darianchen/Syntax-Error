json.question do
    json.extract! @question, :id, :title, :body, :author_id, :created_at, :updated_at
end