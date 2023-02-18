class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :views, null: false, default: 0
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :editor, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
