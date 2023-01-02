class CreateTaggings < ActiveRecord::Migration[7.0]
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :question_id, null: false
      t.timestamps
    end
  end
end
