class AddTempoToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :tempo, :integer
  end
end
