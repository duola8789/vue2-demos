<template>
    <div>
        <h1>404 Not Found</h1>
        <h2>{{$route.params.pathMatch}}</h2>
    </div>

</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
