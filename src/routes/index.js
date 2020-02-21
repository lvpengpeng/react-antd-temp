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
  }, {
    pathname: '/admin/article',
    component: ArticleList
  }, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
  },{
    pathname: '/admin/settings',
    component: Settings
  }]