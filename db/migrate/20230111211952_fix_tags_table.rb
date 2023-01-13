class FixTagsTable < ActiveRecord::Migration[7.0]
    def change
      if column_exists?(:tags, :name)
        Tag.update_all(name: '-')
        change_column_null :tags, :name, false
      end

      if column_exists?(:tags, :question_id)
        remove_column :tags, :question_id, :integer
      end
    
    end  
end

