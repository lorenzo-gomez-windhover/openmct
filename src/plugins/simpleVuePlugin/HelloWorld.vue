<template>
<div class="example">
<div>timestamp: {{ tlm.timestamp }}</div>
<div>{{ tlm.id}}: {{ tlm.value }}</div>
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
