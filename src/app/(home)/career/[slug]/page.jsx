import Image from "next/image";
import { getJobPostBySlug } from "../../_actions/blogActions";
import parse from "html-react-parser";
import Link from "next/link";
import { Facebook, Linkedin, Mail, X } from "lucide-react";
import BlogCard from "../../components/BlogCard";

// Dynamic metadata generation function
export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        const fetchedBlog = await getJobPostBySlug(slug);
        const articleData = typeof fetchedBlog === 'string' 
            ? JSON.parse(fetchedBlog) 
            : fetchedBlog;

        if (!articleData || !articleData.article) {
            return {
                title: "Article Not Found - Igire Rwanda Organization",
                description: "The requested article could not be found.",
            };
        }

        const article = articleData.article;

        return {
            title: `${article.title} - Igire Rwanda Organization`,
            description: article.description || "Igire Rwanda Organization Blog",
            keywords: article.tags?.join(", ") || "Igire Rwanda, Blog, Article",
            openGraph: {
                title: article.title,
                description: article.description || "Igire Rwanda Organization Blog",
                url: `https://www.igirerwanda.org/blog/${slug}`,
                siteName: "Igire Rwanda Organization",
                images: article.image ? [{
                    url: article.image,
                    width: 800,
                    height: 600,
                }] : [],
                locale: "en-US",
                type: "article",
            },
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Error - Igire Rwanda Organization",
            description: "An error occurred while loading the article.",
        };
    }
}

const Page = async ({ params }) => {
    const { slug } = params;

    // Parse the result from the server action
    let articleData = null;
    try {
        const fetchedBlog = await getArticleBySlug(slug);

        // Check if fetchedBlog is a string (JSON) or has an error
        if (typeof fetchedBlog === 'string') {
            articleData = JSON.parse(fetchedBlog);
        } else if (fetchedBlog && 'error' in fetchedBlog) {
            throw new Error(fetchedBlog.error);
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        return (
            <div className="w-full text-center py-20">
                <h1 className="text-2xl font-bold">Error Loading Article</h1>
                <p>Unable to retrieve the requested article.</p>
            </div>
        );
    }

    // If no article found
    if (!articleData || !articleData.article) {
        return (
            <div className="w-full text-center py-20">
                <h1 className="text-2xl font-bold">Article Not Found</h1>
                <p>The article you are looking for does not exist.</p>
            </div>
        );
    }

    const { article } = articleData;

    // Dynamic JSON-LD generation
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.description,
        "author": {
            "@type": "Person",
            "name": article.author?.name || "Igire Rwanda Organization"
        },
        "datePublished": article.createdAt,
        "image": article.image,
        "publisher": {
            "@type": "Organization",
            "name": "Igire Rwanda Organization",
            "url": "https://www.igirerwanda.org/",
            "logo": {
                "@type": "ImageObject",
                "url": "/Igire_Rwanda_Logo.png"
            },
            "sameAs": [
                "https://www.youtube.com/channel/UCh-zTmgW9gWFl4Va__6AsjQ",
                "https://www.facebook.com/igirerwandaorganization",
                "https://www.instagram.com/shecancode_bootcamp",
                "https://twitter.com/ShecancodeRW"
            ]
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.igirerwanda.org/career/${slug}`
        }
    };

    return (
        <>
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ 
                    __html: JSON.stringify(jsonLd) 
                }} 
            />
            
            {/* Rest of the component remains the same */}
            <section className="w-full flex flex-col bg-orange-100">
                <div className="w-full flex flex-col justify-center items-start mx-auto max-w-screen-xl py-12 md:py-12 mt-20 md:mt-36 px-5 gap-10">
                    <h1 className="text-3xl md:text-5xl text-center w-full flex font-semibold">{article.title}</h1>

                    <Image
                        src={article.image}
                        alt={article.title}
                        width={1000}
                        height={1000}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <p>{article.description}</p>
                        <span className="justify-self-end">
                            By {article.author?.name || 'Igire Rwanda Organization'}
                        </span>
                    </div>

                    <div className="w-full flex justify-between flex-wrap gap-5 md:gap-0 items-center text-black">
                        <time className="text-xl">
                            {new Date(article.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </time>

                        <ul className="flex gap-5">
                            <li>
                                <Link
                                    className="hover:text-orange-400"
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                    target="_blank"
                                >
                                    <Facebook size={28} />
                                </Link>
                            </li>
                            <span className="border-l-2 border-black" />
                            <li>
                                <Link
                                    className="hover:text-orange-400"
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                >
                                    <X size={28} />
                                </Link>
                            </li>
                            <span className="border-l-2 border-black" />
                            <li>
                                <Link
                                    className="hover:text-orange-400"
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(article.title)}`}
                                    target="_blank"
                                >
                                    <Linkedin size={28} />
                                </Link>
                            </li>
                            <span className="border-l-2 border-black" />
                            <li>
                                <Link
                                    className="hover:text-orange-400"
                                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Check out this article: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                                >
                                    <Mail size={28} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="max-w-screen-xl mx-auto py-12 px-4">
                <article id="description" className="blog-data w-full max-w-screen-md mx-auto">
                    {parse(article.content)}
                </article>
            </section>
        </>
    );
};

export default Page;