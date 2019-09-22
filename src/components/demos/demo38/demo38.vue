<template>
  <div>
    <h1>demo38 -- Vue Router Children</h1>
    <!--    <button @click="goThere(1)">Go To 38-1</button>-->
    <!--    <button @click="goThere(1)">Go To 38-2</button>-->
    <div class="router-link-container">
      <button class='router-link'
              v-for="id in ids"
              :key="id"
              @click="goThere(id)">Go To 38-1 - {{id}}
      </button>
      <button class='router-link' @click="goThere()">Go To 38-2</button>
    </div>
    <div class="router-link-container">
      <router-link class='router-link-2'
                   v-for="id in ids"
                   :key="id"
                   :to="'/demo38/demo38-1/' + id">Go To 38-1 - {{id}}
      </router-link>
      <router-link class='router-link' to="/demo38/demo38-2">Go To 38-2</router-link>
    </div>
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo38',
  props: [],
  data() {
    return {
      ids: [1, 2, 3, 4, 5],
    }
  },
  methods: {
    goThere(index) {
      if (!index) {
        this.$router.push({name: '382'});
        return;
      }
      this.$router.push({name: '381', params: {id: index}});
    }
  },
}
</script>

<style scoped>
  h2 {
    margin: 20px 0
  }
  .router-link-2 {
    margin: 20px;
  }
  .router-link {
    margin: 10px;
    cursor: pointer;
    transition: all 0.1s linear;
  }
  .router-link:hover {
    background: darkcyan;
  }
  .router-link-container {
    margin: 10px 0;
  }
  .router-container {
    width: 50%;
    margin: 0 auto;
    padding: 20px 0;
    text-align: center;
    border: 1px solid firebrick;
  }
</style>
