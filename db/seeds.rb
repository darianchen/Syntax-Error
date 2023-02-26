# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Question.destroy_all
  Answer.destroy_all
  Vote.destroy_all
  Tagging.destroy_all
  Tag.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('questions')
  ApplicationRecord.connection.reset_pk_sequence!('answers')
  ApplicationRecord.connection.reset_pk_sequence!('votes')
  ApplicationRecord.connection.reset_pk_sequence!('taggings')
  ApplicationRecord.connection.reset_pk_sequence!('tags')

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

  User.create!(
    # Create one user with an auto-generated display name:
        display_name: 'Payton a.k.a P Dog',
        email: 'payton@payton.com', 
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


  Question.create!(
      title: 'How do I become a software engineer?',
      body: 'I literally have no idea where to start?. Can someone help me?!', 
      author_id: '1'
  )


  Tag.create!(
    name: 'Java',
  )

  Tagging.create!(
    question_id: '1',
    tag_id: '1'
  )

  Question.create!(
      title: 'Why is the sky blue?',
      body: 'One of the biggest mysteries ever.', 
      author_id: '3'
  )

  Question.create!(
      title: 'How to make <hr> full width of page irrespective of the parent?',
      body: 'Could you tell me how to limit content width to the screen boundary? For the following script i always get 2px width wider than screen (allowed space) width.
      document.body.scrollWidth is always 2px wider than screen', 
      author_id: '13'
  )

  100.times do
    Question.create!({
      title: Faker::Hacker.say_something_smart,
      body: Faker::Quotes::Shakespeare.hamlet_quote,
      author_id: Faker::Number.between(from: 1, to: 12)
    })
  end

  Question.create!(
    title: 'Darian is the best programmer in the entire cohort!',
    body: 'HIRE HIM',
    author_id: '4'
  )

  puts "Done!"
end