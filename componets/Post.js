import Link from "next/link";

export default function Post({ post }) {
  const { cover_image, date, title, excerpt } = post.frontmatter;

  return (
    <div className="card">
      <img src={cover_image} alt="" />
      <div className="post-date">Posted on {date}</div>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <Link href={`/blogs/${post.slug}`}>
        <a className="btn">Read more</a>
      </Link>
    </div>
  );
}