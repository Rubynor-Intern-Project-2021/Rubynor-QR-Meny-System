json.extract! order, :id, :order_status, :customer_info, :location, :created_at, :updated_at
json.url order_url(order, format: :json)
