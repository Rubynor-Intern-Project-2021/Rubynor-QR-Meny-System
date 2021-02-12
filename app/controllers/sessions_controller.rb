class SessionsController < ApplicationController
  skip_before_action :authorize

  def new
    if session[:restaurant_id] != nil
      redirect_to admin_restaurant_url id: session[:restaurant_id]
    end
  end

  def create
    restaurant = Restaurant.find_by(username: params[:name])
    if restaurant&.authenticate(params[:password])
      session[:restaurant_id] = restaurant.id
      redirect_to admin_restaurant_url id: restaurant.id
    else
      redirect_to login_url, alert: "Invalid user/password combination" 
    end
  end

  def destroy
    session[:restaurant_id] = nil
    redirect_to login_url, alert: "Logged out"
  end
end
