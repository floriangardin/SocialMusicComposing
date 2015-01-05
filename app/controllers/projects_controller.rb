class ProjectsController < ApplicationController
  def new
    @project = Project.new
    @user = current_user
    
    
  end
  def create
     @project = Project.new(project_params)
     @project[:author] = current_user[:id] 
    @user = current_user
    if @project.save
    ProjectUser.create(user_id: @user[:id], project_id: @project[:id])
    
      
      flash[:success] = "Congratulations you build a new project !"
      redirect_to @project
    else
      render 'new'
    end
  end
  def home
  end
  def show
    @project = Project.find(params[:id])
  end
  
  def update
    @project = Project.find(params[:id])
   
    if @project.update(project_params)
      redirect_to @project
    else
      render 'edit'
    end
  end
  def join
    #@project= Project.find(params[:id])
    #ProjectUser.create(user_id: current_user[:id], project_id: @project[:id] )
    
  end
  private
  
   def project_params
      params.require(:project).permit(:name,:author, :description, :signature,
                                   :beat,:tempo,:data )
   end
end
