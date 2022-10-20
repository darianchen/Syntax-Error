class Api::AnswersController < ApplicationController

    def index
        @answers = Answer.all
       render :index
    end

    def show
        @answer = Answer.find(params[:id])
        render :show

    end

    def create
        @answer = Answer.create(answer_params)
        if @answer.save
            render :show
        else
            render json: @answer.errors.full_messages, status:422
        end
    end

    privatea
    def answer_params
        params.require(:answer).permit(:body, :question_id, :answerer_id, :editor_id)
    end
end