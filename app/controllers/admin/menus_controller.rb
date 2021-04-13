class Admin::MenusController < ApplicationController
  before_action :set_menu, only: %i[ show edit update ]



  # GET /admin_menus/1 or /admin_menus/1.json
  def show
  end

  # GET /admin_menus/new
  def new
    @restaurant_id=params['restaurant_id']
    @menu = Menu.new(:restaurant_id=>@restaurant_id)
    @restaurant = @menu.restaurant
  end

  # GET /admin_menus/1/edit
  def edit
    @restaurant = @menu.restaurant
  end

  # POST /admin_menus or /admin_menus.json
  def create
    @menu = Menu.new(menu_params)

    respond_to do |format|
      if @menu.save
        format.html { redirect_to admin_restaurant_url(@menu.restaurant.id), notice: "Menu was successfully created." }
        format.json { render :show, status: :created, location: @menu }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @menu.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin_menus/1 or /admin_menus/1.json
  def update
    respond_to do |format|
      if @menu.update(menu_params)
        format.html { redirect_to admin_restaurant_url(@menu.restaurant.id), notice: "Menu was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin_menus/1 or /admin_menus/1.json
  def destroy
    menu = Menu.find(params[:m_id])
    menu.destroy
    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(@menu.restaurant.id), notice: "Menu was successfully destroyed." }
    end
  end

  def set_menu_status
    p "menu_items Status"
    menu=Menu.find(params[:menu_id])
    menu.status=params[:status]
    p "menu_items Status2"
    menu.save
    p "menu_items Status3"

    respond_to do |format|
      format.html { redirect_to admin_restaurant_url(menu.restaurant.id), notice: "Menu was successfully changed." }
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = Menu.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def menu_params
      params.require(:menu).permit(:restaurant_id, :name, :description, :number)
    end
end
