import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ item }: any) => {
  return (
    <Link href={`/blog/${item.slug}`} className="h-full block">
      <div className="relative rounded-xl bg-bg-light flex flex-col p-5 pb-12 cursor-pointer h-full">
        <div className="relative w-full h-52 mb-4">
          <Image
            src={item.url}
            alt="image"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col grow">
          <p className="text-end mb-2 text-text-muted text-xs">{item.date}</p>

          <h4 className="text-center mb-2 font-semibold text-lg line-clamp-1">
            {item.title}
          </h4>

          <p className="text-center text-sm line-clamp-3">{item.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
