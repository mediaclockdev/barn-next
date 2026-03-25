import { blogData } from "@/src/data/Data";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const blog = blogData.find((item) => item.slug === slug);

  if (!blog) return;

  return (
    <section className="halfSection py-4!">
      <div className="container max-w-4xl">
        <p className="text-text-muted mb-2">{blog.date}</p>

        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

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
