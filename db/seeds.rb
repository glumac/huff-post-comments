# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Comment.delete_all

Comment.create(name:"Bobby", clip:"1388293717497.wav", score:5)
Comment.create(name:"Betty", clip:"1388294141487.wav", score:6)
