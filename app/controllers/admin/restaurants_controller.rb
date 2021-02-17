require 'rqrcode'

class Admin::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[ show edit update destroy ]

  # GET /restaurants or /restaurants.json
  def index
    # Send the user directly to their own restaurant
    redirect_to admin_restaurant_url id: session[:restaurant_id]
  end

  # GET /restaurants/1 or /restaurants/1.json
  def show
    if @restaurant.qr_code == nil 
      puts "Adding qr code"
      add_qr_code()
    end
  end

  # GET /restaurants/new
  def new
    @restaurant = Restaurant.new
  end

  # GET /restaurants/1/edit
  def edit
  end

  # POST /restaurants or /restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)
    add_qr_code()

    respond_to do |format|
      if @restaurant.save
        format.html { redirect_to admin_restaurants_url, notice: "Restaurant was successfully created." }
        format.json { render :show, status: :created, location: @restaurant }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /restaurants/1 or /restaurants/1.json
  def update
    respond_to do |format|
      if @restaurant.update(restaurant_params)
        format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Restaurant was successfully updated." }
        format.json { render :show, status: :ok, location: @restaurant }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @restaurant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /restaurants/1 or /restaurants/1.json
  def destroy
    @restaurant.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurants_url, notice: "Restaurant was successfully destroyed." }
      format.json { head :no_content }
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
    
    def add_qr_code 
      qr = RQRCode::QRCode.new(restaurant_url(@restaurant.id))
      png = qr.as_png(
        bit_depth: 1,
        border_modules: 0,
        color_mode: ChunkyPNG::COLOR_GRAYSCALE,
        color: 'black',
        file: nil,
        fill: 'white',
        module_px_size: 6,
        resize_exactly_to: false,
        resize_gte_to: false,
        size: 1200
      )
      @restaurant.qr_code = png.to_data_url
      @restaurant.save()

    end
end
