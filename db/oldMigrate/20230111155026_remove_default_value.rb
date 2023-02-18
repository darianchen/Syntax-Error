class RemoveDefaultValue < ActiveRecord::Migration[7.0]
  def change
    change_column_default :votes, :post_id, nil
  end  
end

