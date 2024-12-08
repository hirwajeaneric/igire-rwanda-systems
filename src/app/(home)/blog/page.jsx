import DefaultBanner from "../components/DefaultBanner";
import BlogCard from "../components/BlogCard";
import FeaturedStoryCard from "../components/FeaturedStoryCard";
import { getBlogPageArticles } from "../_actions/blogActions";

export const metadata = {
  title: "Blog - Igire Rwanda Organization",
  description: "Stories, Updates and News about Igire Rwanda Organization. Through education, mentorship, and hands-on training programs, Igire Rwanda helps young women unlock their potential, fostering their confidence and capabilities to lead in their communities.",
  keywords: "News, Updates, Stories, Articles, Media Coverage, About Igire Rwanda Organization, Igire Rwanda Organization, AWE, Academy for Women Entrepreneurs, IRO, SheCanCODE Bootcamp, SheCanCODE, Igire Rwanda, Women Empowerment, Women Empowerment in Rwanda, Rwanda, Digital Literacy, Entrepreneurship, Gender Gaps, Gender Gap, Empowering young women",
  openGraph: {
    title: "Blog - Igire Rwanda Organization",
    description: "Stories, Updates and News about Igire Rwanda Organization. Through education, mentorship, and hands-on training programs, Igire Rwanda helps young women unlock their potential, fostering their confidence and capabilities to lead in their communities.",
    url: "https://www.igirerwanda.org",
    siteName: "Igire Rwanda Organization",
    images: [
      {
        url: "scc15.jpg",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Blog - Igire Rwanda Organization",
  "url": "https://www.igirerwanda.org",
  "description": "Stories, Updates and News about Igire Rwanda Organization. Through education, mentorship, and hands-on training programs, Igire Rwanda helps young women unlock their potential, fostering their confidence and capabilities to lead in their communities.",
  "image": "/scc15.jpg",
  "author": {
    "@type": "Organization",
    "name": "Igire Rwanda Organization",
    "url": "https://www.igirerwanda.org/",
    "image": "/scc15.jpg",
    "sameAs": [
      "https://www.youtube.com/channel/UCh-zTmgW9gWFl4Va__6AsjQ",
      "https://www.facebook.com/igirerwandaorganization",
      "https://www.instagram.com/shecancode_bootcamp",
      "https://twitter.com/ShecancodeRW"
    ]
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.igirerwanda.org/blog`
  }
}

export default async function page() {
  var featuredStory = undefined;
  var latestStories = [];
  var communityInitiatives = [];
  var testimonials = [];

  const response = await getBlogPageArticles();
  if (response.error) {
    console.log(response.error);
  } else {
    const data = JSON.parse(response);
    featuredStory = data.featuredStory;
    latestStories = data.latestStories;
    communityInitiatives = data.communityInitiatives;
    testimonials = data.testimonials;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <DefaultBanner title="Blog" backgroundImage={'/F1.jpg'} />

      {featuredStory && <section className="py-12 md:py-24 flex flex-col items-center justify-center">
        <div className="max-w-screen-xl px-4 mx-auto">
          <FeaturedStoryCard article={featuredStory} />
        </div>
      </section>}
      <section className="py-12 md:py-24 flex flex-col items-center w-full justify-center bg-orange-100">
        <div className="max-w-screen-xl px-4 mx-auto w-full">
          <h2 className="text-4xl font-semibold mb-8 md:mb-12 text-left w-full">Latest Stories</h2>
          {latestStories.length <= 0 && <p>No Stories Found</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {latestStories.length > 0 && latestStories.map((story, index) => <BlogCard key={index} article={story} />)}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 flex flex-col items-center w-full justify-center bg-white">
        <div className="max-w-screen-xl px-4 mx-auto w-full">
          <h2 className="text-4xl font-semibold mb-8 md:mb-12 text-left w-full">Community Innitiatives</h2>
          {communityInitiatives.length <= 0 && <p>No Stories Found</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {communityInitiatives.length > 0 && communityInitiatives.map((story, index) => <BlogCard key={index} article={story} />)}
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 flex flex-col items-center w-full justify-center bg-orange-100">
        <div className="max-w-screen-xl px-4 mx-auto w-full">
          <h2 className="text-4xl font-semibold mb-8 md:mb-12 text-left w-full">Partner and Learner Testimonials</h2>
          {testimonials.length <= 0 && <p>No Stories Found</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.length > 0 && testimonials.map((story, index) => <BlogCard key={index} article={story} />)}
          </div>
        </div>
      </section>
    </>
  )
}
