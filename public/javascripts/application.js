// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
var $zIndex = 1000;
$("navigation").childElements().each(function(item,index){
  item.observe('mouseover',function(){
    $("navigation").childElements().each(function(dude){
      dude.setStyle({opacity: .9})
    });
    item.setStyle({zIndex: $zIndex++});
    new Effect.Opacity(item, { from: .8, to: 1, duration: 0.5 });
  });
  item.observe('click',function(){
    document.location = item.down('a').href
  })
});

var images = new Array(
"/images/splash.png"
)
