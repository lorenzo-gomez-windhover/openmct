<template>
<div class="example">id: {{ tlm.id }}</div>
<div class="example">timestamp: {{ tlm.timestamp }}</div>
<div class="example">value: {{ tlm.value }}</div>
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
