require 'test_helper'

class Admin::CoolManControllerTest < ActionDispatch::IntegrationTest
  test "should get asdf" do
    get admin_cool_man_asdf_url
    assert_response :success
  end

end
