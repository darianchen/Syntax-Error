class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.integer :voter_id, null: false
      t.boolean :votable, null: false
      t.string :votable_type, null: false
      t.timestamps
    end
  end
end

