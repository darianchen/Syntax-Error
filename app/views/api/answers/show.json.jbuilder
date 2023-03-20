json.answer do
    json.extract! @answer, :id, :description, :answerer_id, :question_id, :editor_id, :created_at, :updated_at
    json.title @answer.question.title
end