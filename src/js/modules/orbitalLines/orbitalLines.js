const orbitalLine = (THREE, scene, orbitalLines) => {
    for (let i = 0; i <= orbitalLines.ratius.length; i++) {
        const { ratius, tube, radialSegments, tubularSegments, rotation } =
          orbitalLines;
      
        let material = new THREE.MeshBasicMaterial({
          color: 0x222222,
          transparent: false,
        });
        let lineOrbital = new THREE.TorusGeometry(
          ratius[i],
          tube,
          radialSegments,
          tubularSegments
        );
      
        const orbitalLine = new THREE.Mesh(lineOrbital, material);
        orbitalLine.rotation.x = rotation[i];
      
        scene.add(orbitalLine);
      }
}
export default orbitalLine;