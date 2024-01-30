//观察者模式

class Subject {
  constructor(name) {
    this.name = name
    this.state = 'happy'
    this.observers = []
  }
  attach(o) {
    this.observers.push(o)
  }
  setState(str) {
    this.state = str
    this.observers.forEach((fn) => fn.update(this))
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update(baby) {
    console.log(
      'ok' + this.name + '被通知到了小宝宝的现在的状态是' + baby.state
    )
  }
}

const baby = new Subject('小明')
const father = new Observer('father')
const mother = new Observer('mother')
baby.attach(father)
baby.attach(mother)
baby.setState('被打了')
