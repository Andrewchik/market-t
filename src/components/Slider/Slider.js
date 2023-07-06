

            import React, {useEffect, useState} from 'react';
            import './Slider.scss';
            import ArrowLeft from "../../resources/svg/arrow-left";
            import ArrowRight from "../../resources/svg/arrow-right";

            const Slider = ({listedItems}) => {
                const [currentIndex, setCurrentIndex] = useState(0);
                const [images, setImages] = useState([])


                useEffect(() => {
                    let imgs = []
                    listedItems.forEach((item) => {
                        const imgUrl = item?.data?.img?.startsWith('Qm')
                            ? `https://atomichub-ipfs.com/ipfs/${item?.data?.img}`
                            : item?.data?.img;

                        console.log(imgUrl)

                        imgs.push(imgUrl);
                    });
                    setImages(imgs)
                }, [listedItems])

                const handlePrev = () => {
                    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
                };

                const handleNext = () => {
                    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
                };

                const handleSlideClick = (index) => {
                    setCurrentIndex(index);
                };

                return (
                    <div className="slider">
                        <div className="main-slide">
                            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                        </div>
                        <div className="small-slides">
                            {currentIndex > 0 && (
                                <button className="prev-small" onClick={handlePrev}>
                                  <ArrowLeft />
                                </button>
                            )}
                            <div className="slides">
                                <div
                                    className="slide-wrapper"
                                    style={{
                                        transform: `translateX(-${currentIndex * (59 + 5)}px)`,
                                        transition: 'transform 0.3s ease',
                                    }}
                                >
                                    { images.length > 1 && images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`slide ${currentIndex === index ? 'active' : ''}`}
                                            onClick={() => handleSlideClick(index)}
                                        >
                                            <img src={image} alt={`Slide ${index + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {currentIndex < images.length - 1 && (
                                <button className="next-small" onClick={handleNext}>
                                    <ArrowRight />
                                </button>
                            )}
                        </div>
                    </div>
                );
            };

            export default Slider;

