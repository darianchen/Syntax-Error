class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.integer :answerer_id, null: false
      t.integer :question_id, null: false
      t.text :description, null: false
      t.references :editor, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end

