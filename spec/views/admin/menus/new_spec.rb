require 'rails_helper'

describe "create menu", type: :feature, js: true do
  let!(:restaurant) { Fabricate(:restaurant) }

  before do
    login
  end

  it 'should create a new menu' do
    find('#new_menu').click
    fill_in 'menu_name', with: 'Hovedrett'
    fill_in 'menu_number', with: 1
    fill_in 'menu_description', with: "mange gode retter for voksne og barn"
    click_button('Lagre')

    expect(page).to have_text('Nr. 1')
    expect(page).to have_text('Hovedrett')
  end

end

def login
  visit(login_path())
  fill_in 'name', with: restaurant.username
  fill_in 'password', with: restaurant.password
  click_button('Login')
end
