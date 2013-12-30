class Comment < ActiveRecord::Base

  attr_accessible :clip, :name, :score

  # attr_accessor :name

  mount_uploader :Clip, ClipUploader

  validates :name, presence: true

end

