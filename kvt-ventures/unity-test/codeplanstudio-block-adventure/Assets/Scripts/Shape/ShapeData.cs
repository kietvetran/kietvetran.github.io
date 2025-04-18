using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

// App attributes:
[CreateAssetMenu]
[System.Serializable]

// ShapeData shall inherite ScripttableObject
public class ShapeData: ScriptableObject {

  [System.Serializable]
  public class Row {
    public bool[] column;
    private int _size = 0;

    // Constructor
    public Row() {
    }
    public Row(int size) {
      CreateRow(size);
    }

    public void CreateRow(int size) {
      _size = size;
      column = new bool[_size];
      ClearRow();
    }

    public void ClearRow() {
      for (int i=0; i < _size; i++ ) {
        column[i] = false;
      }
    }
  }

  public int columnSize = 0;
  public int rowSize = 0;
  public Row[] board;

  public void Clear() {
    for (int i=0; i<rowSize; i++) {
      board[i].ClearRow();
    }
  }

  public void CreateNewBoard() {
    board = new Row[rowSize];
    for( int i=0; i<rowSize; i++ ) {
      board[i] = new Row(columnSize);
    }
  }
}
