
var RandomPos = function(){
    var randX = Math.ceil(Math.random() * $('#game').width());
      var randY = Math.ceil( Math.random() * $('#game').height()/2  );
        return {x: randX, y : randY};
}
var RandomMovement = function(){
        var randX = Math.ceil(Math.random() * ($('#game').width()/2));
        var randY = Math.ceil( Math.random() * ($('#game').height()/2 ) );
        var randZ = RandomValue(-500, 500);
      
        var flipX = RandomValue(0,1);
        var flipY = RandomValue(0,1);
        var flipZ = RandomValue(0,1);
        
        if(flipX == 0){
            randX = randX* -1;
        } 
        if(flipY == 0){
            randY = randY* -1;
        }if(flipZ == 0){
            randZ = randZ* -1;
        }
        return {x: randX, y : randY, z: randZ};
}
var RandomDirection = function(){
        var flipX = RandomValue(0,1);
        var flipY = RandomValue(0,1);
        var x, y;
        if(flipX == 0){
            x = 1;
        }else{
            x = -1;
        }
        if(flipY == 0){
            y = 1;
        }else{
            y = -1;
        }
        
        return {x: x, y: y};

    }
    
    RandomValue = function (MinValue,MaxValue)
    {
        return parseInt(Math.random()*(MaxValue-MinValue+1), 10)+MinValue;
    }

	RandomColor =  function(type){
        var h = RandomValue(1, 360);   // color hue between 1 and 360
        var s = RandomValue(20, 100);  // saturation 0-100%
        var l = RandomValue(50, 70); 
        var a = RandomValue(20, 99);
        var rgb = 'rgb('+h+','+s+','+l+')';
        var rgba = 'rgba('+h+','+s+','+l+',0.'+a+')';
        return {rgb: rgb, rgba: rgba};
    }
// GAME OBJECTS
var creature =  function(){
    this.x =  0;
    this.y =  0;
    this.height =  RandomValue(10,24);
    this.width=   RandomValue(10,24);
    this.eated =  0;
    this.strongs=  RandomValue(0,15);
    this.type= RandomValue(0,15);
    this.sightRadius = RandomValue(0,300);
    this.weakness = [RandomValue(0,15)];
    this.speed = RandomValue(40,450);
    this.initialPower =  RandomValue(0,5);
    this.power = function(){
        return (this.initialPower * this.height) + (0.02 * this.speed);
    }
    this.direction = RandomDirection();
    this.color = RandomColor();
    
  
    this.normalMovement = function (maxX, maxY, modifier){
        // This is the movement that moves through the canvas bouncing at the MaxSize
        var nextX = this.x;
        var nextY = this.y;
        nextX += (this.direction.x * this.speed * modifier);
        nextY += (this.direction.y * this.speed * modifier);
        
        
        if(nextX > maxX || nextX < 0){
            this.direction.x = this.direction.x * -1;
            this.x += (this.direction.x * this.speed * modifier);
        }else{
            this.x = nextX;
        }
        
        if(nextY > maxY || nextY < 0){
            this.direction.y = this.direction.y * -1;
            this.y += (this.direction.y * this.speed * modifier);
        }else{
            this.y = nextY;
        }
    }
    this.update = function(){
        var ran  = RandomMovement();
        var randomSize = RandomValue(10, 25);
        
        this.div.css('width', randomSize);
        this.div.css('height', randomSize);
        this.div.css('top', parseInt(this.div.css('top'))+RandomValue(-100, 100)+'px');
       //this.div.css('top', ran.x);
        //this.div.css('-webkit-transform', 'translate3d('+ran.x+'px,'+ran.y+'px,'+ran.z+'px) rotate(-'+RandomValue(1,390)+'deg)');
        //this.div.css('-webkit-transform', 'translate3d('+ran.x+'px,'+ran.y+'px,'+ran.z+'px) rotate3d(1, 2.0, 3.0, -'+RandomValue(1,360)+'deg)');
       // this.div.css('transform', 'translate3D('+ran.x+'px,'+ran.y+'px,0)');
       //this.div.css('-webkit-transform', 'translateZ(-50px)');
    }
    
    this.append = function(){
        var ran  = RandomMovement();
        
        this.div = $('<div class="creature"></div>');
        this.div.css('top', ran.y);
        this.div.css('left', this.x);
        this.div.css('width', this.width);
        this.div.css('height', this.height);
        this.div.css('background-color', this.color.rgba);
        this.div.css('-webkit-transform-origin', '0 0 '+ran.z+'px');
        this.div.css('-webkit-animation-duration', RandomValue(5,15)+'s');
         
        this.div.css('-webkit-transform', 'translate3d('+ran.x+'px,'+ran.y+'px,'+ran.z+'px) rotate(-'+RandomValue(1,390)+'deg)');
        $('#game').append(this.div);
    }
    
}
