<template>
<div class="example">
<div>id: {{ tlm.id }}</div>
<div>timestamp: {{ tlm.timestamp }}</div>
<div>value: {{ tlm.value }}</div>
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
