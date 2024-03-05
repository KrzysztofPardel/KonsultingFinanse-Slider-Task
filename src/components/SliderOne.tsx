import { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { CarouselStoreInterface } from 'pure-react-carousel';
import './SCSS/Sliders.scss';
import { FaStar } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { IoArrowForwardOutline } from 'react-icons/io5';
import wheel from '../assets/wheel.jpg';
import carAudio from '../assets/carAudio.jpg';
import parts from '../assets/parts.jpg';
import engine from '../assets/engine.jpg';
import repairman from '../assets/repairman.jpg';
import rear from '../assets/rear.jpg';
import turboEngine from '../assets/turboEngine.jpg';
import wheels2 from '../assets/wheels2.jpg';
import carBody from '../assets/carBody.jpg';

interface SliderOneProps {
	carouselContext: CarouselStoreInterface | undefined;
}
//Array of objects to map through- an imitation of a database
const SLIDE_ITEMS = [
	{ index: 0, src: carBody, alt: carBody, description: 'BLACHARSTWO I LAKIERNICTWO' },
	{ index: 1, src: wheel, alt: wheel, description: 'WULKANIZACJA OPON I FELG ' },
	{ index: 2, src: carAudio, alt: carAudio, description: 'CAR AUDIO' },
	{ index: 3, src: parts, alt: parts, description: 'REGENERACJA CZĘŚCI' },
	{ index: 4, src: engine, alt: engine, description: 'MECHANIKA POJAZDOWA' },
	{ index: 5, src: repairman, alt: repairman, description: 'SERWIS BENZYNOWY I GAZOWY' },
	{ index: 6, src: rear, alt: rear, description: 'KONSERWACJA ZABYTKÓW' },
	{ index: 7, src: turboEngine, alt: turboEngine, description: 'IMPORT CZĘŚCI' },
	{ index: 8, src: wheels2, alt: wheels2, description: 'TUNNING' },
];

const SliderOne: React.FC<SliderOneProps> = ({ carouselContext }) => {
	const [isLargeView, setIsLargeView] = useState(window.innerWidth >= 1024);
	const [currentSlide, setCurrentSlide] = useState<number>(0);

	//Resizing the window changes how many slides are visible
	const handleResize = () => {
		setIsLargeView(window.innerWidth >= 1024);
	};
	//Adjusting the window view when the component mounts
	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (carouselContext && carouselContext.state) {
			// Ensure carouselContext and its state property exist
			const currentSlide = carouselContext?.state?.currentSlide ?? 0;
			console.log('Current slide:', currentSlide);
		}
	}, [carouselContext]);

	const checkVisibleSlides = () => {
		if (carouselContext && carouselContext.state) {
			const visibleSlidesIndexes = Array.from(
				Array(carouselContext.state.visibleSlides),
				(_, i) => carouselContext.state.currentSlide + i
			);
			console.log('Visible slides indexes:', visibleSlidesIndexes);
		}
	};

	// const handleSlideChange = (newSlideIndex: number) => {
	// 	if (carouselContext?.state?.currentSlide !== undefined) {
	// 		const totalSlides = SLIDE_ITEMS.length;
	// 		if (newSlideIndex >= 0 && newSlideIndex < totalSlides) {
	// 			console.log('Slide changed to:', newSlideIndex);
	// 		}
	// 		console.log(setCurrentSlide(carouselContext?.state?.currentSlide));
	// 	}
	// };

	// const checkSlide = () => {
	// 	if (carouselContext?.state?.currentSlide !== undefined) {
	// 		const index = setCurrentSlide(carouselContext?.state?.currentSlide);
	// 		console.log(index);
	// 	}
	// };

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
				<CarouselProvider
					naturalSlideWidth={100}
					naturalSlideHeight={100}
					className="carousel-provider"
					totalSlides={SLIDE_ITEMS.length}
					visibleSlides={isLargeView ? 4 : 1}
					currentSlide={currentSlide}
					step={1}
					isIntrinsicHeight={true}
				>
					<Slider className="carousel-slider">
						{SLIDE_ITEMS.map(({ index, src, alt, description }) => (
							<Slide className="carousel-slide" index={index} key={index}>
								<div className="slide-topContainer">
									<img
										src={src}
										alt={alt}
										className="slide-img"
										style={{ borderTopLeftRadius: '25px', borderTopRightRadius: '25px' }}
									/>
								</div>
								<div
									className="slide-bottomContainer"
									style={{ borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px' }}
								>
									<h3 className="slide-title">{description}</h3>
								</div>
							</Slide>
						))}
					</Slider>
					<div className="slider-controls">
						<ButtonBack className="btn">
							<IoArrowBackOutline
								className="btn-icon"
								onClick={checkVisibleSlides}
								// onClick={() => handleSlideChange((carouselContext?.state?.currentSlide ?? 0) - 1)}
							/>
						</ButtonBack>

						<ButtonNext
							className="btn"
							onClick={checkVisibleSlides}

							// onClick={() => handleSlideChange((carouselContext?.state?.currentSlide ?? 0) + 1)}
						>
							<IoArrowForwardOutline className="btn-icon" />
						</ButtonNext>
					</div>
				</CarouselProvider>
			</div>
		</div>
	);
};

export default SliderOne;
