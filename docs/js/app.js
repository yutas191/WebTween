var meshCube;
var meshRocket;
var floor;

var meshText1;
var meshText2;

class App {
	constructor(scene) {
		this.scene = scene;
	}

	init() {
		floor = new THREE.Scene();
		// ライト
		var light = new THREE.DirectionalLight(0xFFFFFF);
		light.position.set(0.5, 0.5, -0.5);
		scene.add( light );
		var ambientLight = new THREE.AmbientLight(0x888888);
		scene.add( ambientLight );

		// Cube
		var geometryCube = new THREE.CubeGeometry(2, 2, 2);
		var materialCube = new THREE.MeshNormalMaterial({transparent: true,opacity: 0.8,side:THREE.DoubleSide});
		meshCube = new THREE.Mesh(geometryCube, materialCube);
		meshCube.name = "cube";
		meshCube.position.set(-4, 1, 0);
		floor.add(meshCube);

		// Rocket
		loader.load("./model/rocketX.json", function(geometryRocket, materialRocket){
			materialRocket = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("./model/rocketX.png"),side:THREE.DoubleSide});
			meshRocket = new THREE.Mesh(geometryRocket, materialRocket);
			meshRocket.name = "rocket";
			meshRocket.scale.set(1, 1, 1);
			meshRocket.position.set(4, 0, 0);
			meshRocket.rotation.set(0, Math.PI, 0);
			floor.add(meshRocket);
		});

		// Text Cube
		var geometryText1 = new THREE.TextGeometry('Cube',{size:40,curveSegments:10,height:1,bevelEnabled:false});
		var materialText1 = new THREE.MeshLambertMaterial( { color: 0x00ccff,side:THREE.DoubleSide } );
		meshText1 = new THREE.Mesh(geometryText1,materialText1);
		meshText1.position.set(-5.5, 0, 0);
		meshText1.rotation.set(0, Math.PI, 0);
		meshText1.scale.set(0.02, 0.02, 0.02);
		floor.add(meshText1);

		// Text Rocket
		var geometryText2 = new THREE.TextGeometry('Rocket',{size:40,curveSegments:10,height:1,bevelEnabled:false});
		var materialText2 = new THREE.MeshLambertMaterial( { color: 0x00ccff,side:THREE.DoubleSide } );
		meshText2 = new THREE.Mesh(geometryText2,materialText2);
		meshText2.position.set(9, 0, 0);
		meshText2.rotation.set(0, Math.PI, 0);
		meshText2.scale.set(0.02, 0.02, 0.02);
		floor.add(meshText2);

		// Grid
		var grid = new THREE.GridHelper( 100, 8 );
		grid.material.color = new THREE.Color( 0x0000ff);
		grid.position.set(0, 0, 0);
		floor.add(grid);

		// Floor
		floor.position.set(0, -4, 20);
		scene.add(floor);
	}

	// タッチ
	touch(objName) {
		console.log(objName);
		switch(objName) {
		case "cube":
			this.tweenCube();
			break;
		case "rocket":
			this.tweenRocket();
			break;
		default:
			break;
		}
	}

	// アニメーション
	tweenCube() {
		var twIni1 = {posZ: 0, rotX: 0};			// 初期位置
		var twFor1 = {posZ: -4, rotX: -Math.PI};	// 終端位置
		var twVal1 = {posZ: 0, rotX: 0};			// 更新パラメータ

		var tween = new TWEEN.Tween(twVal1)			// 「行き」のアニメーション
		.to(twFor1, 2000)
		.easing(TWEEN.Easing.Back.Out)
		.onUpdate(function() {
			meshCube.position.z = twVal1.posZ;
			meshCube.rotation.x = twVal1.rotX;
			meshText1.position.z = twVal1.posZ;
		})
		.onComplete(function() {
			var tween = new TWEEN.Tween(twVal1)		// 「帰り」のアニメーションを実行
			.to(twIni1, 2000)
			.easing(TWEEN.Easing.Back.InOut)
			.onUpdate(function() {
				meshCube.position.z = twVal1.posZ;
				meshCube.rotation.x = twVal1.rotX;
				meshText1.position.z = twVal1.posZ;
			})
			.onComplete(function() {
				// なにもしない
			})
			.delay(100)
			.start();
		})
		.delay(0)
		.start();
	}

	// アニメーション
	tweenRocket() {
		var twIni2 = {posY: 0, rotY: Math.PI};		// 初期位置
		var twFor2 = {posY: 20, rotY: 0};			// 終端位置
		var twVal2 = {posY: 0, rotY: Math.PI};		// 更新パラメータ

		var tween = new TWEEN.Tween(twVal2)			// 「行き」のアニメーション
		.to(twFor2, 2000)
		.easing(TWEEN.Easing.Quadratic.InOut)
		.onUpdate(function() {
			meshRocket.position.y = twVal2.posY;
			meshRocket.rotation.y = twVal2.rotY;
			meshText2.position.y = twVal2.posY;
		})
		.onComplete(function() {
			var tween = new TWEEN.Tween(twVal2)		// 「帰り」のアニメーションを実行
			.to(twIni2, 3000)
			.easing(TWEEN.Easing.Quintic.InOut)
			.onUpdate(function() {
				meshRocket.position.y = twVal2.posY;
				meshRocket.rotation.y = twVal2.rotY;
				meshText2.position.y = twVal2.posY;
			})
			.onComplete(function() {
				// なにもしない
			})
			.delay(2000)
			.start();
		})
		.delay(0)
		.start();
	}

	// 更新
	update(dt) {

	}

	// 描画
	render(dt) {

	}

}

