import { getProjects, renderProjects } from "../../components/project/Project";
import { renderText } from "../../components/About/About";
import {
  heroTextRecord,
  aboutTextRecord,
  projectDescriptionTable,
} from "../../components/_variables";

renderText(".hero", heroTextRecord);
renderText(".about__description", aboutTextRecord);
renderProjects(await getProjects(projectDescriptionTable));
