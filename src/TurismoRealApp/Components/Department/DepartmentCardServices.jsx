import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";

import { IconCar, IconGaming, IconGym, IconPersonSwimming, IconTv, IconWifi } from "../../../Assets";
import PropTypes from 'prop-types';

const ListServicesIcon = {

  "Wifi": <IconWifi />,
  "Piscina": <IconPersonSwimming />,
  "TV Cable": <IconTv />,
  "Estacionamiento": <IconCar />,
  "Playstation": <IconGaming />,
  "Gimnasio": <IconGym />

}

const ListServices = ({ SERVICIOS }) => {
  return (
    <Card className="w-full bg-gray-50">
      <List>
        {
          
          SERVICIOS?.map((servicio) => (
            <ListItem key={servicio.SERVICIO_ID} ripple={false} className="py-1 pr-1 pl-4">
              {servicio.NOMBRE}
              <ListItemSuffix>
                <IconButton variant="text" color="blue-gray">
                  {ListServicesIcon[servicio.NOMBRE]}
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))
        }
      </List>
    </Card>
  );
}

ListServices.propTypes = {
  SERVICIOS: PropTypes.array
}


export default ListServices