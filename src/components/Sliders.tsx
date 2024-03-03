import { Suspense, lazy } from 'react';
import DefaultError from './Loading.tsx';
//Lazy loading
const SliderOneLazy = lazy(() => import('./SliderOne.tsx'));
const SliderTwoLazy = lazy(() => import('./SliderTwo.tsx'));

const Sliders = () => {
	return (
		<>
			<Suspense fallback={<DefaultError />}>
				<SliderOneLazy />
				<SliderTwoLazy totalSlides={10} />
			</Suspense>
		</>
	);
};

export default Sliders;
