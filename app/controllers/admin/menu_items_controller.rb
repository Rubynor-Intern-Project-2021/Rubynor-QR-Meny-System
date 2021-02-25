class Admin::MenuItemsController < ApplicationController
  before_action :set_menu_item, only: %i[ show edit update destroy ]

  # GET /menu_items or /menu_items.json
  def index
    @menu_items = MenuItem.all
  end

  # GET /menu_items/1 or /menu_items/1.json
  def show
  end

  # GET /menu_items/new
  def new
    @menu_id=params['menu_id']
    @menu_item = MenuItem.new(:menu_id=>@menu_id)
  end

  # GET /menu_items/1/edit
  def edit
    @restaurant = @menu_item.menu.restaurant
  end

  # POST /menu_items or /menu_items.json
  def create
    @menu_item = MenuItem.new(menu_item_params)

    respond_to do |format|
      if @menu_item.save
        format.html { redirect_to  admin_restaurant_url(@menu_item.menu.restaurant.id), notice: "Menu item was successfully created." }
        format.json { render :show, status: :created, location: @menu_item }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @menu_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /menu_items/1 or /menu_items/1.json
  def update
    respond_to do |format|
      if @menu_item.update(menu_item_params)
        format.html { redirect_to admin_restaurant_url(@menu_item.menu.restaurant.id), notice: "Menu item was successfully updated." }
        format.json { render :show, status: :ok, location: @menu_item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @menu_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menu_items/1 or /menu_items/1.json
  def destroy
    @menu_item.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(@menu_item.menu.restaurant.id), notice: "Menu item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu_item
      @menu_item = MenuItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def menu_item_params
      params.require(:menu_item).permit(:name, :number, :image_url, :description, :price, :menu_id, :image)
    end
end
