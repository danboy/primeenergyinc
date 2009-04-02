module PagesHelper
  def get_author(id)
    id = id || 1
    author = User.find(id)
    author.login
  end

  def get_controllers
    controllers = {}
    controllers = Dir.new("#{RAILS_ROOT}/app/controllers").entries
    controllers.each do |controller|
    controllers = {:con_name => controller}
      controllers.name = controllers.name.camelize.gsub(".rb","")
      controllers.name = controllers.name.gsub("Controller","").downcase 
    end
  end
  
  def get_actions(controller)
    action_star = {}
    if controller =~ /_controller/
      name = controller.camelize.gsub(".rb","")
      (eval("#{name}.new.methods") - 
      Object.methods -  
      ApplicationController.new.methods).sort.each {|met| 
        name_short = name.gsub("Controller","").downcase 
          puts "#{met}_#{name_short}=Right.create(:name=>\"#{met} #{name_short}\",
                                                      :controller=>\"#{name_short}\",
                                                     :action=>\"#{met}\")"}
    end
  end
end
