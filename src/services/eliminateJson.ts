function eliminarBackticksJSON(str: string): string {
    // Eliminar ``` al inicio del string junto con la palabra "markdown" (si existe)
    str = str.replace(/^```(?:json)?/, "");
  
    // Eliminar ``` al final del string
    str = str.replace(/```$/, "");
    str = str.replace(/```/g, "");
  
    return str;
  }

  export default eliminarBackticksJSON;