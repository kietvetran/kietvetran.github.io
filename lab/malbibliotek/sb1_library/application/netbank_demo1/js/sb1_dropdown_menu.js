/****
* 
* The plugin allows to integrate a customizable, 
* Browser Support Details
*   - FireFox 5.0+
*   - Safari 5.0+
*   - Chrome 19.0+
*   - Internet Explorer 7+
*   - Android 2.3+ 
*   - Opera 12.0+
*   - iOS Safari 4.0+
*/

;(function($) { $.fn.SB1dropdownMenu = function ( config ) {
  if ( ! config ) config = {};

  /****************************************************************************
  == CONFIGURATION OPTION == 
  ****************************************************************************/
  var opt = {
    'main'   : this,
    'timer'  : {},
    'scroll' : null,
    'label'  : [],
    'type'   : config.type,
    'field'  : config.search_field,
    'storage': config.list,
    'count'  : config.view_count || (config.list ||[]).length,
    'search' : '',
    'expander' : config.expander || true,
    'defaultLabel' : config.default_label || 'Velg',
    'selectedIndex': config.selected_Index || null
  };

  var helper = {
    /*************************************************************************
    === Initialization ===
    **************************************************************************/
    init : function() {
      opt.counter = $('<div class="sb1_counter"></div>').appendTo(opt.main);

      if ( opt.storage ) helper.initList();
      if ( opt.field   ) helper.initSearchField();

      opt.isMobile= helper._isMobile();
      opt.isTouch = helper._isTouchDevice();
      opt.mainId  = helper._generateId( opt.main );
      opt.btn     = opt.main.find('>.sb1_dropdown_btn');
      opt.list    = opt.main.find('.sb1_dropdown_list');
      opt.option  = opt.main.find('.sb1_dropdown_option').each(function(i,d){
          opt.label.push( $(d).text() );
      });
      opt.input  = opt.main.find('input[type="hidden"]').on('reset', helper.reset);


      var prev = opt.input.prev('.sb1_dropdown_btn');
      if ( prev.size() ) opt.input.insertBefore( prev );

      helper.updateSelected();

      opt.option  = opt.option.not('.hide');
      opt.btn.on('click', helper._click).on('keydown', helper._keydown)
      .on('blur', helper._blur).on('focus', helper._focus);
      opt.list.on('click', helper._click)
      .on('mousemove', helper._mousemove).on('mouseout', helper._mouseout);
      //opt.form.on('submit',helper._submit);

      if ( opt.expander ) {
        $(document).on('click',function(e) {
          if ( ! opt.clickedExpanded ) return;
          var m = $(e.target).closest('#'+opt.mainId);
          if ( ! m.size() ) helper.hideList();
        }).on('blur',function() {
          if ( ! helper.isListOpen() ) return;
          opt.btn.blur();
          if ( opt.field )
            opt.field.blur();
          else
            helper.hideList();
          var n = $('<a href="#"></a>').insertBefore( opt.main ).focus();
          setTimeout( function() { n.remove(); }, 100 );
        });
      }
    },

    initSearchField : function() {
      var node = $(
        '<div class="sb1_dropdown_menu_search_field_wrapper">' +
          '<input type="text" class="sb1_dropdown_menu_search_field" valud="">' +
        '</div>'
      ).appendTo( opt.main.addClass('included_search_field') ); 

      opt.field = node.find('.sb1_dropdown_menu_search_field');
      opt.field.on('focus', helper._searchFieldFocus)
        .on('blur', helper._searchFieldBlur)
        .on('keyup', helper._searchFieldKeyup);
    },

    initList : function() {
      opt.main.find('.sb1_dropdown_list').remove();
      opt.list = $(
        '<ul role="listbox" aria-expanded="false" class="sb1_dropdown_list"></ul>'
      ).appendTo( opt.main );
      var id = helper._generateId( opt.list );
      opt.main.find('>.sb1_dropdown_btn').attr('aria-controls', id);

      //opt.selectedIndex = null;
      for ( var i=0; i<opt.storage.length; i++ ) {
        opt.storage[i].index = i;
        if ( ! opt.storage[i].name ) opt.storage[i].name = opt.storage[i].value || '';
        if ( opt.storage[i].mode == 'active' ) opt.selectedIndex = i;

        if ( opt.type == 'account' ) helper.setupAccountData( opt.storage[i] );

        if ( opt.storage[i].mode == 'active' ) opt.selectedIndex = i;
      }
      opt.cloned = JSON.parse( JSON.stringify(opt.storage) );
      helper.appendOption( -1 );
    },

    /*************************************************************************
    === PUBLIC FUNCTIOn ===
    **************************************************************************/
    setupAccountData : function( data ) {   
      if ( ! data ) return;

      var value = data.value || data.id || '', name = data.name || value || '';
      if ( ! name || ! value ) return;

      var number = helper._verifyAccountNumber( value );
      var amount = helper._verifyAccountAmount( data.amount );

      data.html = '<div class="account_info">'+
        '<div class="name">'+name+'</div>'+
          '<div class="note">'+
            '<span class="number">'+number+'</span> - '+
            '<span class="balance">kr '+amount+'</span>'+
          '</div>'+
        '</div>';
    },

    appendOption : function( startIndex, reset ) {
      var list = opt.matched || opt.cloned || [], loop = list.length;
      var box = opt.list || opt.main.find('>.sb1_dropdown_list');
      if ( ! box.size() ) return;
      
      if ( reset ) box.html('');

      var s = 0, temp = [], j = 0, i = 0, c = 0, b = 0;
      if ( startIndex == -1 && opt.selectedIndex === null ) {
        temp.push( 
          '<li class="sb1_dropdown_option hide" role="option" data-value="">'+
            opt.defaultLabel +
          '</li>'
        ); 
        b = 1;
      }

      if ( loop ) {
        i = typeof(startIndex)=='number' ? startIndex : (box.children().length || 0); 
        j = (i+opt.count) + b, s = i;
        for ( i; i<j; i++ ) {
          var data = list[i];
          if ( ! data ) continue;

          var value = data.value || data.id || '', name = data.name || value || '';
          if ( ! name ) continue;

          var index = data.index || '';
          var type  = 'sb1_dropdown_option' + (index == opt.selectedIndex ? ' selected' : '');
          var dataV = (value ? ' data-value="'+value+'"' : '');
          var dataI = ' data-index="'+index+'"';
          var html  = '<li class="'+type+'" role="option"'+dataV+dataI+'>'+(data.html || name)+'</li>';
          temp.push( html );
        } 
      }

      if ( ! temp.length && !s ) 
        temp.push('<li class="sb1_dropdown_empty" aria-hidden="true">Ingen treff</li>');
      else if ( loop > i && opt.expander ) {
        var rest = loop - (i-1); 
        var next = opt.count > rest ? rest : opt.count;
        temp.push(
          '<li class="sb1_dropdown_option option_expander" aria-hidden="true">'+
            '<div>Hent '+next+' neste</div>'+
          '</li>'
        );        
      }

      $( temp.join("\n") ).appendTo( box );
      helper._displayCountView( loop );
      //helper._displayCountView( opt.cloned.length );
    },

    isListOpen : function() { return opt.main.hasClass('open'); },

    reset : function () {
      opt.main.find('.sb1_dropdown_option').eq(0).click();
    },
    
    showList : function() { 
      if ( opt.input.prop('disabled') ) 
        return opt.main.removeClass('on_focus');

      //var id = opt.btn.attr('id') || '_';
      //if ( opt.timer[id] ) clearTimeout( opt.timer[id] );
      opt.main.addClass('open');
      opt.list.attr('aria-expanded', 'true');
      if ( ! opt.scroll ) opt.scroll = helper._getScrollPosition();
      if ( opt.isTouch ) $('body').on('touchstart touchmove', helper._touchFocus );
    },

    hideList : function() { 
      if ( opt.ignorHideList ) return;

      opt.clickedExpanded = null;
      opt.main.removeClass('open'); 
      opt.list.attr('aria-expanded', 'false');
      opt.scroll = null;
      if ( opt.isTouch ) $('body').off('touchstart touchmove', helper._touchFocus );

      if ( opt.expander && opt.counter && opt.field ) {
        if ( opt.count+1 < opt.list.children().length ) {
          helper.appendOption(null, true);
        }
      }
    },

    updateSelected : function( item ) {
      var slc = item && item.size() ? item.eq(0) : helper._getSelected();
      var text = helper.trim(slc.text(),true);
      var value = slc.attr('data-value'), title = text.replace( /\&nbsp\;/g,'');
      if ( typeof(value) === 'undefined' ) value = title;
      var child = slc.children(), out = [];
      if ( child.size() ) {

        if ( child.size()==1 ) {
          var grand = child.eq(0).children();
          if ( grand.size() > 1 ) child = grand;
        }
        child.each( function(i,d) { out.push( helper.trim(d.textContent,true)); });
        text = '<span class="sb1_text">'+out.join('</span> <span class="sb1_text other">')+'</span>';
      }

      var labelholder = opt.btn.find('.label_holder');
      (labelholder.size() ? labelholder : opt.btn).html( text )
        .attr('title', title);

      if ( opt.input && opt.input.size() )
        opt.input.prop('value', value).keyup();
    },

    setSelected : function( item ) {
      if ( ! item || ! item.size() ) return;

      var slc = opt.list.children().filter('.selected');
      setTimeout( function() {
        helper._verifyTab( slc.eq(0), item.eq(0) );
      }, 50 );

      slc.removeClass('selected');
      helper.updateSelected( item.eq(0).addClass('selected') );
      helper.scrollBack();

      var index = parseInt( item.attr('data-index') || '' );
      if ( isNaN(index) ) return;
      setTimeout( function() {
        var obj = JSON.parse( JSON.stringify(opt.cloned[index]) );

        opt.cloned[index] = null;
        var text = JSON.stringify(opt.cloned)
          .replace(/^\[/,'').replace( /\]$/,'').replace(/(\,)?null/ig,'');

        opt.cloned = JSON.parse( '['+text+']' );
        opt.cloned.unshift( obj );
        for ( var i=0; i<opt.cloned.length; i++ )
          opt.cloned[i].index = i;
        opt.selectedIndex = 0;

        if ( opt.field ) opt.field.val('');
        opt.matched = null;
        helper.appendOption( null, true );

      }, 100);
    },

    changeOptionFocus : function( up, force ) {
      var index = null, option = opt.list.children(), size = option.size();

      if ( ! helper.isListOpen() && typeof(force)!='number' ) {
        force = up ? (size-1) : 0;
        helper.showList();
      }

      if ( typeof(force) == 'number' ) 
        index = force; 
      else {
        var slc = option.filter('.focus');
        index = ! slc.size() ? (up ? (size-1) : 0) :
        (option.index( slc ) + (up? -1 : 1));

        if (option.eq(index).hasClass('hide') )
          index += (up ? -1: 1);
      }

      var mode = 'focus', next = option.removeClass( mode )
      .eq(index>=size ? (size-1) : (index<=0 ? 0 :index)).addClass( mode );
      helper._setIntoView( next );

      if ( typeof(up)=='boolean' && next.hasClass('option_expander') ) {
        helper._runExpanding(next, true);
        return helper.changeOptionFocus( null, index );
      }
      return next;
    },

    scrollBack : function( duration ) {
      if ( ! opt.scroll ) return;
      $('html, body').animate({ 'scrollTop': opt.scroll[1]+'px' }, duration || 0, function() {

      });
    },

    trim : function( text, multipleWhiteSpace ) {
      var out = (text || '').replace(/^\s+/, '').replace(/\s+$/g, '');
      return multipleWhiteSpace ? out.replace( /\s+/g, ' ' ) : out;
    },

    /*************************************************************************
    === INTERNAL FUNCTIOn ===
    **************************************************************************/
    _displayCountView : function( sum ) {
      if ( ! opt.counter || ! opt.counter.size() ) return;
      var view = opt.list.children().not('.hide,.option_expander').size();
      opt.counter.html( (view || '0')+'&nbsp;/&nbsp;'+sum );
    },

    _verifyTab : function( slc, item ) {
      var rule = helper._getRule( slc ) || {}, wrapper = null;
      if ( rule.tabpanel_target ) {
        wrapper = $( rule.tabpanel_target );
        if ( wrapper.size() ) {
          wrapper.addClass('sb1_hide').find('input').removeAttr('required');
        }
      }

      rule = helper._getRule( item ) || {};
      if ( rule.tabpanel_target ) {
        wrapper = $( rule.tabpanel_target );
        if ( wrapper.size() ) {
          wrapper.removeClass('sb1_hide').find('input').attr('required','true');
        }
      }
    },

    _touchFocus : function( e ) {
      if ( e.type == 'touchmove' ) {
        if (  opt.touchFocusTimer ) clearTimeout(  opt.touchFocusTimer );
      }
      else if ( e.type == 'touchstart' ) {
        var target = $(e.target), parent = target.closest('#'+opt.mainId);
        if ( ! parent.size() ) { 
          opt.touchFocusTimer = setTimeout( function() {
            helper._blur( e );
          }, 100 );
        }
      }
    },

    _click : function( e ) {
      var node = $(e.target), parent = node.parent(); 
      var exp = 'option_expander', btn = 'sb1_dropdown_btn';
      e.preventDefault();

      if ( node.hasClass(exp) || parent.hasClass(exp) ) {
        if ( parent.hasClass(exp) ) node = parent;
        helper._runExpanding( node );
      }
      else if ( node.hasClass(btn) || parent.hasClass(btn) ) {
        if ( helper.isListOpen() ) {
          if ( ! opt.clickIgnor ) helper.hideList(); 
        }
        else {
          if ( ! opt.clickIgnor ) helper.showList();
        }
      }
      else {
        helper.setSelected( node.closest('.sb1_dropdown_option') );
        helper.hideList();
        if ( ! opt.isTouch ) { 
          opt.onSelected = true;
          setTimeout( function() { opt.onSelected = null; }, 100);
          opt.btn.focus();
        }
      }
      return false;
    },

    _keydown : function( e, t, c ) {
      var node = t || $(e.target), id = node.attr('id') || '_', code = c || e.keyCode;
      if ( code == 9 ) return;

      if ( code==13 || code==32 ) {
        helper.setSelected( opt.list.children().filter('.focus') );
        helper.hideList();
        return false;
      }
      else if ( code==37 || code==38 || code==39 || code==40 ) {
        if ( code==38 || code==40 ) { 
          helper.changeOptionFocus( code==38 );
          return false;
        }
      }
      else {
        if ( opt._c ) clearTimeout( opt._c ); 
        if ( opt._s ) clearTimeout( opt._s ); 

        if ( code == 8 ) {
          var a = opt.search.split('');
          a.pop();
          opt.search = a.join('');
        } else { opt.search += String.fromCharCode(code); }

        clearTimeout( opt.timer.erase || 0 );
        opt.timer.erase = setTimeout( function() { 
          opt.search = ''; 
          if ( opt.field ) { 
            opt.field.val( opt.search );
            opt.main.removeClass('inactive_search_field');
          }
        }, 2000 );
        setTimeout( function() { 
          if ( opt.field ) { 
            opt.field.val( opt.search );
            opt.main.removeClass('inactive_search_field');
            if ( ! opt.main.hasClass('focus_on_search_field') ) {
              clearTimeout( opt.timer.erase || 0 );
              return opt.field.focus();
            }
          }
          var reg = helper._createRegExp(opt.search,true,true,true);
          var label = opt.label || [], i = 0, loop = label.length, index = -1;
          for ( i; i<loop; i++ ) {
            if ( label[i].match(reg) ) {
              index = i; i = loop;
            }
          }
          if ( index < 0 ) return;
          helper.setSelected( helper.changeOptionFocus(null,index) );
        }, 15);
      }
    },

    _searchFieldFocus : function( e ) {
      opt.main.removeClass('inactive_search_field');
      helper._focus( null, opt.btn.attr('tabindex','-1') );
      var mode = 'focus_on_search_field', has = opt.main.hasClass( mode );
      if ( ! has && ! opt.main.hasClass('open') && opt.isMobile ) {
        var top = opt.btn.offset().top - 40;
        var scrolled = helper._getScrollPosition();
        if ( top > scrolled[1] ) {
          var temp = top-20, size = helper._getWindowSize();
          if ( size[1]-60 > 200 && top>scrolled[1] ) top = temp;

          $('html, body').animate({'scrollTop':top+'px'}, 50, function(){});
        }
      }
      opt.main.addClass( 'focus_on_search_field');
    },

    _searchFieldBlur : function( e ) {
      helper._blur( null, opt.btn.removeAttr('tabindex') );
      opt.main.removeClass( 'focus_on_search_field');
    },

    _searchFieldKeyup : function( e ) {
      var code = e.keyCode;
      if ( code==13 || code==32 || (code>=37 && code<=40) ) {
        helper._keydown( null, opt.btn, code );
        if ( code == 13 ) opt.main.addClass('inactive_search_field');
        return;
      }

      clearTimeout( opt.timer.search || 0 );
      opt.timer.search = setTimeout( function() {
        var box = opt.list, field = opt.field, text = field.val();
        var reg = helper._createRegExp(text,true,true,true);
        var count = opt.view_count, loop = opt.cloned.length;
        opt.matched = [];
        for ( var i=0; i<loop; i++ ) {
          var name = opt.cloned[i].name;
          if ( ! name.match(reg) ) continue;

          opt.matched.push( opt.cloned[i] );
          if ( opt.matched.length == ++count ) i = loop+1;
        }
        helper.appendOption( null, true );
        opt.main.removeClass('inactive_search_field');
        if ( ! helper.isListOpen() ) helper.showList();
      }, 100 );
    },

    _focus: function( e, target ) {
      if ( opt.field && ! target ) {
        return opt.onSelected ? null : opt.field.focus();
      }

      clearTimeout( opt.timer.focus || 0 );
      opt.timer.focus = setTimeout( function() {
        var node = target || $(e.target), id = node.attr('id') || '_';
        if ( opt.timer[id] ) clearTimeout( opt.timer[id] );
        opt.main.addClass('on_focus');
        if ( opt.field && target ) { 
          opt.clickIgnor = true;
          setTimeout( function() { opt.clickIgnor = null; }, 100 );
          helper.showList(); 
        }
      }, 20 );
    },

    _blur : function( e, target ) {
      var node = target || $(e.target), id = node.attr('id') || '_';
      if ( opt.timer[id] ) clearTimeout( opt.timer[id] );
      opt.timer[id] = setTimeout( function() { 
        helper.hideList(); 
        opt.main.removeClass('on_focus');
      }, 100 );      
    },

    _mousemove : function( e ) {
      opt.list.children().removeClass('focus');
      $(e.target).closest('.sb1_dropdown_option').addClass('focus');
    },

    _mouseout : function( e ) {
      opt.list.children().removeClass('focus');
    },

    _runExpanding : function( expander, keyboard ) {
      if ( ! keyboard ) opt.clickedExpanded = true;
      opt.ignorHideList = true; 
      setTimeout( function() { opt.ignorHideList = null;}, 100);
      expander.remove();
      var children = opt.list.children(), length = children.length;
      helper.appendOption( length );
    },

    _getParentTarget : function( node, selector, defaultParent ) {
      var parent = null;
      if ( node && selector ) {
        parent = node.closest( selector );
        if ( ! parent.size() ) parent = null;
      }
      return parent || defaultParent || null;
    },

    _trim : function( text, multipleWhiteSpace ) {
      var out = (text || '').replace(/^\s+/, '').replace(/\s+$/g, '');
      return multipleWhiteSpace ? out.replace( /\s+/g, ' ' ) : out;
    },

    _getRule : function ( input ) {
      var node = $(input), rule = {}, list = [node.attr('data-rule')];
      if ( node.attr('required')  ) list.push('required');
      if ( node.attr('minlength') ) list.push('minlength['+node.attr('minlength')+']');
      if ( node.attr('maxlength') ) list.push('maxlength['+node.attr('maxlength')+']');

      var type = node.attr('type') || '';
      var reg  = type ? new RegExp('(^|\\s)'+type+'(\\s|$)','i') : null;
      //if ( reg && opt.method.join(' ').match(reg) ) list.push( type ); 
      if ( reg && opt.method && opt.method.join(' ').match(reg) && type != 'text' ) 
        list.push( type ); 

      var text = helper._trim( list.join(' '), true );
      if ( ! text ) return;

      var render = function( v, d ) {      
        if ( ! d ) d = rule; 
        var m = v.match( /(\w+)\[(.*)\]/ );
        if ( m ) {
          if ( m[1] == 'interval' ) {
            d[m[1]] = m[2] ? $.map( m[2].split(','), function(param){
              var number = parseFloat(param || '');
              return isNaN(number) ? null : number;
            }) : [null,null];
          }
          else if ( m[2].match( /(.*\,|^)(\w+\[.*\])/ ) ) {
            if ( ! d[m[1]] || typeof(d[m[1]]) == 'string' ) d[m[1]] = {};   
            render( m[2], rule[m[1]] );
          }
          else { d[m[1]] = m[2].match(/^[\d+\.]$/) ? parseFloat(m[2]) : m[2]; }
        }
        else { d[v] = ''; }
      };

      //var test = text.match( /([\w\-\_]+)(\[[\w\s\"\,\_\.]+\])?(\s+|$)/g ) || [];
      var test = text.match( /([\w\-\_]+)(\[[\w\s\"\,\_\.\#\-]+\])?(\s+|$)/g ) || [];
      for ( var i=0; i<test.length; i++ )
        render( helper._trim(test[i],true) );

      var defaultParent = rule.atleastoption ? node.parent() : null;
      var parent = helper._getParentTarget( node, rule.parent_target, defaultParent );
      if ( parent ) {
        if ( ! opt.map._parent  ) opt.map._parent  = {'pin':{}};
        if ( ! opt.map._atleast ) opt.map._atleast = {};
        if ( ! opt.map._node    ) opt.map._node    = {};

        var pId = helper._generateId( parent );
        var nId = helper._generateId( node );
        if ( ! opt.map._parent[pId]  ) opt.map._parent[pId] = [];
        if ( ! opt.map._atleast[pId] ) opt.map._atleast[pId] = [];

        if ( ! opt.map._parent.pin[pId] ) opt.map._parent.pin[pId] = {};

        if ( ! opt.map._parent.pin[pId][nId] ) {
          opt.map._parent.pin[pId][nId] = true;
          opt.map._parent[pId].push( node ); 
        }

        //opt.map._parent[pId].push( node ); 
        opt.map._node[nId] = parent; 
        opt.map._atleast[pId].push( nId );
      }

      if ( typeof(rule.day)   != 'undefined' ) node.addClass('_rule_day');
      if ( typeof(rule.month) != 'undefined' ) node.addClass('_rule_month');
      if ( typeof(rule.year)  != 'undefined' ) node.addClass('_rule_year');

      return rule;
    },

    _splitText : function( text, split ) {
      var i = (text||'').length % split, list = i ? [text.substr(0,i)] : [];
      for ( i; i<text.length; i += split ) list.push(text.substr(i,split));
      return list;
    },

    _verifyAccountNumber : function( text ) {
      var m = (text+'').replace(/\s+/g,'').match( /(\d{4})(\d{2})(.*)/) || [];
      m.shift();
      return m.join(' ');
    },

    _verifyAccountAmount : function( text ) {
      var m = (text+'').replace(/\s+/g,'').match( /(.*)\,(.*)/);
      return ! m ? '' :
        helper._splitText( m[1], 3 ).join(' ')+ (m[2] ? (' , '+m[2]) : '');
    },

    /*
    _getRule : function ( input ) {
      var node = $(input), rule = {}, list = [node.attr('data-rule')];
      if ( node.attr('required')  ) list.push('required');
      if ( node.attr('minlength') ) list.push('minlength['+node.attr('minlength')+']');
      if ( node.attr('maxlength') ) list.push('maxlength['+node.attr('maxlength')+']');

      var type = node.attr('type') || '';
      var reg  = type ? new RegExp('(^|\\s)'+type+'(\\s|$)','i') : null;
      if ( reg && opt.method.join(' ').match(reg) ) list.push( type ); 

      var text = helper.trim( list.join(' '), true );
      if ( ! text ) return;

      var render = function( v, d ) {      
          if ( ! d ) d = rule; 
          var m = v.match( /(\w+)\[(.*)\]/ );
          if ( m ) {
            if ( m[2].match( /(.*\,|^)(\w+\[.*\])/ ) ) {
              if ( ! d[m[1]] || typeof(d[m[1]]) == 'string' ) d[m[1]] = {};   
              render( m[2], rule[m[1]] );
            }
            else { d[m[1]] = m[2].match(/^[\d+\.]$/) ? parseFloat(m[2]) : m[2]; }
          }
          else { d[v] = ''; }
      };

      var test = text.match( /([\w\-\_]+)(\[[\w\s\"\,\_\.]+\])?(\s+|$)/g ) || [];
      for ( var i=0; i<test.length; i++ )
        render( helper.trim(test[i],true) );

      var defaultParent = rule.atleastoption ? node.parent() : null;
      var parent = helper._getParentTarget( node, rule.parent_target, defaultParent );
      if ( parent ) {
        if ( ! opt.map._parent ) opt.map._parent = {};
        if ( ! opt.map._node   ) opt.map._node   = {};

        var pId = helper._generateId( parent );
        var nId = helper._generateId( node );
        if ( ! opt.map._parent[pId] ) opt.map._parent[pId] = [];

        opt.map._parent[pId].push( node ); 
        opt.map._node[nId] = parent; 
      }

      if ( typeof(rule.day)   != 'undefined' ) node.addClass('_rule_day');
      if ( typeof(rule.month) != 'undefined' ) node.addClass('_rule_month');
      if ( typeof(rule.year)  != 'undefined' ) node.addClass('_rule_year');

      return rule;
    },
    */
    _generateId : function( node ) {
      var id = node.attr('id');
      if ( ! id ) {
        id = 'auto_'+(new Date()).getTime()+'_'+Math.floor((Math.random()*1000)+1);
        node.attr('id',id);
      }
      return id;
    },

    _capitaliseFirstLetter : function(text){
      return text ? (text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()): '';
    },

    _addAttribute : function( node, prop, value ) {
      var v = node.attr( prop ) || '';
      if ( ! v  ) return node.attr(prop, value); 

      var r = new RegExp( '(^|\\s+)'+value+'($|\\s+)', 'g' );
      if ( ! v.match(r) ) node.attr(prop,helper.trim((v+' '+value,true)));
    },

    _removeAttribute : function( node, prop, value ) {
      var v = node.attr( prop ) || '';
      if ( ! v ) return;

      var r = new RegExp( '(^|\\s+)'+value+'($|\\s+)', 'g' );
      if ( v.match(r) ) 
        node.attr(prop, helper.trim((v.split(r)).join(' '), true));
    },

    _getSelected : function( ignorFirstWhenNoSelected ) {
      var slc = opt.list.children().filter('.selected');
      return slc.size() ? slc : (
        ignorFirstWhenNoSelected ? null : opt.list.children().eq(0)
      );
    },

    _setIntoView : function( item, callback ) {
      var height = item ? item.prop('clientHeight') : 0;
      if (! height) return typeof(callback) == 'function' ? callback() : null;

      var top  = item.offset().top, distance = 0;
      var size = helper._getWindowSize(), scroll = helper._getScrollPosition();
      if ( top < scroll[1] ) 
        distance = top - scroll[1];
      else if ( (top+height) > (scroll[1]+size[1]) ) 
        distance = (top+height) - (scroll[1]+size[1]);

      if ( distance === 0 ) 
        return typeof(callback) == 'function' ? callback() : null;

      $('html, body').animate({ 'scrollTop': (scroll[1]+distance)+'px' }, 50, function() {
        if( typeof(callback) == 'function' ) callback();        
      });
    },

    _createRegExp : function ( text, g, i, b, f, e, r ) {
      if ( text == '*' ) { return /.*/; }
      text = e ? escapeText( text ) : text.replace( /\*/, '.*' );

      var v = text.replace( /\+/g, '\\+' );
      if ( r ) v = v.replace( r[0], r[1] );

      var m = (g && i) ? 'gi' : ( (g || i) ? (g ? 'g' : 'i') : '' );
      return new RegExp((b ? '(^|\\s+)' : '') +'('+v+')' + (f ? '($|\\s+)': ''),m);
    },

    _getScrollPosition: function(){
      if (typeof window.pageYOffset != 'undefined')
        return [ window.pageXOffset, window.pageYOffset ];

      if (
        typeof document.documentElement.scrollTop != 'undefined' && 
        document.documentElement.scrollTop > 0
      ) { 
        return [ 
            document.documentElement.scrollLeft,
            document.documentElement.scrollTop
        ];
      }

      return typeof document.body.scrollTop != 'undefined' ? [
          document.body.scrollLeft, document.body.scrollTop
      ] : [0,0];
    },

    _getWindowSize : function() {
      var w = 0, h = 0;
      var size = [0, 0];
      if ( ! window.innerWidth ) { // IE 
        //if ( !(document.documentElement.clientWidth === 0) ){
        if ( ! document.documentElement.clientWidth ){
          size[0] = document.documentElement.clientWidth;
          size[1] = document.documentElement.clientHeight;
        } 
        else {
          size[0] = document.body.clientWidth;
          size[1] = document.body.clientHeight;
        }
      } 
      else {
        size[0] = window.innerWidth;
        size[1] = window.innerHeight;
      }

      if ( size[0] ) size[0] -= 20;
      return size;
    },

    _isIE : function() {
      var m = null;
      if ( (navigator.appName).match('Microsoft Internet Explorer') )
        m = (navigator.appVersion).match(/MSIE\s([\d\.]+)/);
      else if ( (navigator.appName).match('Netscape') )
        m = (navigator.appVersion).match( /rv:([\d\.]+)/);
      return m && m[1] ? parseFloat( m[1] ) : 0; 
    },

    _isTouchDevice : function(){
      // works on most browsers or works on ie10  
      var test = !!('ontouchstart' in window) || !!('onmsgesturechange' in window); 
      if ( test && helper._isIE() > 10 )
        test = !!(navigator.msMaxTouchPoints);
      return test;
    },

    _isMobile : function( text, multipleWhiteSpace ) {
      if ( ! (navigator.appVersion.indexOf('Mobile') > -1) ) 
        return false;
      return ! ( navigator.userAgent.match(/iPad/i) != null );
    },

    _none : function() {}
  };

  //for ( var k in helper ) {
  //  if ( ! k.match(/^(init|setup|_)/i) ) this[k] = helper[k];
  //}
  var method = {};
  for ( var k in helper ) {
    if ( ! k.match(/^(init|setup|_)/i) ) method[k] = helper[k];
  }
  
  this.SB1dropdownMenu = method;
  setTimeout( helper.init, 100 );
  return this;
}; })( jQuery );


function debug( text, value ) {
    var debug = $('div#debugWidget'), v = '', d = new Date();
    if ( ! debug.size() ) {
        var s = 'z-index:1000; position:fixed; bottom:5px; right:5px; width:300px; height:300px;' +
            'background-color:#FFFFFF; overflow:scroll; border:1px solid red; display:block;font-size:11px;line-height:15px;';
        debug = $( '<div id="debugWidget" style="'+s+'"></div>').appendTo( $('body') );
    }

    var t = d.getMinutes() + ':' + d.getSeconds();
    if ( value != null ) {
        if ( typeof(value) != 'object' )
            v = value;
        else if( value instanceof Array )
            v = value.join('<br/>');
        else {
            var data = [];
            for ( var k in value ) data.push( k + ' : ' + value[k]);
            v = data.join( '<br/>' );
        }
    }
    debug.html( t + '<br/>' + text + '<br/>' + v + '<div>&nbsp;</div>' + debug.html() );
}
//*/