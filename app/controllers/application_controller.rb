class ApplicationController < ActionController::Base
  before_action :authorize

  def total_amount
    @totalAmount=0
    if session[:cart]!=nil
      session[:cart].each do |item|
        @totalAmount+=(item["amount"])
      end
    end
    @totalAmount
  end

  helper_method :total_amount


  protected
    def authorize
      unless Restaurant.find_by(id: session[:restaurant_id]) 
        redirect_to login_url, notice: "Please log in"
      end
    end
end
