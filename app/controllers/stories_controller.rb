class StoriesController < ApplicationController
  before_action :set_story, only: [:show, :edit, :update, :destroy]


  # GET /stories
  # GET /stories.json
  def index
    @stories = current_user.stories
  end

  def location_stories
    @lat = params[:lat]
    @long = params[:long]
    @name = params[:name]
    @vicinity = params[:vicinity]
    @stories = current_user.stories.where(:latitude => @lat, :longitude => @long);
    # @otherstories = Story.where(:latitude => @lat, :longitude => @long);
    @otherstories = Story.all

  end

  # GET /stories/1
  # GET /stories/1.json
  def show
    puts "current user id: #{current_user.id}"
    puts "story user id: #{@story.user_id}"
    # unless current_user.id == @story.user_id
    #   flash[:notice] = "You may only view your own products."
    #   redirect_to root_path
    # end
  end

  # GET /stories/new
  def new
    @lat = params[:lat]
    @long = params[:long]
    @name = params[:name]
    @vicinity = params[:vicinity]
    @story = Story.new
  end

  # GET /stories/1/edit
  def edit
  end

  def audio

  end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(story_params)
    puts story_params
    @story.user_id = current_user.id


# u.avatar = params[:file]
# u.avatar = File.open('somewhere')
# u.save!
# u.avatar.url # => '/url/to/file.png'
# u.avatar.current_path # => 'path/to/file.png'
# u.avatar.identifier # => 'file.png'

    respond_to  do |format|
      if @story.save
        # format.html { redirect_to :controller => 'stories', :action => 'location_stories',:long => @story.longitude, :lat => @story.latitude,  :vicinity => @story.vicinity, :name => @story.name, notice: 'Story was successfully created.' }
        format.html { redirect_to root_path, notice: 'Story was successfully created.' }
        format.json { render action: 'show', status: :created, location: @story }
      else
        format.html { render action: 'new' }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stories/1
  # PATCH/PUT /stories/1.json
  def update
    respond_to do |format|
      if @story.update(story_params)
        format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    lat = @story.latitude
    long = @story.longitude
    @story.destroy
    respond_to do |format|
      format.html { redirect_to "/location/#{lat}/#{long}" }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_story
      @story = Story.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def story_params
      params.require(:story).permit(:title, :storyfile,:latitude, :longitude)
    end
end
