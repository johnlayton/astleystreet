"user strict"

Polymer( 'time-control', {

  minimum : moment().add( 0, 'days' ).startOf( 'day' ).unix(),
  maximum : moment().add( 6, 'days' ).startOf( 'day' ).unix(),
  current : moment().startOf( 'hour' ).unix(),

  pattern : 'HH:mm DD-MMM-YYYY',

  dates : [],

  observe: {
    'minimum': 'rangeChanged',
    'maximum': 'rangeChanged',
    'current': 'currentChanged'
  },

  rangeChanged : function(){
    this.dates = [];
    var count = moment.unix( this.maximum ).diff( moment.unix( this.minimum ), 'days' );
    for ( var i = 0; i < count; i++ ) {
      this.dates.push( moment.unix( this.minimum ).add( i, 'days' ) );
    }
  },

  currentChanged: function() {
    console.log( "Current Date Changed" );
  },

  ready : function() {
    this.rangeChanged();
  },

  created : function () {
  },

  toMoment: {
    toDOM: function( value ) {
      return moment.unix( value ).format( this.pattern );
    },
    toModel: function( value ) {
      return moment( value, this.pattern ).unix();
    }
  },

  containerChanged : function () {
    if ( this.container ) {
      this.control = L.control.time( {
        ui : this.$.time
      } );
      this.container.addControl( this.control );
    }
  },

  detached : function () {
    if ( this.container && this.control ) {
      this.container.removeControl( this.control );
    }
  }

} );

Polymer( 'time-control-days', {

  observe: {
  },

  attributesChanged : function(){
    console.log( "Attributes Changed..." );
    console.log( arguments );
  },

  created : function () {
  },

  ready : function () {
  }

} );

Polymer( 'time-control-day', {

  date : moment(),

  pattern : 'ddd',

  observe: {
    'current': 'currentChanged'
  },

  currentChanged: function() {
    this.$.panel.setZ( moment( this.date ).isSame( moment.unix( this.current ), 'day' ) ? 2 : 1 );
  },

  created : function () {
  },

  toDay: function( value ) {
    return value.format( this.pattern );
  }

} );