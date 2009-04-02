xml.instruct! :xml, :version=>"1.0"
xml.rss(:version=>"2.0"){
  xml.channel{
    xml.title("Pinmonkey - Yep.")
    xml.link("http://www.pinmopnkey.com/")
    xml.description("Literal cold feet..")
    xml.language('en-us')
      for post in @items
        xml.item do
          xml.title(post.title)
          xml.description(post.content)
          xml.author("Dan Nawara")
          xml.pubDate(post.created_at.strftime("%a, %d %b %Y %H:%M:%S %z"))
          xml.link(post.link)
          xml.guid(post.link)
        end
      end
  }
}
