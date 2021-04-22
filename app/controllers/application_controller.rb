class ApplicationController < ActionController::Base
  before_action :setup_session_cart_array

  def total_amount
    @totalAmount = 0
    if session[:cart] != nil
      session[:cart].each do |item|
        @totalAmount += (item["amount"])
      end
    end
    @totalAmount
  end

  helper_method :total_amount


  protected
    def verify_signin(restaurant_id) 
      if session[:restaurant_id] != restaurant_id || !Restaurant.find_by(id: session[:restaurant_id]) 
        redirect_to login_url, notice: "Please log in"
      end
    end

    def setup_session_cart_array
      session[:cart] ||= []
    end
end
