import { createRouter, createWebHistory } from "vue-router";
import CategoriesView from "../views/CategoriesView.vue";
import CategoryDetailView from "../views/CategoryDetailView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import Dashboard from '../views/Dashboard.vue';
import ProfileView from "../views/ProfileView.vue";

const routes = [
  { path: "/", component: CategoriesView },
  { path: "/category/:id", component: CategoryDetailView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
  { path: "/dashboard", component: Dashboard },
  {path: "/profile",component: ProfileView}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
