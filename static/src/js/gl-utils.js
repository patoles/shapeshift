class GlUtils{
	setupCanvas(self, params){
		var parent = params.parent;
		self.active = true;
		var frameInfo = {
			fpsInterval:0, startTime:0, now:0,
			then:0, elapsed:0, fps:60, fpsRate:0, screenRatio:1
		};
		var canvas = document.getElementById(params.id) || document.createElement('canvas');
		canvas.id = params.id;
		canvas.className = 'canvas hide';
		canvas.height = parent.clientHeight;
		canvas.width = parent.clientWidth;
		var ctx = this.webgl_support(canvas);
		ctx.viewport(0, 0, canvas.width, canvas.height);
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		self.realWidth = canvas.width;
		self.realHeight = canvas.height;
		if (params.hd)
		{
			var devicePixelRatio = window.devicePixelRatio || 1;
			var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
			var pixelRatio = devicePixelRatio / backingStoreRatio;
			if (devicePixelRatio !== backingStoreRatio)
			{
				canvas.width = self.realWidth * pixelRatio;
				canvas.height = self.realHeight * pixelRatio;
				canvas.style.width = self.realWidth + 'px';
				canvas.style.height = self.realHeight + 'px';
				ctx.viewport(0, 0, canvas.width, canvas.height);
			}
		}
		frameInfo.screenRatio = canvas.height / canvas.width;
		frameInfo.fpsInterval = 1000 / frameInfo.fps;
		frameInfo.then = Date.now();
		frameInfo.startTime = frameInfo.then;
		ctx.clearColor(0.0, 0.0, 0.0, 0.0);
		ctx.enable(ctx.DEPTH_TEST);
		ctx.depthFunc(ctx.LEQUAL);
		ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
		if (!document.getElementById(params.id))
			parent.appendChild(canvas);
		self.frameInfo = frameInfo;
		self.canvas = canvas;
		self.ctx = ctx;
		self.shaderProgram = null;
	}
	webgl_support(canvas){
		try{
			return !! window.WebGLRenderingContext && ( 
				canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
		}catch( e ) { return false; } 
	}
}

const _GlUtils = new GlUtils();

export default _GlUtils;