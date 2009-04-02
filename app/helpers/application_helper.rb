module ApplicationHelper

  include TagsHelper
  # Sets the page title and outputs title if container is passed in.
  # eg. <%= title('Hello World', :h2) %> will return the following:
  # <h2>Hello World</h2> as well as setting the page title.
  def title(str, container = nil)
    @page_title = str
    content_tag(container, str) if container
  end

  # Outputs the corresponding flash message if any are set
  def flash_messages
    messages = []
    %w(notice warning error).each do |msg|
      messages << content_tag(:div, html_escape(flash[msg.to_sym]), :id => "flash-#{msg}") unless flash[msg.to_sym].blank?
    end
    messages
  end

  def ie?
    m = /MSIE\s+([0-9, \.]+)/.match(request.user_agent)
    unless m.nil?
      m[1].to_f
    end
  end

  def timeline
    Twitter::Client.new.timeline_for :user, :id => 'dnawara', :count => 1
  end
  def get_tags
    @tags = Item.tag_counts(:limit => 32)
    @levels = (1 .. 5).map { |i| "level-#{i}" }
  end
  def get_menu
    @menu = Page.find(:all)
  end
end
