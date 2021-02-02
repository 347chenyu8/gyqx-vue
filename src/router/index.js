import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: "/metting/check",
    component: () => import('../components/metting/checkMetting'),
    meta:{title: '读书会签到'},
  },
  {
    path: '/home',
    component: () => import( '../components/Home.vue'),
    meta:{title: '首页'},
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: () => import( '../components/Welcome.vue')
    },
      {
      path: '/users',
      component: () => import( '../components/user/Users.vue'),
      meta:{title: '用户管理'},
    }
    , {
      path: '/roles',
      component: () => import( '../components/role/Roles.vue'),
      meta:{title: '角色管理'},
    }
    , {
      path: '/menus',
      component: () => import( '../components/menu/Menus.vue'),
    }
    , {
      path: '/departments',
      component: () => import( '../components/department/Departments.vue'),
    }

    , {
      path: '/productCategorys',
      component: () => import( '../components/product/ProductCategorys.vue'),
    }

    , {
      path: '/suppliers',
      component: () => import( '../components/product/Suppliers.vue'),
    }
    , {
      path: '/products',
      component: () => import( '../components/product/Products.vue'),
    }
    , {
      path: '/inStocks',
      component: () => import( '../components/product/InStocks.vue'),
    }
    , {
      path: '/inStocks/addStocks',
      component: () => import( '../components/product/AddStocks.vue'),
    },
    {
      path: '/map',
      component: () => import( '../components/other/map.vue')
    },

    {
      path: '/swagger',
      component: () => import( '../components/other/Swagger.vue')
    },

    {
      path: '/druid',
      component: () => import( '../components/other/Druid.vue')
    },
    {
      path: '/loginLog',
      component: () => import( '../components/log/LoginLog.vue')
    },

    {
      path: '/notices',
      component: () => import( '../components/notice/Notices.vue')
    },
    {
      path: '/notices/add',
      component: () => import( '../components/notice/AddNotices.vue')
    },
    {
      path: '/logs',
      component: () => import( '../components/log/Logs.vue')
    },

    {
      path: '/consumers',
      component: () => import( '../components/product/Consumers.vue')
    },

    {
      path: '/stocks',
      component: () => import('../components/product/Stocks.vue')
    },
    {
      path: '/icons',
      component: () => import( '../components/other/Icons.vue')
    },
    {
      path: '/attachments',
      component: () => import( '../components/other/Attachments.vue')
    },
    {
      path: '/rumors',
      component: () => import( '../components/other/Rumors.vue')
    },
    {
      path: '/rumors/detail',
      component: () => import( '../components/other/RumorDetail.vue')
    },
    {
      path: '/health',
      component: () => import( '../components/user/Health.vue')
    },
    {
      path: '/blog',
      component: () => import( '../components/other/Blog.vue')
    },
    {
      path: '/qq',
      component: () => import( '../components/other/QQ.vue')
    },
    {
      path: '/outStocks',
      component: () => import( '../components/product/OutStocks.vue')
    },
    {
      path: '/OutStocks/publishStocks',
      component: () => import( '../components/product/PublishStocks.vue')
    },
    {
      path: "/401",
      component: () => import( '../components/401.vue')
    },
    {
      path: "/metting/metting",
      component: () => import( '../components/metting/metting.vue')
    },
    {
      path: "/metting/joinMetting",
      component: () => import( '../components/metting/joinMetting.vue')
    },
    {
      path: "/mettingGroup",
      component: () => import( '../components/metting/group.vue')
    },
    {
      path: "/metting/ramdon",
      component: () => import( '../components/metting/ramdon.vue')
    },
    {
      path: "/metting/zjbramdon",
      component: () => import( '../components/metting/zjbramdon.vue')
    },

    {
      path: "/metting/report",
      component: () => import( '../components/metting/report.vue')
    },
    {
      path: "/report/input",
      component: () => import( '../components/report/dataInput.vue')
    },
    {
      path: "/report/analyseData",
      component: () => import( '../components/report/analyseData.vue')
    },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

import store from '../store'//引入store

//路由导航守卫
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('JWT_TOKEN');
  if (to.path == '/login') {
    if(!token){
      return next();
    }else{
      return next({path: '/home'})
    }
  }
  if(to.path=='/401'){
    return next();
  }
  //读书会签到
  if(to.path=='/metting/check'){
    return next();
  }

  if(to.path=='/401'){
	  return next();
  }

  if (!token) {
    return next('/login');
  }else {
    //判断是否有访问该路径的权限
    const urls =store.state.userInfo.url;
    //如果是管理员
    if(store.state.userInfo.isAdmin){
       return next();
    }else{
      if(urls.indexOf(to.path) > -1){
        //则包含该元素
        window.sessionStorage.setItem("activePath", to.path);
        return next();
      }else{
        return next("/401");
      }
    }
  }
})

export default router
