class MenuController < ApplicationController
  skip_before_action :authorize
  def show
    @menu = Menu.find(params[:id])
  end
end
