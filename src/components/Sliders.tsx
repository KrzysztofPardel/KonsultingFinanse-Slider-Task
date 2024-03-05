import { Suspense, lazy } from 'react';
import DefaultError from './Loading.tsx';
import { CarouselContext } from 'pure-react-carousel'; // Import CarouselContext
import { CarouselStoreInterface } from 'pure-react-carousel';
//Lazy loading
const SliderOneLazy = lazy(() => import('./SliderOne.tsx'));
const SliderTwoLazy = lazy(() => import('./SliderTwo.tsx'));

const Sliders = () => {
	return (
		<>
			<Suspense fallback={<DefaultError />}>
				<CarouselContext.Consumer>
					{(carouselContext: CarouselStoreInterface) => <SliderOneLazy carouselContext={carouselContext} />}
				</CarouselContext.Consumer>
				<SliderTwoLazy totalSlides={10} />
			</Suspense>
		</>
	);
};

export default Sliders;
