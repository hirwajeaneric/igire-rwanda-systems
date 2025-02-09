// components/WhatWeDo.jsx
import { getWhatWeDoData, paragraphData } from '@/fakeDatas/whatweDoData';
import Slideshow from '../Slideshow';
import Slideshow2 from '../Slideshow2';
import Link from 'next/link';
const slideshowComponents = {
  Slideshow,
  Slideshow2,
};
export default function WhatWeDo() {
  const whatWeDoData = getWhatWeDoData(); 
  return (
    <section className="py-12 md:py-24 font-ibm bg-orange-200 px-4">
      <div className="flex flex-col justify-center items-center mb-14">
        <h2 className="text-4xl text-black font-semibold">Our Programs</h2>
      </div>
      {whatWeDoData.map((section, index) => {
        const SlideshowComponent = slideshowComponents[section.slideshowComponent];
        return (
          <div key={index} className="md:max-w-screen-xl bg-white mx-auto rounded-lg shadow-lg p-8 md:p-14 md:flex md:space-x-8 mt-8">
            <div className="flex flex-col md:flex-1 gap-10">
              <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
              <p className="text-lg text-black">{section.description}</p>
              <Link href={`/programs/#${section.slug}`} className="px-6 py-3 w-fit bg-green-800 text-white hover:bg-green-500 font-bold">
                {section.buttonLabel}
              </Link>
            </div>
            <div className="md:flex-1 mt-6 md:mt-0">
              <SlideshowComponent /> 
            </div>
          </div>
        );
      })}
    </section>
  );
}