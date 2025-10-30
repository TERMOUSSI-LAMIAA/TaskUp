import { createRouter, createWebHistory } from "vue-router"
import CategoriesView from '../views/CategoriesView.vue'
import TasksView from '../views/TasksView.vue'
import CategoryDetailView from '../views/CategoryDetailView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'



const routes = [
  { path: "/", component: CategoriesView   },
  { path: "/task/:id", component: TasksView  },
  { path: "/category/:id", component: CategoryDetailView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/:pathMatch(.*)*",component: NotFoundView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 