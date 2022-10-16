class Api::QuestionsController < ApplicationController
  
    def index
      @questions = Question.all
      render :index
    end
  
    def create
      @question = Question.new(question_params)
      if @question.save
        render 'api/questions/show'
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def show
      @question = Question.find(params[:id])
      if @question
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
    def question_params
      params.require(:question).permit(:title, :body, :author_id)
    end
  end