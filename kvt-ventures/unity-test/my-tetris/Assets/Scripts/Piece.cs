using System.Collections;
using System.Collections.Generic;
using UnityEngine.Tilemaps;
using UnityEngine;

public class Piece : MonoBehaviour {
  public Board board { get; private set; }
  public TetrominoData data { get; private set; }
  public Vector3Int position { get; private set; }
  public Vector3Int[] cells { get; private set; }
  public int rotationIndex { get; private set; }

  public float stepDelay = 1f;
  public float lockDelay = .5f;

  private float stepTime;
  private float lockTime;

  public void Initialize(Board board, Vector3Int position, TetrominoData data) {
    this.board = board;
    this.position = position;
    this.data = data;
    this.rotationIndex = 0;

    this.stepTime = Time.time + this.stepDelay;
    this.lockTime = 0f;

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

    this.lockTime += Time.deltaTime;

    if ( Input.GetKeyDown(KeyCode.Q) || Input.GetKeyDown(KeyCode.UpArrow) ) {
      Rotate(-1);
    } else if ( Input.GetKeyDown(KeyCode.E) ) {
      Rotate(1);
    }

    if ( Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow) ) {
      Move(Vector2Int.left);
    } else if ( Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow) ) {
      Move(Vector2Int.right);
    }

    if ( Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow) ) {
      Move(Vector2Int.down);      
    }

    // if ( Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow) ) {
    //   Move(Vector2Int.up);      
    // }

    if ( Input.GetKeyDown(KeyCode.Space) ) {
      HardDrop();
    }


    if ( Time.time >= this.stepTime ) {
      Step();
    }

    this.board.Set( this ); 
  }


  private void Step() {
    this.stepTime = Time.time + this.stepDelay;
    Move( Vector2Int.down );

    if ( this.lockTime >= this.lockDelay ) {
      Lock();
    }
  }

  private void Lock() {
    this.board.Set(this);
    this.board.ClearLine();
    this.board.SpawnPiece();
  }

  private void HardDrop() {
    while( Move(Vector2Int.down) ) {
      continue;
    }

    Lock();
  }

  private bool Move( Vector2Int translation ) {
    Vector3Int newPosition = this.position;
    newPosition.x += translation.x;
    newPosition.y += translation.y;

    bool valid = this.board.IsValidPosition(this, newPosition);
    if ( valid ) {
      this.position = newPosition;
      this.lockTime = 0;
    }
    return valid;
  }

  private void Rotate( int direction ) {
    int originalRotation = this.rotationIndex;
    this.rotationIndex = Wrap(this.rotationIndex + direction, 0, 4);

    ApplyRotationMatrix(direction);

    if ( !TestWallKicks(this.rotationIndex, direction) ) {
      this.rotationIndex = originalRotation;
      ApplyRotationMatrix(-direction);
    }    
  }

  private void ApplyRotationMatrix( int direction ) {
    for ( int i=0; i<this.data.cells.Length; i++ ) {
      Vector3 cell = this.cells[i];
      int x, y;
      if ( this.data.tetromino == Tetromino.I || this.data.tetromino == Tetromino.O ) {
        cell.x -= 0.5f;
        cell.y -= 0.5f;
        x = Mathf.CeilToInt((cell.x * Data.RotationMatrix[0] * direction) + (cell.y * Data.RotationMatrix[1] * direction));
        y = Mathf.CeilToInt((cell.x * Data.RotationMatrix[2] * direction) + (cell.y * Data.RotationMatrix[3] * direction));        
      } else {
        x = Mathf.RoundToInt((cell.x * Data.RotationMatrix[0] * direction) + (cell.y * Data.RotationMatrix[1] * direction));
        y = Mathf.RoundToInt((cell.x * Data.RotationMatrix[2] * direction) + (cell.y * Data.RotationMatrix[3] * direction));
      }

      this.cells[i] = new Vector3Int(x, y, 0);
    }
  }

  private bool TestWallKicks( int rotationIndex, int rotationDirection ) {
    int wallKickIndex = GetWallKickIndex(rotationIndex, rotationDirection);
    for ( int i=0; i<this.data.wallKicks.GetLength(1); i++ ) {
      Vector2Int translation = this.data.wallKicks[wallKickIndex, i];
      if ( Move(translation) ) {
        return true;
      }
    }
    return false;
  }

  private int GetWallKickIndex(int rotationIndex, int rotationDirection) {
    int wallKickIndex = rotationIndex * 2;
    if ( rotationDirection < 0 ) {
      wallKickIndex--; 
    }
    return Wrap( wallKickIndex, 0, this.data.wallKicks.GetLength(0) );
  }

  private int Wrap(int input, int min, int max) {
    if (input < min) {
      return max - (min - input) % (max - min);
    }
    return min + (input - min) % (max - min);
  }
}
