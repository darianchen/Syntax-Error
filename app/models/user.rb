# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  display_name    :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  reputation      :integer          default(0), not null
#  about_me        :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password
    has_many :questions, dependent: :destroy, foreign_key: :author_id
    has_many :answers, dependent: :destroy, foreign_key: :answerer_id
    has_many :votes, dependent: :destroy, foreign_key: :voter_id
    validates :display_name,
      presence: true,
      length: { maximum: 30 }, 
      format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
    validates :email, 
      uniqueness: true, 
      length: { in: 3..255 }, 
      format: { with: URI::MailTo::EMAIL_REGEXP },
      presence: true
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    
    before_validation :ensure_session_token, :set_display_name

  
    def self.find_by_credentials(email, password)

        user = User.find_by(email: email)
        if user && user&.authenticate(password)
            return user
        end
        nil
    end
  
    def reset_session_token!
 
      self.update!(session_token: generate_unique_session_token)
      self.session_token
    end
  
    private
    def generate_unique_session_token

      loop do
        token = SecureRandom.base64
        break token unless User.exists?(session_token: token)
      end
    end
  
    def ensure_session_token

      self.session_token ||= generate_unique_session_token
    end

    def set_display_name
        self.display_name = "user#{SecureRandom.random_number(100000000)}" if self.display_name == ""
    end
  end