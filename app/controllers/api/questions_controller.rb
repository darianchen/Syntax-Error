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
        render json: @question.errors.full_messages, status: 422
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

    def update
      @question = Question.find_by(id: question_params[:id])
      if @question
        if @question.update(question_params)
          render :show
        else
          render json: @question.errors.full_messages, status: 422
        end
      else
        render json: ['Question Not Found'], status: 404
      end
    end

    def destroy
      @question = Question.find_by(id: params[:id])
      if @question.nil?
        render json: ['Question cannot be found'], status: 422
      else
        if current_user.id == @question.author_id 
          @question.destroy!
          render :show
        else
          render json: ['Question is not destroyed'], status: 422
        end
      end
    end

    private
    def question_params
      params.require(:question).permit(:editor_id, :title, :body, :author_id, :id, :updated_at)
    end
  end