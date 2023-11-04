
const getRoleSpecificRoute = ( role ) => {
if (role === 'admin') {
    return "/admin/panel-administracion";
  } else if (role === 'funcionario') {
    return "/colaborador/check-in";
  } else {
    return "/departamentos";
  }
}

export default getRoleSpecificRoute;