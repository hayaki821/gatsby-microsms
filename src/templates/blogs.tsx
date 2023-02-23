import { graphql, PageProps, navigate, Link } from 'gatsby';
import React from 'react';
import { formatDate } from '../utils/date';

type PageContext = {
  limit: number;
  offset: number;
  totalCount: number;
  currentPageNum: number;
  totalPagesCount: number;
};

export default function BlogsPage({
  data,
  pageContext: { limit, offset, totalCount, currentPageNum, totalPagesCount },
  location,
}: PageProps<Queries.BlogsPageQuery, PageContext>) {
  const { allMicrocmsBlog } = data;
  return (
    <main>
      <h1>ブログ一覧</h1>
      <p>
        {totalCount} 件中 {offset + 1} 件目から {limit} 件表示
      </p>
      <ul>
        {allMicrocmsBlog.nodes.map((node) => (
          <li key={node.blogId}>
            <Link to={`/blogs/${node.blogId}/`}>
              {node.title}【公開日：{formatDate(node?.blogId!)}】
            </Link>
          </li>
        ))}
      </ul>

      <select
        onChange={(e) => {
          navigate(
            e.target.value === '1'
              ? '/blogs/'
              : `/blogs/page/${e.target.value}/`
          );
        }}
      >
        {new Array(totalPagesCount).fill('').map((_, i) => {
          const pageNum = i + 1;
          return (
            <option
              value={pageNum}
              key={i}
              selected={pageNum === currentPageNum}
            >
              {pageNum} ページ目
            </option>
          );
        })}
      </select>
    </main>
  );
}

export const query = graphql`
  query BlogsPage($limit: Int!, $offset: Int!) {
    allMicrocmsBlog(
      limit: $limit
      skip: $offset
      sort: { order: DESC, fields: publishedAt }
    ) {
      nodes {
        blogId
        title
        body
      }
    }
  }
`;
