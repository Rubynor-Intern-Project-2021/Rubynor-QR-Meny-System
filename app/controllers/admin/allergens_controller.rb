class Admin::AllergensController < ApplicationController
  before_action :set_allergen, only: %i[ show edit update ]

  # GET /allergens/new
  def new
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    @allergen = Allergen.new()
  end

  # GET /allergens/1/edit
  def edit
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
  end

  # POST /allergens or /allergens.json
  def create
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    @allergen = Allergen.new(allergen_params)
    @allergen.restaurant_id = @restaurant.id

    respond_to do |format|
      if @allergen.save
        format.html { redirect_to  admin_restaurant_url(@restaurant.id), notice: "Allergen was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /allergens/1 or /allergens/1.json
  def update
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    respond_to do |format|
      if @allergen.update(allergen_params)
        format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Allergen was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /allergens/1 or /allergens/1.json
  def destroy
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    allergen=Allergen.find(params[:a_id])
    allergen.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Allergen was successfully destroyed." }

    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_allergen
      @allergen = Allergen.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def allergen_params
      params.require(:allergen).permit(:name, :short_name)
    end
end
