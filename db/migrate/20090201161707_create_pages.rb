class CreatePages < ActiveRecord::Migration
  def self.up
    create_table :pages do |t|
      t.string :name
      t.integer :page_type
      t.integer :user_id
      t.boolean :default
      t.timestamps
    end
  end

  def self.down
    drop_table :pages
  end
end
