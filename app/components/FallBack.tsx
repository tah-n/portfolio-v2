import { Html } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';


gsap.registerPlugin(MotionPathPlugin,useGSAP);

const FallBack = () => {
    const duration = 3;
    const circlesRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement | null>(null);

    const timeOut = () => (
        setTimeout(() => {
            const pathElement = pathRef.current;
            const pathData = pathElement?.getAttribute('d');
        if(pathElement && pathData) {
                gsap.to('.circles', {
                    duration: duration,
                    opacity: 0.8,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    stagger: 0.4,
                    motionPath: {
                        path: pathData,
                        align: pathElement,
                        alignOrigin: [0.5, 0.5],
                        }
                    });
        }
            
        }, 100)
    )

    useEffect(() => {
        timeOut();

        return () => clearTimeout(timeOut());
    }, []);


    return (
        <Html className="absolute top-0 left-0">
            <div className="w-full h-full">
                <div ref={containerRef} className="relative w-full h-full">
                    {/* SVG Path Component */}
                    <svg
                        className="absolute top-0"
                        width={10}
                        height={10}
                        viewBox="0 0 675 660"
                        fill="transparent"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        className="path"
                        ref={pathRef}
                        d="M337.5 659C523.322 659 674 511.723 674 330C674 148.277 523.322 1 337.5 1C151.678 1 1 148.277 1 330C1 511.723 151.678 659 337.5 659Z"
                        stroke="white"
                        strokeOpacity={0.5}
                        strokeWidth={2}
                        fill="transparent"
                        />
                    </svg>
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            ref={(el) => { if (el && !circlesRef.current.includes(el)) circlesRef.current[i] = el; }}
                            className="circles border opacity-0 z-10 absolute top-0 left-0 border-white rounded-full w-44 h-44"
                        />
                    ))} 
                     <em className="text-white/60 absolute -top-2 -left-[40px]">Loading...</em>
                </div>
            </div>
        </Html>
    );
};

export default FallBack;