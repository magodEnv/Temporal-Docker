import { Persona } from "../models/Personas.js";

export async function getPersonas_() {
  try {
    const personas = await Persona.findAll({
      attributes: [
        "id",
        "name_",
        "grade",
        "institute",
        "correo",
        "rol",
        "core_page",
        "description_",
        "photo",
      ],
      order: [["id", "DESC"]],
    });
    return personas;
  } catch (error) {
    console.log(error);
    throw new Error("Sucedio un error......");
  }
};

export async function createPersona_(persona) {
  //console.log("personas: " + JSON.stringify(persona));
  const { name_, grade, institute, correo, rol, core_page, description_, photo } = persona;
  try {
    const newPersona = await Persona.create({
      name_, grade, institute, correo, rol, core_page, description_, photo,
    });
    return newPersona;
  } catch (error) {
    throw new Error("Sucedio un error......");
  }
}

export async function updatePersona_(persona) {
  console.log("personas: " + JSON.stringify(persona));
  const { id, name_, grade,institute,correo,rol,core_page,description_,photo,} = persona;
  try {
    const persona_update = await Persona.findByPk(id);
    persona_update.name_ = name_;
    persona_update.grade = grade;
    persona_update.institute = institute;
    persona_update.correo = correo;
    persona_update.rol = rol;
    persona_update.core_page = core_page;
    persona_update.description_ = description_;
    persona_update.photo = photo;
    await persona_update.save();
    return "se modifico correctamente";
  } catch (error) {
    throw new Error("Sucedio un error......");
  }
}

export async function deletePersona_(id) {
  try {
    await Persona.destroy({
      where: { id },
    });
    return "se elimino correctamente";
  } catch (error) {
    throw new Error("Sucedio un error......");
  }
}

export async function getPersonaById_(id) {
  try {
    const personas = await Persona.findOne({
      where: { id },
      attributes: [
        "id",
        "name_",
        "grade",
        "institute",
        "correo",
        "rol",
        "core_page",
        "description_",
        "photo",
      ],
    });
    return personas;
  } catch (error) {
    throw new Error("Sucedio un error......");
  }
}



