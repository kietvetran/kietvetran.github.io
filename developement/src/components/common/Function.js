import { trim, createRegexp, isValid, sortList, capitalize } from './General';

/******************************************************************************
=== ===
******************************************************************************/
export const getPagingList = ( config ) =>{
  ['total', 'from', 'size'].forEach( (key) => {
    if ( typeof(config[key]) === 'string') {
      config[key] = parseInt(config[key].replace( /\^(\s+|0)/g, '') || '0');
    } else if ( ! config[key] ) {
      config[key] = 0;
    }
  });

  if ( ! config.total || config.total < config.size ) { return []; }

  let index = parseInt((config.from / config.size));
  let mode  = config.total > config.size ? config.total % config.size : 0;
  let loop  = ((parseInt((config.total/config.size)) + (mode ? 1 : 0)) || 2) - 1;
  let list  = [], next = config.next || 2;
  let interval = [index - next - 1, index + next + 1];

  for (let i = 0; i <=loop; i++) {
    let active = i === index, checked = !active && i !== 0 && i !== loop;
    let hide   = checked && (i < interval[0] || i > interval[1]);
    let trancation = checked && (i === interval[0] || i === interval[1]);
    if ( hide ) { continue; }

    list.push({
      'name': (i+1),
      'active': active,
      'trancation': trancation,
      'index': i,
      'from' : (i * config.size),
      'config': config
    });
  }
  return list;
}

export const openSmartspart = (key='', param='', href='' )=> {
    const iOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod');
    const android = navigator.userAgent.match('Android');

    if ( iOS || android ) {
        const isSafari = navigator.vendor && 
            navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('CriOS') == -1 &&
            navigator.userAgent.indexOf('FxiOS') == -1;

        const url = `smartspar://home?${param || 'action=none'}`;
        const appstore = iOS ? ( isSafari ?
            'https://itunes.apple.com/app/id1450266656' : 'https://apps.apple.com/no/app/smartspar/id1450266656' 
        ) : 'https://play.google.com/store/apps/details?id=no.eika.smartspar';

        const state = { 'timer': 0, stop: false, count: isSafari ? 2 : 1};
        const blur = () => {
            if ( --state.count ) { return; }

            clearTimeout( state.timer );
            state.stop = true;
        };
        window.removeEventListener('blur', blur)
        window.addEventListener('blur', blur);

        state.timer = setTimeout( () => {
            if (state.stop) { return; }
            if ( isSafari ) {
                window.location.replace(appstore);
            } else {
                window.location.href = appstore;
            }
        }, (isSafari ? 2000 : 500));

        window.location.href = url;
    } else if ( href ) {
        window.location.href = href;
    }
}