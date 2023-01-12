class FixTagsTable < ActiveRecord::Migration[7.0]
    def change
      add_column :tags, :name, :string
      Tag.update_all(name: '-')
      change_column_null :tags, :name, false
      remove_column :tags, :question_id, :integer
    end  
end
