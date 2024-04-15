<template>
  <div>
    <div>
      <button @click="fetchData()">Fetch Data</button>
      <div v-if="!pending">'show load icon'</div>
      <div>{{ data }}</div>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
const { data, error, pending, refresh } = await useFetch(
  "http://localhost:8000/user"
);

const fetchData = () => {
  console.log(process.env);
  console.log("runing");
  refresh(); // This will re-fetch the data
};
</script>

<style lang="scss" scoped></style>
