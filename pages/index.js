import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { sortByDate } from "../utils";

import Post from "../componets/Post";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>BlogG</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the post dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frotmatters from post
  const posts = files.map((fileName) => {
    // Create slug
    const slug = fileName.replace(".md", "");

    // Get formatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
