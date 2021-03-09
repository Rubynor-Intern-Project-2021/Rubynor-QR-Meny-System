class RestaurantController < ApplicationController
  skip_before_action :authorize

  def show 
    @restaurant = Restaurant.find(params[:id])
    @allergens = Allergen.all()
  end
end
