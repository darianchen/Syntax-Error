class Api::QuestionsController < ApplicationController
  def index
    @questions = Question.all
    @tags = Hash.new
    @questions.each do |question|
      taggings = Tagging.where(question_id: question.id)
      tags = Tag.where(id: taggings.pluck(:tag_id))
      @tags[question.id] = tags
    end
    render :index
  end

  def create
    @question = Question.new(question_params)
    
    if @question.save
      taggings = params[:taggings]

      taggings.each do |tag|
        tagDb = Tag.where(name: tag).first
        if tagDb.nil?
          tagDb = Tag.create(name: tag)
        end
        Tagging.create(tag_id: tagDb.id, question_id: @question.id)
      end

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
    tags = params[:tags]
    if @question
      if @question.update(question_params)
        Tagging.where(question_id: @question.id).destroy_all
        if tags.present?
          tags.each do |tag_name|
            tag = Tag.find_by_name(tag_name)
            if tag.nil?
              tag = Tag.create(name: tag_name)
            end
            Tagging.create(tag_id: tag.id, question_id: @question.id)
          end
        end
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