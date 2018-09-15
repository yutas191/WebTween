var camera, renderer;
var controls;
var element, container;

var clock = new THREE.Clock();
var scene = new THREE.Scene();
var app = new App(scene);
var loader = new THREE.JSONLoader();

init();
animate();

function init() {
	renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	element = renderer.domElement;
	container = document.getElementById('example');

	camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );

	scene.add(camera);

	controls = new THREE.OrbitControls(camera, element);
	controls.target.set(
		camera.position.x,
		camera.position.y,
		camera.position.z+0.1
	);
	controls.noZoom = true;
	controls.noPan = true;

	function setOrientationControls(e) {
		if (!e.alpha) {
			return;
		}

		controls = new THREE.DeviceOrientationControls(camera, true);
		controls.connect();
		controls.update();

		element.addEventListener('click', fullscreen, false);

		window.removeEventListener('deviceorientation', setOrientationControls, true);
	}
	window.addEventListener('deviceorientation', setOrientationControls, true);
	window.addEventListener('resize', resize, false);
	setTimeout(resize, 1);

	window.addEventListener("mousedown", function(ret) {
		var mouseX = ret.clientX;                           // �}�E�X��x���W
		var mouseY = ret.clientY;                           // �}�E�X��y���W
		mouseX =  (mouseX / window.innerWidth)  * 2 - 1;    // -1 �` +1 �ɐ��K�����ꂽx���W
		mouseY = -(mouseY / window.innerHeight) * 2 + 1;    // -1 �` +1 �ɐ��K�����ꂽy���W
		var pos = new THREE.Vector3(mouseX, mouseY, 1);     // �}�E�X�x�N�g��
		pos.unproject(camera);                              // �X�N���[�����W�n���J�������W�n�ɕϊ�
		// ���C�L���X�^���쐬�i�n�_, �����̃x�N�g���j
		var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
		var obj = ray.intersectObjects(scene.children, true);   // ���C�ƌ��������I�u�W�F�N�g�̎擾
		if(obj.length > 0) {                                // ���������I�u�W�F�N�g�������
		app.touch(obj[0].object.name);                       // �^�b�`���ꂽ�Ώۂɉ��������������s
		}
	});

	app.init();
}

var width = 0;
var height = 0;

function resize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update(dt) {
	resize();

	camera.updateProjectionMatrix();

	controls.update(dt);
	app.update(dt);
}

function render(dt) {
	app.render(dt);
	renderer.render(scene, camera);
}

function animate(t) {
	requestAnimationFrame(animate);
	TWEEN.update();
	update(clock.getDelta());
	render(clock.getDelta());
}

function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
	} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
	} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
	}
}
