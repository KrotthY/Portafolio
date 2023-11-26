
export const PublicRoutes = {
  LOGIN : '/inicio-sesion',
  REGISTER : '/crear-cuenta',
  RECOVER_PASSWORD : '/recuperar-contrasena',

  CLIENTE_ROL : '/departamentos',

  LOGOUT: '/inicio-sesion',

  HOME: '/',
  HOME_ALL: '/*',

  DEPARTAMENTOS: 'departamentos',
  DEPARTAMENTOS_ID: 'departamentos/:id',

  TOURS: 'tours',
};


export const PrivateRoutes = {
  ADMIN_ALL:'admin/*',
  ADMIN_ROLE: '/admin/panel-administracion',
  PANEL_ADMIN: 'panel-administracion',
  SERVICIOS_TRANSPORTE: 'servicios-transporte',
  CONDUCTORES: 'conductores',
  SERVICIOS_TURISMO: 'servicio-turismo',
  INVENTARIO: 'inventario',
  AGENDAR_TURISMO: 'agendar-tour',
  PRODUCTOS: 'productos',
  SERVICIOS: 'servicios',
  USUARIOS: 'usuarios',
  REPORTES: 'reportes',
  PERFIL_ADMIN: 'perfil',
  
  COLLABORATOR_ROLE: '/colaborador/check-in',
  COLLABORATOR_ALL:'colaborador/*',

  COLLABORATOR_CHECK_IN: 'check-in',
  COLLABORATOR_CHECK_OUT: 'check-out',
  COLLABORATOR_PROFILE: 'perfil',
}

export const Role_user = {
  ADMIN: 'admin',
  COLLABORATOR: 'funcionario',
  CLIENTE: 'cliente',
}