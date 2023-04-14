const vertex =
  "varying vec2 texCoord;\n" +
  "void main() {\n" +
  "	texCoord = uv;\n" +
  "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
  "	gl_Position = projectionMatrix * mvPosition;\n" +
  "}";

export default vertex;
