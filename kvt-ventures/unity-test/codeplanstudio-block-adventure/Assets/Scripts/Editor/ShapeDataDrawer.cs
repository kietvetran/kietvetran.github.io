using UnityEngine;
// using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;

// App attributes:
[CustomEditor(typeof(ShapeData), false)]
[CanEditMultipleObjects]
[System.Serializable]

public class ShapeDataDrawer : Editor {
  private ShapeData ShapeDataInstance => target as ShapeData;

  public override void OnInspectorGUI() {
    serializedObject.Update();
    ClearBoardButton();
    EditorGUILayout.Space();

    DrawColumnInputFields();
    EditorGUILayout.Space();

    bool shouldDrawBoardTable = ShapeDataInstance.board != null && 
      ShapeDataInstance.columnSize > 0 && 
      ShapeDataInstance.rowSize > 0;

    if ( shouldDrawBoardTable ) {
      DrawBoardTable();
    }

    serializedObject.ApplyModifiedProperties();
    if ( GUI.changed ) {
      EditorUtility.SetDirty(ShapeDataInstance);
    }
  }

  private void ClearBoardButton() {
    if ( GUILayout.Button("Clear board") ) {
      ShapeDataInstance.Clear();
    }
  }

  private void DrawColumnInputFields() {
    int columnSize = ShapeDataInstance.columnSize;
    int rowSize = ShapeDataInstance.rowSize;

    ShapeDataInstance.columnSize = EditorGUILayout.IntField( "ColumnSize", ShapeDataInstance.columnSize);
    ShapeDataInstance.rowSize = EditorGUILayout.IntField( "RowSize", ShapeDataInstance.rowSize);

    bool shouldCreateNewBoard = (ShapeDataInstance.columnSize != columnSize || ShapeDataInstance.rowSize != rowSize) &&
      (ShapeDataInstance.columnSize > 0 && ShapeDataInstance.rowSize > 0);

    if ( shouldCreateNewBoard ) {
      ShapeDataInstance.CreateNewBoard();
    }
  }

  private void DrawBoardTable() {
    int offset = 10;
    var tableStyle = new GUIStyle("box");
    tableStyle.padding = new RectOffset(offset, offset, offset, offset);
    tableStyle.margin.left = 32; 

    var hearderColumnStyle = new GUIStyle();
    hearderColumnStyle.fixedWidth = 65;
    hearderColumnStyle.alignment = TextAnchor.MiddleCenter;

    var rowStyle = new GUIStyle();
    rowStyle.fixedHeight = 25;
    rowStyle.alignment = TextAnchor.MiddleCenter;

    var dataFieldStyle = new GUIStyle(EditorStyles.miniButtonMid);
    dataFieldStyle.normal.background = Texture2D.grayTexture;
    dataFieldStyle.onNormal.background = Texture2D.whiteTexture;

    for (int row=0; row<ShapeDataInstance.rowSize; row++ ) {
      EditorGUILayout.BeginHorizontal(hearderColumnStyle);
      for ( int column=0; column<ShapeDataInstance.columnSize; column++) {
        EditorGUILayout.BeginHorizontal(rowStyle);
        var data = EditorGUILayout.Toggle( ShapeDataInstance.board[row].column[column], dataFieldStyle);
        ShapeDataInstance.board[row].column[column] = data;
        EditorGUILayout.EndHorizontal();
      }
      EditorGUILayout.EndHorizontal();
    }
  }
}