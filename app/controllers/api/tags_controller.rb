class Api::TagsController < ApplicationController

    def index 
      @tags = Tag.select(:id,:title,:created_at,"COUNT(*) AS tag_count").left_outer_joins(:questions_tagged).group(:id,:title, :created_at).order("COUNT(*) DESC")
      render :index
    end
  
    def show
      @tag = Tag.find_by(id: params[:id])
      if @tag
        render :show
      else
        render json: ["Couldn't find the associated tag."], status: 404
      end
    end
  
    private
    def tag_params
      params.require(:tags).permit(:questionId, taglist:[])
    end
end