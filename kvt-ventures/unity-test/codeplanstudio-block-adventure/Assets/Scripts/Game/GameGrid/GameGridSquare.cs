using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameGridSquare : MonoBehaviour {
  public Image normalImage;
  public List<Sprite> normalImages;


  // Start is called once before the first execution of Update after the MonoBehaviour is created
  void Start() {
  }

  public void SetImage( bool toSetFirstImage ) {
    int index = toSetFirstImage ? 1 : 0;
    normalImage.GetComponent<Image>().sprite = normalImages[index];
  } 
}