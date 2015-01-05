class CreateProjectUsers < ActiveRecord::Migration
  def change
    create_table :project_users , id: false do |t|
# Your code comes here
      t.integer :project_id
      t.integer :user_id
      t.timestamps null: false
    end
       add_index :project_users, :project_id
    add_index :project_users, :user_id
  end

end
