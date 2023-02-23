import { GatsbyNode } from 'gatsby'
import path from 'path'
import { getPagesContext } from './src/utils/page'

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
        allMicrocmsBlog(limit: 10) {
        edges {
          node {
            blogId
          }
          next {
            blogId
            title
          }
          previous {
            blogId
            title
          }
        }
        totalCount
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const { allMicrocmsBlog: {totalCount, edges} } = result.data!

  edges.forEach((edge) => {
    createPage({
      // 生成したいページのpathを記載します。
      path: `/blog/${edge.node.blogId}/`,
      // ページの土台となるコンポーネントのパスを記述します。
      component: path.resolve('src/templates/blog.tsx'),
      // コンポーネントの`pageContext`という引数情報に渡すデータを格納します。
      // pageContextに渡した値は、templateのGraphQL内で変数として利用できます。
      context: {
        id: edge.node.blogId,
        next: edge.next,
        previous: edge.previous
      }
    })
  })

  const pagesContext = getPagesContext({
    totalCount,
    limit: 10 // 1ページあたり10コンテンツを表示させる
  })

  pagesContext.forEach((context) => {
    const component = path.resolve('src/templates/blogs.tsx')

    if (context.currentPageNum === 1) {
      createPage({
        path: `/blogs/`,
        component,
        context
      })
      return
    }

    createPage({
      path: `/blogs/page/${context.currentPageNum}/`,
      component,
      context
    })
  })
}
