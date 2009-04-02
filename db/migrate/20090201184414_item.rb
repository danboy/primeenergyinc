class Item < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.string :title
      t.text :description
      t.text :content
      t.string :link
      t.integer :user_id
      t.integer :page_id
      t.timestamps
    end
  end
  def self.down
    drop_table :items
  end
end
