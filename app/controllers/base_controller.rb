class BaseController < ApplicationController
  before_filter :set_model
  before_filter :find_object, :only => [:show, :edit, :update, :destroy]
  caches_page :index, :show

  # GET /objects
  # GET /objects.xml
  def index
    set_instances(@model_class.find(:all))
    respond_to do |format|
      format.html
      format.xml  { render :xml => get_instances }
      format.js   { render :html => get_instances }
    end
  end

  # GET /objects/1
  # GET /objects/1.xml
  def show
    respond_to do |format|
      format.html
      format.xml  { render :xml => get_instance }
    end
  end

  # GET /objects/new
  # GET /objects/new.xml
  def new
    set_instance(@model_class.new)
    respond_to do |format|
      format.html
      format.xml  { render :xml => get_instance }
    end
  end

  # POST /objects
  # POST /objects.xml
  def create
    set_instance @model_class.new(params[@model_class.name.tableize.singularize.to_sym])
    respond_to do |format|
      @model_class.transaction do
        if get_instance.save
          flash[:notice] = t("controllers.base.flash.success", {:object => @model_class.human_name, :action => t("actions.create").downcase})
          format.html { redirect_to get_instance }
          format.xml  { render :xml => get_instance, :status => :created, :location => get_instance }
        else
          format.html { render :action => :new }
          format.xml  { render :xml => get_instance.errors, :status => :unprocessable_entity }
        end
      end
    end
  end

  # GET /objects/1/edit
  def edit
    respond_to do |format|
      format.html
      format.xml  { render :xml => get_instance }
    end
  end

  # PUT /objects/1
  # PUT /objects/1.xml
  def update
    respond_to do |format|
      @model_class.transaction do
        if get_instance.update_attributes(params[@model_class.name.tableize.singularize.to_sym])
          flash[:notice] = t("controllers.base.flash.success", {:object => @model_class.human_name, :action => t("actions.update").downcase})
          format.html { redirect_to :action => :index }
          format.xml  { head :ok }
        else
          format.html { render :action => :edit }
          format.xml  { render :xml => get_instance.errors, :status => :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /objects/:id
  # DELETE /objects/:id.xml
  def destroy
    @model_class.transaction do
      id = get_instance.id
      get_instance.destroy
    end
    respond_to do |format|
      flash[:notice] = t("controllers.base.flash.success", {:object => @model_class.human_name, :action => t("actions.destroy").downcase})
      format.html { redirect_to(:action => 'index') }
      format.xml  { head :ok }
    end
  end

  private

    # Reflect on the controller to get the model constant out of the Kernel object.
    def set_model
      @model_class = self.class.name.gsub(/Controller$/, '').singularize.constantize
    end

    # Use the discovered model to find the object instance on which to operate.
    def find_object
      set_instance @model_class.find_by_id(params[:id].to_i)
    end

    def set_instance(value = nil)
      self.instance_variable_set "@#{@model_class.name.tableize.singularize}", value
    end

    def set_instances(collection = nil)
      self.instance_variable_set "@#{@model_class.name.tableize}", collection
    end

    def get_instance
      self.instance_variable_get "@#{@model_class.name.tableize.singularize}"
    end

    def get_instances
      self.instance_variable_get "@#{@model_class.name.tableize}"
    end

    def views_directory
      @model_class.name.tableize
    end
end
