
<template>
    <div>
      <div class="card">你好，欢迎使用本系统</div>
    </div>
    <div>

    </div>
</template>

<script setup lang="ts">
  import  request  from "@/utils/request.js";

  request.get('/test/hello').then(res => {
    console.log(res)
  })
</script>