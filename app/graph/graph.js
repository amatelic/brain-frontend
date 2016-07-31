import Ember from 'ember';

export default Ember.Object.extend({
  option(data) {
    return {
      pointLabelFontColor : "white",
      scaleFontColor: "white" ,
      pointLabelFontSize : 10,
      pointDot : true,
      pointDotRadius : 3,
      angleLineWidth : 2,
      datasetStroke : true,
      data: data
    };
  },
  /**
   * Method for preparing data for cirlce graphs and line, bar graphs
   */
  createData(tasks) {
    let val = tasks.map(d => {
      d.set('monthly', d.get('monthly').filter(val => {
        return val == 1
      }));
      return d;
    });
    return {
      r:  this.round(val),
      n: this.normal(val),
    };
  },
  /**
   * Method for line and bar graph
   */
  normal(tasks) {
    return {
      labels: tasks.map(d => d.get('name')),
      datasets: [
        {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: tasks.map(d => d.get('monthly').length)
        }],
    }

  },
  /**
   * Method for circles and donuts
   */
  round(tasks) {
    return {
      labels: tasks.map(d => d.get('name')),
      data: tasks.map(d => ({
        value: d.get('monthly').length,
        color: this.hex(),
        highlight: "#FF5A5E",
        label: d.get('name')
      }))
    };
  },
  hex() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
});
