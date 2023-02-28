class Api::QuestionsController < ApplicationController
  def index
    @total_pages = 0
    if params[:all].present? && params[:all] == "true"
      @questions = Question.all
      # metadata questions
      metadata_question
    else
      #search and tag
      @questions = search_questions(params[:search], params[:tag])
      # metadata questions
      metadata_question

      # order
      sort_question(params[:order])

      # pagination
      page = 1
      page = params[:page].to_i unless params[:page] == "undefined" || params[:page] == "null"
      @questions = @questions.paginate(page: page, per_page: 15)
      @total_pages = @questions.total_pages
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
      render Json: @question
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

  def sort_question(type)
    case type
    when "Newest"
      @questions = @questions.order(created_at: :desc)
    when "Oldest"
      @questions = @questions.order(:created_at)
    when "Most Answered"
      @questions = @questions.left_joins(:answers)
        .select('questions.*, COUNT(answers.id) AS answer_count')
        .group('questions.id')
        .order('answer_count DESC')
    when "Least Answered"
      @questions = @questions.left_joins(:answers)
        .select('questions.*, COUNT(answers.id) AS answer_count')
        .group('questions.id')
        .order('answer_count')
    else
      @questions = @questions.order(:created_at)
    end
  end

  def search_questions(search, tag)
    if params[:tag].present? && params[:tag] != "undefined"
      words = ''
      words = search.split(' ') if params[:search].present? && params[:search] != "undefined"

      if words.length > 0
        questions = Question.joins(:tags).where(tags: {name: tag}).where('title LIKE ?', "%#{words.join('%')}%")
      else
        questions = Question.joins(:tags).where(tags: {name: tag})
      end
    elsif params[:search].present? && params[:search] != "undefined"
      words = search.split(' ')
      if words.length > 0
        questions = Question.where('title LIKE ?', "%#{words.join('%')}%")
      end
    else
      questions = Question.all
    end

    questions
  end

  def metadata_question
    @tags = Hash.new
    @questions.each do |question|
      taggings = Tagging.where(question_id: question.id)
      tags = Tag.where(id: taggings.pluck(:tag_id))
      @tags[question.id] = tags
    end
  end
end