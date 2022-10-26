import React, { useRef, useEffect, useState } from "react";
import { extend, useThree, useFrame } from '@react-three/fiber';

import { useSpring, animated, config } from "@react-spring/three";

import * as THREE from 'three';
import { Vector3 } from "three";
import { Browser } from '.'
const vecArray = [new THREE.Vector3(0, 0, -1)
    , new THREE.Vector3(-1, 0, 0)
    , new THREE.Vector3(0, 0, 1)
    , new THREE.Vector3(1, 0, 0)
    , new THREE.Vector3(0, 1, 0)
    , new THREE.Vector3(0, -1, 0)
];
// const data = [[], [[0, 1], [4, 1], [5, 1], [2, 1], [5, 1], [1, 2], [3, 0]],
// [],
// [[0, 3], [5, 3], [2, 3], [4, 3], [3, 2], [1, 0]],
// [[0, 4], [3, 4], [2, 4], [1, 4], [4, 2], [3, 0]],
// [[0, 5], [1, 5], [2, 5], [3, 5], [5, 2], [4, 0]]
const ne = [2, 3, 0, 1, 5, 4];
const crossArray = [
    [-1, 4, -1, 5, 3, 1],
    [5, -1, 4, -1, 0, 2],
    [-1, 5, -1, 4, 1, 3],
    [4, -1, 5, -1, 2, 0],
    [1, 2, 3, 0, -1, -1],
    [3, 0, 1, 2, -1, -1]];
const angleArray = [new THREE.Euler(0, 0, 0),
new THREE.Euler(0, 0, 0)
    , new THREE.Euler(0, Math.PI / 2, 0)
    , new THREE.Euler(0, Math.PI, 0)
    , new THREE.Euler(0, -Math.PI / 2, 0)
    , new THREE.Euler(Math.PI / 2, 0, 0)
    , new THREE.Euler(-Math.PI / 2, 0, 0)];
var posVec = 0, newposVec;
var angVec = 5, newangVec;
var fromVec, toVec;
var dvec = new THREE.Vector3(0, 0, -1);

let x = 0;
export default function CameraPosition({ urlData }) {
    const { camera } = useThree();
    console.log('cameraposition', urlData[0]);
    // const [animate, setAnimate] = useState(false);
    var animate = false;
    const getLeft = (x, y) => {
        console.log(x, y, crossArray[x][y]);
        return [crossArray[x][y], y];
    }
    const getRight = (x, y) => {
        let [x1, y1] = getLeft(x, y);
        return [ne[x1], y1];
    }
    const getEuler = (a, b) => {
        var myVector = a.clone();
        var targetVector = b.clone();
        myVector.normalize();
        targetVector.normalize();
        // Create a quaternion, and apply starting, then ending vectors
        var quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(myVector, targetVector);

        // Quaternion now has rotation data within it. 
        // We'll need to get it out with a THREE.Euler()
        var euler = new THREE.Euler();
        euler.setFromQuaternion(quaternion);

        return euler;
    }
    // useEffect(() => {
    //     console.log('dispatch Event');
    //     animate = true;
    // }, [browserState])
    const init = async (type) => {
        console.log('init caled');
        if (type === 1) {
            [newposVec, newangVec] = getLeft(posVec, angVec);
            fromVec = vecArray[posVec].clone();
            toVec = vecArray[newposVec].clone();
            // await dispatch(setBrowserState((browserState + 1) % 4));
        }
        if (type === 2) {
            [newposVec, newangVec] = getRight(posVec, angVec);
            fromVec = vecArray[posVec].clone();
            toVec = vecArray[newposVec].clone();
            // dispatch(setBrowserState((browserState + 3) % 4));
        }
        animate = true;
    }
    useFrame(() => {
        camera.position.set(0, 0, 0);
        if (animate === true) {
            fromVec.lerp(toVec, 0.1);
            let euler = getEuler(fromVec, dvec);
            camera.rotation.set(euler._x, euler._y, euler._z);

            if (fromVec.distanceTo(toVec) < 0.01) {
                posVec = newposVec;
                angVec = newangVec;
                let euler = getEuler(toVec, dvec);
                camera.rotation.set(euler._x, euler._y, euler._z);

                animate = false;
            }
        }

    });

    window.addEventListener('keydown', async (e) => {
        console.log(e.key);
        if (animate === true) {
            e.preventDefault();
        }

        if (animate === false) {

            if (e.shiftKey && e.key == 'ArrowLeft') {

                init(2);

            }
            if (e.shiftKey && e.key == 'ArrowRight') {
                init(1);

            }
        }
    });
    useEffect(() => {

    }, []);
    return (
        <>
            <Browser bid={1} url={urlData[0]} position={new THREE.Vector3(0, 0, -5)} rotation={new THREE.Euler(0, 0, 0)} />
            <Browser bid={2} url={urlData[1]} position={new THREE.Vector3(-5, 0, 0)} rotation={new THREE.Euler(0, Math.PI / 2, 0)} />

            <Browser bid={3} url={urlData[2]} position={new THREE.Vector3(0, 0, 5)} rotation={new THREE.Euler(0, Math.PI, 0)} />
            <Browser bid={4} url={urlData[3]} position={new THREE.Vector3(5, 0, 0)} rotation={new THREE.Euler(0, -Math.PI / 2, 0)} />


        </>
    )
}


