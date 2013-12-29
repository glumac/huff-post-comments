class CommentsController < ApplicationController

  def index
		@comments = Comment.all
		@comment = Comment.new(params[:comment])
	end

	def new
  end

	def create
		# @comment = Comment.create(params[:comment])
  #   redirect_to action: "index"
	end

	def save_file
      # comment = Comment.create(params[:comment])
	    audio = params[:audio]
	    save_path = Rails.root.join("public/audio/#{audio.original_filename}")
	    audio.rewind
	      # Open and write the file to file system.
	      File.open(save_path, 'wb') do |f|
	        f.write audio.read
	      end
      render :text=> 'hi'
      comment = Comment.new(params[:comment])
      comment.name = "ITWORKED"
      comment.clip = "#{audio.original_filename}"
      comment.save!
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