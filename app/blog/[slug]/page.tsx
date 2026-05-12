import Image from "next/image";
import BreadCrumb from "@/src/components/misc/BreadCrumb";
import { fetchBlogBySlug } from "@/src/utils/blog-api";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) return notFound();

  return (
    <section className="halfSection py-0!">
      <div className="container max-w-4xl">
        <BreadCrumb customLabels={{ [slug]: blog.title }} />
        <div className="relative w-full h-96 mb-4 mt-4">
          <Image
            src={blog.url}
            alt={blog.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <p className="text-text-muted mb-2">{blog.date}</p>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        {/* Support both plain text (static) and HTML (API) content */}
        {blog.content.includes("<") ? (
          <article
            className="prose max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <article className="prose max-w-none mb-4">{blog.content}</article>
        )}
      </div>
    </section>
  );
};

export default page;
