import { createSSRApp } from 'vue'
import App from './App.vue'
import { createSSRRouter } from './router'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { createSSRI18n } from './language/i18n'
import { createSSRStore, key } from './store'
import { sync } from 'vuex-router-sync'

export function createApp() {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()
  // TODO: 这一步的作用
  sync(store, router)
  app.config.globalProperties.$message = ElMessage
  app.use(store, key)
  app.use(router)
  app.use(ElementPlus)
  app.use(i18n)
  return { app, router, store }
}

// TODO: asyncDataFilter的作用
export function asyncDataFilter(actived: any, store: any, route: any) {
  return Promise.all(actived.map((Component: any) => {
    if (Component.asyncData) {
      return Component.asyncData({
        store,
        route
      })
    }
  }))
}
