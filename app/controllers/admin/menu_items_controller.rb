class Admin::MenuItemsController < ApplicationController
  before_action :set_menu_item, only: %i[ show edit update destroy ]

  # GET /menu_items/1 or /menu_items/1.json
  def show
  end

  # GET /menu_items/new
  def new
    @menu_id=params['menu_id']
    @menu_item = MenuItem.new(:menu_id=>@menu_id)
    @restaurant = @menu_item.menu.restaurant
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
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /menu_items/1 or /menu_items/1.json
  def update
    respond_to do |format|
      if @menu_item.update(menu_item_params)
        format.html { redirect_to admin_restaurant_url(@menu_item.menu.restaurant.id), notice: "Menu item was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /menu_items/1 or /menu_items/1.json
  def destroy
    @menu_item.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(@menu_item.menu.restaurant.id), notice: "Menu item was successfully destroyed." }

    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu_item
      @menu_item = MenuItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def menu_item_params
      used_allergens = params[:allergens]

      params_to_return = params.require(:menu_item).permit(:name, :number, :image_url, :description, :price, :menu_id, :image)

      AllergenItem.where(:menu_item_id=>params[:id]).each do |item|
        item.destroy
      end

      allergens_to_add = []
      if used_allergens != nil 
        used_allergens.each do |allergen_param|
          p "Allergen: #{allergen_param[0]}"
          allergen_item = AllergenItem.new(:menu_item_id=>params[:id], :allergen_id=>allergen_param[0])
          allergens_to_add << allergen_item
        end
        params_to_return[:allergen_items] = allergens_to_add
      end



      p "Params to return #{params_to_return}"

      params_to_return
    end
end
