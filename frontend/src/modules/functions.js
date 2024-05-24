import { cameraPosition, cm, contents, destinationPoint, getMenuOpen, getTabClosed, getTouched, getWatchedDistanceX, getWatchedDistanceZ, meshes, mouse, sections, setTabClosed, setTouched, setWatchedDistanceX, setWatchedDistanceZ, spots, } from './common';
import { player } from '../main';
import gsap from 'gsap';
/**
 * @param renderer
 * Resize (depends on browser size)
 */
var setViewportHeight = function () {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
};
var setSize = function (renderer) {
    cm.camera.left = -(window.innerWidth / window.innerHeight);
    cm.camera.right = window.innerWidth / window.innerHeight;
    cm.camera.top = 1;
    cm.camera.bottom = -1;
    cm.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(cm.scene, cm.camera);
};
/**
 * @param e
 * Update Coodinates
 */
var updateCoordinates = function (e) {
    if (cm.canvas instanceof HTMLCanvasElement) {
        mouse.x = (e.clientX / cm.canvas.clientWidth) * 2 - 1;
        mouse.y = -((e.clientY / cm.canvas.clientHeight) * 2 - 1);
    }
};
/**
 * Raycasting
 */
var raycasting = function () {
    cm.raycaster.setFromCamera(mouse, cm.camera);
    var intersects = cm.raycaster.intersectObjects(meshes);
    for (var _i = 0, intersects_1 = intersects; _i < intersects_1.length; _i++) {
        var item = intersects_1[_i];
        if (item.object.name === 'floor') {
            destinationPoint.x = item.point.x;
            destinationPoint.y = 0.7;
            destinationPoint.z = item.point.z;
            if (!getTouched() && !getMenuOpen()) {
                player.mesh.lookAt(destinationPoint);
                player.moving = true;
            }
        }
        break;
    }
};
//Actions
/**
 * Moving
 */
var isMoving = function (delta) {
    var speedX;
    var speedZ;
    var walkDistanceX = destinationPoint.x - player.mesh.position.x;
    var walkDistanceZ = destinationPoint.z - player.mesh.position.z;
    var angle = Math.atan2(walkDistanceZ, walkDistanceX);
    var cameraX = cameraPosition.x + player.mesh.position.x;
    var cameraZ = cameraPosition.z + player.mesh.position.z;
    if (delta < 0.012) {
        speedX = Math.cos(angle) * 0.05;
        speedZ = Math.sin(angle) * 0.05;
    }
    else {
        speedX = Math.cos(angle) * 0.13;
        speedZ = Math.sin(angle) * 0.13;
    }
    player.mesh.position.x += speedX;
    player.mesh.position.z += speedZ;
    cm.camera.position.set(cameraX, cm.camera.position.y, cameraZ);
    player.actions[0].stop();
    player.actions[1].play();
    if (Math.abs(walkDistanceX) < 0.05 && Math.abs(walkDistanceZ) < 0.05) {
        player.moving = false;
    }
    detectObject();
};
/**
 * Detecting Object
 */
var detectObject = function () {
    spots.forEach(function (item) {
        var spotDistanceX = item.mesh.position.x - player.mesh.position.x;
        var spotDistanceZ = item.mesh.position.z - player.mesh.position.z;
        var resetDistanceX = getWatchedDistanceX() - player.mesh.position.x;
        var resetDistanceZ = getWatchedDistanceZ() - player.mesh.position.z;
        var spotObject = item.spotObject.mesh;
        if (getTabClosed()) {
            if (Math.abs(resetDistanceX) > 0.5 && Math.abs(resetDistanceZ) > 0.5)
                setTabClosed(false);
            return;
        }
        if (Math.abs(spotDistanceX) < 0.5 && Math.abs(spotDistanceZ) < 0.5) {
            player.moving = false;
            setTouched(true);
            gsap.to(cm.camera.position, {
                duration: 1,
                x: spotObject.position.x,
                y: spotObject.position.y,
                z: spotObject.position.z,
            });
            player.mesh.lookAt(spotObject.position.x, player.mesh.position.y, spotObject.position.z);
            setWatchedDistanceX(item.mesh.position.x);
            setWatchedDistanceZ(item.mesh.position.z);
            var sectionNumber_1 = parseInt(item.name);
            sections[sectionNumber_1].style.display = 'block';
            if (!item.touchdown) {
                item.touchdown = true;
                firstTouchDown(spotObject, sectionNumber_1);
            }
            else {
                setTimeout(function () {
                    showComponent(sectionNumber_1);
                }, 1000);
            }
        }
    });
};
/**
 * @param spotObject
 * @param name
 * First touchdown on spot + object
 */
var firstTouchDown = function (spotObject, sectionNumber) {
    setTimeout(function () {
        spotObject.visible = true;
        gsap.to(spotObject.position, {
            duration: 1,
            y: -spotObject.position.y,
            ease: 'Bounce.easeOut',
            onComplete: function () {
                showComponent(sectionNumber);
            },
        });
    }, 1000);
};
/**
 * @param name
 * Show components (HTML sections)
 */
var showComponent = function (sectionNumber) {
    sections[sectionNumber].classList.add('show');
    setTimeout(function () {
        contents[sectionNumber].classList.add('show-content');
    }, 300);
};
/**
 * @param item
 * @param sectionNumber
 * Close components (HTML sectoins)
 */
var closeComponent = function (sectionNumber) {
    setTabClosed(true);
    gsap.to(cm.camera.position, {
        duration: 1,
        x: cameraPosition.x + player.mesh.position.x,
        y: cameraPosition.y,
        z: cameraPosition.z + player.mesh.position.z,
    });
    player.mesh.lookAt(player.mesh.position.x, player.mesh.position.y, player.mesh.position.z);
    contents[sectionNumber].classList.remove('show-content');
    sections[sectionNumber].classList.remove('show');
    setTimeout(function () {
        sections[sectionNumber].scrollTop = 0;
        sections[sectionNumber].style.display = 'none';
        setTouched(false);
    }, 1000);
};
export { setViewportHeight, setSize, updateCoordinates, raycasting, isMoving, closeComponent };
