
const getRoleSpecificRoute = ( role ) => {
if (role === 'admin') {
    return "/admin/panel-administracion";
  } else if (role === 'funcionario') {
    return "/admin/servicios";
  } else {
    return "/departamentos";
  }
}

export default getRoleSpecificRoute;