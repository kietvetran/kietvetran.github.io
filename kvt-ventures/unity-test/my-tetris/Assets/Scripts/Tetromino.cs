using System.Collections;
using System.Collections.Generic;
using UnityEngine.Tilemaps;
using UnityEngine;

public enum Tetromino {
  I, 
  O,
  T,
  J,
  L,
  S,
  Z,
}

// This defination will let public variable show up as C# field in the editor
[System.Serializable]
public struct TetrominoData {
  public Tetromino tetromino;
  public Tile tile;
  // public Vector2Int[] cells;
  // This remove C# field from editor, to be C# property;
  public Vector2Int[] cells {get; private set;}

  public void Initialize() {
    this.cells = Data.Cells[this.tetromino];
  }
}