var JSLib = JSLib ? JSLib : {};
// Modal
// Author: Dan Nawara
// Inspired by/Derivitive of Fred Polgardy's modal library
// Usage: var myVar = new JSLib.Modal(element , params);
// Params {overlay:true,persistent:false,content: "string of content", ajaxContent: ajaxUrl, draggable: false, position: "mouse", hover: false, modalStyle: "background:#999",overlayStyle: "background:#333;opacity:.5;"}
/*
Still needs work, but it's a simple modal lib

if you set ajaxContent to "element" it will pull the href from your trigger element.
this is good for progressive enhanced type stuff.

overlay:true will set a transparent overlay, this will close the modal when clicked unless persistent: true.
*/

JSLib.Editor = Class.create({
  initialize: function(textArea,trigger,options){
    this.editor = WysiHat.Editor.attach(textArea);
    this.toolbar = new WysiHat.Toolbar(this.editor);
    this.toolbar.addButtonSet(WysiHat.Toolbar.ButtonSets.Basic);
    self = this
    this.toolbar.addButton({
      label: "Link",
      handler: function() { return self.promptLinkSelection(); }
    });
    this.toolbar.addButton({
      label: "unordered list",
      handler: function(){self.editor.insertUnorderedList()}
    });
    this.toolbar.addButton({
      label: "img",
      handler: function() { self.promptImageSelection();}
    });
    $(trigger).observe('mouseover',function(){self.editor.save()});
  },
  promptLinkSelection: function() {
      if (this.editor.linkSelected()) {
        if (confirm("Remove link?"))
          this.editor.unlinkSelection();
      } else {
        var value = prompt("Enter a URL", "http://www.google.com/");
        if (value)
          this.editor.linkSelection(value);
      }
  },
  promptImageSelection: function() {
          var node = this.editor.selection.getNode();
          if (node.tagName == 'IMG') {
            if (confirm("Remove image?"))
              this.editor.execCommand('unlink');
          } else {
            var value = prompt("Enter a URL", "http://www.pinmonkey.com/images/logo.png");
            if (value)
              this.editor.insertImage(value);
          }
  }
});

var JSLib = JSLib ? JSLib : {};

JSLib.ImageRotator = Class.create({
  initialize: function(element, images, options){
  this.options = Object.extend({
      position: 'center',
    }, options);
    this.index = 0;
    this.element = element;

    $(this.element).setStyle({height:$(this.element).height+"px"})
    //images = images;
    this.setTimer();
  },
  doWipe: function(image){
    //new Effect.Wipe(this.element,{element:image,duration:2,mode:this.options.mode});
    //alert(image);
    Effect.Appear(this.element,{from:0,to:1,duration:.4});
    $(this.element).src = image;
  },
  setTimer: function(){
    var self = this;
    this.doWipe(images[this.index]);
    //alert(images[this.index]);
    if(this.index < (images.length-1)){this.index++}else{this.index=0}
    setTimeout(function(){self.setTimer()}, 20000);
  }
});

//new JSLib.ImageRotator("splash",images,{mode: 'vSplit'})
