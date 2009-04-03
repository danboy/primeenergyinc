class AddPhotoToItem < ActiveRecord::Migration
  def self.up
    add_column :items, :photo_file_name, :string # Original filename
    add_column :items, :photo_content_type, :string # Mime type
    add_column :items, :photo_file_size, :integer # File size in bytes
  end

  def self.down
    remove_column :items, :photo_file_name
    remove_column :items, :photo_content_type
    remove_column :items, :photo_file_size
  end
end
