type GetPageContextsParams = {
    totalCount: number
    limit: number
  }
  
  export const getPagesContext = ({ totalCount, limit }: GetPageContextsParams) => {
    const totalPagesCount = Math.ceil(totalCount / limit)
  
    return new Array(totalPagesCount).fill('').map((_, i) => {
      const offset = limit * i
      const currentPageNum = ((offset + limit) / limit)
  
      return {
        limit, // 1ページに表示する件数
        offset, // 何番目のコンテンツから表示させるか
        totalCount, // コンテンツの総量
        currentPageNum, // 現在のページ番号
        totalPagesCount // ページの総量
      } as const
    })
  }
