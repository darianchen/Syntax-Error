class Api::VotesController < ApplicationController
    def create
      @vote = Vote.new(vote_params)
      if @vote.save
        render json: {message: "You did it!", vote: @vote}
      else
        render json: @answer.errors.full_messages, status: 422
      end
    end
  
    def show 
      @question = Question.find_by(id: params[:id])
      render :show
    end

    def update
      @vote = Vote.find_by(id: vote_params[:id])
      if @vote.voter_id == current_user.id && @vote.update(vote_params)
        render :show
      else
        render json: ['Vote Not Found'], status: 422
      end
    end
  
    def destroy
      @vote = Vote.find_by(id: vote_params[:id])
      if @vote.nil?
        render json: ['Vote cannot be found'], status: 422
      else
        if current_user.id == @Vote.voter_id 
          @vote.destroy!
          render :show
        else
          render json: ['Vote is not destroyed'], status: 422
        end
      end
    end
  
    private
    def vote_params
      params.require(:vote).permit(:voter_id, :post_id, :vote)
    end
end