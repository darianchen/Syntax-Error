class CreateTaggings < ActiveRecord::Migration[7.0]
  def change
    create_table :taggings do |t|
      t.references :tag, null: false, foreign_key: { to_table: :tags }
      t.references :question, null: false, foreign_key: { to_table: :questions }
      t.timestamps
    end
  end
end