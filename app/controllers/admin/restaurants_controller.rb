class Admin::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[ show edit update destroy ]

  # GET /restaurants or /restaurants.json
  def index
    # Send the user directly to their own restaurant
    redirect_to admin_restaurant_url id: session[:restaurant_id]
    verify_signin(@restaurant.id)
  end

  # GET /restaurants/1 or /restaurants/1.json
  def show
    verify_signin(@restaurant.id)

    @allergens = @restaurant.allergens  
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants or /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)
    verify_signin(@restaurant.id)

    respond_to do |format|
      if @restaurant.save
        format.html { redirect_to admin_restaurants_url, notice: "Restaurant was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaurants/1 or /restaurants/1.json
  def update
    verify_signin(@restaurant.id)
    respond_to do |format|
      if @restaurant.update(restaurant_params)
        format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Restaurant was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurants/1 or /restaurants/1.json
  def destroy
    verify_signin(@restaurant.id)
    @restaurant.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurants_url, notice: "Restaurant was successfully destroyed." }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def restaurant_params
      params.require(:restaurant).permit(:name, :username, :password, :password_confirmation)
    end
end
