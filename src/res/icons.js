import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faM,
  faW,
  faS,
  faT,
  faF,
  faComments,
  faUserGroup,
  faGear,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function addIcons() {
  library.add(
    faM,
    faW,
    faS,
    faT,
    faF,
    faComments,
    faUserGroup,
    faGear,
    faMagnifyingGlass
  );
}
