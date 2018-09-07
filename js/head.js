/**
 * @author Frederick Glass
 * @author Robert Bue
 */

var head = function() {

    if (!Modernizr.webgl) alert("Browser does not support WebGL.");

    var camera, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var p;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 300;
    scene = new THREE.Scene();

    var manager = new THREE.LoadingManager();
    manager.onProgress = function () {
        p = new THREE.Points(
            p_geom,
            p_material
        );
        scene.add(p);
    };
    
    var p_geom = new THREE.Geometry();
    var p_material = new THREE.PointsMaterial({
        color: 0xabbbcc,
        size: 1.5
    });

    var loader = new THREE.OBJLoader(manager);
    loader.load("res/head.obj", function (object) {

        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                var geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                var scale = 8;

                $(geometry.vertices).each(function() {
                    p_geom.vertices.push(new THREE.Vector3(this.x * scale, this.y * scale, this.z * scale));
                });
            }

        });
    });

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    var head = $(".head");
    head.append(renderer.domElement);
    head.on("mousemove", onDocumentMouseMove);
    window.addEventListener("resize", onWindowResize, false);

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }

    var animate = function() {
        ticker = TweenMax.ticker;
        ticker.addEventListener("tick", animate);
        render();
    };

    function render() {
        camera.position.x -= ((mouseX * .5) + camera.position.x) * .05;
        camera.position.y -= (-(mouseY * .5) + camera.position.y) * .05;

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    render();
    animate();
    onWindowResize();
};

head();