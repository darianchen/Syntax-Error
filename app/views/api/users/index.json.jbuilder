@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :email, :display_name
    end
end