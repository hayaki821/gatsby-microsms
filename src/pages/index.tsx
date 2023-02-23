import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';
import { formatDate } from '../utils/date';

export default function IndexPage({ data }: PageProps<Queries.IndexPageQuery>) {
  const { allMicrocmsBlog } = data;
  return (
    <main>
      <h1>TOPページ</h1>
      <p>このページはGatsbyで作成されています。</p>
      <h2>最新記事</h2>
      <ul>
        {allMicrocmsBlog.edges.map((node) => (
          <li key={node.node.title}>
            <Link to={`/blogs/${node.node.title}/`}>
              {node.node.title}【公開日：{formatDate(node.node.body!)}】
            </Link>
          </li>
        ))}
      </ul>
      <Link to='/blogs/'>もっとみる</Link>
    </main>
  );
}

export const query = graphql`
  query IndexPage {
    allMicrocmsBlog(limit: 3) {
      edges {
        node {
          title
          body
        }
      }
    }
  }
`;
