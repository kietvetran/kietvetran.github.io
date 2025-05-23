using UnityEngine;
using UnityEngine.Tilemaps;

public class Board : MonoBehaviour {
  public Tilemap tilemap {get; private set; }
  public Piece activePiece {get; private set; }
  public TetrominoData[] tetrominoes;
  public Vector3Int spawnPosition;
  public Vector2Int boardSize = new Vector2Int(10, 20);

  // Challenging
  private int score = 0;
  private int level = 0;
  public TMPController textController;

  public RectInt Bounds {
    get {
      Vector2Int position = new Vector2Int(-this.boardSize.x / 2, -this.boardSize.y/2 );
      return new RectInt(position, this.boardSize);
    }
  }

  // Spawn the first piece. Awake is one of the building life cycle function. 
  // It will automatically to be call when the component first initialize.
  private void Awake() {
    this.tilemap = GetComponentInChildren<Tilemap>();
    this.activePiece = GetComponentInChildren<Piece>();
    this.textController = GetComponentInChildren<TMPController>();

    for ( int i=0; i<this.tetrominoes.Length; i++ ) {
      this.tetrominoes[i].Initialize();
    }
  }

  private void Start() {
    Reset();
    SpawnPiece();
  }

  public void SpawnPiece() {
    int random = Random.Range(0, this.tetrominoes.Length);
    TetrominoData data = this.tetrominoes[random];    

    this.activePiece.Initialize(this, this.spawnPosition, data);

    // When the new piece is spawned in the valid position, let the game continue.
    if ( IsValidPosition(this.activePiece, this.spawnPosition) ) {
      Set( this.activePiece );
    } else {
      GameOver();
    }

    // Set( this.activePiece );
  }

  public void Set( Piece piece ) {
    for ( int i=0; i<piece.cells.Length; i++ ) {
      Vector3Int tilePosition = piece.cells[i] + piece.position;
      this.tilemap.SetTile( tilePosition, piece.data.tile );
    }
  }

  public void Clear( Piece piece ) {
    for ( int i=0; i<piece.cells.Length; i++ ) {
      Vector3Int tilePosition = piece.cells[i] + piece.position;
      this.tilemap.SetTile( tilePosition, null );
    }
  }

  public bool IsValidPosition( Piece piece, Vector3Int position ) {
    RectInt bounds = this.Bounds;

    for ( int i=0; i<piece.cells.Length; i++ ) {
      Vector3Int tilePosition = piece.cells[i] + position;

      if ( !bounds.Contains((Vector2Int)tilePosition) ) {
        return false;
      }

      if ( this.tilemap.HasTile(tilePosition) ) {
        return false;
      }
    }
    return true;
  }

  public void ClearLine() {
    RectInt bounds = this.Bounds;
    int row = bounds.yMin;
    while ( row < bounds.yMax ) {
      if ( IsLineFull(row) ) {
        LineClear(row);

        this.score += 1;
        StepUpLevel();
      } else {
        row++;
      }
    }
    UpdateScoreText();
  }

  private bool IsLineFull( int row ) {
    RectInt bounds = this.Bounds;
    for ( int i=bounds.xMin; i<bounds.xMax; i++ ) {
      Vector3Int position = new Vector3Int( i, row, 0);
      if ( !this.tilemap.HasTile(position) ) {
        return false;
      }
    }
    return true;
  }

  private void LineClear( int row ) {
    RectInt bounds = this.Bounds;
    for ( int i=bounds.xMin; i<bounds.xMax; i++ ) {
      Vector3Int position = new Vector3Int( i, row, 0);
      this.tilemap.SetTile(position, null);
    }

    while ( row < bounds.yMax ) {
      for ( int i=bounds.xMin; i<bounds.xMax; i++ ) {
        Vector3Int position = new Vector3Int( i, row+1, 0);
        TileBase above = this.tilemap.GetTile(position);
        position = new Vector3Int(i, row, 0);
        this.tilemap.SetTile(position, above);
      }
      row++;
    }
  }

  private void GameOver() {
    Reset();
  }

  private void StepUpLevel() {
    int level = Mathf.RoundToInt( this.score / 10 );
    if ( level > this.level ) {
      this.level = level;
      Time.timeScale = 1 + level / 4;
      UpdateLevelText();
    }
  }

  private void Reset() {
    this.tilemap.ClearAllTiles();
    this.score = 0;
    this.level = 0;
    Time.timeScale = 1;
    UpdateScoreText();
    UpdateLevelText();
  }

  private void UpdateScoreText() {
    this.textController.UpdateScoreText( "Score: " + this.score );
  }

  private void UpdateLevelText() {
    this.textController.UpdateLevelText( "Level: " + this.level );
  }
}
