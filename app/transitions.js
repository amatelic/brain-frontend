export default function(){
  this.transition(
    this.fromRoute('home'),
    this.toRoute('messages'),
    this.toRoute('user'),

    this.fromRoute('messages'),
    this.toRoute('home'),
    this.toRoute('user'),

    this.fromRoute('tasks'),
    this.toRoute('home'),
    this.toRoute('tasks'),

    
    this.use('toRight'),
    this.reverse('toLeft')
  );
};
