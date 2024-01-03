// 搜索功能
const search = {
  // 指定使用本地搜索提供商。
  provider: 'local',
  options: {
    locales: {
      // root是默认的本地化文本选项
      root: {
        // 指定根目录下的本地化文本。
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              searchByText: '搜索提供者'
            },
            startScreen: {
              recentSearchesTitle: '搜索历史',
              noRecentSearchesText: '没有搜索历史',
              saveRecentSearchButtonTitle: '保存至搜索历史',
              removeRecentSearchButtonTitle: '从搜索历史中移除',
              favoriteSearchesTitle: '收藏',
              removeFavoriteSearchButtonTitle: '从收藏中移除'
            }
          }
        }
      }
    }
  }
}

const searchAlgolia = {
  provider: 'algolia',
  options: {
    appId: 'R0JRESJRK0',
    apiKey: '96e84e24f9682766082d30a2f8294461',
    indexName: 'vlog'
  }
}

export default searchAlgolia
