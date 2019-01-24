<template>
  <div class="hello">
    <p>detail:{{row.self_work}}</p>
    <p>creat-time:{{row.creat_time}}</p>
    <p>edit_time:{{row.edit_time}}</p>
  </div>
</template>

<script>
    export default {
        props: {
            row: Object
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
