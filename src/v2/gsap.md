---
layout: home
editLink: false
lastUpdated: false
---
<main>
  <Timeline :timelineData="timelineData" mode="center" lineStyle="dashed">
    <!-- <template #dot="{ index }">
    </template> -->
  </Timeline>
</main>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Timeline } from 'vue-amazing-ui'
import { fetchReleaseTagArray } from '../../.vitepress/script/fetchReleaseTag.ts'
// import gsap  from 'gsap'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

onMounted(() => {
  initView()
})

let timelineData = ref([
  {
    desc: '初始化 2023-12-07',
    color: 'green'
  },
  {
    desc: '正式开始建档 2023-12-08',
    color: 'green'
  },
  // {
  //   desc: 'Technical testing 2023-05-24',
  //   color: 'blue', 'green', 'gray'
  // },
])
const initView = async() => {
  const res = await fetchReleaseTagArray()
  const resMap = res.reverse().map(li => {
    return {
      desc: `${li.body} ${li.created_at.split('T')[0]}`,
      color: 'green'
    }
  })
  timelineData.value.push(...resMap)
}
</script>

<style scoped lang="scss">
.box {
  width: 60px;
  height: 60px;
  background: linear-gradient( 114.41deg, #0ae448 20.74%, #abff84 65.5% );
}

:deep(.m-spin-content) {
  width: 100%;
}
:deep(.m-timeline-item) {
  padding-bottom: 66px !important;
}
</style>
