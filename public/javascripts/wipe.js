Effect.Wipe = function(element) {
	
	
	$(element).style.overflow='hidden'
	$(element).absolutize()
	$(element).relativize()
	
	var img = arguments[1].newImg || {}
	var wipeDuration = arguments[1].duration || 1
	var wipeMode = arguments[1].mode || 'vSplit'
	var wipeDelay = arguments[1].delay || 0.0
	var oldImg = $(element).firstChild.src
	var tempImg = new Image
	tempImg.src = oldImg
	var panels = arguments[1].panels || 10
	var wipeWidth=tempImg.width
	var wipeHeight=tempImg.height
	var wipeCenter = parseInt(wipeWidth/2)
	var wipeMiddle = parseInt(wipeHeight/2)

	switch(wipeMode) {
	
	case 'vSplit':
		$(element).insert(new Element("div", { id: "wipeLeft", style:'display:none;position:absolute;top:0px;left:0px;z-index:10;overflow:hidden;width:'+wipeCenter+'px;height:'+wipeHeight+'px;background-image:url('+oldImg+')' }))	
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:0px;left:'+wipeCenter+'px;z-index:10;overflow:hidden;width:'+wipeCenter+'px;height:'+wipeHeight+'px;background-image:url('+oldImg+');background-position:-'+wipeCenter+'px 0px;' }))	
		return new Effect.Parallel([
			new Effect.Morph('wipeLeft',{duration:wipeDuration,style:'width:0px'}), 
			new Effect.Morph('wipeRight',{duration:wipeDuration,style:'left:'+wipeWidth+'px;width:0px;background-position:-'+wipeWidth+'px 0px'})], { 
				beforeStart: function() {
					Element.show('wipeLeft')
					Element.show('wipeRight')
					$(element).firstChild.src=img
				},
				afterFinish: function() {
					Element.remove('wipeLeft')
					Element.remove('wipeRight')
				},
				duration:wipeDuration
			}
		)
	  break;    
	case 'hSplit':
		$(element).insert(new Element("div", { id: "wipeLeft", style:'display:none;position:absolute;top:0px;left:0px;z-index:10;overflow:hidden;width:'+wipeWidth+'px;height:'+wipeMiddle+'px;background-image:url('+oldImg+')' }))	
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:'+wipeMiddle+'px;left:0px;z-index:10;overflow:hidden;width:'+wipeWidth+'px;height:'+wipeMiddle+'px;background-image:url('+oldImg+');background-position:0px -'+wipeMiddle+'px;' }))	
		return new Effect.Parallel([
			new Effect.Morph('wipeLeft',{duration:wipeDuration,style:'height:0px'}), 
			new Effect.Morph('wipeRight',{duration:wipeDuration,style:'top:'+wipeHeight+'px;height:0px;'})], { 
				afterUpdate: function() {
					//work-around to fix fact that effect.morph does not handle background position properly
					$('wipeRight').style.backgroundPosition='0px -'+$('wipeRight').style.top
				},
				beforeStart: function() {					
					Element.show('wipeLeft')
					Element.show('wipeRight')
					$(element).firstChild.src=img
				},
				afterFinish: function() {
					Element.remove('wipeLeft')
					Element.remove('wipeRight')
				},
				duration:wipeDuration
			}
		)
	break;
	case 'toRight':
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:0px;left:0px;z-index:10;overflow:hidden;width:0px;height:'+wipeHeight+'px;background-image:url('+img+');background-position:0px 0px;' }))	
		return new Effect.Morph('wipeRight',{
			duration:wipeDuration,
			style:'left:0px;width:'+wipeWidth+'px', 
			beforeStart: function() {
				Element.show('wipeRight')				
			},
			afterFinish: function() {				
				$(element).firstChild.src=img
				Element.remove('wipeRight')
			}}
		)
	break;
	case 'toLeft':
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:0px;left:'+wipeWidth+'px;z-index:10;overflow:hidden;width:0px;height:'+wipeHeight+'px;background-image:url('+img+');background-position:-'+wipeWidth+'px 0px;' }))	
		return new Effect.Morph('wipeRight',{
			duration:wipeDuration,
			style:'left:0px;width:'+wipeWidth+'px;background-position:0px 0px', 
			beforeStart: function() {
				Element.show('wipeRight')				
			},
			afterFinish: function() {								
				$(element).firstChild.src=img
				Element.remove('wipeRight')
			}}
		)
	break;
	case 'toTop':
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:'+wipeHeight+'px;left:0px;z-index:10;overflow:hidden;width:'+wipeWidth+'px;height:0px;background-image:url('+img+');background-position:0px '+wipeHeight+'px;' }))	
		return new Effect.Morph('wipeRight',{
			duration:wipeDuration,
			style:'top:0px;height:'+wipeHeight+'px;', 
			afterUpdate: function() {
					//work-around to fix fact that effect.morph does not handle background position properly
					$('wipeRight').style.backgroundPosition='0px -'+$('wipeRight').style.top
				},
			beforeStart: function() {
				Element.show('wipeRight')				
			},
			afterFinish: function() {								
				$(element).firstChild.src=img
				Element.remove('wipeRight')
			}}
		)
	break;
	case 'toBottom':
		$(element).insert(new Element("div", { id: "wipeRight", style:'display:none;position:absolute;top:0px;left:0px;z-index:10;overflow:hidden;width:'+wipeWidth+'px;height:0px;background-image:url('+img+');background-position:0px 0px;' }))	
		return new Effect.Morph('wipeRight',{
			duration:wipeDuration,
			style:'top:0px;height:'+wipeHeight+'px;background-position:0px 0px', 
			beforeStart: function() {
				Element.show('wipeRight')				
			},
			afterFinish: function() {								
				$(element).firstChild.src=img
				Element.remove('wipeRight')
			}}
		)
	break;
	case 'flipRight':
		//break the image down into pieces
		var steps = 50
		var vBars=Math.round(wipeWidth/steps)
		var hBars=Math.round(wipeHeight/steps)
		for(var x=0;x<steps;x++) {
			barHeight = hBars
			if(x==steps-1) {				
				barHeight = barHeight + wipeHeight - (hBars*steps)
			}
			barLeft = (hBars*x)+(wipeWidth/3)
			$(element).insert(new Element("div", { id: "wipeBar"+x, style:'position:absolute;top:'+hBars*x+'px;left:-'+barLeft+'px;z-index:10;overflow:hidden;width:'+vBars*x+'px;height:'+barHeight+'px;background-image:url('+img+');background-position:0px -'+hBars*x+'px;' }))	
		}
		//return;
		for(var x=0;x<steps-1;x++) {
			new Effect.Morph('wipeBar'+x,{queue: { scope: 'wipe' },style:'left:0px;width:'+wipeWidth+'px;background-position:0px 0px'})
		}
		new Effect.Morph('wipeBar'+(steps-1),{queue: { scope: 'wipe' },style:'left:0px;width:'+wipeWidth+'px;background-position:0px 0px',
			afterFinish:function(){
				$(element).firstChild.src=img
				for(var x=0;x<steps;x++) {
					Element.remove('wipeBar'+x)
				}
			}
		})
	break;
	case 'hpanels':
		steps = panels
		vBars=Math.round(wipeWidth/steps)
		hBars=Math.round(wipeHeight/steps)
		for(var x=0;x<steps;x++) {
			barHeight = hBars
			if(x==steps-1) {				
				barHeight = barHeight + wipeHeight - (hBars*steps)
			}
			barLeft = Math.round(Math.random()*wipeWidth)
			$(element).insert(new Element("div", { id: "wipeBar"+x, style:'position:absolute;top:'+hBars*x+'px;left:-'+barLeft+'px;z-index:10;overflow:hidden;width:0px;height:'+barHeight+'px;background-image:url('+img+');background-position:0px -'+hBars*x+'px;' }))	
		}
		//return;
		for(var x=0;x<steps-1;x++) {
			new Effect.Morph('wipeBar'+x,{style:'left:0px;width:'+wipeWidth+'px;background-position:0px '+wipeWidth+'px'})
		}
		
		new Effect.Morph('wipeBar'+(steps-1),{style:'left:0px;width:'+wipeWidth+'px;background-position:0px '+wipeWidth+'px',
			afterFinish:function(){
				$(element).firstChild.src=img
				for(var x=0;x<steps;x++) {
					Element.remove('wipeBar'+x)
				}
			}
		})

	break;
	case 'vpanels':
		steps = panels
		vBars=Math.round(wipeWidth/steps)
		hBars=Math.round(wipeHeight/steps)
		for(var x=0;x<steps;x++) {
			barWidth = vBars
			if(x==steps-1) {				
				barWidth = barWidth + wipeWidth - (vBars*steps)
			}
			barLeft = Math.round(Math.random()*wipeWidth)
			$(element).insert(new Element("div", { id: "wipeBar"+x, style:'position:absolute;left:'+vBars*x+'px;top:-'+barLeft+'px;z-index:10;overflow:hidden;height:0px;width:'+barWidth+'px;background-image:url('+img+');background-position:-'+vBars*x+'px 0px;' }))	
		}
		//return;
		for(var x=0;x<steps-1;x++) {
			new Effect.Morph('wipeBar'+x,{style:'top:0px;height:'+wipeHeight+'px;', afterUpdate:
				function() {					
					$('wipeBar'+x).style.backgroundPosition='background-position:'+wipeHeight+'px 0px'	
				}
			})
		}
		
		new Effect.Morph('wipeBar'+(steps-1),{style:'top:0px;height:'+wipeHeight+'px;',
			afterUpdate:function() {
				$('wipeBar'+x).style.backgroundPosition='background-position:'+wipeHeight+'px 0px'	
			},
			afterFinish:function(){
				$(element).firstChild.src=img
				for(var x=0;x<steps-1;x++) {
					Element.remove('wipeBar'+x)
				}
			}
		})

	break;	
	default:
		//
	}
	
   
};