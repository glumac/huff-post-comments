class Comment < ActiveRecord::Base

  attr_accessible :clip, :name, :score

  attr_accessor :fieldname

  mount_uploader :Clip, ClipUploader

  validates :name, presence: true

end

