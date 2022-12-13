import Header from "../components/Header/Header";
import Login from "../components/Login/Login";
import Sidebar from "../components/Layout/DefaultLayout/Sidebar/Sidebar";
import DefaultLayout from "../components/Layout/DefaultLayout";
import Update from "../components/Update/Update";
import Statistic from "../components/Statistic/Statistic";
import noti from "../components/Noti/noti";
import App from "../components/Chart/App";
import Forum from "../components/Forum/Forum";
import Personnal from "../components/Personal/Personnal";
import Dashboard from "../components/Dashboard/Dashboard";
import NavBar from "../components/NavBar/NavBar";
import Grade from "../components/Grade/Grade";
import Student from "../components/Layout/DefaultLayout/Student/Student";

import Checkpoint from "../components/Checkpoint/Checkpoint";

import Schedule from "../components/Schedule/Schedule";
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
    { path: "/personal", component: Personnal },
    { path: "/dashboard", component: Dashboard },
    { path: "/navbar", component: NavBar },
    { path: "/grade", component: Grade },
    { path: "/student/:id", component: Student },
    { path: "/checkpoint", component: Checkpoint },
    { path: "/schedule", component: Schedule },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
