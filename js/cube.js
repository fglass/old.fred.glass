var scene, renderer, camera;
var cubes = [];

init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.01, 1000);

    camera.position.x = 4;
    camera.position.y = 3;
    camera.position.z = 5;
    camera.lookAt(scene.position);

    const rows = 3; // 3x3
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < rows; y++) {
            for (var z = 0; z < rows; z++) {

                var faces = [
                    new THREE.MeshPhongMaterial({ color: 0xff5800 }), // Orange
                    new THREE.MeshPhongMaterial({ color: 0xb71234 }), // Red
                    new THREE.MeshPhongMaterial({ color: 0xffffff }), // White
                    new THREE.MeshPhongMaterial({ color: 0xffd500 }), // Yellow
                    new THREE.MeshPhongMaterial({ color: 0x0046ad }), // Blue
                    new THREE.MeshPhongMaterial({ color: 0x009b48 }), // Green
                ];

                var geometry = new THREE.BoxGeometry(1, 1, 1);
                var cube = new THREE.Mesh(geometry, shuffle(faces));

                cube.position.set(x-1, y-1, z-1);
                scene.add(cube);
                cubes.push(cube);

                var geoEdge = new THREE.EdgesGeometry(geometry); // TODO rename
                var matEdge = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2.5 });
                var edges = new THREE.LineSegments(geoEdge , matEdge);
                cube.add(edges);
            }
        }
    }

    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(3, 5, 5);
    spotlight.castShadow = true;
    spotlight.intensity = 2;
    scene.add(spotlight);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x272b2f));
    document.body.appendChild(renderer.domElement);

}

// Fisher-Yates shuffle implementation
function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener("click", function(event) {
    /*var faces = mesh.material; // TODO

    for (var i = 0; i < faces.length; i++) {
        faces[i].color.setHex(0xb71234);
        mesh.geometry.colorsNeedUpdate = true;
    }
    for (var i=2; i<cubes.length; i+=3) {
        cubes[i].rotation.x += 0.1;
        cubes[i].rotation.y += 0.1;
    }*/
});