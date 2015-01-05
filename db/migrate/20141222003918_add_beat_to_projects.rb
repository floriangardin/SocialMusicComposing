class AddBeatToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :beat, :integer
  end
end
