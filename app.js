var Life = function(){

		this.aCells = [];
		this.w 	= guiControls.size;
		this.count = 0;
		this.dead = 0;
		this.living = 0;
		this.pop = 0;
		this.maxPop = 0;
		this.cycles = 0;



		Life.prototype.init = function( _b )
		{

			if ( typeof( _b ) === 'undefined' ) _b = true;

			window.onresize();

			this.w 	= guiControls.size;
			this.cell = Math.floor( oSize.w / this.w );
			this.row = Math.floor( oSize.h / this.w );
			this.count = this.cell * this.row;
			this.pop = 0;
			this.maxPop = 0;
			this.cycles = 0;
			this.aCells = [];

			for (var r = 0; r <= this.row; r++) {

				this.aCells[ r ] = [];
				
				for (var c = 0; c <= this.cell; c++) {

					this.aCells[ r ][ c ] = new Cell( r, c, this.w, _b );

					if( r == 0  || r == this.row || c == 0 || this.cell == c )
						this.aCells[ r ][ c ].live = 0;

				};
				
			};


		}


		Life.prototype.drawLine = function(){

			var m = Math.ceil( this.row / 2 );

			for (var y = 1; y < this.aCells.length - 2; y++) {
				for (var x = 1; x < this.aCells[y].length - 2; x++) {

					if( y == m ){
						this.aCells[y][x].live = 1;
						this.aCells[y][x].a = 1;
					}

				};
			};

		}


		Life.prototype.drawCanon = function(){

			var pCanon = [];
			pCanon[0] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[1] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[2] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ];
			pCanon[3] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ];
			pCanon[4] = [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[5] = [ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[6] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[7] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
			pCanon[8] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];


			var my = Math.ceil( this.row / 5 );
			var mx = Math.ceil( this.cell / 10 );

			for (var y = my; y < this.aCells.length - 2; y++) {
				for (var x = mx; x < this.aCells[y].length - 2; x++) {

					if( pCanon[ y - my ] && pCanon[ y - my ][ x - mx ] ){

						this.aCells[y][x].live = 1;
						this.aCells[y][x].a = 1;

					}

				};
			};

		}

		Life.prototype.countLives = function( r, c )
		{

			var iLive = 0;

			iLive += this.aCells[ r - 1 ][ c - 1 ].live;
			iLive += this.aCells[ r - 1 ][ c ].live;
			iLive += this.aCells[ r - 1 ][ c + 1 ].live;
			iLive += this.aCells[ r ][ c - 1 ].live;
			iLive += this.aCells[ r ][ c + 1 ].live;
			iLive += this.aCells[ r + 1 ][ c - 1 ].live;
			iLive += this.aCells[ r + 1 ][ c ].live;
			iLive += this.aCells[ r + 1 ][ c + 1 ].live;

			return iLive;

		}

		Life.prototype.nextGen = function( oCell )
		{

			oCell.lastLive = oCell.live;

			if( oCell.dying  ){

				oCell.a = 0;
				oCell.dying = false;
				oCell.live = 0;
			
			}

			if( oCell.incipient ){

				oCell.incipient = false;
				oCell.live = 1;
			
			}

		}


		Life.prototype.update = function()
		{	

			this.living = 0;

			for (var y = 1; y < this.aCells.length - 1; y++) {
				for (var x = 1; x < this.aCells[y].length - 1; x++) {
					this.nextGen( this.aCells[y][x] );
				};
			};

			for (var y = 1; y < this.aCells.length - 1; y++) {
				for (var x = 1; x < this.aCells[y].length - 1; x++) {
					
					this.aCells[y][x].update();

					if( this.aCells[y][x].live == 1 )
						this.living++;

				};
			};
			
			

		};


		Life.prototype.draw = function( ctx ) 
		{

			for (var y = 1; y < this.aCells.length - 1; y++) {

				for (var x = 1; x < this.aCells[y].length - 1; x++) {

					if( this.aCells[y][x].live )	
					    this.aCells[y][x].draw( ctx );

				};
		
			};


		};

		Life.prototype.stats = function(){

			this.cycles++;

			this.pop = Math.round( ( this.living * 100 / this.count ) * 100 ) / 100;

			if( this.maxPop < this.pop )
				this.maxPop = this.pop;

			var sReturn = this.count + " cells <br/>"; 
			sReturn += ( this.count - this.living ) + " dead cells <br/>";
			sReturn += this.living + " living cells <br/>";
			sReturn += this.pop + "% living cells <br/>";
			sReturn += this.maxPop + "% best living cells <br/>";
			sReturn += this.cycles + " cycles <br/>";

			return ( guiControls.stats ) ? sReturn : '';

		}


		Life.prototype.drawStats = function()
		{
			ctx.beginPath();
			ctx.arc( oSize.w / 2, oSize.h - ( ( oSize.h * this.maxPop ) / 100 ), 3, 0, 2 * Math.PI );
			ctx.fillStyle = "rgba( 255, 255, 0, 1 )";
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.moveTo( oSize.w / 2, oSize.h );
	      	ctx.lineTo( oSize.w / 2, oSize.h - ( ( oSize.h * this.pop ) / 100 ));
			ctx.strokeStyle = "rgba( 255, 255, 255, 1 )";
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.closePath();		

		}

		this.init();


	}



	var Cell = function( r, c, w, b ){
		this.x = w * c;
		this.y = w * r;
		this.w = w;
		this.h = w;
		this.row = r,
		this.cell = c;
		this.a = 0;
		this.dying = false;
		this.incipient = false;

		if( b && rand( 0, 10 ) < 1 )
			this.live = 1;
		else
			this.live = 0;


		Cell.prototype.update = function()
		{

			var iLive = oLife.countLives( this.row, this.cell );

			if( !this.live && iLive == 3 )//si elle est morte et si 3 cellules vivante l'entour, elle devient naissante
				this.incipient = true;

			if( this.live )
				this.a += guiControls.fineness;

			if( this.live && iLive < 2 || this.live && iLive > 3 )//si elle est vivante et s'il y a moins de 2 cellules vivante qui l'entoure, ou plu de 3, elle est mourante
				this.dying = true;


			if( guiControls.spontaneousBirth && this.live == 0 && this.lastLive == 0 && rand( 0, 40000 ) < 1 )
				this.incipient = true;	


		}

		Cell.prototype.draw = function( ctx )
		{

			ctx.beginPath();

			ctx.arc( this.x + ( this.w / 2 ), this.y + ( this.w / 2 ), this.w / 2, 0, 2 * Math.PI );

			ctx.fillStyle = "rgba( 255, 255, 255, " + this.a + " )";
			
			ctx.fill();

	  		ctx.closePath();

		};


	};




	/** global vars **/
	var oSize 		= {
		h : window.innerHeight,
		w : window.innerWidth
	};
	var oMouse 		= {
		x : oSize.w / 2,
		y : oSize.h / 2
	};

	var canvas 		= document.getElementById('life');
	var ctx	 		= canvas.getContext('2d');

	canvas.height 	= oSize.h;
	canvas.width 	= oSize.w;


	rand = function( min, max ){ return Math.random() * ( max - min) + min; };
	update_mouse = function( _e ){ oMouse.y = _e.pageY; oMouse.x = _e.pageX; };
	onresize = function () { oSize.w = canvas.width = window.innerWidth; oSize.h = canvas.height = window.innerHeight; };
	merge = function(o1,o2){var o3 = {};for (var attr in o1) { o3[attr] = o1[attr]; }for (var attr in o2) { o3[attr] = o2[attr]; }return o3;};


	document.addEventListener('mousemove', update_mouse, false);
	document.addEventListener('onresize', onresize, false);
	window.onresize(); 




	/** DAT GUI **/
	var guiControls = new function(){

		this.size 			= oSize.h / 120;
		this.stats = false;
		this.spontaneousBirth = true;
		this.fineness = 0.2;
		this.refresh = function(){

			oLife.init();

		}
		this.random = function(){

			oLife.init();

		}
		this.line = function(){

			this.spontaneousBirth = false;
			oLife.init( false );
			oLife.drawLine();

		}
		this.canon = function(){

			this.spontaneousBirth = false;
			oLife.init( false );
			oLife.drawCanon();
			

		}


	}

	var oLife = new Life();
	oLife.update();
	//var meter = new FPSMeter();

	/** ANIMATION **/
	function render(){

		ctx.fillStyle = "rgba( 5, 29, 29, " + guiControls.fineness + " )";
		ctx.clearRect( 0, 0, oSize.w, oSize.h );

		oLife.update();

		oLife.draw( ctx );

		oLife.drawStats( ctx );

		//meter.tick();

		requestAnimationFrame( render );

	}
	render();