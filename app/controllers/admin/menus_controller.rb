class Admin::MenusController < ApplicationController
  before_action :set_menu, only: %i[ show edit update destroy ]

  # GET /admin_menus or /admin_menus.json
  def index
    @admin_menus = Menu.all
  end

  # GET /admin_menus/1 or /admin_menus/1.json
  def show
  end

  # GET /admin_menus/new
  def new
    @menu = Menu.new
  end

  # GET /admin_menus/1/edit
  def edit
  end

  # POST /admin_menus or /admin_menus.json
  def create
    @menu = Menu.new(menu_params)

    respond_to do |format|
      if @menu.save
        format.html { redirect_to admin_menus_url, notice: "Menu was successfully created." }
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
        format.html { redirect_to admin_menus_url, notice: "Menu was successfully updated." }
        format.json { render :show, status: :ok, location: @menu }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @menu.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin_menus/1 or /admin_menus/1.json
  def destroy
    @menu.destroy
    respond_to do |format|
      format.html { redirect_to admin_menus_url, notice: "Menu was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_menu
      @menu = Menu.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def menu_params
      params.require(:menu).permit(:restaurant_id, :name, :description)
    end
end
