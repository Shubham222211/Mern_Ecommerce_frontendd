import { useState, useEffect } from "react";
import '../SlideShow.css'

const images = [
    'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220916170947/Packaging.png',

    'https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-2862.jpg',

    'https://marketing.link/wp-content/uploads/marketing-advertising-9.png',

    'https://cdn.corporatefinanceinstitute.com/assets/product-mix3.jpeg',

    'https://www.joelenton.com/wp-content/uploads/2020/05/Adidas-Shower-Gel-Splash-advertising-image.jpg.webp'
];

function SlideShow() {
    const [imgIndex, setImgInd] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImgInd((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000)

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const nextImg = () => {
        setImgInd((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImg = () => {
        setImgInd((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <><div >
            <img className="image"
                src={images[imgIndex]}
                alt={`Image ${imgIndex + 1}`}
                style={{ width: "600px", height: "300px" }}
            />

            <div>
                <button onClick={prevImg}>Previous</button>
                <button onClick={nextImg}>Next</button>
            </div>
            </div>
            
        </>
    );
}

export default SlideShow;
