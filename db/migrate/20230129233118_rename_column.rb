class RenameColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column :votes, :votable, :vote
  end
end
