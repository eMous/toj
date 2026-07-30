<script setup>
import { ref } from "vue";
const tab = ref("task");
const tabItems= ref([
  { text: "Task Overview", value: "task", icon: "task", route: "/task" },
  { text: "Review Homework", value: "dashboard", icon: "dashboard", route: "/task/dashboard" },
  { text: "Assign Homework", value: "create", icon: "create", route: "/task/create" },
  { text: "Task Settings", value: "setting", icon: "settings", route: "/task/setting" },
]);
</script>
<template>
  <div class="task">
    <v-row justify="start">
      <v-tabs v-model="tab" color="secondary" direction="vertical">
          <v-tab
            v-for="{ text, value, icon, route } in tabItems"
            :key="value"
            :value="value"
            :text="text"
            :to="route">
            <template v-slot:prepend>
              <v-icon :icon="icon"></v-icon>
            </template>
          </v-tab>
        </v-tabs>
    
    <v-tabs-window v-model="tab">
          <router-view v-slot="{ Component }">
            <div v-if="Component">
              <component :is="Component" />
            </div>
          </router-view>
    </v-tabs-window>
  </v-row>
  </div>
</template>



<style lang="scss" scoped>
.task {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 78px;
  padding-left: 4px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}  
</style>
