import React, { useRef, useState } from 'react';
import './SCSS/Sliders.scss';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface SliderProps {
	totalSlides: number;
}

export default function App({ totalSlides }: SliderProps) {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
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
		},
		created() {
			setLoaded(true);
		},
	});

	return (
		<>
			<div className="navigation-wrapper">
				<div ref={sliderRef} className="keen-slider">
					{[...Array(totalSlides).keys()].map((index) => (
						<div
							key={index + 1}
							className={`keen-slider__slide number-slide ${
								currentSlide === index ? ' keen-slider__slide--center' : ''
							}`}
						>
							{index + 1}
						</div>
					))}
				</div>
				{loaded && instanceRef.current && (
					<>
						<Arrow
							left
							onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
							disabled={currentSlide === 0}
						/>

						<Arrow
							onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
							disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
						/>
					</>
				)}
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

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
	const disabled = props.disabled ? ' arrow--disabled' : '';
	return (
		<svg
			onClick={props.onClick}
			className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled}`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			{props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
			{!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
		</svg>
	);
}
