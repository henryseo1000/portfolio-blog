
import { useEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import { Fragment } from "react/jsx-runtime"
import { useFrame } from "@react-three/fiber";
import { Group, Object3DEventMap } from "three";


function Dots() {
    const [dots, setDots] = useState([]);
    const myMesh = useRef<Group<Object3DEventMap>>();
    const [x, setX] = useState<number>(Math.PI / 2);
    const [y, setY] = useState<number>(0);
    const [z, setZ] = useState<number>(0.47);

    const genDots = (numberOfDots: number) => {
        const colorArr = ["#FF7575", "#436CFF", "#FFFF9F", "#A8FFCB", '#FFFFFF'];
        const arr = [];

        for(let i = 0; i < numberOfDots; i++) {
            const randomX = Math.floor(Math.random() * 200 - 100);
            const randomY = Math.floor(Math.random() * 200 - 100);
            const randomZ = Math.floor(Math.random() * 200 - 100);

            arr.push( (key : number) => {
                return(
                    <mesh scale={0.3} position={[randomX, randomY, randomZ]} key={key}>
                        <sphereGeometry args={[1, 8, 8]}/>
                        <meshStandardMaterial color={colorArr[i % 5]}/>
                    </mesh>
                )}
            )
        }

        return arr;
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (e.clientX < window.innerWidth / 2) {
            setX(Math.PI / 2 + (e.clientX - window.innerWidth / 2) / 1500);
        }
        else {
            setX(Math.PI / 2 - (e.clientX - window.innerWidth / 2) / 1500)
        }
    }

    const handleScroll = (e: MouseEvent) => {
        window
    }

    useFrame(({ clock }) => {
        if (myMesh.current) {
            myMesh.current.rotation.z = clock.elapsedTime * 0.3
        }
    })

    useEffect(() => {
        setDots(genDots(350))
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    
    return (
        <Fragment>
            <a.group
                ref={myMesh}
                position={[0, 0, 0]}
                rotation={[x, y, z]}
            >
                {
                    dots.map((item, key) => {
                        return item(key);
                    })
                }
            </a.group>
            
        </Fragment>
    )
}

export default Dots