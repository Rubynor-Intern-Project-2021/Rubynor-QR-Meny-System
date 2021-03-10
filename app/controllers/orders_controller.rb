class OrdersController < ApplicationController
  skip_before_action :authorize
  before_action :set_order, only: %i[ show edit update destroy ]
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_order

  # GET /orders or /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1 or /orders/1.json
  def show
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
    @order = Order.new(order_params)

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
    @totalPrice=0
    temp=0
    session[:cart].each do |item|
      temp=(MenuItem.find(item["item_id"]).price * item["amount"])
      @totalPrice+=temp
      p "pris for en #{temp}"
    end
    p "total pris = #{@totalPrice}"
  end

  def total_amount
    @totalAmount
    session[:cart].each do |item|
      @totalAmount+=(item["amount"])
    end
    p @totalAmount
  end


  helper_method :total_price
  helper_method :total_amount

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:order_status, :customer_info, :location, :restaurant_id)
    end

    def invalid_order
      logger.error "Attempt to access invalid cart #{params[:id]}"
      redirect_to restaurant_index_url, notice: 'Invalid order'
    end
end
