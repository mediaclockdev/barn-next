import { blogData } from "@/src/data/Data";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  console.log("slug ", slug);

  const blog = blogData.find((item) => item.slug === slug);

  console.log(blog);

  if (!blog) return;

  return (
    <section className="halfSection">
      <div className="container max-w-4xl">
        <p className="text-text-muted mb-4">{blog.date}</p>

        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

        <div className="relative w-full h-96 mb-6">
          <Image
            src={blog.url}
            alt={blog.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <article className="prose max-w-none">{blog.content}</article>
      </div>
    </section>
  );
};

export default page;
