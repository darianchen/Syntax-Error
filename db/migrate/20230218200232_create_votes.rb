class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :voter, null: false, foreign_key: { to_table: :users }
      t.references :post, null: false
      t.boolean :vote, null: false
      t.boolean :post_type, null: false, default: false
      t.timestamps
    end
  end
end
