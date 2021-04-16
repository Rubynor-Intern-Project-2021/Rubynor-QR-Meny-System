class RestaurantController < ApplicationController
  skip_before_action :authorize

  def show 
    if params[:location] != nil && params[:location] != 0
      session[:location] = params[:location]
    end

    @restaurant = Restaurant.find(params[:id])
    @allergens = Allergen.all()
  end
end
