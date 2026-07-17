import Image, { StaticImageData } from 'next/image';
import React from 'react'

interface PropsType {
    imageSource: StaticImageData;
    description: string;
}

function ImageContainer({ imageSource, description }: PropsType) {

    return (
        <div className='image-container'>
            <Image src={imageSource.src} alt="photo1" loading="eager" width={500}
                height={300} style={{ width: "auto", height: "auto" }} />
            <p className="date text-blue-500">{description}</p>
        </div>
    )
}

export default ImageContainer

