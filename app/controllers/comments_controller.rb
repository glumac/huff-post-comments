class CommentsController < ApplicationController

  attr_accessor :fieldname
  
  def comment
    @commment
  end

  def index
		@comments = Comment.all
    @comment = Comment.new
	end

	def new
  end

  def create
  end

	def save_file
    audio = params[:audio]
    save_path = Rails.root.join("public/audio/#{audio.original_filename}")
    audio.rewind
      # Open and write the file to file system.
      File.open(save_path, 'wb') do |f|
        f.write audio.read
      end
    render :text=> 'hi'
    c = Comment.new(params[:comment])
    c.name = :fieldname
    c.clip = "#{audio.original_filename}"
    c.score = 0
    c.save!
	end

	# def destroy
	# 	@comment = Commentfind(params[:id])
	# 	@comment.destroy
	# 	flash[:notice] = "Destroyed Comment"
	# 	redirect_to comments_url
	# end

end

#     u = User.new
# u.avatar = params[:file]
# u.avatar = File.open('somewhere')
# u.save!
# u.avatar.url # => '/url/to/file.png'
# u.avatar.current_path # => 'path/to/file.