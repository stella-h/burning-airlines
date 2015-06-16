class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by :name => params[:name]
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      gon.user = user
      redirect_to '/app'

    else

      flash[:notice] = "Invalid login, please try again."
      redirect_to '/'
    end
  end

  # def create
  #   user = User.find_by :email => params["/login"]["email"]
  #   if user.present? && user.authenticate(params["/login"]["password"]) 
  #     session[:user_id] = user.id 
  #     redirect_to root_path
  #   else
  #     redirect_to login_path
  #     flash[:notice] = "What, you're lying about your login details? That's god-tier lying right there, but please again anyway."

  #   end
  # end








  def destroy
    session[:user_id] = nil
    redirect_to '/'
  end

end
