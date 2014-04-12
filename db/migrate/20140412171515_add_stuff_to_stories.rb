class AddStuffToStories < ActiveRecord::Migration
  def change
    add_column :stories, :vicinity, :string
    add_column :stories, :name, :string
  end
end
