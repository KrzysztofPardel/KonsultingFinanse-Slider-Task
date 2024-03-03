import { useState } from 'react';
import './SCSS/Sliders.scss';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface SliderProps {
	totalSlides: number;
}

export default function SliderTwo({ totalSlides }: SliderProps) {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [slideWidth, setSlideWidth] = useState<string>('10rem');
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: -1,
		loop: true,
		slides: {
			perView: 3,
			spacing: 15,
		},
		slideChanged(slider) {
			const centerIndex = Math.floor(totalSlides / 1);
			const relativeSlide = slider.track.details.rel + 1;
			const centerSlide = (relativeSlide + centerIndex) % totalSlides;
			setCurrentSlide(centerSlide);

			if (centerSlide === currentSlide) {
				setSlideWidth('35rem');
			} else {
				setSlideWidth('10rem');
			}
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<>
			<div className="container-keen_slider">
				<h1 className="keen-slider_title">Owl</h1>
				<div ref={sliderRef} className="keen-slider">
					{[...Array(totalSlides).keys()].map((index) => (
						<div
							key={index + 1}
							className={`keen-slider__slide number-slide ${
								currentSlide === index ? ' keen-slider__slide--center ' : ''
							}`}
							style={{ width: slideWidth }}
						>
							{index + 1}
						</div>
					))}
				</div>
			</div>
			{loaded && instanceRef.current && (
				<div className="dots">
					{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
						return (
							<button
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={'dot' + (currentSlide === idx ? ' active' : '')}
							></button>
						);
					})}
				</div>
			)}
		</>
	);
}
