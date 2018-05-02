//===================================================================
// three.js �̊e��ݒ�
//===================================================================
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
var light = new THREE.DirectionalLight(0xffffff);     // ���s�����i���j���쐬
var scene = new THREE.Scene();

var geo;
var mat;
var mesh1;

var mesh2;
var loader = new THREE.JSONLoader();                  // json�`���̃��f����ǂݍ��ރ��[�_

var geometryLine1 = new THREE.Geometry();
var line1 = [];
var geometryLine2 = new THREE.Geometry();
var line2 = [];

function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 4, 5);
    camera.rotation.set(-0.5, 0, 0);

    scene.add(camera);                                    // �J�������V�[���ɒǉ�
    light.position.set(0, 0, 2);                          // �J������������Ƃ炷
    scene.add(light);                                     // �V�[���Ɍ�����ǉ�

    geo = new THREE.CubeGeometry(1, 1, 1);            // cube �W�I���g���i�T�C�Y�� 1x1x1�j
    mat = new THREE.MeshNormalMaterial({transparent: true,opacity: 0.8,side:THREE.DoubleSide});
    mesh1 = new THREE.Mesh(geo, mat);                 // ���b�V���𐶐�
    mesh1.name = "cube";                                  // ���b�V���̖��O�i��Ńs�b�L���O�Ŏg���j
    mesh1.position.set(1, 0, 0);                          // �����ʒu
    scene.add(mesh1);

    loader.load("./model/rocketX.json", function(geo, mat){ // ���f����ǂݍ���
        mat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("./model/rocketX.png"),side:THREE.DoubleSide});
        //mat = new THREE.MeshLambertMaterial();
        mesh2 = new THREE.Mesh(geo, mat);                // ���b�V����
        mesh2.name = "rocket";                              // ���b�V���̖��O�i��Ńs�b�L���O�Ŏg���j
        mesh2.scale.set(0.3, 0.2, 0.3);                     // �����T�C�Y�i�������킹�j
        mesh2.position.set(-0.9, 0, 0.5);                      // �����ʒu�i�������킹�j
        scene.add(mesh2);
    });

    // ����
    geometryLine1.vertices.push(
        new THREE.Vector3( -5, -0.5, 0 ),
        new THREE.Vector3( 5, -0.5, 0 )
    );
    for (  var i = 0;  i < 6;  i++  ) {
        line1[i] = new THREE.Line( geometryLine1, new THREE.LineBasicMaterial( { color: 0x888888} ) );
        line1[i].position.set(0, 0, -i);
        scene.add( line1[i] );
    }

    // �c��
    geometryLine2.vertices.push(
        new THREE.Vector3( 0, -0.5, -5 ),
        new THREE.Vector3( 0, -0.5, 5 )
    );
    for (  var i = 0;  i < 11;  i++  ) {
        line2[i] = new THREE.Line( geometryLine2, new THREE.LineBasicMaterial( { color: 0x888888} ) );
        line2[i].position.set(i-5, 0, 0);
        scene.add( line2[i] );
    }
}

//===================================================================
// Tween �A�j���[�V����
//===================================================================
//-------------------------------
// mesh1 �ɂ��āicube���]����j
//-------------------------------
var twIni1 = {posZ: 0, rotX: 0};                      // �����p�����[�^
var twVal1 = {posZ: 0, rotX: 0};                      // tween�ɂ���čX�V�����p�����[�^
var twFor1 = {posZ: -2, rotX: -Math.PI};              // �^�[�Q�b�g�p�����[�^
function tween1() {                                   // �u�s���v�̃A�j���[�V����
  var tween = new TWEEN.Tween(twVal1)                 // tween�I�u�W�F�N�g���쐬
  .to(twFor1, 2000)                                   // �^�[�Q�b�g�Ɠ��B����
  .easing(TWEEN.Easing.Back.Out)                      // �C�[�W���O
  .onUpdate(function() {                              // �t���[���X�V���̏���
    mesh1.position.z = twVal1.posZ;                   // �ʒu��ύX
    mesh1.rotation.x = twVal1.rotX;                   // ��]��ύX
  })
  .onComplete(function() {                            // �A�j���[�V�����������̏���
    tween1_back();                                    // �u�A��v�̃A�j���[�V���������s
  })
  .delay(0)                                           // �J�n�܂ł̒x������
  .start();                                           // tween�A�j���[�V�����J�n
}
function tween1_back() {                              // �u�A��v�̃A�j���[�V����
  var tween = new TWEEN.Tween(twVal1)
  .to(twIni1, 2000)                                   // �^�[�Q�b�g�������p�����[�^�ɐݒ�
  .easing(TWEEN.Easing.Back.InOut)
  .onUpdate(function() {
    mesh1.position.z = twVal1.posZ;
    mesh1.rotation.x = twVal1.rotX;
  })
  .onComplete(function() {
    // �Ȃɂ����Ȃ�
  })
  .delay(100)
  .start();
}

//-------------------------------
// mesh2 �ɂ��āirocket����ԁj
//-------------------------------
var twIni2 = {posY: 0, rotY: 0};                      // �����p�����[�^
var twVal2 = {posY: 0, rotY: 0};                      // tween�ɂ���čX�V�����p�����[�^
var twFor2 = {posY: 2, rotY: 2*Math.PI};              // �^�[�Q�b�g�p�����[�^
function tween2() {                                   // �u�s���v�̃A�j���[�V����
  var tween = new TWEEN.Tween(twVal2)                 // tween�I�u�W�F�N�g���쐬
  .to(twFor2, 2000)                                   // �^�[�Q�b�g�Ɠ��B����
  .easing(TWEEN.Easing.Quadratic.InOut)               // �C�[�W���O
  .onUpdate(function() {                              // �t���[���X�V���̏���
    mesh2.position.y = twVal2.posY;                   // �ʒu��ύX
    mesh2.rotation.y = twVal2.rotY;                   // ��]��ύX
  })
  .onComplete(function() {                            // �A�j���[�V�����������̏���
    tween2_back();                                    // �u�A��v�̃A�j���[�V���������s
  })
  .delay(0)                                           // �J�n�܂ł̒x������
  .start();                                           // tween�A�j���[�V�����J�n
}
function tween2_back() {                              // �u�A��v�̃A�j���[�V����
  var tween = new TWEEN.Tween(twVal2)
  .to(twIni2, 3000)                                   // �^�[�Q�b�g�������p�����[�^�ɐݒ�
  .easing(TWEEN.Easing.Quintic.InOut)
  .onUpdate(function() {
    mesh2.position.y = twVal2.posY;
    mesh2.rotation.y = twVal2.rotY;
  })
  .onComplete(function() {
    // �Ȃɂ����Ȃ�
  })
  .delay(5000)
  .start();
}


//===================================================================
// �}�E�X�_�E������
//===================================================================
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
    touch(obj[0].object.name);                       // �^�b�`���ꂽ�Ώۂɉ��������������s
  }
});
// �^�b�`���ꂽ�Ώۂɉ���������
function touch(objName) {
  switch(objName) {
    case "cube":                                      // cube�Ȃ�
      tween1();                                       // cube�̃A�j���[�V���������s
      break;
    case "rocket":                                    // rocket�Ȃ�
      tween2();                                       // rocket�̃A�j���[�V���������s
      break;
    default:
      break;
  }
}

//===================================================================
// �����_�����O�E���[�v
//===================================================================
function renderScene() {                              // �����_�����O�֐�
  requestAnimationFrame(renderScene);                 // ���[�v��v��
  TWEEN.update();                                     // Tween�A�j���[�V�������X�V
  renderer.render(scene, camera);                     // �����_�����O���{
}

init();
renderScene();                                        // �ŏ���1�񂾂������_�����O���g���K
