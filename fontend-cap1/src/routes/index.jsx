import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Sidebar from "../components/Layout/DefaultLayout/Sidebar/Sidebar";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Update from "../components/Update/Update";
import Statistic from "../components/Statistic/Statistic";
import noti from "../components/Noti/noti";
import App from "../components/Chart/App";
import Forum from "../components/Forum/Forum";
// import Sidebar from "../components/Sidebar/Sidebar";
const publicRoutes = [
  { path: "/", component: Login },
  { path: "/home", component: Sidebar },
  { path: "/header", component: Header },
  { path: "/sidebar", component: Sidebar },
  { path: "/layout", component: DefaultLayout },
  { path: "/update", component: Update, layout: null },
  { path: "/statistic", component: Statistic },
  { path: "/noti", component: noti },
  { path: "/chart", component: App },
  { path: "/forum", component: Forum },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
