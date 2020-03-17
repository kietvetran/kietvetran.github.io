import React from 'react';
import { Platform, StyleSheet, Text, View, Alert, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Theme }  from '../common/style/Theme.js';
import Chart from '../common/chart/Chart';

export default class GuidelineMyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'list': [
        {
          'data': 40,
          'type': 'progress',
        }, {
          'data': [
            {'value': 20, 'text': 'Alfa' },
            {'value': 50, 'text': 'Beta' },
            {'value': 90, 'text': 'Gamma'},
            {'value': 40, 'text': 'Delta'}
          ],
          'type': 'pie'
        }, {
          'data': [[20,50,90,40], [40,10,70,80], [10,90,20,30]],
          'highest': 120,
          'type': 'bar',
          'fill': true,
          'xAxis': {'grid': 10, 'text': ['1.jan','2.jan','3.jan','4.jan']},
          'yAxis': {'grid': 10, 'separation': 4, 'unit': 'Kr' },
        }, {
          'data': [[20,50,90,40], [40,10,70,80]],
          'highest': 120,
          'type': 'line',
          'fill': true,
          'xAxis': {'grid': 10, 'text': ['1.jan','2.jan','3.jan','4.jan']},
          'yAxis': {'grid': 10, 'separation': 4, 'unit': 'Kr' },
        }
      ]
    }
  } 

  render() {
    let {list} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          { list.map( (data,i) => (
              <View key={'chart-wrapper-'+i} style={styles.collection}>
                <Chart {...data} />
              </View>
          )) }
        </ScrollView>
      </View>
    );
  }
}

/******************************************************************************
            <Chart data={[[20,50,90,40], [40,10,70,80]]} highest={120} type="line" fill={true}
              xAxis={{'grid': 10, 'text': ['1.jan','2.jan','3.jan','4.jan']}}
              yAxis={{'grid': 10, 'separation': 4, 'unit': 'Kr' }}
            />
******************************************************************************/

const styles = StyleSheet.create({
  'container': {
    'position': 'relative',
    'flex': 1
  },
  'contentContainer': {
    'paddingTop': 10,
    'paddingBottom': 10
  },
  'collection': {
    'marginBottom': Theme.space.medium,
    'backgroundColor': '#fff',
    'padding': Theme.space.medium,
    ...Theme.shadow.level1
  },
});