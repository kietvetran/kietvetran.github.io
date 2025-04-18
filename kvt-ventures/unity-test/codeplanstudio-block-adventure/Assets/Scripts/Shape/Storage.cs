using UnityEngine;
// using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class Storage: MonoBehaviour {
  public List<ShapeData> shapeDatas;
  public List<Shape> shapes;
    
  void Start() {
    foreach( var shape in shapes ) {
      var shapeIndex = UnityEngine.Random.Range(0, shapeDatas.Count);
      shape.CreateShape( shapeDatas[shapeIndex] );
    }
  }
}
