import { BlogCard } from "../Components/Card/Card"

const PanelAdministracion = () => {

  console.log("pan  ")
  return (
    <>
      <div className=" grid w-full justify-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mt-20">
      
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />

      </div>
    </>
  )
}


export default PanelAdministracion