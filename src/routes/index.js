import  {
    Login ,
    NotFound, 
    Dashboard ,
    Settings ,
    ArticleList, 
    ArticleEdit
} from '../views'

export const mainRoutes = [{
    pathname:"/login",
    component:Login
},
{
    pathname:"/404",
    component:NotFound
}]
export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title:"仪表盘",
    isNav:true,
    icon: 'dashboard',
  }, {
    pathname: '/admin/article',
    component: ArticleList,
    title:"文章列表",
    isNav:true,
    icon: 'unordered-list',
  }, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title:"文章编辑",
  },{
    pathname: '/admin/settings',
    component: Settings,
    title:"设置",
    isNav:true,
    icon: 'setting',
  }]