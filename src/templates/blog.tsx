import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';

type PageContext = {
  next: {
    blogId: string;
    title: string;
  } | null;
  previous: {
    blogId: string;
    title: string;
  } | null;
};

export default function BlogPage({
  data,
  pageContext: { next, previous },
  location,
}: PageProps<Queries.BlogPageQuery, PageContext>) {
  const { microcmsBlog } = data;
  console.log(microcmsBlog);
  return (
    <main>
      <h1>{microcmsBlog?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: microcmsBlog?.body ?? '' }} />
      <ul>
        {next && (
          <li>
            次へ：
            <Link to={`/blogs/${next.blogId}/`}>{next.title}</Link>
          </li>
        )}
        {previous && (
          <li>
            前へ：
            <Link to={`/blogs/${previous.blogId}/`}>{previous.title}</Link>
          </li>
        )}
      </ul>
    </main>
  );
}

export const query = graphql`
  query BlogPage($id: String!) {
    microcmsBlog(blogId: { eq: $id }) {
      blogId
      title
      body
    }
  }
`;
