class RefactorVotesAndTags < ActiveRecord::Migration[7.0]
  def change
    add_column :votes, :post_type, :boolean, :default => false
    remove_column :tags, :taglist
  end
end