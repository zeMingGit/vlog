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
      { icon: 'github', link: 'https://github.com/zeMingGit' },
    ]
  },
  {
    avatar: 'https://foruda.gitee.com/avatar/1677169054941917823/9249306_invictuspm_1658799010.png!avatar200',
    name: 'PanMin',
    title: '贡献者',
    links: [
      { icon: 'github', link: 'https://github.com/pm0915' },
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