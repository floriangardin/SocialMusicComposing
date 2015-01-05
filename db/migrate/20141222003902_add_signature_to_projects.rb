class AddSignatureToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :signature, :integer
  end
end
