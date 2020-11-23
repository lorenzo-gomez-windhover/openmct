<template>
<div class="example">
<div>Missed Major Frame Count: {{ framesCounter.v }}</div>
<div>Command Count: {{ commandCounter.value }}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            tlm: ''
        	  };
    }
};
</script>

<style>
.example {
  color: red;
}
</style>
