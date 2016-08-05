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
       return d.get('monthly')
                .filter(val => parseInt(val) === 1).length;
    });
    return {
      r:  this.round(tasks, val),
      n: this.normal(tasks, val),
    };
  },
  /**
   * Method for line and bar graph
   */
  normal(tasks, val) {
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
          data: val
        }],
    };

  },
  /**
   * Method for circles and donuts
   */
  round(tasks, val) {
    return {
      labels: tasks.map(d => d.get('name')),
      data: val.map(d => ({
        value: d,
        color: this.hex(),
        highlight: "#FF5A5E",
        label: 1,
      }))
    };
  },

  getData(data) {
    return {
      labels: data.get('monthly').map((d, i) => i),
      datasets: [
        {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: data.get('monthly'),
        }],
    };
  },
  hex() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }
});
