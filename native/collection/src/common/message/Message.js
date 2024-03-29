import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';
import { Theme }  from '../style/Theme.js';

export default function Message({
  type  = '',
  title = '',
  text  = '',
  styleConfig   = {},
  accessibility = {}
}) {
  if ( ! text && ! title ) { return null; }

  let access = {
    'accessible'        : accessibility.status === false ? false : true,
    'accessibilityRole' : accessibility.role  || 'text',
    'accessibilityLabel': accessibility.label || '',
    'accessibilityHint' : accessibility.hint  || '',
    //'accessibilityState': accessibility.state || ''
  };

  return <View {...access} style={[styles.container, styles[type+'Container'] || {}, styleConfig.container || {}]}>
    { !! title && <Text style={[styles.title, styles[type+'Title'] || {},, styleConfig.title || {}]}>{title}</Text> }
    <Text style={[styles.text, styles[type+'Text'] || {}, styleConfig.text || {}]}>{text}</Text>
  </View>
};

const styles = StyleSheet.create({
  'container': {
    'flex': 1,
    'position': 'relative',
    'borderWidth': 2,
    'borderStyle': 'solid',
    'padding': 10
  },
  'infoContainer': {
    'borderColor': Theme.color.info,
    'backgroundColor': Theme.color.infoBg,
  },
  'warningContainer': {
    'borderColor': Theme.color.warning,
    'backgroundColor': Theme.color.warningBg,
  },
  'errorContainer': {
    'borderColor': Theme.color.error,
    'backgroundColor': Theme.color.errorBg,
  },
  'emptyContainer': {
    'borderColor': Theme.color.border,
    'borderStyle': 'dotted',
    'backgroundColor': 'transparent',
  },
  'title': {
    ...Theme.font.h3,
    'paddingBottom': 5
  },
  'text': {
    ...Theme.font.basic
  },
  'emptyTitle': {
    'fontStyle': 'italic',
    'textAlign': 'center'
  },
  'emptyText': {
    'fontStyle': 'italic',
    'textAlign': 'center'
  },
  'icon': {
    ...Theme.buttonIcon
  }
});