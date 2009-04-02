class ItemsController < ApplicationController
  require_role "admin", :for => [:new, :create]
  def index
    @items = Item.find(:all)
  end

  def show
    @page = Page.find(params[:id])
    @items = @page.items
  end
  def permalink
    @item = Item.find(params[:id])
  end
  def tag
    @items = Item.find_tagged_with(params[:id])
  end
  def new
    @page = Page.find(params[:page_id])
    @item = Item.new
  end

  def create
    @item = Item.new(params[:item])
      @item.created_at = Time.now
      @item.user_id = current_user.id || 0
      if @item.save
        flash[:notice] = 'Added Item to #{@item.page_id}.'
        redirect_to :controller => :pages, :action => :show, :id => @item.page_id
      else
        format.html { render :action => "new" }
      end
  end
  def edit
    @item = Item.find(params[:id])
  end
  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        flash[:notice] = 'Item was successfully updated.'
        format.html { redirect_to :controller => :pages, :action => :show, :id => @item.page_id }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @item.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to("#{pages_url}/#{@item.page_id}")}
      format.xml  { head :ok }
    end
  end
end
