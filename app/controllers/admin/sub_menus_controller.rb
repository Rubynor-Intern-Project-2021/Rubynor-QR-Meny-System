class Admin::SubMenusController < ApplicationController
  before_action :set_sub_menu, only: %i[ show edit update ]

  # GET /sub_menus/new
  def new
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)

    @sub_menu = SubMenu.new()
  end

  # GET /sub_menus/1/edit
  def edit
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
  end

  # POST /sub_menus or /sub_menus.json
  def create
    menu_id=3
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    @sub_menu = SubMenu.new(sub_menu_params)
    @sub_menu.menu_id = menu_id
    p menu_id

    respond_to do |format|
      if @sub_menu.save
        format.html { redirect_to  admin_restaurant_url(@restaurant.id), notice: "Sub menu was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sub_menus/1 or /sub_menus/1.json
  def update
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    respond_to do |format|
      if @sub_menu.update(sub_menu_params)
        format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Sub menu was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sub_menus/1 or /sub_menus/1.json
  def destroy
    @restaurant = Restaurant.find(session[:restaurant_id])
    verify_signin(@restaurant.id)
    sub_menu=SubMenu.find(params[:a_id])
    sub_menu.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(@restaurant.id), notice: "Sub menu was successfully destroyed." }

    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_sub_menu
    @sub_menu = SubMenu.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def sub_menu_params
    params.require(:sub_menu).permit(:name)
  end
end
