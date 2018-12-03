<template>
  <div>
    <h1 draggable='true' id='dragSource'>可拖拽DIV</h1>
    <div class='drag-zone' id='dragZone'></div>
  </div>
</template>

<script>

export default {
  name: 'demo27',
  props: [],
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    const h1 = document.querySelector('#dragSource');
    const dragZone = document.querySelector('#dragZone');

    h1.addEventListener('dragstart', (e) => {
      console.log('dragstart');
      e.dataTransfer.setData('Text', e.target.id);
    });
    h1.addEventListener('dragend', () => {
      console.log('dragend')
    });
    h1.addEventListener('drag', () => {
      console.log('drag')
    });
    dragZone.addEventListener('dragenter', (e) => {
      console.log('dragenter');
    });
    dragZone.addEventListener('dragleave', (e) => {
      console.log('dragleave');
    });
    dragZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      console.log('dragover');
    });
    dragZone.addEventListener('drop', (e) => {
      const data = e.dataTransfer.getData('Text');
      e.target.appendChild(document.getElementById(data));
      e.preventDefault();
    });

  },
  methods: {},
  computed: {}
}
</script>
<style scoped>
.drag-zone {
  width: 700px;
  height: 200px;
  margin: 20px auto;
  border: 1px solid rosybrown;
  text-align: center;
}
</style>
