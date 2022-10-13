json.user do
    json.extract! @user, :id, :email, :display_name, :created_at, :updated_at
end