class MenuController < ApplicationController
  def show
    @menu = Menu.find(params[:id])
  end
end
