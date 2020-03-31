import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var container, stats, clock;
var camera, scene, renderer, satellyteModel;
let controls;

init();
animate();

function init() {
    const container = document.createElement('div');
    document.body.append(container);

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.set( 8, 10, 8 );
    camera.lookAt( 0, 3, 0 );

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    // loading manager

    var loadingManager = new THREE.LoadingManager( function () {
        scene.add( satellyteModel );
        const child = satellyteModel.children[0];
        // child.material = new THREE.MeshNormalMaterial();
        child.scale.set(200, 200, 200)

        console.log(child);

    } );

    // collada

    var loader = new ColladaLoader( loadingManager );
    loader.load( './model.dae', function ( collada ) {
        satellyteModel = collada.scene;
    } );


    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    scene.add( directionalLight );

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    controls = new OrbitControls (camera, renderer.domElement);

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

    controls.update();
    requestAnimationFrame( animate );

    render();
}

function render() {
    var delta = clock.getDelta();
    if ( satellyteModel !== undefined ) {
        satellyteModel.rotation.z += delta * 0.5;
    }

    renderer.render( scene, camera );
}
