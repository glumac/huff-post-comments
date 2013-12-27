class CommentsController < ApplicationController

	def index
		@comments = Comment.all
	end

	def show
		@comment = Comment.find(params[:id])
	end

	def new
		@comment = Comment.new
	end

	def save_file
	    audio = params[:audio]
	    save_path = Rails.root.join("public/#{audio.original_filename}")

	      # Open and write the file to file system.
	      File.open(save_path, 'wb') do |f|
	        f.write params[:audio].read
	      end
	      
	    render :text=> 'hi'
	end

	def destroy
		@comment = Commentfind(params[:id])
		@comment.destroy
		flash[:notice] = "Destroyed Comment"
		redirect_to comments_url
	end

end
