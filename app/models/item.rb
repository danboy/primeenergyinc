class Item < ActiveRecord::Base
  acts_as_taggable_on :tags
  belongs_to :page
  has_attached_file :photo,
                    :styles => { :medium => "300x300>",
                                 :thumb => "100x100>" }

end
