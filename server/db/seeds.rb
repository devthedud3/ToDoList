# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
2.times do
  list = List.create!(title: Faker::Movie.title)
  5.times do
    list.tasks.create!(
      description: Faker::Movie.title,
      completed: Faker::Boolean.boolean(true_ratio: 0.5),
      due_date: Faker::Date.forward(days: 30)
    )
  end
end
