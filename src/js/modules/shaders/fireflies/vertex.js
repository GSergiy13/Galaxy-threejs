const vertex =  [
    "uniform float uTime;",
    "uniform float uPixelRatio;",
    "uniform float uSize;",

    "attribute float aScale;",

    "void main()",
    "{",
    "vec4 modelPosition = modelMatrix * vec4(position, 1.0);",
    "modelPosition.y += sin(uTime + modelPosition.x * 100.0)  * 0.6;",
    "modelPosition.z += sin(uTime + modelPosition.x * 100.0)  * 0.6;",
    "modelPosition.x += cos(uTime) * 0.6;",

    "vec4 viewPosition = viewMatrix * modelPosition;",
    "vec4 projectionPosition = projectionMatrix * viewPosition;",

    "gl_Position = projectionPosition;",
        
    "gl_PointSize = uSize;",
    "gl_PointSize *= (1.0 / - viewPosition.z);",

"}"
].join("\n");


export default vertex ;