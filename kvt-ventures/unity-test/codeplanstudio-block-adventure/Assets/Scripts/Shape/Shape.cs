using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class Shape : MonoBehaviour {
  public GameObject squareShapeImage;

  // [HideInInspector]
  public ShapeData CurrentShapeData;

  private List<GameObject> _currentShape = new List<GameObject>();

  void Start() {
    RequestNewShape(CurrentShapeData);
  }

  public void RequestNewShape( ShapeData shapeData ) {
    CreateShape(shapeData);
  } 

  public void CreateShape( ShapeData shapeData ) {
    CurrentShapeData = shapeData;
    int totalSquareNumber = GetNumberOfSquare(shapeData);
    while( _currentShape.Count <= totalSquareNumber ) {
      _currentShape.Add( Instantiate(squareShapeImage, transform) as GameObject );
    }

    foreach (var square in _currentShape ) {
      square.gameObject.transform.position = Vector3.zero;
      square.gameObject.SetActive(false);
    }

    var squareRect = squareShapeImage.GetComponent<RectTransform>();
    var moveDistance = new Vector2(
      squareRect.rect.width * squareRect.localScale.x, 
      squareRect.rect.height * squareRect.localScale.y
    );
    int currentIndexInList = 0;
    for (int row=0; row<shapeData.rowSize; row++ ){
      for (int column=0; column<shapeData.columnSize; column++ ) {
        if (shapeData.board[row].column[column] ) {
          _currentShape[currentIndexInList].SetActive(true);
          _currentShape[currentIndexInList].GetComponent<RectTransform>().localPosition = new Vector2(
            GetXPositionForShapeSquare(shapeData, column, moveDistance),
            GetYPositionForShapeSquare(shapeData, row, moveDistance)
          );
          currentIndexInList++;
        }
      }
    }
  }

  private float GetYPositionForShapeSquare( ShapeData shapeData, int row, Vector2 moveDistance ) {
    float position = 0f;
    if ( shapeData.rowSize > 1 ) { // Vertical position calculation
      if ( shapeData.rowSize % 2 != 0 ) {
        float middleSquareIndex = GetMiddle(shapeData.rowSize);
        float multiplier = GetMiddle(shapeData.rowSize);
        if ( row < middleSquareIndex ) {
          position = moveDistance.y * 1;
          position *= multiplier;          
        } else if ( row > middleSquareIndex ) { // move it on plus
          position = moveDistance.y * -1;
          position *= multiplier;
        }
      } else {
        float middleSquareIndex2 = (shapeData.rowSize == 2) ? 1 : (shapeData.rowSize / 2);
        float middleSquareIndex1 = (shapeData.rowSize == 2) ? 0 : (shapeData.rowSize - 1);
        float multiplier = GetMiddle(shapeData.rowSize);

        if ( row == middleSquareIndex1 || row == middleSquareIndex2 ) {
          position = (moveDistance.y / 2) * (row == middleSquareIndex1 ? 1 : -1);
        }

        if ( row < middleSquareIndex1 && row < middleSquareIndex2 ) { // move it on negative
          position = moveDistance.y * 1;
          position *= multiplier;
        } else if ( row > middleSquareIndex1 && row > middleSquareIndex2 ) { // move it on plus
          position = moveDistance.y * -1;
          position *= multiplier;
        }
      }
    }
    return position;
  }

  private float GetXPositionForShapeSquare( ShapeData shapeData, int column, Vector2 moveDistance ) {
    float position = 0f;
    if ( shapeData.columnSize > 1 ) { // Vertical position calculation
      if ( shapeData.columnSize % 2 != 0 ) {
        var middleSquareIndex = GetMiddle(shapeData.columnSize);
        var multiplier = GetMiddle(shapeData.columnSize);
        if ( column < middleSquareIndex ) { // move it on the negative
          position = moveDistance.x * -1;
          position *= multiplier;
        } else if ( column > middleSquareIndex ) { // move it on plus
          position = moveDistance.x * 1;
          position *= multiplier;
        }
      } else {
        float middleSquareIndex2 = (shapeData.columnSize == 2) ? 1 : (shapeData.columnSize / 2);
        float middleSquareIndex1 = (shapeData.columnSize == 2) ? 0 : (shapeData.columnSize - 1);
        float multiplier = GetMiddle(shapeData.columnSize);

        if ( column == middleSquareIndex1 || column == middleSquareIndex2 ) {
          position = (moveDistance.x / 2) * (column == middleSquareIndex1 ? -1 : 1);
        }

        if ( column < middleSquareIndex1 && column < middleSquareIndex2 ) { // move it on negative
          position = moveDistance.x * -1;
          position *= multiplier;
        } else if ( column > middleSquareIndex1 && column > middleSquareIndex2 ) { // move it on plus
          position = moveDistance.x * 1;
          position *= multiplier;
        }
      }
    }
    return position;
  }

  private int GetNumberOfSquare( ShapeData shapeData ) {
    int activeCount = 0;
    foreach ( var rowData in shapeData.board ) {
      foreach ( var active in rowData.column ) {
        if ( active ) {
          activeCount++;
        }
      }
    }
    return activeCount;
  }  

  private float GetMiddle(int count) {
    int leftOver = count % 2;
    return (count - leftOver) / 2;
  }
}