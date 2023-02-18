class RefactorVotes < ActiveRecord::Migration[7.0]
  def change
    remove_column :votes, :votable
    add_index :votes, :voter_id
    remove_column :votes, :votable_type
    add_column :votes, :post_id, :integer, default: 0, null: false
    add_index :votes, :post_id
  end
end

