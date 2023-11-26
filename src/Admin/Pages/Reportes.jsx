import { Typography } from "@material-tailwind/react"

const Reportes = () => {
  return (
    <>
   <div className="flex flex-col items-center ">
      <Typography variant="h3">
        Reportes
      </Typography>
    </div>        

    <section className="my-3 w-full">
      <iframe 
        title="TurismoReal"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=fb3ebb81-7cd0-4547-95e2-ccf654bd14da&autoAuth=true&ctid=72fd0b5a-8a6a-4cff-89f6-bde961f7e250&filterPaneEnabled=false&navContentPaneEnabled=false"
        className="border-none"
        allowFullScreen="true">
      </iframe>
    </section>

    
    </>
  )
}

export default Reportes