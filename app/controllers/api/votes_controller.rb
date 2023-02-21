class Api::VotesController < ApplicationController
  def create
    @vote = Vote.new(vote_params)
    
    if @vote.save
      render :show
    else
      render json: @vote.errors.full_messages, status: 422
    end
  end

  def show
    if params[:is_answer] == "false"
      @post = Question.find_by(id: params[:id])
    else
      @post = Answer.find_by(id: params[:id])
    end
    @votes = @post.votes.where(type: (params[:is_answer] == "true"))
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
    @vote = Vote.find_by(id: params[:id])
    if @vote.nil?
      render json: ['Vote cannot be found'], status: 422
    else
      if current_user.id == @vote.voter_id
        @vote.destroy!
        render json: ['Vote successfully destroyed'], status: 200
      else
        render json: ['Vote is not destroyed'], status: 422
      end
    end
  end

  private
  def vote_params
    params.require(:vote).permit(:voter_id, :post_id, :vote, :post_type)
  end
end