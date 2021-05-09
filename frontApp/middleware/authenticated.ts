export default function ({route, $axios, redirect}: any) {
  if (route.path !== '/login' && route.path !== '/user/add') {
    $axios.$get('/user')
      .catch(() => {
        return redirect('/login')
      })
  }
}
