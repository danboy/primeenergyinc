var JSLib = JSLib ? JSLib : {};
var $zIndex = 1000;
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

JSLib.Modal = Class.create({

  initialize: function(element, options){

    this.options = Object.extend({
      position: 'center',
      direction: 'auto',
      distance: {X:4, Y:4}
    }, options);

    if (this.options.content) {
    this.content = this.options.content;
    } else if (this.options.contentElement) {
    this.content = $(this.options.contentElement);
    }

    this.element = $(element);
    if (this.element && element != false) {
    this.element.__modal__ = this;
    this.href = this.options.href||this.element.href;
    if (this.options.position === 'mouse' && this.options.hover) {
    this.element.observe('mouseover', function (ev) {
    this.pointer = {
    X: Event.pointerX(ev),
    Y: Event.pointerY(ev)
    };
    Event.stop(ev);
    this.openModal();
    }.bindAsEventListener(this));
    } else {
    this.element.observe('click', function (ev) {
    this.pointer = {
    X: Event.pointerX(ev),
    Y: Event.pointerY(ev)
    };
    Event.stop(ev);
    this.openModal();
    }.bindAsEventListener(this));
    }
    }

    // get anchoring element for positioning
    this.anchor = $(this.options.anchor)||this.element;
    this.createModal();
  },
  openModal: function(){
    this.docsize = document.viewport.getDimensions();
    Effect.Appear(this.modal,{duration:.4});

    this.modalSize = this.modal.getDimensions();

    if(this.options.position == 'center'){
      this.left = (this.docsize.width/2)-(this.modalSize.width/2);
      this.top =  (this.docsize.height/2)-(this.modalSize.height/2);
    }else if(this.options.position == 'relative'){
        this.left= this.modalposition.left-this.modalSize.width;
        this.top= this.modalposition.top;
    }
     this.modal.setStyle({
        left: this.left+'px',
        top: this.top+'px',
        zIndex: $zIndex++
      });
    if(this.options.overlay){
    Effect.Appear(this.overlay,{from:0,to:.5,duration:.4});
      if(!this.options.persistent){
        this.overlay.observe('click',function(){this.closeModal();}.bind(this));
      }
    }
    if(this.modal.down('.close')){
      this.modal.down('.close').observe('click',function(ev){ev.stop();this.closeModal();}.bind(this));
    }
    this.doComplete();
  },
  closeModal: function(){
    Effect.Fade(this.modal);
    if(this.options.overlay){
    Effect.Fade(this.overlay);
    }
    this.doClose();
  },
  createModal: function(){
    if(this.options.overlay){this.createOverlay();}
    this.modal = new Element('div', { style: "position:fixed;top: 0px;left: 0px;zIndex:"+($zIndex++)+";", "class": "js_modal"});
    this.modal.hide();
    this.modal.update(this.content);
    //this.modal.update(this.content);
    if (this.options.modalStyle) {
      this.modal.setStyle(this.options.modalStyle);
    }
    document.body.appendChild(this.modal);
    if (this.options.draggable){
      this.dragModal = new Draggable(this.modal);
    }
    if (this.options.ajaxContent){
      if(this.options.ajaxContent=="element"){this.options.ajaxContent = this.element.href}
      new Ajax.Request(this.options.ajaxContent,{
      onComplete: function(transport) {
        this.content = transport.responseText;
        this.modal.update(this.content)
      }.bind(this),
      onFailure: function(){
        this.content = "request failed";
        this.openModal();
      },
      method: 'get'}
      );
    }
    ///
    // alert(this.content);
    if(this.element){
      this.modalposition = this.element.cumulativeOffset();
    }
  },
  createOverlay: function(){
  var docsize = document.viewport.getDimensions();
  this.overlay = new Element('div', { style: "position:fixed; top: 0px;left: 0px;z-index:"+($zIndex++)+";"});
    this.overlay.hide();
    if (this.options.overlayStyle) {
      this.overlay.setStyle(this.options.overlayStyle);
    }
    this.overlay.addClassName('modal_overlay');
    document.body.appendChild(this.overlay);
    this.overlay.setStyle({
      width: docsize.width+'px',
      height: docsize.height+'px'
    });

    Event.observe(window, 'resize', this.resizeOverlay.bindAsEventListener(this));
    Event.observe(window, 'scroll', this.resizeOverlay.bindAsEventListener(this));

  },
  resizeOverlay: function(){
  this.docsize = document.viewport.getDimensions();
   this.overlay.setStyle({
      width: this.docsize.width+'px',
      height: this.docsize.height+'px'
    });

  },
  doComplete: function(){
  eval(this.options.onComplete)
  },
  doClose: function(){
  eval(this.options.onClose)
  }

});
