import * as THREE from 'three'
import Hyperbeam from "@hyperbeam/web"
import { useSpring, animated, config } from "@react-spring/three";

import React, { lazy, useEffect } from 'react'
import { useState, useRef, Suspense, useMemo } from 'react'
import { extend } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useThree, useFrame, useLoader, useUpdate } from '@react-three/fiber'
import ReactDOM from 'react-dom';
import { Material } from 'three'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import axios from 'axios'

const TvComponent = lazy(() => import("./TvModel"));
// import display from './assets/tv_screen.glb';
let hb;
export default function Browser(props) {
    const texture = new THREE.Texture();
    console.log("browser", props.url);
    const hbContainer = document.createElement('div');
    // const model = useLoader(GLTFLoader, display);
    // const copiedScene = useMemo(() => model.scene.clone(), [model])
    const meshobject = useRef()
    const monitor = useRef()
    const width = 5.6
    const height = 3.3
    const [active, setActive] = useState(false);
    const [geometry, setgeometry] = useState(new THREE.PlaneGeometry(width, height));
    const [material, setMaterial] = useState(new THREE.MeshBasicMaterial({ map: texture }));
    const title = React.createElement('div', { id: "hbContainer" }, '');
    const { viewport, gl, scene } = useThree();
    let room = ""
    let embedURL = props.url
    useFrame(() => {
    });
    useEffect(() => {
        material.side = THREE.DoubleSide;
        loadBrowser();
    }, []);

    const loadBrowser = (async () => {
        if (embedURL == null || embedURL == "none") return;
        // let flag = false;
        // if (props.bid == "1")
        //     flag = true;
        try {
            hb = await Hyperbeam(hbContainer, embedURL, {
                // delegateKeyboard: flag,
                frameCb: (frame) => {
                    if (texture.image === null) {
                        if (frame.constructor === HTMLVideoElement) {
                            frame.width = frame.videoWidth
                            frame.height = frame.videoHeight
                        }
                        texture.image = frame
                        texture.needsUpdate = true
                    } else {
                        gl.copyTextureToTexture(new THREE.Vector2(0, 0), new THREE.Texture(frame), texture)
                    }
                },
            })
            hb.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
                if (changeInfo.title) {
                    const tabs = await hb.tabs.query({ active: true });
                    console.log(props.bid, tabs[0].url);
                    //                    currentSite.innerText = tabs[0].url;
                }
            })


        }
        catch (err) {
            console.log(err.message);
        }
    })

    const handleMouseEvent = (e) => {
        let point = e.point;
        let eventtype;
        switch (e.type) {
            case "pointermove":
                eventtype = "mousemove";
                break;
            case "click":
                eventtype = "mousedown";
                break;
            case "pointerup":
                eventtype = "mouseup";
                break;
            case "contextmenu":
                eventtype = "contextmenu";
                break;
            default:
                eventtype = "";
                break;
        }
        meshobject.current.worldToLocal(point);
        if (hb) {
            hb.sendEvent({
                type: eventtype,
                x: point.x / width + 0.5,
                y: point.y / height + 0.5,
                button: e.button
            })
        }
    }
    useFrame(() => {
    })
    return (
        <animated.group {...props}
        >

            <mesh
                onClick={handleMouseEvent}
                onPointerMove={handleMouseEvent}
                onPointerUp={handleMouseEvent}
                onContextMenu={handleMouseEvent}
                ref={meshobject}
                geometry={geometry}
                material={material}
                visible
                userData={{ hello: 'world' }}
                position={new THREE.Vector3(0, 0, 0.13)}
                rotation={new THREE.Euler(0, Math.PI, Math.PI)}
            />
            {/* {
                <primitive ref={monitor} object={copiedScene} />
            } */}
            <TvComponent />
        </animated.group>

    )
}
function Monitor(props) {
    const { scene } = useLoader(GLTFLoader, display)
    const copiedScene = useMemo(() => scene.clone(), [scene])
    return (
        <primitive {...props} object={copiedScene} />
    );
}