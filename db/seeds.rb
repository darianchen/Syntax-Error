# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember email and password:
    User.create!(
      display_name: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password'
    )

    User.create!(
        display_name: 'Darian', 
        email: 'darianychen@gmail.com', 
        password: 'password'
    )

    User.create!(
    # Create one user with an auto-generated display name:
        display_name: 'test',
        email: 'test@example.com', 
        password: 'password'
    )
  
    #More users
    10.times do 
      display_name = Faker::Games::SuperSmashBros.fighter
      User.create!({
        display_name: display_name,
        email: Faker::Internet.unique.email,
        password: 'password'
      }) 
    end
  
    puts "Done!"
  end