---
editLink: false
lastUpdated: false
---
<main>
  <h1>文档发展历程</h1>
  <section class="boxes-container" ref="main">
    <div class="timeline">
    <div class="stage" v-for="stage in stages" :key="stage.id" :data-stage="stage.id">
      <h2>{{ stage.title }}</h2>
      <p>{{ stage.description }}</p>
    </div>
  </div>
  </section>
</main>

<script setup>
import { onMounted, ref } from 'vue'
import gsap  from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

onMounted(() => {
 gsap.registerPlugin(ScrollTrigger);

      const stageElements = document.querySelectorAll('.stage');

      stageElements.forEach(stage => {
        gsap.fromTo(stage,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: stage,
              start: 'top 80%',
              end: 'top 30%',
              scrub: true,
              markers: false
            }
          }
        );
      });
})

const stages = ref([
  { id: 1, title: '初步规划', description: '确定动画的目标、类型和所需资源。' },
  { id: 2, title: '动画设计', description: '设计动画的具体效果和实现方式。' },
  { id: 3, title: '动画实现', description: '使用GSAP实现设计好的动画效果。' },
  { id: 4, title: '测试与反馈', description: '确保动画在所有目标设备和浏览器上正常运行。' },
  { id: 5, title: '部署与维护', description: '将动画效果发布到生产环境，并进行后续维护。' }
])

</script>

<style scoped lang="scss">
.box {
  width: 60px;
  height: 60px;
  background: linear-gradient( 114.41deg, #0ae448 20.74%, #abff84 65.5% );
}

.timeline {
  width: 80%;
  margin: 50px auto;
  position: relative;
  padding: 20px;
}

.stage {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(50px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s, transform 0.3s;
}

.stage h2 {
  margin-top: 0;
  color: #2c3e50;
}

.stage p {
  color: #7f8c8d;
}

.stage::before {
  content: attr(data-stage);
  position: absolute;
  left: -30px;
  top: 20px;
  background-color: #3498db;
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}
</style>
