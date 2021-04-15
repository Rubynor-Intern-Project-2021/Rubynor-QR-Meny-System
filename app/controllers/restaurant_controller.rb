class RestaurantController < ApplicationController
  skip_before_action :authorize

  def show 
    session[:location] = params[:location]

    @restaurant = Restaurant.find(params[:id])
    @allergens = Allergen.all()
  end
end
