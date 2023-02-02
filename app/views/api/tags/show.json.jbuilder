@tags.each do |tag|
    json.set! tag.id do
        json.extract! tag, :id, :title, :created_at, :tag_count
    end
end