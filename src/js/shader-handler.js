import RenderEngine from './render-engine';
import GlUtils from './gl-utils';
import fgShader from './shaders/shader-fs';
import vcShader from './shaders/shader-vs';

// ShaderHandler class handles the rendering, interactions and states of the fragment and vertex shaders.
class ShaderHandler extends RenderEngine{
	constructor(parent, texture, fragment, vertex, params){
		super(parent);
		// Loads and initializes the fragment and vertex shaders.
		fragment = fragment.charAt(0).toUpperCase() + fragment.slice(1);
		vertex = vertex.charAt(0).toUpperCase() + vertex.slice(1);
		this.fragment = new fgShader[fragment](this.canvasInfo);
		this.vertex = new vcShader[vertex](this.canvasInfo);
		this.fragment.setParams && this.fragment.setParams(params.fragment);
		this.vertex.setParams && this.vertex.setParams(params.vertex);
		this.initShaders();
		this.initClick(this.canvas);
		// Creates and initializes the plane mesh and the texture.
		var plane = this.createPlane(40);
		plane.translation = [0, 0, -1];
		plane.scale = [1 / this.frameInfo.screenRatio, 1, 1];
		this.meshes = {plane};
		GlUtils.initMeshBuffers(this.ctx, this.meshes.plane);
		this.initTexture(this.meshes.plane, texture);
	}
	// initShaders() loads the shaders and initializes their parameters.
	initShaders(){
		GlUtils.initShaders(this, this.ctx, this.fragment, this.vertex);
		this.fragment.init && this.fragment.init(this.ctx, this.shaderProgram);
		this.vertex.init && this.vertex.init(this.ctx, this.shaderProgram);
	}
	// draw() renders the plane mesh and updates the shaders parameters.
	draw(){
		this.drawObject(this.meshes.plane, () => {
			this.fragment.draw && this.fragment.draw(this.ctx, this.shaderProgram);
			this.vertex.draw && this.vertex.draw(this.ctx, this.shaderProgram);
		});
		this.transform();
	}
	// transform() calls the shaders transform() methods.
	transform(){
		this.fragment.transform && this.fragment.transform();
		this.vertex.transform && this.vertex.transform();
	}
	// initClick(target) initializes the mouse/touch events.
	initClick(target){
		target.addEventListener("click", this.handleClick.bind(this));
		target.addEventListener("touchmove", this.handleTouchMove.bind(this));
	}
	// handleClick(event) calls the shaders handleClick() methods.
	handleClick(event){
		this.fragment.handleClick && this.fragment.handleClick(event);
		this.vertex.handleClick && this.vertex.handleClick(event);
	}
	// handleTouchMove(event) calls the shaders handleClick() methods.
	handleTouchMove(event){
		this.fragment.handleTouchMove && this.fragment.handleTouchMove(event);
		this.vertex.handleTouchMove && this.vertex.handleTouchMove(event);
	}
}

export default ShaderHandler;
