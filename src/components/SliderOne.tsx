import { useState, useEffect } from 'react';
import './SCSS/Sliders.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { FaStar } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoArrowForwardOutline } from 'react-icons/io5';

import wheels from '../assets/wheels.jpg';
import carAudio from '../assets/carAudio.jpg';
import parts from '../assets/parts.jpg';
import engine from '../assets/engine.jpg';
import repairman from '../assets/repairman.jpg';
import rear from '../assets/rear.jpg';
import turboEngine from '../assets/turboEngine.jpg';
import wheels2 from '../assets/wheels2.jpg';
import front from '../assets/front.jpg';

const SLIDE_ITEMS = [
	{ index: 0, src: wheels, alt: wheels, description: 'WULKANIZACJA OPON I FELG ' },
	{ index: 1, src: carAudio, alt: carAudio, description: 'CAR AUDIO' },
	{ index: 2, src: parts, alt: parts, description: 'REGENERACJA CZĘŚCI' },
	{ index: 3, src: engine, alt: engine, description: 'MECHANIKA POJAZDOWA' },
	{ index: 4, src: repairman, alt: repairman, description: 'SERWIS BENZYNOWY I GAZOWY' },
	{ index: 5, src: rear, alt: rear, description: 'KONSERWACJA ZABYTKÓW' },
	{ index: 6, src: turboEngine, alt: turboEngine, description: 'IMPORT CZĘŚCI' },
	{ index: 7, src: front, alt: front, description: 'WYMIANA CZĘŚCI' },
	{ index: 8, src: wheels2, alt: wheels2, description: 'TUNNING' },
];

const SliderOne = () => {
	const [isLargeView, setIsLargeView] = useState(window.innerWidth >= 1024);
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleSlideVisible = (slideIndex: number) => {
		setCurrentSlide(slideIndex);
	};
	const handleResize = () => {
		setIsLargeView(window.innerWidth >= 1024);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="hero-container">
			<div className="container-text">
				<div className="text-titles">
					<h1 className="text-title">Serwis i naprawa</h1>
					<h1 className="text-title">Twojego auta</h1>
				</div>
				<p className="text-description">
					Mamy w swojej bazie <span className="description-span">84 114 warsztatów</span> ocenianych średnio na{''}
					<span className="description-span">
						<FaStar className="description-star" />
						4.0
					</span>
				</p>
			</div>
			<div className="container-slider">
				{!isLargeView && ( // Render CarouselProvider for smaller views
					<CarouselProvider
						naturalSlideWidth={100}
						naturalSlideHeight={125}
						className="container-carousel"
						totalSlides={SLIDE_ITEMS.length}
						visibleSlides={1}
						step={1}
					>
						<Slider className="carousel-slider">
							{SLIDE_ITEMS.map(({ index, src, alt, description }) => (
								<Slide className="carousel-slide" index={index} key={index}>
									<div className="slide-container">
										<div className="slide-topContainer">
											<img src={src} alt={alt} className="slide-img" />
										</div>
										<div className="slide-bottomContainer">
											<h3 className="slide-title">{description}</h3>
										</div>
									</div>
								</Slide>
							))}
						</Slider>
						<div className="slider-controls">
							<ButtonBack className="btn">
								<IoArrowBackOutline className="btn-icon" />
							</ButtonBack>
							<ButtonNext className="btn">
								<IoArrowForwardOutline className="btn-icon" />
							</ButtonNext>
						</div>
					</CarouselProvider>
				)}
				{isLargeView && ( // Render CarouselProvider for large view
					<CarouselProvider
						naturalSlideWidth={100}
						naturalSlideHeight={125}
						className="container-carousel"
						totalSlides={SLIDE_ITEMS.length}
						visibleSlides={4}
						step={1}
						isIntrinsicHeight={true}
						currentSlide={currentSlide}
						// onSlideComplete={(currentIndex) => setCurrentSlide(currentIndex)}
					>
						<Slider className="carousel-slider">
							{SLIDE_ITEMS.map(({ index, src, alt, description }) => (
								<Slide className="carousel-slide" index={index} key={index}>
									<div className="slide-container">
										<div className="slide-topContainer">
											<img src={src} alt={alt} className="slide-img" />
										</div>
										<div className="slide-bottomContainer">
											<h3 className="slide-title">{description}</h3>
										</div>
									</div>
								</Slide>
							))}
						</Slider>
						<div className="slider-controls">
							<ButtonBack className="btn">
								<IoArrowBackOutline className="btn-icon" />
							</ButtonBack>
							<ButtonNext className="btn">
								<IoArrowForwardOutline className="btn-icon" />
							</ButtonNext>
						</div>
					</CarouselProvider>
				)}
			</div>
		</div>
	);
};

export default SliderOne;
