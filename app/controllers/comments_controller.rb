class CommentsController < ApplicationController

	respond_to :html, :js
	
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
		poster = params[:poster]
		save_path = Rails.root.join("public/audio/#{audio.original_filename}")
		audio.rewind
	  	# Open and write the file to file system.
			File.open(save_path, 'wb') do |f|
				f.write audio.read
	    end
		render :text=> 'hi'
		c = Comment.new
		c.name = poster
		c.clip = "#{audio.original_filename}"
		c.score = 0
		c.save!
	end

	def destroy
	end

end

