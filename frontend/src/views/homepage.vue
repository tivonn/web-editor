<template>
  <div>
    <p>homepage</p>
    <router-link :to="{ name: 'Edit', params: { sid: 1, pid: 1 } }">to edit</router-link>
  </div>
</template>

<script>
export default {
  name: 'Homepage'
}
</script>
