'use client'
import React, { useRef } from 'react'
import "../styles/scroll-horizontal.css";
import One from '@/public/744657735_2449638908862477_3520232296819307297_n.jpg';
import Two from '@/public/745621991_28183378918023659_7689868071902929136_n.jpg';
import Three from '@/public/747723307_1585445749963260_4212395155748312337_n.jpg';
import Four from '@/public/background_vert.png';
import Five from '@/public/Classe.jpg'


import ImageContainer from './imageContainer';

export interface PicsListProps {
    pics: Array<Text>;
}
// h-taille flex grid-cols-2 bg-white place-content-center
function ScrollHorizontal() {
    const pictureBG = [One, Two, Three, Four];
    console.log('picture :', pictureBG);

    const description = "June 2024";

    // console.log(pictureBG)

    return (
        <div className="carousel">
            {/* <p className="text-gray-700">Horizontal scroll</p> */}
            <div className="contentContainer">
                <div className="images">
                    <div className="imageItem">
                        {pictureBG.length === 0 ? (
                            
                             <p>Aucun photo trouvé</p>
                         ) : (
                             pictureBG.map((pic, index) => (
                                 <ImageContainer key={index} imageSource={pic} description={description} />
                             ))
                         )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScrollHorizontal

// 
