class Box{
    constructor(box){

        class Door{
            constructor(door, left = true){
                this.left = left;
                this.dom = door;
                this.transform = {
                    translateZ: left ? 0 : -100,
                    rotateX: left ? 270 : 90 //- closed 270 / 90 (open = 60 / 300) 
                }

                this.rebuildDom();
            }
            
            _constructTransform(){
                return `translateZ(${this.transform.translateZ}px) rotateX(${this.transform.rotateX}deg)`;
            }

            rebuildDom(){
                this.dom.style.transform = `${this._constructTransform()}`;
            }

            open(){
                this.transform.rotateX = this.left ? 60 : 300;
                this.rebuildDom();
            }

            close(){
                this.transform.rotateX = this.left ? 270 : 90;
                this.rebuildDom();
            }
        }

        class SetBox{

            constructor(setBox){
                
                class SetItem{

                    constructor(setItem, position){

                        class SupersetBox{

                            constructor(supersetBox){
                                
                                class SupersetItem{
                
                                    constructor(setItem, position){
                                        this.dom = setItem;
                                        this.dom.dataset.position = position;
                                        this.transform = {
                                            rotate: 0,
                                            scale: 1,
                                            translateY: 0
                                        }
                                    }
                        
                                    
                                    _constructTransform(){
                                        return `rotateZ(${this.transform.rotate}deg) translateY(-${this.transform.translateY}px) scale(${this.transform.scale})`;
                                    }
                        
                                    rebuildDom(){
                                        this.transform.rotate = this.transform.rotate >= 360 ? this.transform.rotate - 360 : this.transform.rotate;
                
                                        this.dom.style.transform = `${this._constructTransform()}`;
                                        this.dom.querySelector('.superset__skill-box').style.transform = `rotate(-${this.transform.rotate}deg) `;
                                    }
                        
                                    takePosition(){
                
                                        let pos = this.dom.dataset.position.split('-');
                                        this.position = Number(pos[0]);
                                        this.amount = Number(pos[1]);
                
                                        if(this.position != 0){

                                            let minItemWidth = 70;
                                            
                                            this.transform.translateY = Math.max(this.amount * minItemWidth / (2 * Math.PI), Math.min(window.innerWidth * 0.4, window.innerHeight * 0.3));
                                            this.transform.scale = 1;
                                            
                                            this.dom.addEventListener('transitionend', function(){
                                                this.dom.style.transition = "none";
                                                this.dom.querySelector('.superset__skill-box').style.transition = "none";
                                            }.bind(this),{once: true});
                                            
                                        } else {

                                            let minItemWidth = 70;
                                            
                                            this.transform.translateY = Math.max(this.amount * minItemWidth / (2 * Math.PI), Math.min(window.innerWidth * 0.4, window.innerHeight * 0.3));
                                            this.transform.scale = 1;
                                            
                                            this.dom.addEventListener('transitionend', function(){
                                                this.dom.style.transition = "none";
                                                this.dom.querySelector('.superset__skill-box').style.transition = "none";
                                                this.dom.closest('.superset__box').dispatchEvent(new Event('rotatesupersetitems'));
                                            }.bind(this),{once: true});
                                        }
                                        
                                        this.transform.rotate = 360 / this.amount * this.position;
                
                                        this.rebuildDom();
                                    }
                        
                                    revert(){
                                        this.dom.style.transition = "";
                                        
                                        this.transform.scale = 0;
                                        this.transform.translateY = 0;
                                        this.transform.rotate = 0;
                
                                        this.rebuildDom();
                                    }
                                }
                
                                this.dom = supersetBox;
                                this.transform = {
                
                                    translateY: 0,
                                    rotate: 0,
                                    scale: 0.1
                                }
                
                                this.items = [];
                
                                this.dom.addEventListener('rotatesupersetitems', function(e){
                                    this.rotateItems();
                                }.bind(this))
                
                                this.dom.querySelectorAll('.superset__item').forEach(function(item, index, array){
                                    this.items.push(new SupersetItem(item, `${index}-${array.length}`));
                                }.bind(this));

                                this.rebuildDom();
                            }
                            
                            _constructTransform(){
                                return `rotate(${this.transform.rotate}deg) translateY(${this.transform.translateY}px) scale(${this.transform.scale})`;
                            }
                
                            rebuildDom(){
                                this.dom.style.transform = `${this._constructTransform()}`;
                            }

                            out(){
                                // console.log(this.items);
                                this.transform.scale = 0.8;

                                let minItemWidth = 70;
                                            
                                this.transform.translateY = Math.max(this.items.length * minItemWidth / (2 * Math.PI), Math.min(window.innerWidth * 0.4, window.innerHeight * 0.3)) - window.innerHeight * 0.2;

                                this.items.forEach(item=>item.takePosition());
                                this.rebuildDom();
                            }
                
                            in(){
                
                                this.rotate = false;
                                this.transform.scale = 0.1;
                                this.transform.translateY = 0;
                                this.items.forEach(item=>item.revert());
                                this.rebuildDom();
                            }
                
                            rotateItems(){
                                this.rotate = true;
                                let step = 0.2;
                                requestAnimationFrame(function move(){
                
                                    if(!this.rotate) return;
                
                                    this.items.forEach(item=>{
                                        item.transform.rotate += step;
                                        item.rebuildDom();
                                    });
                
                                    requestAnimationFrame(move.bind(this));
                                }.bind(this));
                            }
                        }


                        this.dom = setItem;
                        this.dom.dataset.position = position;
                        this.transform = {
                            translateZ: 0,
                            rotate: 0,
                            scale: 1,
                            translateY: 0
                        }
                        this.superset = new SupersetBox(this.dom.querySelector('.superset__box'))
                    }
        
                    
                    _constructTransform(){
                        return `translateY(${this.transform.translateY}px) rotateY(${this.transform.rotate}deg) translateZ(${this.transform.translateZ}px) scale(${this.transform.scale})`;
                    }
        
                    rebuildDom(){
                        this.transform.rotate = this.transform.rotate >= 360 ? this.transform.rotate - 360 : this.transform.rotate;

                        this.dom.style.transform = `${this._constructTransform()}`;
                        this.dom.querySelector('.diamond').style.transform = `rotateY(-${this.transform.rotate}deg) `;
                    }
        
                    takePosition(){

                        let pos = this.dom.dataset.position.split('-');
                        this.position = Number(pos[0]);
                        this.amount = Number(pos[1]);

                        if(this.position != 0){
                            
                            this.transform.translateZ = Math.max(Math.min(100, window.innerWidth * 0.2), 75);
                            this.transform.scale = 1;
                            this.transform.translateY = 0;
                            
                            this.dom.addEventListener('transitionend', function(){
                                this.dom.style.transition = "none";
                                this.dom.querySelector('.diamond').style.transition = "none";
                            }.bind(this),{once: true});
                            
                        } else {

                            this.transform.translateZ = 0;
                            this.transform.scale = 1.25;
                            this.transform.translateY = -70;

                            this.dom.addEventListener('transitionend', function(){
                                this.dom.style.transition = "none";
                                this.dom.querySelector('.diamond').style.transition = "none";
                                this.dom.closest('.set__box').dispatchEvent(new Event('rotateitems'));
                                this.superset.out();
                            }.bind(this),{once: true});
                        }
                        
                        this.transform.rotate = 360 / this.amount * this.position;

                        this.rebuildDom();
                    }
        
                    revert(){

                        this.superset.in();

                        this.dom.style.transition = "";
                        this.dom.querySelector('.diamond').style.transition = ``;
                        
                        this.transform.translateZ = 0;
                        this.transform.scale = 1;
                        this.transform.translateY = 0;
                        this.transform.rotate = 0;

                        this.rebuildDom();
                    }

                    switchPositionWith(targetElem){
                        this.dom.style.transition = "";
                        targetElem.dom.style.transition = "";
                        targetElem.dom.querySelector('.diamond').style.transition = ``;
                        this.dom.querySelector('.diamond').style.transition = ``;

                        this.superset.in();
                        this.superset.dom.addEventListener('transitionend', function(e){

                            if(targetElem.transform.rotate < 180) targetElem.transform.rotate += 360;

                            let trans = targetElem.transform,
                                pos = targetElem.position;

                            targetElem.transform = this.transform;
                            targetElem.dom.querySelector('.diamond').style.transform = `rotateY(-${targetElem.transform.rotate}deg) `;
                            targetElem.position = this.position;

                            this.transform = trans;
                            this.position = pos;
                            this.dom.querySelector('.diamond').style.transform = `rotateY(-${this.transform.rotate}deg) `;

                            targetElem.dom.addEventListener('transitionend', function(){

                                targetElem.dom.style.transition = "none";
                                this.dom.style.transition = "none";
                                targetElem.dom.querySelector('.diamond').style.transition = "none";
                                this.dom.querySelector('.diamond').style.transition = "none";

                                targetElem.dom.closest('.set__box').dispatchEvent(new Event('rotateitems'));
                                targetElem.superset.out();

                            }.bind(this),{once: true});

                            this.rebuildDom();
                            targetElem.rebuildDom();
                            
                        }.bind(this),{once: true});
                    }
                }

                this.dom = setBox;
                this.transform = {

                    translateY: 0,
                    scale: 1
                }

                this.rebuildDom();

                this.items = [];
                this.readyState = false;

                this.dom.addEventListener('rotateitems', function(e){
                    this.rotateItems();
                }.bind(this))

                this.dom.querySelectorAll('.set__item').forEach(function(item, index, array){
                    this.items.push(new SetItem(item, `${index}-${array.length - 1}`));
                }.bind(this));

                this.dom.addEventListener('click', this.switchItems.bind(this));
            }
            
            _constructTransform(){
                return `translateY(${this.transform.translateY}px) scale(${this.transform.scale})`;
            }

            rebuildDom(){
                this.dom.style.transform = `${this._constructTransform()}`;
            }

            flyOut(){

                this.dom.addEventListener('transitionend', function(){
                    this.displayFullView();
                }.bind(this), {once: true});

                this.transform.translateY = -window.innerHeight * 0.2;
                this.transform.scale = 1.5;
                this.rebuildDom();
            }

            flyIn(){
                this.collapseFullView();
                this.transform.translateY = 0;
                this.transform.scale = 1;
                this.rebuildDom();
            }

            displayFullView(){
                // console.log(this.items);
                this.items.forEach(item=>item.takePosition());

                
            }

            collapseFullView(){

                this.rotate = false;
                this.items.forEach(item=>item.revert());
                
            }

            rotateItems(){
                this.dom.dispatchEvent(new Event('boxopened',{bubbles: true}), );
                this.readyState = true;
                this.rotate = true;
                let step = 0.5;
                requestAnimationFrame(function move(){

                    if(!this.rotate) return;

                    this.items.forEach(item=>{
                        if(item.position == 0) return;
                        item.transform.rotate += step;
                        item.rebuildDom();
                    });

                    requestAnimationFrame(move.bind(this));
                }.bind(this));
            }

            switchItems(e){
                if(!e.target.closest('.set__item')) return;

                if(!this.readyState) return;

                
                let targ = this.items.find(item=>item.dom == e.target.closest('.set__item')),
                cur = this.items.find(item=>item.position == 0);
                
                if(targ == cur) return;
                
                this.readyState = false;
                this.rotate = false;

                cur.switchPositionWith(targ);
            }
        }

        this.dom = box;
        this.opened = false;
        this.readyState = true;
        this.transform = {
            rotateX : 0,    //-20
            rotateY : -80,
            rotateZ :  0,
            scaleY :  1,
            scaleX :  1,
            scaleZ :  1,
            translateX :  0,
            translateY :  window.innerHeight * 0.4,
            translateZ :  0,
        };
        this.leftDoor = new Door(this.dom.querySelector('.box__side--top-left'));
        this.rightDoor = new Door(this.dom.querySelector('.box__side--top-right'), false);
        this.setBox = new SetBox(this.dom.querySelector('.set__box'));

        this.dom.addEventListener('click', function(e){
            if(!e.target.matches('.box__side')) return;
            if(!this.readyState) return;
            if(this.opened == false){
                this.opened = true;
                this.dom.classList.add('box--opened');
            } else{
                this.dom.classList.remove('box--opened');
                this.close();
            }
            this.readyState = false;
            
        }.bind(this));

        this.dom.addEventListener('boxopened', function(e){
            this.readyState = true;
        }.bind(this));

        this.rebuildDom();
        
        this.initiateJumps();
    }

    rebuildDom(){

        this.dom.style.transform = `${this._constructTransform()}`;
    }

    open(){
        this.leftDoor.open();
        
        this.rightDoor.dom.addEventListener('transitionend', function(){

            this.setBox.flyOut();

        }.bind(this), {once: true});
        
        this.rightDoor.open();
    }

    close(){
        
        this.setBox.flyIn();

        this.setBox.dom.addEventListener('transitionend', function closeBoxListener(e){       
            if(e.target != this.setBox.dom){
                this.setBox.dom.addEventListener('transitionend', closeBoxListener.bind(this), {once: true});
                return;
            }
            this.leftDoor.close();
            this.rightDoor.close();
        }.bind(this), {once: true});
        

        this.leftDoor.dom.addEventListener('transitionend', function(e){
            this.opened = false;
            this.readyState = true;
            this.initiateJumps();
        }.bind(this), {once: true});
    }

    jump(){
        
        let speed = 20;

        this.dom.addEventListener('preparedToJump', function (e){
            // console.log('prepared to jump!');

            accelerate.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('accelerated', function (e){
            // console.log('accelerated!');
            flyUp.apply(this);
            this.dom.style.transformOrigin = "center center -50px";

        }.bind(this), {once: true});

        this.dom.addEventListener('flyedUp', function (e){
            // console.log('flyedUp!');

            this.dom.style.transformOrigin = "";
            fallDown.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('falledDown', function (e){
            // console.log('falledDown!');

            grounding.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('grounded', function (e){
            // console.log('grounded!');

            groundSwing.apply(this);

        }.bind(this), {once: true});

        this.dom.addEventListener('groundSwinged', function (e){
            // console.log('All Done!');
            this.initiateJumps();
        }.bind(this), {once: true});

        
        prepareToJump.apply(this);


        // functions


        function groundSwing(){


            let timing  = function (timeFraction){

                    let x = 1.5;

                    timeFraction = 1 - timeFraction;
                    //linear
                    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
                },

                draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 100 * speed,
            }, new Event('groundSwinged'));
        }

        function grounding(){

            
            let timing  = function (timeFraction){

                return 1-(--timeFraction)*timeFraction*timeFraction*timeFraction;
            },

            draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 10 * speed,
            }, new Event('grounded'));
        }

        function fallDown(){

            let timing  = function (timeFraction){

                    return timeFraction*timeFraction*timeFraction;
                },

                draw = (progress)=>{this._translateY(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 50 * speed,
            }, new Event('falledDown'));
        }

        function flyUp(){

            let timing  = function (timeFraction){

                    return (--timeFraction)*timeFraction*timeFraction+1;
                },

                draw = (progress)=>{
                    this._translateY(progress);
                };


            this._animate({
                timing: timing,
                draw,
                duration: 70 * speed,
            }, new Event('flyedUp'));
        }

        function accelerate(){

            let max = -10;

            let timing  = function (timeFraction){

                    let x = 1.5;

                    timeFraction = 1 - timeFraction;
                    //linear
                    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
                },

                draw = (progress)=>{
                    this._deformate(1 - progress);
                   
                    if(1 - progress <= max || 1 - progress >= 1){
                        this.dom.dispatchEvent(new Event('accelerated'));
                    } else{
                        max = 1 - progress;
                    }
                };


            this._animate({
                timing: timing,
                draw,
                duration: 100 * speed,
            });
        }

        function prepareToJump(){

            let timing  = function (timeFraction){

                    return timeFraction*(2-timeFraction);
                },

                draw = (progress)=>{this._deformate(1 - progress);};


            this._animate({
                timing: timing,
                draw,
                duration: 50 * speed,
            }, new Event('preparedToJump'));
        }
    }

    initiateJumps(){

        if(!this.opened){

            setTimeout(function(){

                if(!this.opened){

                    this.jump();
                } else{
                    this.initiateJumps();
                }
                
            }.bind(this), 200)
            return;
        }

        this.open();
    }

    _constructTransform(){
        return `translateX(${this.transform.translateX}px) translateY(${this.transform.translateY}px) translateZ(${this.transform.translateZ}px) rotateX(${this.transform.rotateX}deg) rotateY(${this.transform.rotateY}deg) rotateZ(${this.transform.rotateZ}deg) scaleY(${this.transform.scaleY}) scaleX(${this.transform.scaleX}) scaleZ(${this.transform.scaleZ})`;
    }

    _deformate(sc){ //sc (scale) 1 - scale = 1; 0 - min deformation; 2 - max deformation

        let minDef  = 0.6;

            sc = minDef + (1 - minDef) * sc

        let scaleNew = {
            y: sc,
            x: 1 + (1 - sc)**2 * (sc > 1 ? -1 : 1),
            z: 1 + (1 - sc)**2 * (sc > 1 ? -1 : 1),
        }

        this.transform.scaleX = scaleNew.x;
        this.transform.scaleY = scaleNew.y;
        this.transform.scaleZ = scaleNew.z;

        this.rebuildDom();
    }

    _translateY(y){ // 0 - 1 amount

        let maxY = window.innerHeight * 0.2,
            minY = -window.innerHeight * 0.4;

        y = Math.abs(maxY - minY) * y + minY;

        this.transform.translateY = -y;

        this.rebuildDom();
    }

    _animate({timing, draw, duration}, event) {

        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
          // timeFraction goes from 0 to 1
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
      
          // calculate the current animation state
          let progress = timing(timeFraction);
      
          draw(progress); // draw it
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate.bind(this));
          } else if(event){
            this.dom.dispatchEvent(event);
          }
      
        }.bind(this));
    }
}

let box = new Box(document.getElementById('skillsBox'));
