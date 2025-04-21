using System.Collections;
using System.Collections.Generic;
using UnityEngine.Tilemaps;
using UnityEngine;
using TMPro;

public class TMPController : MonoBehaviour {
  [SerializeField]
  private TextMeshProUGUI scoreTextElement;

  [SerializeField]
  private TextMeshProUGUI levelTextElement;

  // scoreTextElement.textStyle = TMP_Style.NormalStyle;
  // scoreTextElement.fontStyle = FontStyle.Bold;
  // scoreTextElement.color = Color.red;
  // scoreTextElement.fontSize = 200f

  public void UpdateScoreText(string text) {
    scoreTextElement.text = text;
  }
  public void UpdateLevelText(string text) {
    levelTextElement.text = text;
  }
}
