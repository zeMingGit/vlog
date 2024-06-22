<main>
  <section class="boxes-container" ref="main">
    <h1>Use the button to toggle a Timeline</h1>
    <div>
      <button @click="toggleTimeline">Toggle Timeline</button>
    </div>
    <div class="box gradient-green">Box 1</div>
    <div class="box gradient-green">Box 2</div>
    <div class="box gradient-green">Box 3</div>
  </section>
</main>

<script setup>
import { onMounted, ref } from 'vue'
import gsap  from 'gsap'
    const main = ref()

onMounted(() => {
  // gasp_animation()
   ctx = gsap.context((self) => {
        const boxes = gsap.utils.toArray('.box');
        tl = gsap
          .timeline()
          .to(boxes[0], { x: 120, rotation: 360 })
          .to(boxes[1], { x: -120, rotation: -360 }, '<')
          .to(boxes[2], { y: -166 })
          .reverse();
      }, main.value); // <- Scope!
})

function toggleTimeline() {
      tl.reversed(!tl.reversed());
    }
let tl;
let ctx;

</script>

<style scoped lang="scss">
.box {
  width: 60px;
  height: 60px;
  background: linear-gradient( 114.41deg, #0ae448 20.74%, #abff84 65.5% );
}
</style>
