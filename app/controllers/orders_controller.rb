class OrdersController < ApplicationController
  skip_before_action :authorize

  # GET /orders or /orders.json
  def index
  end

  # GET /orders/1 or /orders/1.json
  def show
    @restaurant = Restaurant.find(params[:id])
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders or /orders.json
  def create
    p "testing"
    @order = Order.new(order_params)

    p "testing"
    respond_to do |format|
      if @order.save
        format.html { redirect_to @order, notice: "Order was successfully created." }
        format.json { render :show, status: :created, location: @order }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /orders/1 or /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: "Order was successfully updated." }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1 or /orders/1.json
  def destroy
    @order.destroy if @order.id == session[:order_id]
    session[:order_id] = nil
    respond_to do |format|
      format.html { redirect_to restaurant_url, notice: "Handlekurven er tom." }
      format.json { head :no_content }
    end
  end



  def total_price
    totalPrice=0
    session[:cart].each do |item|
      totalPrice+=((MenuItem.find(item["item_id"]).price || 0) * item["amount"])
    end
    totalPrice
  end


  def addToCart
    session[:cart] ||= []
    id=params[:menu_item_id].to_i
    amount=params[:amount].to_i
    exists=false

    session[:cart].each do |item|
      if item["item_id"]==id
        item["amount"]+=amount
        exists=true
        break
      end
    end
    if !exists
      session[:cart] << { item_id: id, amount: amount }
    end
    p session[:cart]

  end

  def addOneToCart
    session[:cart] ||= []
    id=params[:menu_item_id].to_i
    exists=false

    session[:cart].each do |item|
      if item["item_id"]==id
        item["amount"]+=1
        exists=true
        break
      end
    end
    if !exists
      session[:cart] << { item_id: id, amount: 1 }
    end
    p session[:cart]
  end

  def removeOneFromCart
    id=params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["amount"]<=0
        session[:cart].delete(item)
      end

      if item["item_id"]==id
        item["amount"]-=1
      end
    end

    p session[:cart]

  end

  def removeAllFromCart
    id=params[:menu_item_id].to_i
    session[:cart].each do |item|
      if item["item_id"]==id
        session[:cart].delete(item)
      end
    end
    p session[:cart]
  end

  def emptyCart
    session[:cart] = []
    p session[:cart]
  end

  def make_order
    p "create order 1"
    id=params[:restaurant_id]
    info=params[:customer_info]
    location=params[:location]

    p "create order 2"
    @order = Order.create(restaurant_id: id, order_status: 0, customer_info: info, location: location)

    p "create order 3"
    session[:cart].each do |item|
      @order_item=@order.add_menu_item(item)
      p item
    end

    session[:cart]=[]
    p "create order 4"
    redirect_to restaurant_path(id)
  end

  helper_method :make_order
  helper_method :total_price
  helper_method :addToCart
  helper_method :addOneToCart
  helper_method :removeOneFromCart
  helper_method :removeAllFromCart
  helper_method :emptyCart

  private

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:order_status, :customer_info, :location, :restaurant_id)
    end
end
