Fabricator(:restaurant) do
  username { Faker::Name.name }
  name { Faker::Name.name }
  password { Faker::Internet.password }
end
