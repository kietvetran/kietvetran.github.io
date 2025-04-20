using System.Collections;
using System.Collections.Generic;
using UnityEngine.Tilemaps;
using UnityEngine;

public class Piece : MonoBehaviour {
  public Board board { get; private set; }
  public TetrominoData data { get; private set; }
  public Vector3Int position { get; private set; }

  public Vector3Int[] cells { get; private set; }

  public void Initialize(Board board, Vector3Int position, TetrominoData data) {
    this.board = board;
    this.position = position;
    this.data = data;

    if ( this.cells == null ) {
      this.cells = new Vector3Int[data.cells.Length];
    }

    for ( int i=0; i<this.cells.Length; i++ ) {
      this.cells[i] = (Vector3Int)data.cells[i];
    }
  }

  // Update is the inbuilded function to listen to the use input.
  private void Update() {
    this.board.Clear( this );

    if ( Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow) ) {
      Debug.Log("left...");
      Move(Vector2Int.left);
    } else if ( Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow) ) {
      Debug.Log("right...");
      Move(Vector2Int.right);
    }

    if ( Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow) ) {
      Move(Vector2Int.down);      
    }

    // if ( Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow) ) {
    //   Move(Vector2Int.up);      
    // }

    // hard drop
    if ( Input.GetKeyDown(KeyCode.Space) ) {
      HardDrop();
    }
    this.board.Set( this ); 
  }

  private void HardDrop() {
    while( Move(Vector2Int.down) ) {
      continue;
    }
  }

  private bool Move( Vector2Int translation ) {
    Vector3Int newPosition = this.position;
    newPosition.x += translation.x;
    newPosition.y += translation.y;

    bool valid = this.board.IsValidPosition(this, newPosition);
    if ( valid ) {
      this.position = newPosition;      
    }
    return valid;
  }

}
