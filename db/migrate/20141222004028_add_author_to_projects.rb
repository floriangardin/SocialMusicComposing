class AddAuthorToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :author, :integer
  end
end
