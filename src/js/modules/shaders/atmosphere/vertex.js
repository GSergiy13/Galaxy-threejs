const vertex = [
  "varying vec3	vVertexWorldPosition;",
  "varying vec3	vVertexNormal;",
  "varying vec4	vFragColor;",
  "void main(){",
  "	vVertexNormal	= normalize(normalMatrix * normal);", // Преобразование нормали в систему координат вида
  "	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;", // Преобразование вершин в мировую систему координат
  "	// set gl_Position",
  "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}",
].join("\n");

export default vertex;