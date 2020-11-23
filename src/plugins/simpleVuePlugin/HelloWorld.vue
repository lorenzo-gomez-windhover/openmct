<template>
<div class="example">
<div>Missed Major Frame Count: {{ framesCounter.value }}</div>
<div>Command Count: {{ commandCounter.value }}</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            framesCounter: '',
            commandCounter: ''
        	  };
    }
};
</script>

<style>
.example {
  color: red;
}
</style>
