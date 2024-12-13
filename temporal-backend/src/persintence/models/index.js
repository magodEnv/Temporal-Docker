import { Persona } from "./Personas.js";
import { Proyecto } from "./Proyectos.js";
import { InvestigadorProyecto } from "./InvestigadorProyecto.js";
import { Publicacion } from "./Publicaciones.js";
import { AutoresPublicaciones } from "./AutoresPublicaciones.js";
import { MainProyectos } from "./MainProyectos.js";
import { Imagen } from "./Imagen.js";
import { CoreResearchers } from "./InvestigadoresPrincipales.js";

const models = {
  Persona,
  Proyecto,
  Publicacion,
  InvestigadorProyecto,
  AutoresPublicaciones,
  Imagen,
  MainProyectos,
  CoreResearchers,
};

// Asoaciones de la tabla intermedia InvestigadorProyecto (Relacion de muchos a muchos)
Proyecto.hasMany(InvestigadorProyecto, {
  foreignKey: "proyecto_id",
  as: "investigadores",
});
InvestigadorProyecto.belongsTo(Proyecto, {
  foreignKey: "proyecto_id",
  as: "proyecto",
});
Persona.hasMany(InvestigadorProyecto, {
  foreignKey: "investigador_id",
  as: "investigadores",
});
InvestigadorProyecto.belongsTo(Persona, {
  foreignKey: "investigador_id",
  as: "persona",
});

//Asociaciones de la tabla imagenes con proyectos con foreneign key (Relacion de uno es a muchos)
Proyecto.hasMany(Imagen, { foreignKey: "proyecto_id", as: "imagenes" });
Imagen.belongsTo(Proyecto, { foreignKey: "proyecto_id", as: "proyecto" });

//Asociaciones de la tabla intermedia AutoresPublicaciones (Relacion de muchos a muchos)
Publicacion.hasMany(AutoresPublicaciones, { foreignKey: "publicacion_id" });
Persona.hasMany(AutoresPublicaciones, { foreignKey: "autor_id" });
AutoresPublicaciones.belongsTo(Persona, { foreignKey: "autor_id" });
AutoresPublicaciones.belongsTo(Publicacion, { foreignKey: "publicacion_id" });

//Asociaciones de la tabla mainProyectos con la tabla proyectos
Proyecto.hasMany(MainProyectos, {
  foreignKey: "proyecto_id",
  as: "mainProyectos",
});
MainProyectos.belongsTo(Proyecto, {
  foreignKey: "proyecto_id",
  as: "proyecto",
});

// Asoaciones de la tabla intermedia CoreResarchers con  (Relacion de muchos a muchos)
Proyecto.hasMany(CoreResearchers, {
  foreignKey: "proyecto_id",
  as: "coreResearchers",
});
CoreResearchers.belongsTo(Proyecto, {
  foreignKey: "proyecto_id",
  as: "proyecto",
});
Persona.hasMany(CoreResearchers, {
  foreignKey: "investigador_id",
  as: "coreResearchers",
});
CoreResearchers.belongsTo(Persona, {
  foreignKey: "investigador_id",
  as: "persona",
});

export default models;
