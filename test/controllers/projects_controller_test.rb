require 'test_helper'

class ProjectsControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get home" do
    get :home
    assert_response :success
  end

end
