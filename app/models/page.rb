class Page < ActiveRecord::Base
  has_many :items, :order => "items.id DESC", :limit => 10
end
