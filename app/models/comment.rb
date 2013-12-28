class Comment < ActiveRecord::Base
  attr_accessible :clip, :name, :score
  mount_uploader :Clip, ClipUploader
end

