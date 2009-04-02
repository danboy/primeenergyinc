class Item < ActiveRecord::Base
  acts_as_taggable_on :tags
  belongs_to :page
end
