const fragment = [
  "uniform vec3	glowColor;",
  "uniform float	coeficient;",
  "uniform float	power;",

  "varying vec3	vVertexNormal;",
  "varying vec3	vVertexWorldPosition;",

  "varying vec4	vFragColor;",

  "void main(){",
  "	vec3 worldVertexToCamera= cameraPosition - vVertexWorldPosition;",
  "	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldVertexToCamera, 0.0)).xyz;",
  "	viewCameraToVertex	= normalize(viewCameraToVertex);",
  "	float intensity		= coeficient + dot(vVertexNormal, viewCameraToVertex);",
  "	if(intensity > 0.3){ intensity = 0.0;}",
  "	gl_FragColor		= vec4(glowColor, intensity);",

  "}",
].join("\n");

export default fragment;
