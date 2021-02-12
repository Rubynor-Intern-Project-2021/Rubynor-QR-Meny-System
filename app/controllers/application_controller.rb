class ApplicationController < ActionController::Base
  before_action :authorize

  protected
    def authorize
      unless Restaurant.find_by(id: session[:restaurant_id]) 
        redirect_to login_url, notice: "Please log in"
      end
    end
end
