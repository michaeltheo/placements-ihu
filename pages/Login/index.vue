<script setup lang="ts">
import { onMounted } from "vue";

const redirectUri = "http://localhost:3000/auth"; // Replace with your redirect URI

onMounted(() => {
  window.location.href = `https://login.iee.ihu.gr/authorization/?client_id=${
    useRuntimeConfig().public.CLIENT_ID
  }&response_type=code&scope=profile&redirect_uri=${redirectUri}`;
});
</script>
