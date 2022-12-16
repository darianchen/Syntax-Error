@answers.each do |answer|
    json.set! answer.id do
        json.extract! answer, :id, :description, :answere_id, :question_id, :editor_id, :created_at, :updated_at
    end
end