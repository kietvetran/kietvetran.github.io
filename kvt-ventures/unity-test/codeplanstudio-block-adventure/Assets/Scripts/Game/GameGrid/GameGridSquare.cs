using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameGridSquare : MonoBehaviour {
  public Image hoverImage;
  public Image activeImage;
  public Image normalImage;
  public List<Sprite> normalImages;

  public bool Selected { get; set; }
  public int SquareIndex { get; set; }
  public bool SquareOccupied { get; set; }

  // Start is called once before the first execution of Update after the MonoBehaviour is created
  void Start() {
    Selected = false;
    SquareOccupied = false;
  }

  // temperary function
  public bool CanWeUseThisSquare() {
    return hoverImage.gameObject.activeSelf;
  }

  public void ActivateSquare() {
    hoverImage.gameObject.SetActive(true);
    activeImage.gameObject.SetActive(true);
    Selected = true;
    SquareOccupied = true;
  }

  public void SetImage( bool toSetFirstImage ) {
    int index = toSetFirstImage ? 1 : 0;
    normalImage.GetComponent<Image>().sprite = normalImages[index];
  } 

  private void OnTriggerStay2D (Collider2D collision) {
    hoverImage.gameObject.SetActive(true);    
  }

  private void OnTriggerExit2D (Collider2D collision) {
    hoverImage.gameObject.SetActive(true);     
  }

  private void OnTriggerEnter2D (Collider2D collision) {
    hoverImage.gameObject.SetActive(false);        
  }

}