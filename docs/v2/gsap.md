---
editLink: false
lastUpdated: false
---
<main>
  <Spin :spinning="spinning" indicator="dynamic-circle">
    <Timeline :timeline-data="timelineData" mode="center" lineStyle="dashed">
      <template #dot="{ index }">
        <!-- <span class="big-dot" v-if="index===2"></span> -->
        <!-- <div v-if="index===3">
          <svg focusable="false" class="u-icon" data-icon="clock-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path></svg>
        </div> -->
      </template>
    </Timeline>
  </Spin>
</main>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Timeline, Spin } from 'vue-amazing-ui'
import { fetchReleaseTagArray } from '../.vitepress/script/fetchReleaseTag.ts'
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
let spinning = ref(false)
const initView = async() => {
  spinning.value = true
  const res = await fetchReleaseTagArray()
  const resMap = res.reverse().map(li => {
    return {
      desc: `${li.body} ${li.created_at.split('T')[0]}`,
      color: 'green'
    }
  })
  timelineData.value.push(...resMap)
  spinning.value = false
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
