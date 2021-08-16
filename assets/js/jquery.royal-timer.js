/**************************************************************************
 * RoyalTimer Multicolor Countdown Timer
 * @info: https://www.codegrape.com/item/royaltimer-multicolor-countdown-timer/11301
 * @version: 1.0 (27/12/2016)
 * @version: 1.0 (27/12/2016)
 * @requires: jQuery v1.7 or later (tested on 1.12.4)
 * @author: flashblue-http://www.codegrape.com/user/flashblue
**************************************************************************/

function RoyalCountdown() {
	
	/****************************
	   -Default variables -
	****************************/
	//Holder
	this.container = ".royaltimer-container",

	//Timezone
	this.timeZone = 0,						//Time zone

	//Date & time to countdown
	this.year = 0,
	this.month = 0,
	this.day = 0,
	this.hour = 0,
	this.minute = 0,
	this.second = 0,
	
	this.flipCount = 9, 					//Number of flip-elements(from 1 to 9)
	this.animationTime = 950, 				//Time of flip animation in milliseconds(from 50 to 950)
	this.bgColor = "#f07000", 				//Flip-element back color
	this.digitColor = "#fff", 				//Digits color on flip-elements
	this.textColor = "#666", 				//Text color under flip elements(seconds, minutes and etc.)
	this.isDynamicColor = true, 			//Back color will vary(true or false)

	this.canvasName = "CountDownCanvas"; 	//Canvas name in html-code
	
	//Other variables
	var timeAndDateLast, param, img, timeZoneEdit, timerId,
		year, month, day,hour,minute, second,
		flipCount, animationTime, bgColor,digitColor, textColor, isDynamicColor, 
		findWidth, width, height,		
		canvas, canvasContext;

	//When timer less then 0
	function TimerEnd() {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);		
		canvasContext.fillStyle = textColor;
		canvasContext.font = 60*param.elementSize+"px Open Sans";
		canvasContext.textAlign = "center";
		canvasContext.fillText("!مهلت پایان یافت", canvas.width/2, 84.5*param.elementSize);
	}
	
	//Object with countdown parameters
	function ParametresType() {
		var size = flipCount;
			
		if (flipCount>1) {
			size += 0.1;
			
			if (flipCount>2) {
				size += 0.5;
				
				if (flipCount>3) {
					size += 0.1;
					
					if (flipCount>4) {
						size += 0.5;
						
						if (flipCount>5) {
							size += 0.1;
							
							if (flipCount>6) {
								size += 0.5;
								
								if (flipCount>7) {
									size += 0.1;
									
									if (flipCount>8) {
										size += 0.1;
									}
								}
							}
						}
					}
				}
			}
		}
		
		this.elementSize = canvas.width/(size*80); //Countdown magnification
		
		//Element positions
		this.sec1Position 	= canvas.width-canvas.width/size;
		this.sec2Position 	= canvas.width-2.1*canvas.width/size;
		this.min1Position 	= canvas.width-3.6*canvas.width/size;
		this.min2Position 	= canvas.width-4.7*canvas.width/size;
		this.hour1Position 	= canvas.width-6.2*canvas.width/size;
		this.hour2Position 	= canvas.width-7.3*canvas.width/size;
		this.day1Position 	= canvas.width-8.8*canvas.width/size;
		this.day2Position 	= canvas.width-9.9*canvas.width/size;
		this.day3Position 	= canvas.width-11*canvas.width/size;
		
		//Correcting time animation
		this.timeAnimation = animationTime>950 ? 950 : (animationTime<50 ? 50 : animationTime);
		
		//ınit back colors and steps
		this.maxRed = parseInt(bgColor.slice(1, 3), 16);
		this.maxGreen = parseInt(bgColor.slice(3, 5), 16);
		this.maxBlue = parseInt(bgColor.slice(5, 7), 16);
		this.red = this.maxRed;
		this.green = this.maxGreen;
		this.blue = this.maxBlue;
		this.stepRed = 0;
		this.stepGreen = 0;
		this.stepBlue = 0;
		this.dynamicColor = bgColor;
		
		//Change color
		this.updateColor = function() {
			this.red += this.stepRed;
			this.green += this.stepGreen;
			this.blue += this.stepBlue;
			
			if ((this.red*this.stepRed>=this.maxRed*this.stepRed) &&
			   (this.green*this.stepGreen>=this.maxGreen*this.stepGreen) &&
			   (this.blue*this.stepBlue>=this.maxBlue*this.stepBlue)) {
				var k;
				
				this.red = this.maxRed;
				this.green = this.maxGreen;
				this.blue = this.maxBlue;
				
				k = this.maxRed;
				
				this.maxRed = this.maxGreen;
				this.maxGreen = this.maxBlue;
				this.maxBlue = k;
				
				this.stepRed = (this.maxRed-this.red)/1000;
				this.stepGreen = (this.maxGreen-this.green)/1000;
				this.stepBlue = (this.maxBlue-this.blue)/1000;
			}
			
			this.dynamicColor = "rgba("+Math.floor(this.red)+", "+Math.floor(this.green)+", "+Math.floor(this.blue)+", 1)";
		};
	}

	//All used images in vector
	function AllImages() {
		var shadow = new Image();
		
			shadow.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAUCAYAAAAa2LrXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlCNURGN0Q3QzFGNTExRTU5MENERTU3QTRERjIxQUJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlCNURGN0Q4QzFGNTExRTU5MENERTU3QTRERjIxQUJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUI1REY3RDVDMUY1MTFFNTkwQ0RFNTdBNERGMjFBQkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUI1REY3RDZDMUY1MTFFNTkwQ0RFNTdBNERGMjFBQkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6dLFwjAAABrklEQVR42uSYUU7DMAyG47YCJAQ8cwkOwuE4DMdAHATxxli3rmtrHPFXMqZZ27zNi/QrVSJn2hfHsUMhhDvRrehBdC96ZObXoBoRPUv3IfoSbUQ7USvqRRxbOMMm/4tiJypFNzkcinFOqUz8HkOe22oOhTGihNHgHB7lcigmFpojzxfgjYs5FGYgxrQqYTRg/s8unGv8mwGzmENljCP5VoLli/RPolr0JnpPxEGOcdgBQ87lUIHkSDXAdbe4bY64bWPrjAd6O8JZHCrlsp1y0W/RJ4xqjAVl6OVSGb2NczloDxxg3MKwAvkafTcVA51ADLkctAeO9PdIFAcYxO+DMuwdHl/O5WBjYIsqY6MqjS0W6xQ8b6kM53LQHhgpN3DVGBeuMb43pZvHI0y5HCpDvVHB8gp9A2NtGBwe4SwOOg8c6e8wecBcg++jSWHYKchVHPQRJpXr9MiD9K7YGOgV3ioO1gM7LDCgTtY70ge/9a+Ng4s5kOlLpWCSxqT3nWsp9/sc+O8RYRUHmnjSKcw4z5VvjgCu5kAJ45OPiM4BruJAJxawpU64IICLOfwIMADqOXJsW3KAxQAAAABJRU5ErkJggg==",
			shadowOpacity = (16777215-parseInt(param.dynamicColor.slice(1, 7), 16)/10)/16777215;
		
		this.DrawShadow = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.globalAlpha = shadowOpacity;
			canvasContext.drawImage(shadow, x, y, shadow.width*xs, shadow.height*ys);
			canvasContext.restore();
		};
		
		//Colons between elements
		this.colons = function() {
			canvasContext.fillStyle = param.dynamicColor;
			canvasContext.font = 64*param.elementSize+"px Open Sans";
			canvasContext.textAlign = "center";
			canvasContext.save();
			
			if (flipCount>2) {
				canvasContext.clearRect(param.sec2Position-40*param.elementSize, 0, 40*param.elementSize, 116.5*param.elementSize);
				canvasContext.fillText(":", param.sec2Position-20*param.elementSize, 76*param.elementSize);
				
			}
			
			if (flipCount>4) {
				canvasContext.clearRect(param.min2Position-40*param.elementSize, 0, 40*param.elementSize, 116.5*param.elementSize);
				canvasContext.fillText(":", param.min2Position-20*param.elementSize, 76*param.elementSize);
			}
			
			if (flipCount>6) {
				canvasContext.clearRect(param.hour2Position-40*param.elementSize, 0, 40*param.elementSize, 116.5*param.elementSize);
				canvasContext.fillText(":", param.hour2Position-20*param.elementSize, 76*param.elementSize);
			}
			
			canvasContext.restore();
		};
		
		//Bottom background
		this.bottomBack = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = param.dynamicColor;
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, 58*ys+y);
			canvasContext.lineTo(75*xs+x, 64*ys+y);
			canvasContext.lineTo(71*xs+x, 64*ys+y);
			canvasContext.lineTo(71*xs+x, 58*ys+y);
			canvasContext.lineTo(9*xs+x, 58*ys+y);
			canvasContext.lineTo(9*xs+x, 64*ys+y);
			canvasContext.lineTo(5*xs+x, 64*ys+y);
			canvasContext.lineTo(5*xs+x, 58*ys+y);
			canvasContext.lineTo(x, 58*ys+y);
			canvasContext.lineTo(x, 109.5*ys+y);
			canvasContext.bezierCurveTo(x, 112.3*ys+y, 2.3*xs+x, 114.5*ys+y, 5*xs+x, 114.5*ys+y);
			canvasContext.lineTo(75*xs+x, 114.5*ys+y);
			canvasContext.bezierCurveTo(77.8*xs+x, 114.5*ys+y, 80*xs+x, 112.2*ys+y, 80*xs+x, 109.5*ys+y);
			canvasContext.lineTo(80*xs+x, 58*ys+y);
			canvasContext.lineTo(75*xs+x, 58*ys+y);
			canvasContext.closePath();
			canvasContext.fill();	
			canvasContext.restore();
		};
		
		//Top background
		this.topBack = function(x, y, xs, ys) {
			canvasContext.fillStyle = param.dynamicColor;
			canvasContext.save();
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, y);
			canvasContext.lineTo(5*xs+x, y);
			canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.3*ys+y, x, 5*ys+y);
			canvasContext.lineTo(x, 56.5*ys+y);
			canvasContext.lineTo(5*xs+x, 56.5*ys+y);
			canvasContext.lineTo(5*xs+x, 52.1*ys+y);
			canvasContext.lineTo(9*xs+x, 52.1*ys+y);
			canvasContext.lineTo(9*xs+x, 56.5*ys+y);
			canvasContext.lineTo(71*xs+x, 56.5*ys+y);
			canvasContext.lineTo(71*xs+x, 52.1*ys+y);
			canvasContext.lineTo(75*xs+x, 52.1*ys+y);
			canvasContext.lineTo(75*xs+x, 56.5*ys+y);
			canvasContext.lineTo(80*xs+x, 56.5*ys+y);
			canvasContext.lineTo(80*xs+x, 5*ys+y);
			canvasContext.bezierCurveTo(80*xs+x, 2.3*ys+y, 77.8*xs+x, y, 75*xs+x, y);
			canvasContext.closePath();
			canvasContext.fill();	
			canvasContext.restore();		
		};
		
		//Top foreground
		this.topForeground = function(x, y, xs, ys, time) {
			canvasContext.save();
			canvasContext.fillStyle = "rgba(255, 255, 255, 0.3)";
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, y);
			canvasContext.lineTo(5*xs+x, y);
			canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.3*ys+y, x, 5*ys+y);
			canvasContext.lineTo(x, 7*ys+y);
			canvasContext.bezierCurveTo(x, 4.2*ys+y, 2.3*xs+x, ys+y, 5*xs+x, ys+y);
			canvasContext.lineTo(75*xs+x, 1*ys+y);
			canvasContext.bezierCurveTo(77.8*xs+x, ys+y, 80*xs+x, 4.3*ys+y, 80*xs+x, 7*ys+y);
			canvasContext.lineTo(80*xs+x, 5*ys+y);
			canvasContext.bezierCurveTo(80*xs+x, 2.3*ys+y, 77.8*xs+x, y, 75*xs+x, y);
			canvasContext.closePath();
			canvasContext.fill();
			
			g = canvasContext.createLinearGradient(40*xs+x, 57.237*ys+y, 40*xs+x, y);
			g.addColorStop(0, "rgba(0, 0, 0, 0.2)");
			g.addColorStop(0.3, "rgba(0, 0, 0, 0)");

			g.addColorStop(0.3, "rgba(255, 255, 255, 0)");
			g.addColorStop(1, "rgba(255, 255, 255, 0.3)");
			canvasContext.fillStyle = g;
			
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, y);
			canvasContext.lineTo(5*xs+x, y);
			canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.3*ys+y, x, 5*ys+y);
			canvasContext.lineTo(x, 56.5*ys+y);
			canvasContext.lineTo(5*xs+x, 56.5*ys+y);
			canvasContext.lineTo(5*xs+x, 52.1*ys+y);
			canvasContext.lineTo(9*xs+x, 52.1*ys+y);
			canvasContext.lineTo(9*xs+x, 56.5*ys+y);
			canvasContext.lineTo(71*xs+x, 56.5*ys+y);
			canvasContext.lineTo(71*xs+x, 52.1*ys+y);
			canvasContext.lineTo(75*xs+x, 52.1*ys+y);
			canvasContext.lineTo(75*xs+x, 56.5*ys+y);
			canvasContext.lineTo(80*xs+x, 56.5*ys+y);
			canvasContext.lineTo(80*xs+x, 5*ys+y);
			canvasContext.bezierCurveTo(80*xs+x, 2.3*ys+y, 77.8*xs+x, y, 75*xs+x, y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
			
			if (time>0) {
				time /= param.timeAnimation;
				canvasContext.save();
				
				g = canvasContext.createLinearGradient(40*xs+x, 114.5*ys+y, 40*xs+x, 58*ys+y);					
				g.addColorStop(1,"rgba(0, 0, 0, "+time*1.5+")");
				g.addColorStop(0.5,"rgba(0, 0, 0, "+time+")");
				g.addColorStop(0,"rgba(0, 0, 0, "+time/2+")");

				canvasContext.fillStyle = g;

				canvasContext.beginPath();
				canvasContext.moveTo(75*xs+x, y);
				canvasContext.lineTo(5*xs+x, y);
				canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.3*ys+y, x, 5*ys+y);
				canvasContext.lineTo(x, 56.5*ys+y);
				canvasContext.lineTo(5*xs+x, 56.5*ys+y);
				canvasContext.lineTo(5*xs+x, 52.1*ys+y);
				canvasContext.lineTo(9*xs+x, 52.1*ys+y);
				canvasContext.lineTo(9*xs+x, 56.5*ys+y);
				canvasContext.lineTo(71*xs+x, 56.5*ys+y);
				canvasContext.lineTo(71*xs+x, 52.1*ys+y);
				canvasContext.lineTo(75*xs+x, 52.1*ys+y);
				canvasContext.lineTo(75*xs+x, 56.5*ys+y);
				canvasContext.lineTo(80*xs+x, 56.5*ys+y);
				canvasContext.lineTo(80*xs+x, 5*ys+y);
				canvasContext.bezierCurveTo(80*xs+x, 2.3*ys+y, 77.8*xs+x, y, 75*xs+x, y);
				canvasContext.closePath();
				canvasContext.fill();
			}
		};
		
		//Bottom foreground
		this.bottomForeground = function(x, y, xs, ys, time) {
			canvasContext.save();
			canvasContext.fillStyle = "rgba(255, 255, 255, 0.2)";
			canvasContext.fillRect(x, 58*ys+y, 5*xs, 1*ys);
			canvasContext.fillRect(9*xs+x, 58*ys+y, 62*xs, 1*ys);
			canvasContext.fillRect(75*xs+x, 58*ys+y, 5*xs, 1*ys);
			canvasContext.restore();

			canvasContext.save();
			
			g = canvasContext.createLinearGradient(40*xs+x, 114.5*ys+y, 40*xs+x, 58*ys+y);
			g.addColorStop(0, "rgba(0, 0, 0, 0.2)");
			g.addColorStop(0.7, "rgba(0, 0, 0, 0)");
			g.addColorStop(0.7, "rgba(255, 255, 255, 0)");
			g.addColorStop(1, "rgba(255, 255, 255, 0.1)");
			
			canvasContext.fillStyle = g;
			
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, 58*ys+y);
			canvasContext.lineTo(75*xs+x, 64*ys+y);
			canvasContext.lineTo(71*xs+x, 64*ys+y);
			canvasContext.lineTo(71*xs+x, 58*ys+y);
			canvasContext.lineTo(9*xs+x, 58*ys+y);
			canvasContext.lineTo(9*xs+x, 64*ys+y);
			canvasContext.lineTo(5*xs+x, 64*ys+y);
			canvasContext.lineTo(5*xs+x, 58*ys+y);
			canvasContext.lineTo(x, 58*ys+y);
			canvasContext.lineTo(x, 109.5*ys+y);
			canvasContext.bezierCurveTo(x, 112.3*ys+y, 2.3*xs+x, 114.5*ys+y, 5*xs+x, 114.5*ys+y);
			canvasContext.lineTo(75*xs+x, 114.5*ys+y);
			canvasContext.bezierCurveTo(77.8*xs+x, 114.5*ys+y, 80*xs+x, 112.2*ys+y, 80*xs+x, 109.5*ys+y);
			canvasContext.lineTo(80*xs+x, 58*ys+y);
			canvasContext.lineTo(75*xs+x, 58*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();

			if (time>0) {
				time /= param.timeAnimation;
				canvasContext.save();
				
				g = canvasContext.createLinearGradient(40*xs+x, 114.5*ys+y, 40*xs+x, 58*ys+y);					
				g.addColorStop(1,"rgba(0, 0, 0, "+time*1.5+")");
				g.addColorStop(0.5,"rgba(0, 0, 0, "+time+")");
				g.addColorStop(0,"rgba(0, 0, 0, "+time/2+")");

				canvasContext.fillStyle = g;

				canvasContext.beginPath();
				canvasContext.moveTo(75*xs+x, 58*ys+y);
				canvasContext.lineTo(75*xs+x, 64*ys+y);
				canvasContext.lineTo(71*xs+x, 64*ys+y);
				canvasContext.lineTo(71*xs+x, 58*ys+y);
				canvasContext.lineTo(9*xs+x, 58*ys+y);
				canvasContext.lineTo(9*xs+x, 64*ys+y);
				canvasContext.lineTo(5*xs+x, 64*ys+y);
				canvasContext.lineTo(5*xs+x, 58*ys+y);
				canvasContext.lineTo(x, 58*ys+y);
				canvasContext.lineTo(x, 109.5*ys+y);
				canvasContext.bezierCurveTo(x, 112.3*ys+y, 2.3*xs+x, 114.5*ys+y, 5*xs+x, 114.5*ys+y);
				canvasContext.lineTo(75*xs+x, 114.5*ys+y);
				canvasContext.bezierCurveTo(77.8*xs+x, 114.5*ys+y, 80*xs+x, 112.2*ys+y, 80*xs+x, 109.5*ys+y);
				canvasContext.lineTo(80*xs+x, 58*ys+y);
				canvasContext.lineTo(75*xs+x, 58*ys+y);
				canvasContext.closePath();
				canvasContext.fill();
				canvasContext.restore();
			}
		};
		
		//Edge
		this.edgeRounded = function(x, y, xs, ys, lightOrShadow) {
			canvasContext.save();
			canvasContext.fillStyle = param.dynamicColor;
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, y);
			canvasContext.lineTo(5*xs+x, y);
			canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.2*ys+y, x,5*ys+y);
			canvasContext.lineTo(80*xs+x, 5*ys+y);
			canvasContext.bezierCurveTo(80*xs+x, 2.2*ys+y, 77.7*xs+x, y, 75*xs+x, y);
			canvasContext.closePath();
			canvasContext.fill();

			canvasContext.fillStyle = (lightOrShadow>0) ? "rgba(255, 255, 255, "+(lightOrShadow)+")" : "rgba(0, 0, 0, "+(-lightOrShadow)+")";
				
			canvasContext.beginPath();
			canvasContext.moveTo(75*xs+x, y);
			canvasContext.lineTo(5*xs+x, y);
			canvasContext.bezierCurveTo(2.3*xs+x, y, x, 2.2*ys+y, x,5*ys+y);
			canvasContext.lineTo(80*xs+x, 5*ys+y);
			canvasContext.bezierCurveTo(80*xs+x, 2.2*ys+y, 77.7*xs+x, y, 75*xs+x, y);
			canvasContext.closePath();
			canvasContext.fill();

			canvasContext.restore();
		};
		
		this.edgeRectangle = function(x, y, xs, ys, lightOrShadow) {
			canvasContext.save();
			canvasContext.fillStyle = param.dynamicColor;
			canvasContext.fillRect(x, y, 80*xs, 3.5*ys);
			canvasContext.fillStyle =
				(lightOrShadow > 0) ? "rgba(255, 255, 255, "+(lightOrShadow)+")" :
				"rgba(0, 0, 0, "+(- lightOrShadow)+")";
			canvasContext.fillRect(x, y, 80*xs, 3.5*ys);
			canvasContext.restore();
		};
		
		//The gap between the upper and lower elements
		this.blackRectangle = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = "black";
			canvasContext.fillRect(x, 56.5*ys+y, 80*xs, 1.5*ys);
			canvasContext.restore();
		};
		
		//Wheels
		this.wheels = function(x, y, xs, ys) {
			canvasContext.save();
			
			g = canvasContext.createLinearGradient(40*xs+x, 52*ys+y, 40*xs+x, 64*ys+y);			
			g.addColorStop(0, "rgba(0, 0, 0, 1)");
			g.addColorStop(0.2, "rgba(100, 100, 100, 1)");
			g.addColorStop(0.201, "rgba(150, 150, 150, 1)");
			g.addColorStop(0.300, "rgba(255, 255, 255, 1)");
			g.addColorStop(0.400, "rgba(110, 110, 110, 1)");
			g.addColorStop(0.401, "rgba(90, 90, 90, 1)");
			g.addColorStop(1, "rgba(0, 0, 0, 1)");
			
			canvasContext.fillStyle = g;
			canvasContext.fillRect(5*xs+x, 52*ys+y, 4*xs, 12*ys);
			canvasContext.fillRect(71*xs+x, 52*ys+y, 4*xs, 12*ys);
			canvasContext.restore(); 
			canvasContext.save();
			canvasContext.fillStyle = "black";
			canvasContext.strokeRect(5*xs+x, 52*ys+y, 4*xs, 12*ys);
			canvasContext.strokeRect(71*xs+x, 52*ys+y, 4*xs, 12*ys);
			canvasContext.restore(); 
		};
		
		//bottom part of digits
		this.bottom0 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(39.1*xs+x, 92.1*ys+y);
			canvasContext.bezierCurveTo(55.5*xs+x, 92.1*ys+y, 63.6*xs+x, 78.7*ys+y, 63.8*xs+x, 59*ys+y);
			canvasContext.lineTo(48.6*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(48.5*xs+x, 73.4*ys+y, 45.3*xs+x, 80.6*ys+y, 39.5*xs+x, 80.6*ys+y);
			canvasContext.bezierCurveTo(33.7*xs+x, 80.6*ys+y, 30.1*xs+x, 73.6*ys+y, 30.1*xs+x, 59*ys+y);
			canvasContext.lineTo(14.8*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(15.1*xs+x, 77.2*ys+y, 22.5*xs+x, 92.1*ys+y, 39.1*xs+x, 92.1*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom1 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.fillRect(35.2*xs+x, 59*ys+y, 14.7*xs, 32*ys);
			canvasContext.restore();
		};
		
		this.bottom2 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(24.2*xs+x, 74.2*ys+y);
			canvasContext.lineTo(15.8*xs+x, 81.8*ys+y);
			canvasContext.lineTo(15.8*xs+x, 91*ys+y);
			canvasContext.lineTo(61.9*xs+x, 91*ys+y);
			canvasContext.lineTo(61.9*xs+x, 78.5*ys+y);
			canvasContext.lineTo(37.4*xs+x, 78.5*ys+y);
			canvasContext.lineTo(37.4*xs+x, 78.3*ys+y);
			canvasContext.lineTo(43.4*xs+x, 73.3*ys+y);
			canvasContext.bezierCurveTo(48.5*xs+x, 68.7*ys+y, 53.2*xs+x, 64.1*ys+y, 56.3*xs+x, 59*ys+y);
			canvasContext.lineTo(39.7*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(36.1*xs+x, 63.2*ys+y, 31*xs+x, 68.1*ys+y, 24.2*xs+x, 74.2*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom3 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(32.4*xs+x, 62.1*ys+y);
			canvasContext.bezierCurveTo(39.1*xs+x, 62.1*ys+y, 45.5*xs+x, 65*ys+y, 45.5*xs+x, 71.4*ys+y);
			canvasContext.bezierCurveTo(45.5*xs+x, 76.3*ys+y, 41.5*xs+x, 80.1*ys+y, 33.6*xs+x, 80.1*ys+y);
			canvasContext.bezierCurveTo(27.4*xs+x, 80.1*ys+y, 21.2*xs+x, 77.5*ys+y, 18.5*xs+x, 76.1*ys+y);
			canvasContext.lineTo(15.4*xs+x, 87.5*ys+y);
			canvasContext.bezierCurveTo(19.2*xs+x, 89.9*ys+y, 26.3*xs+x, 92.1*ys+y, 34.7*xs+x, 92.1*ys+y);
			canvasContext.bezierCurveTo(51.2*xs+x, 92.1*ys+y, 61.3*xs+x, 83.7*ys+y, 61.3*xs+x, 72.2*ys+y);
			canvasContext.bezierCurveTo(61.3*xs+x, 66.4*ys+y, 58.4*xs+x, 61.8*ys+y, 54*xs+x, 59*ys+y);
			canvasContext.lineTo(26.2*xs+x, 59*ys+y);
			canvasContext.lineTo(26.2*xs+x, 62.1*ys+y);
			canvasContext.lineTo(32.4*xs+x, 62.1*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom4 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(13.9*xs+x, 75.5*ys+y);
			canvasContext.lineTo(42.7*xs+x, 75.5*ys+y);
			canvasContext.lineTo(42.7*xs+x, 91*ys+y);
			canvasContext.lineTo(57.1*xs+x, 91*ys+y);
			canvasContext.lineTo(57.1*xs+x, 75.5*ys+y);
			canvasContext.lineTo(64.9*xs+x, 75.5*ys+y);
			canvasContext.lineTo(64.9*xs+x, 64.1*ys+y);
			canvasContext.lineTo(57.1*xs+x, 64.1*ys+y);
			canvasContext.lineTo(57.1*xs+x, 59*ys+y);
			canvasContext.lineTo(42.7*xs+x, 59*ys+y);
			canvasContext.lineTo(42.7*xs+x, 64.1*ys+y);
			canvasContext.lineTo(28.1*xs+x, 64.1*ys+y);
			canvasContext.lineTo(28.1*xs+x, 63.9*ys+y);
			canvasContext.lineTo(31.1*xs+x, 59*ys+y);
			canvasContext.lineTo(18*xs+x, 59*ys+y);
			canvasContext.lineTo(13.9*xs+x, 65.6*ys+y);
			canvasContext.lineTo(13.9*xs+x, 75*xs, 75.5*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom5 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(27.9*xs+x, 59.5*ys+y);
			canvasContext.bezierCurveTo(40.9*xs+x, 59.5*ys+y, 46.2*xs+x, 63.6*ys+y, 46.2*xs+x, 70.3*ys+y);
			canvasContext.bezierCurveTo(46.2*xs+x, 77.2*ys+y, 39.5*xs+x, 80.2*ys+y, 33.2*xs+x, 80.2*ys+y);
			canvasContext.bezierCurveTo(27.3*xs+x, 80.2*ys+y, 21.4*xs+x, 78.4*ys+y, 19.3*xs+x, 77*ys+y);
			canvasContext.lineTo(15.8*xs+x, 88.4*ys+y);
			canvasContext.bezierCurveTo(19.4*xs+x, 90.3*ys+y, 26*xs+x, 92.1*ys+y, 33.9*xs+x, 92.1*ys+y);
			canvasContext.bezierCurveTo(51.4*xs+x, 92.1*ys+y, 61.8*xs+x, 81.4*ys+y, 61.8*xs+x, 69.3*ys+y);
			canvasContext.bezierCurveTo(61.8*xs+x, 65.3*ys+y, 60.9*xs+x, 61.9*ys+y, 59.4*xs+x, 59*ys+y);
			canvasContext.lineTo(19.3*xs+x, 59*ys+y);
			canvasContext.lineTo(19.2*xs+x, 60.1*ys+y);
			canvasContext.bezierCurveTo(21.8*xs+x, 59.7*ys+y, 24.3*xs+x, 59.5*ys+y, 27.9*xs+x, 59.5*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom6 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(40.4*xs+x, 92.1*ys+y);
			canvasContext.bezierCurveTo(54.5*xs+x, 92.1*ys+y, 64.4*xs+x, 81.5*ys+y, 64.4*xs+x, 68.6*ys+y);
			canvasContext.bezierCurveTo(64.4*xs+x, 65*ys+y, 63.7*xs+x, 61.8*ys+y, 62.5*xs+x, 59*ys+y);
			canvasContext.lineTo(43.4*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(47.1*xs+x, 60.7*ys+y, 49*xs+x, 64.8*ys+y, 49*xs+x, 69.4*ys+y);
			canvasContext.bezierCurveTo(49*xs+x, 76*ys+y, 45.6*xs+x, 80.9*ys+y, 40.2*xs+x, 80.9*ys+y);
			canvasContext.bezierCurveTo(33.3*xs+x, 80.9*ys+y, 30*xs+x, 74.7*ys+y, 29.7*xs+x, 67.8*ys+y);
			canvasContext.bezierCurveTo(29.7*xs+x, 66*ys+y, 29.9*xs+x, 64.8*ys+y, 30.3*xs+x, 64*ys+y);
			canvasContext.bezierCurveTo(31.3*xs+x, 61.9*ys+y, 33.1*xs+x, 60*ys+y, 35.3*xs+x, 59*ys+y);
			canvasContext.lineTo(14.9*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(14.8*xs+x, 60.5*ys+y, 14.7*xs+x, 62.1*ys+y, 14.7*xs+x, 63.7*ys+y);
			canvasContext.bezierCurveTo(14.6*xs+x, 79.2*ys+y, 23.1*xs+x, 92.1*ys+y, 40.4*xs+x, 92.1*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom7 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(35.6*xs+x, 91*ys+y);
			canvasContext.lineTo(51.1*xs+x, 59*ys+y);
			canvasContext.lineTo(35.9*xs+x, 59*ys+y);
			canvasContext.lineTo(19.5*xs+x, 91*ys+y);
			canvasContext.lineTo(35.6*xs+x, 91*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom8 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(14.8*xs+x, 74*ys+y);
			canvasContext.bezierCurveTo(14.8*xs+x, 82.8*ys+y, 22.4*xs+x, 92.1*ys+y, 38.9*xs+x, 92.1*ys+y);
			canvasContext.bezierCurveTo(54*xs+x, 92.1*ys+y, 63.9*xs+x, 84.2*ys+y, 63.9*xs+x, 72.4*ys+y);
			canvasContext.bezierCurveTo(63.9*xs+x, 66.4*ys+y, 61.1*xs+x, 62*ys+y, 57.2*xs+x, 59*ys+y);
			canvasContext.lineTo(23.8*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(18.2*xs+x, 62.2*ys+y, 14.8*xs+x, 67.2*ys+y, 14.8*xs+x, 74*ys+y);
			canvasContext.closePath();
			canvasContext.moveTo(38.2*xs+x, 62.8*ys+y);
			canvasContext.bezierCurveTo(44.2*xs+x, 64.4*ys+y, 48.4*xs+x, 67.8*ys+y, 48.4*xs+x, 73.5*ys+y);
			canvasContext.bezierCurveTo(48.4*xs+x, 78.1*ys+y, 44.9*xs+x, 81.6*ys+y, 39.5*xs+x, 81.6*ys+y);
			canvasContext.bezierCurveTo(33.8*xs+x, 81.6*ys+y, 30.2*xs+x, 77.2*ys+y, 30.3*xs+x, 72.5*ys+y);
			canvasContext.bezierCurveTo(30.3*xs+x, 67.8*ys+y, 33.2*xs+x, 64.2*ys+y, 38.2*xs+x, 62.8*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.bottom9 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(34.9*xs+x, 68.6*ys+y);
			canvasContext.bezierCurveTo(40.8*xs+x, 68.6*ys+y, 45*xs+x, 66.9*ys+y, 47.9*xs+x, 63.9*ys+y);
			canvasContext.lineTo(48.2*xs+x, 64*ys+y);
			canvasContext.bezierCurveTo(47*xs+x, 68.9*ys+y, 44.2*xs+x, 73.1*ys+y, 40*xs+x, 76*ys+y);
			canvasContext.bezierCurveTo(36.5*xs+x, 78.4*ys+y, 31.8*xs+x, 79.7*ys+y, 27.2*xs+x, 80*ys+y);
			canvasContext.bezierCurveTo(24.2*xs+x, 80.2*ys+y, 22.5*xs+x, 80.2*ys+y, 20.6*xs+x, 80*ys+y);
			canvasContext.lineTo(20.6*xs+x, 91.9*ys+y);
			canvasContext.bezierCurveTo(22.3*xs+x, 92*ys+y, 24.9*xs+x, 92.1*ys+y, 27.5*xs+x, 91.9*ys+y);
			canvasContext.bezierCurveTo(37.6*xs+x, 91.5*ys+y, 46.1*xs+x, 88.4*ys+y, 52.3*xs+x, 82.8*ys+y);
			canvasContext.bezierCurveTo(58.3*xs+x, 77.3*ys+y, 62.3*xs+x, 69.4*ys+y, 63.4*xs+x, 59*ys+y);
			canvasContext.lineTo(17.4*xs+x, 59*ys+y);
			canvasContext.bezierCurveTo(21*xs+x, 65.1*ys+y, 27.6*xs+x, 68.6*ys+y, 34.9*xs+x, 68.6*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		//Top part of digits
		this.top0 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(39.6*xs+x, 23.9*ys+y);
			canvasContext.bezierCurveTo(23.1*xs+x, 23.9*ys+y, 15.1*xs+x, 38.2*ys+y, 14.8*xs+x, 56.5*ys+y);
			canvasContext.lineTo(30.1*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(30.2*xs+x, 42.2*ys+y, 33.9*xs+x, 35.4*ys+y, 39.4*xs+x, 35.4*ys+y);
			canvasContext.bezierCurveTo(45.4*xs+x, 35.4*ys+y, 48.5*xs+x, 42.7*ys+y, 48.6*xs+x, 56.5*ys+y);
			canvasContext.lineTo(63.8*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(63.6*xs+x, 39*ys+y, 56.8*xs+x, 23.9*ys+y, 39.6*xs+x, 23.9*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top1 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(37.3*xs+x, 25*ys+y);
			canvasContext.lineTo(20.1*xs+x, 33*ys+y);
			canvasContext.lineTo(22.6*xs+x, 44.4*ys+y);
			canvasContext.lineTo(35*xs+x, 38.5*ys+y);
			canvasContext.lineTo(35.2*xs+x, 38.5*ys+y);
			canvasContext.lineTo(35.2*xs+x, 56.5*ys+y);
			canvasContext.lineTo(49.9*xs+x, 56.5*ys+y);
			canvasContext.lineTo(49.9*xs+x, 25*ys+y);
			canvasContext.lineTo(37.3*xs+x, 25*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top2 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(37.9*xs+x, 23.9*ys+y);
			canvasContext.bezierCurveTo(29.1*xs+x, 23.9*ys+y, 21.5*xs+x, 26.9*ys+y, 16.6*xs+x, 30.6*ys+y);
			canvasContext.lineTo(20.9*xs+x, 41.5*ys+y);
			canvasContext.bezierCurveTo(24.3*xs+x, 38.9*ys+y, 29.2*xs+x, 36.1*ys+y, 34.8*xs+x, 36.1*ys+y);
			canvasContext.bezierCurveTo(42.3*xs+x, 36.1*ys+y, 45.5*xs+x, 40.3*ys+y, 45.5*xs+x, 45.6*ys+y);
			canvasContext.bezierCurveTo(45.4*xs+x, 49.1*ys+y, 43.9*xs+x, 52.6*ys+y, 40.8*xs+x, 56.5*ys+y);
			canvasContext.lineTo(57.2*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(59.3*xs+x, 52.7*ys+y, 60.6*xs+x, 48.7*ys+y, 60.6*xs+x, 44.3*ys+y);
			canvasContext.bezierCurveTo(60.7*xs+x, 32.5*ys+y, 52.6*xs+x, 23.9*ys+y, 37.9*xs+x, 23.9*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top3 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(47.2*xs+x, 55.2*ys+y);
			canvasContext.bezierCurveTo(55.2*xs+x, 52.4*ys+y, 59.1*xs+x, 47*ys+y, 59.1*xs+x, 40.1*ys+y);
			canvasContext.bezierCurveTo(59.1*xs+x, 31.2*ys+y, 51.4*xs+x, 23.9*ys+y, 37.5*xs+x, 23.9*ys+y);
			canvasContext.bezierCurveTo(29.1*xs+x, 23.9*ys+y, 21.3*xs+x, 26.3*ys+y, 17.4*xs+x, 28.8*ys+y);
			canvasContext.lineTo(20.5*xs+x, 39.8*ys+y);
			canvasContext.bezierCurveTo(23.2*xs+x, 38.2*ys+y, 28.8*xs+x, 35.9*ys+y, 34.1*xs+x, 35.6*ys+y);
			canvasContext.bezierCurveTo(40.5*xs+x, 35.9*ys+y, 43.7*xs+x, 38.8*ys+y, 43.7*xs+x, 42.7*ys+y);
			canvasContext.bezierCurveTo(43.7*xs+x, 48.2*ys+y, 37.2*xs+x, 50.1*ys+y, 32.1*xs+x, 50.2*ys+y);
			canvasContext.lineTo(26.2*xs+x, 50.2*ys+y);
			canvasContext.lineTo(26.2*xs+x, 56.5*ys+y);
			canvasContext.lineTo(51.1*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(49.9*xs+x, 56*ys+y, 48.6*xs+x, 55.6*ys+y, 47.2*xs+x, 55.4*ys+y);
			canvasContext.lineTo(47.2*xs+x, 55.2*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top4 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(38.5*xs+x, 25*ys+y);
			canvasContext.lineTo(18.9*xs+x, 56.5*ys+y);
			canvasContext.lineTo(32*xs+x, 56.5*ys+y);
			canvasContext.lineTo(36.8*xs+x, 48.7*ys+y);
			canvasContext.bezierCurveTo(39*xs+x, 44.6*ys+y, 40.7*xs+x, 40.8*ys+y, 42.8*xs+x, 36.6*ys+y);
			canvasContext.lineTo(43.2*xs+x, 36.6*ys+y);
			canvasContext.bezierCurveTo(42.9*xs+x, 40.8*ys+y, 42.7*xs+x, 44.8*ys+y, 42.7*xs+x, 48.7*ys+y);
			canvasContext.lineTo(42.7*xs+x, 56.5*ys+y);
			canvasContext.lineTo(57.1*xs+x, 56.5*ys+y);
			canvasContext.lineTo(57.1*xs+x, 25*ys+y);
			canvasContext.lineTo(38.5*xs+x, 25*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top5 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(53.9*xs+x, 52*ys+y);
			canvasContext.bezierCurveTo(49.3*xs+x, 48.7*ys+y, 43*xs+x, 47.3*ys+y, 36.8*xs+x, 47.3*ys+y);
			canvasContext.bezierCurveTo(35.2*xs+x, 47.3*ys+y, 34*xs+x, 47.3*ys+y, 32.6*xs+x, 47.5*ys+y);
			canvasContext.lineTo(34*xs+x, 37.5*ys+y);
			canvasContext.lineTo(59.2*xs+x, 37.5*ys+y);
			canvasContext.lineTo(59.2*xs+x, 25*ys+y);
			canvasContext.lineTo(23.4*xs+x, 25*ys+y);
			canvasContext.lineTo(19.4*xs+x, 56.5*ys+y);
			canvasContext.lineTo(58.5*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(57.3*xs+x, 54.7*ys+y, 55.7*xs+x, 53.2*ys+y, 53.9*xs+x, 52*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top6 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(44.3*xs+x, 46.4*ys+y);
			canvasContext.bezierCurveTo(38.2*xs+x, 46.4*ys+y, 33.7*xs+x, 48.3*ys+y, 30.5*xs+x, 51.6*ys+y);
			canvasContext.lineTo(30.2*xs+x, 51.6*ys+y);
			canvasContext.bezierCurveTo(31.9*xs+x, 44*ys+y, 37.9*xs+x, 37.1*ys+y, 51.4*xs+x, 36*ys+y);
			canvasContext.bezierCurveTo(53.8*xs+x, 35.8*ys+y, 55.6*xs+x, 35.7*ys+y, 57.3*xs+x, 35.8*ys+y);
			canvasContext.lineTo(57.3*xs+x, 24.1*ys+y);
			canvasContext.bezierCurveTo(55.8*xs+x, 24*ys+y, 54*xs+x, 24*ys+y, 51.2*xs+x, 24.2*ys+y);
			canvasContext.bezierCurveTo(41*xs+x, 24.7*ys+y, 32.6*xs+x, 27.9*ys+y, 26.1*xs+x, 33.8*ys+y);
			canvasContext.bezierCurveTo(20.3*xs+x, 39.1*ys+y, 16.3*xs+x, 47*ys+y, 15*xs+x, 56.5*ys+y);
			canvasContext.lineTo(61.8*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(58.4*xs+x, 50*ys+y, 51.7*xs+x, 46.4*ys+y, 44.3*xs+x, 46.4*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top7 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(62.4*xs+x, 25*ys+y);
			canvasContext.lineTo(16.5*xs+x, 25*ys+y);
			canvasContext.lineTo(16.5*xs+x, 37.5*ys+y);
			canvasContext.lineTo(46.3*xs+x, 37.5*ys+y);
			canvasContext.lineTo(46.3*xs+x, 37.7*ys+y);
			canvasContext.lineTo(36.7*xs+x, 56.5*ys+y);
			canvasContext.lineTo(51.8*xs+x, 56.5*ys+y);
			canvasContext.lineTo(62.4*xs+x, 34.6*ys+y);
			canvasContext.lineTo(62.4*xs+x, 25*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top8 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(52*xs+x, 54.9*ys+y);
			canvasContext.bezierCurveTo(58.4*xs+x, 51.7*ys+y, 61.4*xs+x, 46.2*ys+y, 61.4*xs+x, 40.7*ys+y);
			canvasContext.bezierCurveTo(61.4*xs+x, 32.7*ys+y, 55.1*xs+x, 23.9*ys+y, 39.9*xs+x, 23.9*ys+y);
			canvasContext.bezierCurveTo(26.9*xs+x, 23.9*ys+y, 17*xs+x, 31.2*ys+y, 17*xs+x, 42.2*ys+y);
			canvasContext.bezierCurveTo(17*xs+x, 47.9*ys+y, 20.1*xs+x, 53.2*ys+y, 26.4*xs+x, 56.4*ys+y);
			canvasContext.lineTo(26.4*xs+x, 56.5*ys+y);
			canvasContext.lineTo(54.8*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(53.9*xs+x, 56*ys+y, 52.9*xs+x, 55.5*ys+y, 52*xs+x, 55.2*ys+y);
			canvasContext.lineTo(52*xs+x, 54.9*ys+y);
			canvasContext.closePath();
			canvasContext.moveTo(40.5*xs+x, 50.5*ys+y);
			canvasContext.bezierCurveTo(35.3*xs+x, 48.9*ys+y, 31.3*xs+x, 46.1*ys+y, 31.3*xs+x, 41.7*ys+y);
			canvasContext.bezierCurveTo(31.3*xs+x, 37.6*ys+y, 34*xs+x, 34.2*ys+y, 39.2*xs+x, 34.2*ys+y);
			canvasContext.bezierCurveTo(44.8*xs+x, 34.2*ys+y, 47.1*xs+x, 38.2*ys+y, 47.1*xs+x, 42.2*ys+y);
			canvasContext.bezierCurveTo(47.1*xs+x, 46.3*ys+y, 44*xs+x, 49.5*ys+y, 40.5*xs+x, 50.5*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
		
		this.top9 = function(x, y, xs, ys) {
			canvasContext.save();
			canvasContext.fillStyle = digitColor;
			canvasContext.beginPath();
			canvasContext.moveTo(39.1*xs+x, 23.9*ys+y);
			canvasContext.bezierCurveTo(24.8*xs+x, 23.9*ys+y, 14.6*xs+x, 34.6*ys+y, 14.6*xs+x, 47.3*ys+y);
			canvasContext.bezierCurveTo(14.6*xs+x, 50.8*ys+y, 15.3*xs+x, 53.9*ys+y, 16.6*xs+x, 56.5*ys+y);
			canvasContext.lineTo(36.6*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(32*xs+x, 55.4*ys+y, 29.8*xs+x, 51.2*ys+y, 29.8*xs+x, 46.4*ys+y);
			canvasContext.bezierCurveTo(29.7*xs+x, 39.6*ys+y, 33.5*xs+x, 35*ys+y, 38.7*xs+x, 35*ys+y);
			canvasContext.bezierCurveTo(45.6*xs+x, 35*ys+y, 48.2*xs+x, 41.8*ys+y, 48.2*xs+x, 48.7*ys+y);
			canvasContext.bezierCurveTo(48.2*xs+x, 50.6*ys+y, 47.9*xs+x, 51.6*ys+y, 47.4*xs+x, 52.5*ys+y);
			canvasContext.bezierCurveTo(46.3*xs+x, 54.3*ys+y, 44.3*xs+x, 55.9*ys+y, 41.5*xs+x, 56.5*ys+y);
			canvasContext.lineTo(63.5*xs+x, 56.5*ys+y);
			canvasContext.bezierCurveTo(63.6*xs+x, 55*ys+y, 63.7*xs+x, 53.5*ys+y, 63.7*xs+x, 51.9*ys+y);
			canvasContext.bezierCurveTo(63.7*xs+x, 36.7*ys+y, 55.8*xs+x, 23.9*ys+y, 39.1*xs+x, 23.9*ys+y);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.restore();
		};
	}

	//Time object type
	function TimeInfo(timeAndDate) {
		this.secs = 0;
		this.mins = 0;
		this.hours = 0;
		this.days = 0;

		this.flagSecs1 = true;
		this.flagSecs2 = true;
		this.flagMins1 = true;
		this.flagMins2 = true;
		this.flagHours1 = true;
		this.flagHours2 = true;
		this.flagDays1 = true;
		this.flagDays2 = true;
		this.flagDays3 = true;
		
		//It calculates how much time is left before the scheduled date
		this.updateTime = function() {
			var dateNow = new Date(timeAndDate);
			dateFinish = new Date(year, month-1, day, hour, minute, second);
			
			var time = dateFinish.getTime()-dateNow.getTime()-timeZoneEdit;

			//Init date seconds, minutes
			this.secs = Math.floor((time/1000)%60);
			this.mins = Math.floor((time/(60000))%60);
			this.hours = Math.floor((time/(3600000))%24);
			this.days = Math.floor(time/(86400000));
		};
	}

	//Draw texts under flip-elements
	// function DrawText() {
	// 	canvasContext.fillStyle = textColor;
	// 	canvasContext.font = 18*param.elementSize+"px Open Sans";
	// 	canvasContext.textAlign = "center";
		
	// 	if (flipCount==1) {
	// 		canvasContext.fillText("SECONDS", param.sec1Position+80*0.5*param.elementSize, 150*param.elementSize);
	// 	} else {
	// 		canvasContext.fillText("SECONDS", param.sec1Position-80*0.05*param.elementSize, 150*param.elementSize);
	// 	}
		
	// 	if (flipCount==3) {
	// 		canvasContext.fillText("MINUTES", param.min1Position+80*0.5*param.elementSize, 150*param.elementSize);
	// 	} else if (flipCount>3) {
	// 		canvasContext.fillText("MINUTES", param.min1Position-80*0.05*param.elementSize, 150*param.elementSize);
	// 	}
		
	// 	if (flipCount==5) {
	// 		canvasContext.fillText("HOURS", param.hour1Position+80*0.5*param.elementSize, 150*param.elementSize);
	// 	} else if (flipCount>5) {
	// 		canvasContext.fillText("HOURS", param.hour1Position-80*0.05*param.elementSize, 150*param.elementSize);
	// 	}
		
	// 	if (flipCount==7) {
	// 		canvasContext.fillText("DAYS", param.day1Position+80*0.5*param.elementSize, 150*param.elementSize);
	// 	} else if (flipCount==8) {
	// 		canvasContext.fillText("DAYS", param.day1Position-80*0.05*param.elementSize, 150*param.elementSize);
	// 	} else {
	// 		canvasContext.fillText("DAYS", param.day1Position-80*0.6*param.elementSize, 150*param.elementSize);
	// 	}
	// }

	//Draw top and bottom parts of digits on flip-elements
	function DrawDigit(isTop, x, y, xs, ys, digit) {
		if (isTop) {
			//digit Top
			switch (digit) {
				case 0:
					img.top0(x, y, xs, ys);
					break;
				case 1:
					img.top1(x, y, xs, ys);
					break;
				case 2:
					img.top2(x, y, xs, ys);
					break;
				case 3:
					img.top3(x, y, xs, ys);
					break;
				case 4:
					img.top4(x, y, xs, ys);
					break;
				case 5:
					img.top5(x, y, xs, ys);
					break;
				case 6:
					img.top6(x, y, xs, ys);
					break;
				case 7:
					img.top7(x, y, xs, ys);
					break;
				case 8:
					img.top8(x, y, xs, ys);
					break;
				case 9:
					img.top9(x, y, xs, ys);
					break;
			}
		} else {
			switch (digit) {
				case 0:
					img.bottom0(x, y, xs, ys);
					break;
				case 1:
					img.bottom1(x, y, xs, ys);
					break;
				case 2:
					img.bottom2(x, y, xs, ys);
					break;
				case 3:
					img.bottom3(x, y, xs, ys);
					break;
				case 4:
					img.bottom4(x, y, xs, ys);
					break;
				case 5:
					img.bottom5(x, y, xs, ys);
					break;
				case 6:
					img.bottom6(x, y, xs, ys);
					break;
				case 7:
					img.bottom7(x, y, xs, ys);
					break;
				case 8:
					img.bottom8(x, y, xs, ys);
					break;
				case 9:
					img.bottom9(x, y, xs, ys);
			}
		}
	}

	//Draw one of flip-element
	function DrawElement(x, y, xs, ys, digit, time, maxDigit, isFlip) {
		//It is not flip animation
		if ((time>=param.timeAnimation) || (isFlip==false)) {
			canvasContext.clearRect(x, y, 80*xs, 114.5*ys);
			
			img.blackRectangle(x, y, xs, ys);
			img.wheels(x, y, xs, ys);
			img.bottomBack(x, y, xs, ys);
			img.topBack(x, y, xs, ys);
		
			DrawDigit(true, x, y, xs, ys, digit);
			DrawDigit(false, x, y, xs, ys,  digit);
			
			img.topForeground(x, y, xs, ys, 0);
			img.bottomForeground(x, y, xs, ys, 0);
			img.DrawShadow(x, y+58*ys, xs, ys);

			return false;
		}
		
		//It is flipping time
		canvasContext.clearRect(x-1, y-1, 82*xs, 116.5*y);
		
		img.blackRectangle(x, y, xs, ys);
		img.wheels(x, y, xs, ys);
		img.bottomBack(x, y, xs, ys);
		img.topBack(x, y, xs, ys);
		
		DrawDigit(true, x, y, xs, ys,  digit);
		DrawDigit(false, x, y, xs, ys, digit<maxDigit ? digit+1 : 0);
		
		img.topForeground(x, y, xs, ys, 0);
		img.bottomForeground(x, y, xs, ys, time);
		img.DrawShadow(x, y+58*ys, xs, ys);
		
		//Moving parts of flip-elements
		var heightOfElement;
		
		if (time<param.timeAnimation/2) {
			//Top part animation
			heightOfElement = Math.cos(time*Math.PI/(param.timeAnimation/2)/2);
			img.edgeRounded(x, y-3.5*ys*(1-heightOfElement)+60*ys*(1-heightOfElement), xs, ys*heightOfElement, heightOfElement);
			img.edgeRectangle(x, y-3.5*ys*(1-heightOfElement)+60*ys*(1-heightOfElement)+ys*heightOfElement*5, xs, ys*(1-heightOfElement), heightOfElement);
			img.topBack(x, y+60*ys*(1-heightOfElement), xs, ys*heightOfElement);
			DrawDigit(true, x,  y+60*ys*(1-heightOfElement), xs, ys*heightOfElement, digit<maxDigit ? digit+1 : 0);
			img.topForeground(x, y+60*ys*(1-heightOfElement), xs, ys*heightOfElement, time); 
		} else {
			//Bottom part animation
			heightOfElement = -Math.cos( (time)*Math.PI/(param.timeAnimation/2)/2 );
			img.edgeRounded(x, y+60*ys+54*ys*heightOfElement, xs, -ys*heightOfElement, -heightOfElement);
			img.edgeRectangle(x, y+60*ys+54*ys*heightOfElement-5*ys*heightOfElement-3.5*ys*(1-heightOfElement), xs, ys*(1-heightOfElement), -heightOfElement); 
			img.bottomBack(x, y+56.5*ys*(1-heightOfElement), xs, ys*heightOfElement);
			DrawDigit(false, x,  y+56.5*ys*(1-heightOfElement), xs, ys*heightOfElement, digit);
			img.bottomForeground(x, y+56.5*ys*(1-heightOfElement), xs, ys*heightOfElement, 0); 
			img.DrawShadow(x, y+1.5*ys*(heightOfElement)+56.5*ys, xs, ys*heightOfElement);
		}
		
		return true;
	}

	//Is it time to flip?
	function CheckTime(time) {		
		//Correcting seconds
		if (timeAndDateLast.secs%10!=time.secs%10) {
			timeAndDateLast.flagSecs1 = true;
			
			if (Math.floor(timeAndDateLast.secs/10)!=Math.floor(time.secs/10)) {
				timeAndDateLast.flagSecs2 = true;
			}
			
			timeAndDateLast.secs = time.secs;

			//Correcting minutes
			if (timeAndDateLast.mins%10!=time.mins%10) {
				timeAndDateLast.flagMins1 = true;
				
				if (Math.floor(timeAndDateLast.mins/10)!=Math.floor(time.mins/10)) {
					timeAndDateLast.flagMins2 = true;
				}
				
				timeAndDateLast.mins = time.mins;		
			}

			//Correcting hours
			if (timeAndDateLast.hours%10!=time.hours%10) {
				timeAndDateLast.flagHours1 = true;
				
				if (Math.floor(timeAndDateLast.hours/10)!=Math.floor(time.hours/10)) {
					timeAndDateLast.flagHours2 = true;
				}
				
				timeAndDateLast.hours = time.hours;		
			}

			//Correcting days
			if (timeAndDateLast.days%10!=time.days%10) {
				timeAndDateLast.flagDays1 = true;
				
				if (Math.floor(timeAndDateLast.days/10)!=Math.floor(time.days/10)) {
					timeAndDateLast.flagDays2 = true;
					
					if (Math.floor(timeAndDateLast.days/100)!=Math.floor(time.days/100)) {
						timeAndDateLast.flagDays3 = true;
					}
				}
				
				timeAndDateLast.days = time.days;		
			}
		}
	}

	function Main() {
		var timeMillisecond = Date.now(),
			timeAndDateNow = new TimeInfo(timeMillisecond);
		
		timeAndDateNow.updateTime();
		timeMillisecond = (timeMillisecond)%1000;
		if (isDynamicColor) {param.updateColor();} //Change color
		CheckTime(timeAndDateNow);
		
		img.colons();

		//Draw flip elements
		if (timeMillisecond!=0) {
			timeAndDateLast.flagSecs1 = DrawElement(param.sec1Position, 0, param.elementSize, param.elementSize, timeAndDateNow.secs%10, timeMillisecond, 9);
				
			if (timeAndDateLast.flagSecs2) {
				timeAndDateLast.flagSecs2 = DrawElement(param.sec2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.secs/10), timeMillisecond, 5);
			} else {
				timeAndDateLast.flagSecs2 = DrawElement(param.sec2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.secs/10), timeMillisecond, 5, false);
			}
			
			if (timeAndDateLast.flagMins1) {
				timeAndDateLast.flagMins1 = DrawElement(param.min1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.mins%10), timeMillisecond, 9);
			} else {
				timeAndDateLast.flagMins1 = DrawElement(param.min1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.mins%10), timeMillisecond, 9, false);
			}
			
			if (timeAndDateLast.flagMins2) {
				timeAndDateLast.flagMins2 = DrawElement(param.min2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.mins/10), timeMillisecond, 5);
			} else {
				timeAndDateLast.flagMins2 = DrawElement(param.min2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.mins/10), timeMillisecond, 5, false);
			}
			
			if (timeAndDateLast.flagHours1) {
				timeAndDateLast.flagHours1 = DrawElement(param.hour1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.hours%10), timeMillisecond, 9);
			} else {
				timeAndDateLast.flagHours1 = DrawElement(param.hour1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.hours%10), timeMillisecond, 9, false);
			}
			
			if (timeAndDateLast.flagHours2) {
				timeAndDateLast.flagHours2 = DrawElement(param.hour2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.hours/10), timeMillisecond, 2);
			} else {
				timeAndDateLast.flagHours2 = DrawElement(param.hour2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.hours/10), timeMillisecond, 2, false);
			}
			
			if (timeAndDateLast.flagDays1) {
				timeAndDateLast.flagDays1 = DrawElement(param.day1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days%10), timeMillisecond, 9);
			} else {
				timeAndDateLast.flagDays1 = DrawElement(param.day1Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days%10), timeMillisecond, 9, false);
			}
			
			if (timeAndDateLast.flagDays2) {
				timeAndDateLast.flagDays2 = DrawElement(param.day2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days/10)%10, timeMillisecond, 9);
			} else {
				timeAndDateLast.flagDays2 = DrawElement(param.day2Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days/10)%10, timeMillisecond, 9,false);
			}
			
			if (timeAndDateLast.flagDays3) {
				timeAndDateLast.flagDays3 = DrawElement(param.day3Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days/100), timeMillisecond, 9);
			} else {
				timeAndDateLast.flagDays3 = DrawElement(param.day3Position, 0, param.elementSize, param.elementSize, Math.floor(timeAndDateNow.days/100), timeMillisecond, 9,false);
			}
		}
		
		//If timer<0 start function
		if ((timeAndDateNow.days<=0)&& (timeAndDateNow.hours<=0)&& (timeAndDateNow.mins<=0)&& (timeAndDateNow.secs<0)) {
			clearTimeout(timerId);
			TimerEnd();
		}
	}

	function numFromStr(a) {
		var i = 0, n = "";
			
		while ((isNaN(a[i])==false) || (a[i]==".") || (a[i]==",")) {
			n += a[i];
			i++;
		}
		
		return parseFloat(n, 10);
	}

	function resizeCanvas() {
		canvas.setAttribute("width", 0);

		width = findWidth.width;

		canvas.setAttribute("width", width); 
		param = new ParametresType();
		height = 150.1*param.elementSize+1;
		canvas.setAttribute("height", height);

		canvasContext.clearRect(0, 0, width, height);
		// DrawText();
	}
	
	this.Start = function() {
		container = $(this.container);
		
		year = this.year;
		month = this.month;
		day = this.day;
		hour = this.hour;
		minute = this.minute;
		second = this.second;
		
		flipCount = this.flipCount;
		animationTime = this.animationTime;
		bgColor = this.bgColor;
		digitColor = this.digitColor;
		textColor = this.textColor;
		isDynamicColor = this.isDynamicColor;
		
		//Add canvases to Html
		var timer = $('<div style="top:0px;">\
						<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id="ResizingImage'+this.canvasName+'" width="100%" height="1"></img>\
						<canvas id="'+this.canvasName+'"></canvas>\
					   </div>');
		
		container.append(timer);
		
		findWidth = document.getElementById('ResizingImage'+this.canvasName);
		width = findWidth.width;

		canvas = document.getElementById(this.canvasName);
		canvasContext = canvas.getContext("2d");

		canvas.setAttribute("width", width); 
		param = new ParametresType();
		height = 150.1*param.elementSize+1;
		canvas.setAttribute("height", height);
		
		timeZoneEdit = (new Date().getTimezoneOffset()+this.timeZone*60)*60000;

		timeAndDateLast = new TimeInfo();
		img = new AllImages();

		// DrawText();
		
		window.addEventListener("resize", resizeCanvas, true);
		window.onload = function() {resizeCanvas();}; //For safari
		
        timerId = setInterval(Main, 16);
	};
}