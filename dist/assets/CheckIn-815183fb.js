import{P as i,j as e,r as s,a as c}from"./index-ac7ba3d6.js";const j=({onClose:r,showModal:n})=>e.jsxs(s.Dialog,{open:n,animate:{mount:{scale:1,y:0},unmount:{scale:.9,y:-100}},"aria-labelledby":"modalRegistro",size:"lg",className:"max-w-full max-h-screen py-2  overflow-scroll",children:[e.jsxs(s.DialogHeader,{className:"border-b-2 border-gray-300 flex justify-between items-start p-5",children:[e.jsx("span",{className:"text-2xl tracking-tight font-extrabold text-gray-900",children:"Proceso de Registro"}),e.jsx(s.IconButton,{color:"blue-gray",size:"sm",variant:"text",onClick:r,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs(s.DialogBody,{children:[e.jsx(s.Typography,{className:"-mb-2",variant:"h5",children:"Huesped titular"}),e.jsxs("div",{className:"flex items-center justify-between sm:grid sm:grid-cols-2  gap-6 my-12 border-b-4 pb-12 border-b-gray-200",children:[e.jsx(s.Input,{label:"Rut",size:"xs"}),e.jsx(s.Input,{label:"Nombre",size:"xs"}),e.jsx(s.Input,{label:"Apellido",size:"xs"}),e.jsx(s.Input,{label:"Teléfono",size:"xs"})]}),e.jsx(s.Typography,{className:"-mb-2",variant:"h6",children:"Acompañantes"}),e.jsxs("div",{className:"font-normal border-b-4 pb-12 border-b-gray-200 my-12",children:[e.jsxs("div",{className:"flex items-center justify-between gap-6 my-6",children:[e.jsx("span",{className:"w-1/2 ",children:"Acompañante 1"}),e.jsx(s.Input,{label:"Nombre",size:"xs"}),e.jsx(s.Input,{label:"Apellido",size:"xs"}),e.jsx(s.Input,{label:"Teléfono",size:"xs"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-6 my-6",children:[e.jsx("span",{className:"w-1/2 ",children:"Acompañante 2"}),e.jsx(s.Input,{label:"Nombre",size:"xs"}),e.jsx(s.Input,{label:"Apellido",size:"xs"}),e.jsx(s.Input,{label:"Teléfono",size:"xs"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-6 my-6",children:[e.jsx("span",{className:"w-1/2",children:"Acompañante3"}),e.jsx(s.Input,{label:"Nombre",size:"xs"}),e.jsx(s.Input,{label:"Apellido",size:"xs"}),e.jsx(s.Input,{label:"Teléfono",size:"xs"})]})]}),e.jsx(s.Typography,{className:"-mb-2",variant:"h5",children:"Resumen de reserva"}),e.jsxs("div",{className:"grid grid-cols-3 my-12 gap-2 text-left text-base rounded-lg bg-blue-50/30   p-6 ",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Nombre:"}),e.jsx("span",{className:"italic font-semibold",children:" Departamento 1"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Fecha de entrada:"}),e.jsx("span",{className:"italic font-semibold",children:" 20/10/2021"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Fecha de salida:"}),e.jsx("span",{className:"italic font-semibold",children:" 20/10/2021"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 text-left text-base border-2 rounded-lg bg-blue-100/30  p-3 ",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Total de noches:"}),e.jsx("span",{className:"italic font-semibold",children:" 1"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Total de personas:"}),e.jsx("span",{className:"italic font-semibold",children:" 2"})]})]}),e.jsxs("div",{className:"grid grid-cols-3 my-12 gap-2 text-left text-base border-4 rounded-lg bg-blue-200/30   p-6 ",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Costo diario:"}),e.jsx("span",{className:"italic font-semibold",children:" $100.000"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Monto Abonado:"}),e.jsx("span",{className:"italic font-semibold",children:" $100.000"})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-normal",children:"Monto Total Adeudado:"}),e.jsx("span",{className:"italic font-semibold",children:" $100.000"})]})]})]}),e.jsxs(s.DialogFooter,{className:"p-2 border-t-2 border-gray-100 gap-4",children:[e.jsx("button",{onClick:r,className:"text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10",children:"Cancelar"}),e.jsx("button",{className:"text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10",children:"Pagar  Total"})]})]});j.propTypes={onClose:i.func.isRequired,showModal:i.bool.isRequired};const b=({onClose:r,showModal:n})=>e.jsxs(s.Dialog,{open:n,"aria-labelledby":"modalRegistro",size:"xs",children:[e.jsxs(s.DialogHeader,{className:"border-b-2 border-gray-300 flex justify-between items-start p-5",children:[e.jsx("span",{className:"text-2xl tracking-tight font-extrabold text-gray-900",children:"Proceso de Salida"}),e.jsx(s.IconButton,{color:"blue-gray",size:"sm",variant:"text",onClick:r,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,className:"h-5 w-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"})})})]}),e.jsxs(s.DialogBody,{children:[e.jsx(s.Typography,{className:"my-2 ",variant:"h5",children:"Huesped titular"}),e.jsxs("div",{className:"grid font-sans grid-cols-2  mb-12 gap-2 text-left text-base rounded-lg  bg-blue-100/30   p-6 ",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Nombre:"}),e.jsx("span",{className:" uppercase",children:" carlos "})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Apellido:"}),e.jsx("span",{className:" uppercase",children:" Vidal "})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Teléfono:"}),e.jsx("span",{className:" uppercase",children:" 123123123 "})]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-bold",children:"Rut:"}),e.jsx("span",{className:" uppercase",children:" 18.674.411-k "})]})]}),e.jsx("div",{className:"my-12",children:e.jsx(s.Textarea,{label:"Ingrese observaciónes si es necesario."})}),e.jsxs("div",{className:"flex items-center justify-center my-6",children:[e.jsx(s.Checkbox,{color:"blue",defaultChecked:!0}),e.jsx("span",{className:"text-xs",children:"Todo se encuentra en orden dentro del inmueble al momento de la recepción"})]}),e.jsxs("div",{className:"flex items-center justify-around",children:[e.jsx("button",{className:"text-white   bg-red-500 hover:bg-red-100 focus:ring-4 focus:ring-red-300 rounded-lg border border-red-200 text-sm font-semibold px-5 py-2.5 hover:text-red-900 focus:outline-none focus:z-10",children:"Generar Multa"}),e.jsx("button",{className:"text-white   bg-blue-500 hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 rounded-lg border border-blue-200 text-sm font-semibold px-5 py-2.5 hover:text-blue-900 focus:outline-none focus:z-10",children:"Registrar Salida"})]})]}),e.jsx(s.DialogFooter,{className:"p-2 my-4 border-t-2 border-gray-100 gap-4",children:e.jsx("button",{onClick:r,className:"text-gray-500 bg-white hover:bg-red-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:outline-none focus:z-10",children:"Cancelar"})})]});b.propTypes={onClose:i.func.isRequired,showModal:i.bool.isRequired};const V="https://fastapi-gv342xsbja-tl.a.run.app/check-in",B=()=>{const[r,n]=c.useState([]),[x,v]=c.useState("");c.useEffect(()=>{fetch(V,{method:"GET"}).then(t=>t.json()).then(t=>{n(t)}).catch(t=>console.log(t))},[]);const y=l=>{switch(l){case"Casa":return e.jsx("div",{className:"italic flex items-center gap-x-6",children:e.jsxs("div",{className:"cursor-pointer  inline-flex items-center px-3 py-1 text-orange-500 rounded-full gap-x-2 bg-orange-100/60",children:[e.jsx("h2",{className:"cursor-pointer text-sm font-bold",children:"Casa"}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"#FF9800"},className:"cursor-pointer",width:"18",height:"18",viewBox:"0 0 576 512",children:e.jsx("path",{d:"M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"})})]})});case"Apartamento":return e.jsx("div",{className:"italic flex items-center gap-x-6",children:e.jsxs("div",{className:"cursor-pointer  inline-flex items-center px-3 py-1 text-brown-500 rounded-full gap-x-2 bg-brown-100/60",children:[e.jsx("h2",{className:"cursor-pointer text-sm font-bold",children:"Apartamento"}),e.jsx("svg",{style:{fill:"#795548"},className:"cursor-pointer",width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",children:e.jsx("path",{d:"M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"})})]})});default:return null}},w=l=>{switch(l){case 2:return e.jsxs("div",{className:"italic inline-flex items-center px-3 py-1 text-yellow-900 rounded-full gap-x-2 bg-yellow-500/60 ",children:[e.jsx("h2",{className:"text-sm font-bold",children:"Pendiente"}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",style:{fill:"#F57F17"},width:"18",height:"18",viewBox:"0 0 576 512",children:e.jsx("path",{d:"M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l44.9 74.7c-16.1 17.6-28.6 38.5-36.6 61.5c-1.9-1.8-3.5-3.9-4.9-6.3L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm0 240a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM368 321.6V328c0 8.8 7.2 16 16 16s16-7.2 16-16v-6.4c0-5.3 4.3-9.6 9.6-9.6h40.5c7.7 0 13.9 6.2 13.9 13.9c0 5.2-2.9 9.9-7.4 12.3l-32 16.8c-5.3 2.8-8.6 8.2-8.6 14.2V384c0 8.8 7.2 16 16 16s16-7.2 16-16v-5.1l23.5-12.3c15.1-7.9 24.5-23.6 24.5-40.6c0-25.4-20.6-45.9-45.9-45.9H409.6c-23 0-41.6 18.6-41.6 41.6z"})})]});case 1:return e.jsxs("div",{className:"italic inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-green-500 bg-green-100/60 ",children:[e.jsx("h2",{className:"text-sm font-bold",children:"Registrado"}),e.jsx("svg",{style:{fill:"#22c55e"},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 640 512",children:e.jsx("path",{d:"M320.7 352c8.1-89.7 83.5-160 175.3-160c8.9 0 17.6 .7 26.1 1.9L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64l.7 0zM640 368a144 144 0 1 0 -288 0 144 144 0 1 0 288 0zm-76.7-43.3c6.2 6.2 6.2 16.4 0 22.6l-72 72c-6.2 6.2-16.4 6.2-22.6 0l-40-40c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L480 385.4l60.7-60.7c6.2-6.2 16.4-6.2 22.6 0z"})})]});default:return null}},N=l=>{switch(l){case 1:return e.jsxs("div",{className:"font-extrabold flex items-center gap-x-6",children:[e.jsxs("button",{onClick:H,className:"rounded-lg  relative w-40 h-10 overflow-x-hidden cursor-pointer flex items-center border border-green-500 bg-green-300 group  active:bg-green-500 active:border-green-500",href:"{{ route('process.create') }}",children:[e.jsx("span",{className:"text-gray-200 font-bold ml-8 transform group-hover:translate-x-20 transition-all duration-300",children:"Ingreso"}),e.jsx("span",{className:"absolute right-0 h-full w-10 rounded-lg bg-green-300 hover:bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300",children:e.jsx("svg",{style:{fill:"#fff"},xmlns:"http://www.w3.org/2000/svg",height:"1.5rem",viewBox:"0 0 512 512",children:e.jsx("path",{d:"M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"})})})]}),e.jsxs("button",{onClick:L,className:"rounded-lg  relative w-40 h-10 overflow-x-hidden cursor-pointer flex items-center border border-red-500 bg-red-300 group active:bg-red-500 active:border-red-500",href:"{{ route('process.create') }}",children:[e.jsx("span",{className:"text-white font-bold ml-8 transform group-hover:translate-x-20 transition-all duration-300",children:"Salida"}),e.jsx("span",{className:"absolute right-0 h-full w-10 rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300",children:e.jsx("svg",{style:{fill:"#fff"},xmlns:"http://www.w3.org/2000/svg",height:"1.5rem",viewBox:"0 0 576 512",children:e.jsx("path",{d:"M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"})})})]})]})}},z=l=>{l.key==="Enter"&&l.preventDefault()},h=r.filter(l=>Object.values(l).some(t=>t.toString().toLowerCase().includes(x.toLowerCase()))),d=h.length,o=10,[a,M]=c.useState(1),m=Math.ceil(d/o),p=(a-1)*o+1,C=Math.min(p+o-1,d),u=l=>{M(l)},[I,g]=c.useState(!1),H=l=>{l.preventDefault(),g(!0)},k=()=>{g(!1)},[T,f]=c.useState(!1),L=l=>{l.preventDefault(),f(!0)},R=()=>{f(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex flex-col items-center ",children:e.jsx(s.Typography,{className:"py-6",variant:"h3",children:"Registro de Huespedes"})}),e.jsxs("div",{className:"mb-2 ml-6 flex flex-col justify-start gap-8",children:[e.jsx(s.Typography,{variant:"h5",color:"blue-gray",children:"Lista de Huespedes"}),e.jsx(s.Typography,{color:"gray",className:" font-normal",children:"En esta Seccion podras realizar el Check-In de los huespedes que se encuentran en el Hotel"})]}),e.jsxs("section",{className:"my-9 w-full",children:[e.jsx("div",{className:"bg-gray-100 p-3 sm:p-5",children:e.jsx("div",{className:"mx-auto  px-1 lg:px-12",children:e.jsxs("div",{className:"bg-white  relative shadow-md sm:rounded-lg overflow-hidden",children:[e.jsx("div",{className:"flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4",children:e.jsx("div",{className:"w-full md:w-1/2",children:e.jsxs("form",{className:"flex items-center",children:[e.jsx("label",{htmlFor:"simple-search",className:"sr-only",children:"Buscar"}),e.jsxs("div",{className:"relative w-full",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:e.jsx("svg",{"aria-hidden":"true",className:"w-5 h-5 text-red-500 ",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fill:"#000000",fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})}),e.jsx("input",{type:"text",id:"simple-search",value:x,onChange:l=>v(l.target.value),onKeyDown:z,className:"bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2",placeholder:"Buscar",required:""})]})]})})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm text-left text-gray-500  ",children:[e.jsx("thead",{className:"text-md text-gray-700 bg-blue-100  ",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-4 py-3",children:"ID Rerserva"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Fecha de Estadia"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Estado"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Huesped"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Tipo de Vivienda"}),e.jsx("th",{scope:"col",className:"px-4 py-3",children:"Cantidad de Huespedes"}),e.jsx("th",{scope:"col",className:"relative py-3.5 px-4",children:e.jsx("span",{className:"sr-only",children:"Acciones"})})]})}),e.jsx("tbody",{children:h.slice((a-1)*o,a*o).map(l=>e.jsxs("tr",{className:"hover:bg-gray-100 italic",children:[e.jsx("td",{className:"px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap",children:e.jsx("div",{className:"inline-flex items-center gap-x-3",children:e.jsxs("span",{children:[" ",l.RESERVA_ID]})})}),e.jsx("td",{className:"px-4 py-4 text-sm text-gray-500 whitespace-nowrap",children:l.FECHA}),e.jsx("td",{className:"px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap",children:w(2)}),e.jsx("td",{className:"px-4 py-4 text-sm text-gray-500 whitespace-nowrap",children:e.jsxs("div",{className:"flex items-center gap-x-2",children:[e.jsx("img",{className:"object-cover w-8 h-8 rounded-full",src:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",alt:""}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-sm font-bold text-gray-800",children:"Carlos vidal curumilla"}),e.jsx("p",{className:"text-xs font-normal text-gray-600",children:"18.674.411-k"})]})]})}),e.jsx("td",{className:"px-4 py-4 text-sm text-gray-500 whitespace-nowrap",children:y(l.TIPO)}),e.jsx("td",{className:"px-4 py-4 text-sm text-gray-500 whitespace-nowrap text-center",children:2}),e.jsx("td",{className:"px-4 py-4 text-sm whitespace-nowrap text-center",children:N(1)})]},l.RESERVA_ID))})]})}),e.jsxs("nav",{className:"flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4","aria-label":"Table navigation",children:[e.jsxs("span",{id:"info",className:"text-sm font-normal text-gray-500 ",children:["Mostrar",e.jsxs("span",{className:"font-semibold text-gray-900 mx-2 ",children:[p,"-",C]}),"de",e.jsx("span",{className:"font-semibold text-gray-900 mx-2 ",children:d})]}),e.jsxs("ul",{className:"inline-flex items-stretch -space-x-px",children:[e.jsx("li",{children:e.jsx("button",{onClick:()=>u(a-1),disabled:a<=1,className:`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 ${a<=1?"cursor-not-allowed":"hover:bg-gray-100 hover:text-gray-700"}`,children:e.jsx("svg",{className:"w-5 h-5","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fill:"#000000",fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})})}),e.jsx("li",{children:e.jsx("span",{className:"flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700",children:a})}),e.jsx("li",{children:e.jsx("button",{onClick:()=>u(a+1),disabled:a>=m,className:`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 ${a>=m?"cursor-not-allowed":"hover:bg-gray-100 hover:text-gray-700"}`,children:e.jsx("svg",{className:"w-5 h-5","aria-hidden":"true",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{fill:"#000000",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})})})]})]})]})})}),e.jsx(j,{showModal:I,onClose:k}),e.jsx(b,{showModal:T,onClose:R})]})]})};export{B as default};
