---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://foruda.gitee.com/avatar/1695001043495360137/8741248_zeminga_1695001043.png',
    name: 'zeMing',
    title: '文档作者',
    links: [
      { icon: 'github', link: 'https://github.com/2439340964' },
    ]
  },
  {
    avatar: 'https://foruda.gitee.com/avatar/1702023507003711393/10948272_zhangchufan_1702023506.png!avatar200',
    name: 'ChufanOvO',
    title: '参与者',
    links: [
      { icon: 'github', link: 'https://gitee.com/zhangchufan' },
    ]
  },
  // {
  //   avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp515054775.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1704609760&t=9c3a61380b73d35002790f0fb4efb9fe',
  //   name: ' 空缺',
  //   title: '欢迎加入',
  //   links: [
  //     { icon: 'github', link: '' },
  //   ]
  // },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      团队核心成员
    </template>
    <template #lead>
      提供有价值的资源和支持
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>