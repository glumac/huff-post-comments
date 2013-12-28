class CommentsController < ApplicationController

  def index
		@comments = Comment.all
		# @comment = Comment.new(params[:comment])
	end

	def show
		@comment = Comment.find(params[:id])

  	respond_to do |format|
       format.html # show.html.erb
       format.json { render json: @comment } 
  	end
  end

	def create
		@comment = Comment.new(params[:comment])
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
	end

	def destroy
		@comment = Commentfind(params[:id])
		@comment.destroy
		flash[:notice] = "Destroyed Comment"
		redirect_to comments_url
	end

end


 

 def show 

   @student = Student.find_by_url(params[:id])

   #BULLETS Randomizing /students/new.html.erb
   if cookies[:bullets].nil?
     @bullets = Bullet.all.shuffle.first(4)
     cookies[:bullets] = @bullets.collect(&:id)
   else
     # simpler to use an 'in list' for only 4 id's
     Bullet.where("id in (?)", cookies[:bullets])
   end

   respond_to do |format|
     format.html # show.html.erb
     format.json { render json: @student } 
   end  
end