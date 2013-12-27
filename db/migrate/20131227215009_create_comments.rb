class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :name
      t.integer :score
      t.string :clip

      t.timestamps
    end
  end
end
