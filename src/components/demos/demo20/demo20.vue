<template>
  <div>
    <h1>demo20 Mixins</h1>
    <Modal></Modal>
    <Tooltip></Tooltip>
  </div>
</template>

<script>
import Modal from '@/components/demos/demo20/Modal';
import Tooltip from '@/components/demos/demo20/Tooltip';

export default {
  data() {
    return {}
  },
  mounted() {
    console.log('outer mounted');
  },
  computed: {},
  methods: {},
  components: {
    Modal,
    Tooltip,
  }
}

</script>

<style scoped>
.inner-mixin {
  margin: 20px auto;
  font-size: 18px;
}
</style>
