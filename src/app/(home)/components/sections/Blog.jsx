import Link from "next/link"
import Image from "next/image"
import { FaArrowRight } from "react-icons/fa";
import { getOnlyPublishedArticlesForBlog } from "../../_actions/blogActions";

export default async function BlogPage() {
  const response = await getOnlyPublishedArticlesForBlog(true, 3);
  const data = JSON.parse(response);
  const articles = data.articles;

  return (
    <div className="mx-auto w-full font-ibm px-4 py-12 md:py-24">
      <div className="max-w-screen-xl w-full mx-auto">
        <div className="text-4xl font-extrabold text-center pb-14">Featured stories</div>
        {articles.length === 0 && <div className="text-center text-gray-500">No articles found.</div>}
        <div className="w-full grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.length > 0 && articles.map((article, index) => (
            <div key={index} className="bg-orange-50 rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden ">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={500}
                  height={500}
                  className="object-cover group-hover:scale-105 w-full transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  {article.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {article.description}
                </p>
                <Link href={'/blog/' + article.slug} className="bg-green-800 text-white border-2 border-green-800 hover:bg-transparent hover:text-green-800 font-bold text-lg px-3 py-1 flex items-center w-fit">
                  Read More
                  <FaArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}