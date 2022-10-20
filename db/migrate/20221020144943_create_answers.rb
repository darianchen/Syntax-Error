class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.text :body, null: false
      t.references :answerer, null: false, foreign_key: { to_table: :users }
      t.references :question, null: false, foreign_key: { to_table: :questions }
      t.references :editor, foreign_key: { to_table: :users}
      t.timestamps
    end
  end
end
