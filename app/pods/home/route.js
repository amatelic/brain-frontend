import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return {
      width: 400,
      height: 400,
      pie: {
        labels: ["Suburi", "Reading", "Meditaion" ],
        data: [
          {
            value: 30,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Suburi"
          },
          {
            value: 26,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Reading"
          },
          {
            value: 10,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Meditaion"
          }
        ],
      },
      data: {
        defaultFontColor: '#666',
        labels: ["Suburi", "Reading", "Meditaion" ],
        datasets:[
          {
              scaleFontColor: "#fff",
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightStroke: "rgba(220,220,220,1)",
              pointHighlightStroke: "rgba(220,220,220,1)",
              defaultFontColor: '#666',
              data: [30, 26, 10],
          },
        ]
      },
      options: {
        pointLabelFontColor : "white",
        // angleLineColor : "rgba(255,255,255,.8)",
        pointLabelFontSize : 10,
        pointDot : true,
        pointDotRadius : 3,
        angleLineWidth : 2,
        datasetStroke : true,
      },
      tasks: [
        {
          name: 'Meditate 10 minuts',
          description: 'bla bla',
          complited: true,
        },
        {
          name: 'Reading a book a day',
          description: 'To get more knowladge',
          complited: false,
        },
        {
          name: 'Do 100 suburies',
          description: 'For fun :)',
          complited: false,
        },
      ]
    };
  }
});
