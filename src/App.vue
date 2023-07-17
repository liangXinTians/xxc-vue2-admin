<template>
  <div id="app">
    <div class="env_tag" v-if="ENV !== 'production'">{{ ENV }}</div>
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      isRouterAlive: true
    };
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  computed: {
    ENV() {
      return process.env.VUE_APP_ENV;
    }
  },
  watch: {
    $route(to, from) {
      // 判断展示router-view 还是 #container
      this.isLoading = false;
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>
<style lang="scss">
body {
  background-color: #f6f6f6 !important;
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: "微软雅黑", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  .env_tag {
    position: absolute;
    z-index: 901;
    top: 0;
    right: 0;
    padding: 0 6px;
    background-color: red;
    border-radius: 0 0 0 4px;
    color: #fff;
    font-size: 12px;
  }
}

.navbar {
  padding-left: 15px;
}

.tags-view-container .tags-view-wrapper .tags-view-item.active {
  background-color: rgb(64, 158, 255) !important;
  border-color: rgb(64, 158, 255) !important;
  border-radius: 3px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1890ff;
  color: #fff;
}
</style>
