function Gif() {
	this.animationDuration = 0.25;
	this.posInitial = -75;
}

Gif.prototype.init = function init() {
	this.scene = new THREE.Scene();
	this.initCamera();
	this.initRenderer();
	this.initLights();

	this.createSquare();

	this.render();
};

Gif.prototype.initCamera = function initCamera() {
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.camera.position.x = 300;
	this.camera.position.y = 200;
	this.camera.position.z = 300;
	this.camera.updateProjectionMatrix();
	this.camera.lookAt(this.scene.position);
};

Gif.prototype.initRenderer = function initRenderer() {
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0x3ff0a1, 1 );
	document.body.appendChild(this.renderer.domElement);
};

Gif.prototype.initLights = function initLights() {
	var light = new THREE.DirectionalLight( 0xffffff, 1.8 );
	light.position.set( 80, 100, 90 );
	this.scene.add( light );
};

Gif.prototype.createSquare = function createSquares() {
	this.squareGroup = new THREE.Group();
	this.scene.add(this.squareGroup);

	this.geometry = new THREE.BoxGeometry( 100, 100, 100 );
	this.material = new THREE.MeshLambertMaterial({color : 0xe0ded7, shading: THREE.FlatShading});
	this.square = new THREE.Mesh(this.geometry, this.material);
	this.square.position.y = this.posInitial;
	this.squareGroup.add(this.square);

	this.tl = new TimelineMax({repeat: -1, repeatDelay: 1});
	this.tl.to(this.square.scale, this.animationDuration, {y: 0.25}, 0);
	this.tl.to(this.square.scale, this.animationDuration, {x: 1.3, z: 1.3}, 0);
	this.tl.to(this.square.position, this.animationDuration, {y: this.posInitial-37.5}, 0);
	this.tl.to(this.square.scale, this.animationDuration, {x: 0.5, z: 0.5}, this.animationDuration);
	this.tl.to(this.square.scale, this.animationDuration, {y: 1.5}, this.animationDuration);
	this.tl.to(this.square.position, this.animationDuration/2, {y: this.posInitial+25}, this.animationDuration);
	this.tl.to(this.square.position, this.animationDuration/2, {y: this.posInitial+180}, this.animationDuration*1.5);
	// this.tl.to(this.square.rotation, this.animationDuration, {y: Math.PI/2}, this.animationDuration*1.5);
	this.tl.to(this.square.scale, this.animationDuration/2, {x: 0.6, y: 0.6, z: 0.6, ease: Power2.easeOut}, this.animationDuration*2);
	this.tl.to(this.square.position, this.animationDuration/2, {y: this.posInitial+225, ease: Power2.easeOut}, this.animationDuration*2);
	this.tl.to(this.square.scale, this.animationDuration, {x: 0.5, y: 2, z: 0.5, ease: Power2.easeIn}, this.animationDuration*2.5);
	this.tl.to(this.square.position, this.animationDuration, {y: this.posInitial+50, ease: Power2.easeIn}, this.animationDuration*2.5);
	this.tl.to(this.square.scale, this.animationDuration/2, {x: 1.3, y: 0.25, z: 1.3}, this.animationDuration*3.5);
	this.tl.to(this.square.position, this.animationDuration/2, {y: this.posInitial-37.5}, this.animationDuration*3.5);
	this.tl.to(this.square.scale, this.animationDuration/2, {x: 1, y: 1, z: 1}, this.animationDuration*4);
	this.tl.to(this.square.position, this.animationDuration/2, {y: this.posInitial}, this.animationDuration*4);
};

Gif.prototype.render = function render() {
	requestAnimationFrame(this.render.bind(this));
	this.renderer.render(this.scene, this.camera);
};

var squareGif = new Gif();	squareGif.init();