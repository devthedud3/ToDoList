class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :description
      t.boolean :completed
      t.belongs_to :list, foreign_key: true
      t.date :due_date

      t.timestamps
    end
  end
end
