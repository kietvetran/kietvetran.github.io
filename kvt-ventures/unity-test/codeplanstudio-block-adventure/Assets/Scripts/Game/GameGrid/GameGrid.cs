using UnityEngine;
// using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class GameGrid : MonoBehaviour {
  public int columns = 0;
  public int rows = 0;
  public float squareGap = 0.1f;
  public GameObject gripSquare;
  public Vector2 startPosition = new Vector2(0.0f, 0.0f);
  public float squareScale = 0.5f;
  public float everySquareOffset = 0.0f;

  private Vector2 _offset = new Vector2(0.0f, 0.0f);
  private List<GameObject> _gridSquares = new List<GameObject>();

  // Start is called once before the first execution of Update after the MonoBehaviour is created
  void Start() {
    CreateGrid();   
  }

  private void CreateGrid() {
    SpawnGridSquares();        
    SetGridSquaresPositions();
  }

  /**
   * index:
   * 0, 1, 2, 3, 4 
   * 5, 6, 7, 8, 9
   * ...
   */
  private void SpawnGridSquares() {
    int index = 0;
    for (var row = 0; row < rows; ++row ) {
      for (var column = 0; column < columns; ++column) {
        _gridSquares.Add(Instantiate(gripSquare) as GameObject);
        _gridSquares[_gridSquares.Count - 1].transform.SetParent(this.transform);
        _gridSquares[_gridSquares.Count - 1].transform.localScale = new Vector3(
          squareScale, squareScale, squareScale
        );
        _gridSquares[_gridSquares.Count -1].GetComponent<GameGridSquare>().SetImage(index % 2 == 0);
        index++;
      }
    }
  }

  private void SetGridSquaresPositions() {
    int columnNumber = 0;
    int rowNumber = 0;
    Vector2 squareGapNumber = new Vector2(0.0f, 0.0f);
    bool rowMoved = false;

    var squareRect = _gridSquares[0].GetComponent<RectTransform>();
    _offset.x = squareRect.rect.width * squareRect.transform.localScale.x + everySquareOffset;
    _offset.y = squareRect.rect.height * squareRect.transform.localScale.y + everySquareOffset;

    foreach ( GameObject square in _gridSquares ) {
      if ( columnNumber + 1 > columns ) {
        squareGapNumber.x = 0;
        columnNumber = 0;
        rowNumber++;
        rowMoved = false;
      } 

      var posXoffset = _offset.x * columnNumber + (squareGapNumber.x * squareGap);
      var posYoffset = _offset.y * rowNumber + (squareGapNumber.y * squareGap);

      if ( columnNumber > 0 && columnNumber % 3 == 0 ) {
        squareGapNumber.x++;
        posXoffset += squareGap;
      }
      
      if ( rowNumber > 0 && rowNumber %3 == 0 && rowMoved == false ) {
        rowMoved = true;
        squareGapNumber.y++;
        posYoffset += squareGap;

      }

      square.GetComponent<RectTransform>().anchoredPosition = new Vector2( 
        (startPosition.x + posXoffset), 
        (startPosition.y - posYoffset) 
      );

      square.GetComponent<RectTransform>().localPosition = new Vector3(
        (startPosition.x + posXoffset), 
        (startPosition.y - posYoffset), 
        0.0f
      );

      columnNumber++;
    }
  }
}
