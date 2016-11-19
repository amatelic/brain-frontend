export default function() {
  this.transition(
    this.fromRoute('home'),
    this.toRoute('messages'),
    this.toRoute('user'),
    this.toRoute('graph'),
    this.toRoute('calender'),
    this.toRoute('tasks'),

    this.fromRoute('messages'),
    this.toRoute('home'),
    this.toRoute('user'),
    this.toRoute('graph'),
    this.toRoute('calender'),
    this.toRoute('tasks'),

    this.fromRoute('tasks'),
    this.toRoute('home'),
    this.toRoute('user'),
    this.toRoute('graph'),
    this.toRoute('calender'),
    this.toRoute('messages'),

    this.fromRoute('calender'),
    this.toRoute('home'),
    this.toRoute('user'),
    this.toRoute('graph'),
    this.toRoute('messages'),
    this.toRoute('tasks'),

    this.fromRoute('graph'),
    this.toRoute('home'),
    this.toRoute('user'),
    this.toRoute('calender'),
    this.toRoute('messages'),
    this.toRoute('tasks'),


    this.use('toRight'),
    this.reverse('toLeft')

  );
}
