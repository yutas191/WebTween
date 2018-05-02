//===================================================================
// three.js の各種設定
//===================================================================
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
var light = new THREE.DirectionalLight(0xffffff);     // 平行光源（白）を作成
var scene = new THREE.Scene();

var geo;
var mat;
var mesh1;

var mesh2;
var loader = new THREE.JSONLoader();                  // json形式のモデルを読み込むローダ

var geometryLine1 = new THREE.Geometry();
var line1 = [];
var geometryLine2 = new THREE.Geometry();
var line2 = [];

function init() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 4, 5);
    camera.rotation.set(-0.5, 0, 0);

    scene.add(camera);                                    // カメラをシーンに追加
    light.position.set(0, 0, 2);                          // カメラ方向から照らす
    scene.add(light);                                     // シーンに光源を追加

    geo = new THREE.CubeGeometry(1, 1, 1);            // cube ジオメトリ（サイズは 1x1x1）
    mat = new THREE.MeshNormalMaterial({transparent: true,opacity: 0.8,side:THREE.DoubleSide});
    mesh1 = new THREE.Mesh(geo, mat);                 // メッシュを生成
    mesh1.name = "cube";                                  // メッシュの名前（後でピッキングで使う）
    mesh1.position.set(1, 0, 0);                          // 初期位置
    scene.add(mesh1);

    loader.load("./model/rocketX.json", function(geo, mat){ // モデルを読み込む
        mat = new THREE.MeshPhongMaterial({map:THREE.ImageUtils.loadTexture("./model/rocketX.png"),side:THREE.DoubleSide});
        //mat = new THREE.MeshLambertMaterial();
        mesh2 = new THREE.Mesh(geo, mat);                // メッシュ化
        mesh2.name = "rocket";                              // メッシュの名前（後でピッキングで使う）
        mesh2.scale.set(0.3, 0.2, 0.3);                     // 初期サイズ（現物合わせ）
        mesh2.position.set(-0.9, 0, 0.5);                      // 初期位置（現物合わせ）
        scene.add(mesh2);
    });

    // 横線
    geometryLine1.vertices.push(
        new THREE.Vector3( -5, -0.5, 0 ),
        new THREE.Vector3( 5, -0.5, 0 )
    );
    for (  var i = 0;  i < 6;  i++  ) {
        line1[i] = new THREE.Line( geometryLine1, new THREE.LineBasicMaterial( { color: 0x888888} ) );
        line1[i].position.set(0, 0, -i);
        scene.add( line1[i] );
    }

    // 縦線
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
// Tween アニメーション
//===================================================================
//-------------------------------
// mesh1 について（cubeが転がる）
//-------------------------------
var twIni1 = {posZ: 0, rotX: 0};                      // 初期パラメータ
var twVal1 = {posZ: 0, rotX: 0};                      // tweenによって更新されるパラメータ
var twFor1 = {posZ: -2, rotX: -Math.PI};              // ターゲットパラメータ
function tween1() {                                   // 「行き」のアニメーション
  var tween = new TWEEN.Tween(twVal1)                 // tweenオブジェクトを作成
  .to(twFor1, 2000)                                   // ターゲットと到達時間
  .easing(TWEEN.Easing.Back.Out)                      // イージング
  .onUpdate(function() {                              // フレーム更新時の処理
    mesh1.position.z = twVal1.posZ;                   // 位置を変更
    mesh1.rotation.x = twVal1.rotX;                   // 回転を変更
  })
  .onComplete(function() {                            // アニメーション完了時の処理
    tween1_back();                                    // 「帰り」のアニメーションを実行
  })
  .delay(0)                                           // 開始までの遅延時間
  .start();                                           // tweenアニメーション開始
}
function tween1_back() {                              // 「帰り」のアニメーション
  var tween = new TWEEN.Tween(twVal1)
  .to(twIni1, 2000)                                   // ターゲットを初期パラメータに設定
  .easing(TWEEN.Easing.Back.InOut)
  .onUpdate(function() {
    mesh1.position.z = twVal1.posZ;
    mesh1.rotation.x = twVal1.rotX;
  })
  .onComplete(function() {
    // なにもしない
  })
  .delay(100)
  .start();
}

//-------------------------------
// mesh2 について（rocketが飛ぶ）
//-------------------------------
var twIni2 = {posY: 0, rotY: 0};                      // 初期パラメータ
var twVal2 = {posY: 0, rotY: 0};                      // tweenによって更新されるパラメータ
var twFor2 = {posY: 2, rotY: 2*Math.PI};              // ターゲットパラメータ
function tween2() {                                   // 「行き」のアニメーション
  var tween = new TWEEN.Tween(twVal2)                 // tweenオブジェクトを作成
  .to(twFor2, 2000)                                   // ターゲットと到達時間
  .easing(TWEEN.Easing.Quadratic.InOut)               // イージング
  .onUpdate(function() {                              // フレーム更新時の処理
    mesh2.position.y = twVal2.posY;                   // 位置を変更
    mesh2.rotation.y = twVal2.rotY;                   // 回転を変更
  })
  .onComplete(function() {                            // アニメーション完了時の処理
    tween2_back();                                    // 「帰り」のアニメーションを実行
  })
  .delay(0)                                           // 開始までの遅延時間
  .start();                                           // tweenアニメーション開始
}
function tween2_back() {                              // 「帰り」のアニメーション
  var tween = new TWEEN.Tween(twVal2)
  .to(twIni2, 3000)                                   // ターゲットを初期パラメータに設定
  .easing(TWEEN.Easing.Quintic.InOut)
  .onUpdate(function() {
    mesh2.position.y = twVal2.posY;
    mesh2.rotation.y = twVal2.rotY;
  })
  .onComplete(function() {
    // なにもしない
  })
  .delay(5000)
  .start();
}


//===================================================================
// マウスダウン処理
//===================================================================
window.addEventListener("mousedown", function(ret) {
  var mouseX = ret.clientX;                           // マウスのx座標
  var mouseY = ret.clientY;                           // マウスのy座標
  mouseX =  (mouseX / window.innerWidth)  * 2 - 1;    // -1 ～ +1 に正規化されたx座標
  mouseY = -(mouseY / window.innerHeight) * 2 + 1;    // -1 ～ +1 に正規化されたy座標
  var pos = new THREE.Vector3(mouseX, mouseY, 1);     // マウスベクトル
  pos.unproject(camera);                              // スクリーン座標系をカメラ座標系に変換
  // レイキャスタを作成（始点, 向きのベクトル）
  var ray = new THREE.Raycaster(camera.position, pos.sub(camera.position).normalize());
  var obj = ray.intersectObjects(scene.children, true);   // レイと交差したオブジェクトの取得
  if(obj.length > 0) {                                // 交差したオブジェクトがあれば
    touch(obj[0].object.name);                       // タッチされた対象に応じた処理を実行
  }
});
// タッチされた対象に応じた処理
function touch(objName) {
  switch(objName) {
    case "cube":                                      // cubeなら
      tween1();                                       // cubeのアニメーションを実行
      break;
    case "rocket":                                    // rocketなら
      tween2();                                       // rocketのアニメーションを実行
      break;
    default:
      break;
  }
}

//===================================================================
// レンダリング・ループ
//===================================================================
function renderScene() {                              // レンダリング関数
  requestAnimationFrame(renderScene);                 // ループを要求
  TWEEN.update();                                     // Tweenアニメーションを更新
  renderer.render(scene, camera);                     // レンダリング実施
}

init();
renderScene();                                        // 最初に1回だけレンダリングをトリガ
