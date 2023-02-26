import { FrameFn, FrameUpdateFn, Rafz } from './types'
import { startTransition } from 'react'

let updateQueue = makeQueue<FrameUpdateFn>()

export const raf:Rafz = fn => schedule(fn, updateQueue)

let writeQueue = makeQueue<FrameFn>()
raf.write = fn => schedule(fn, writeQueue)

let onStartQueue = makeQueue<FrameFn>()
raf.onStart = fn => schedule(fn, onStartQueue)

let onFrameQueue = makeQueue<FrameFn>()
raf.onFrame = fn => schedule(fn, onFrameQueue)

let onFinishQueue = makeQueue<FrameFn>()
raf.onFi
let pendingCount = 0

let sync = 0

function schedule<T extends Function>(fn:T, queue:Queue<T>){
  if (sync){
    queue.delete(fn)
    fn(0)
  } else {
    queue.add(fn)
    start()
  }
}

function start(){
  if(ts < 0){
    ts = 0
    if (raf.frameLoop !== 'demand'){
      nativeRef(loop)
    }
  }
}

function stop() {
  ts = -1
}

function update(){
  let prevTs = ts
  ts = raf.now()

  let count = findTimeout(ts)
  if(count){
    eachSafely(timeouts.splice(0,count), t => t.handler())
    pendingCount -= count
  }

  if(!pendingCount){
    stop()

    return
  }

  onStart
}

interface Queue<T extends Function = any> {
  add: (fn: T) => void,
  delete: (fn: T) => boolean,
  flush: (arg?: any) => void
}

function makeQueue<T extends Function>():Queue<T>{
  let next= new Set<T>()
  let current = next
  return {
    add(fn){
      pendingCount += current == next && !next.has(fn)? 1 : 0
      next.add(fn)
    },
    delete(fn){
      pendingCount -= current == next && next.has(fn)? 1 : 0
      return next.delete(fn)
    },
    flush(arg){
      if(current.size){
        next=new Set()
        pendingCount -= current.size
        eac
      }
    }
  }
}

interface Eachable<T>{
  foreach(cb:(value:T)=>void):void
}

function eachSafely<T>(values:Eachable<T>, each:(value:T)=>void){
  values.foreach(value=>{
    try {
      each(value)
    } catch (e){
      raf.catch(e as Error)
    }
  })
}

export const __raf = {
  count():number {
    return pendingCount
  },
  isRunning():boolean{
    return ts >= 0
  },
  clear(){
    ts = -1
    timeouts =[]
    onStartQueue = makeQueue()
    updateQueue = makeQueue()
    onFrameQueue = makeQueue()
    writeQueue = makeQueue()
    onFinishQueue = makeQueue()
    pendingCoun = 0
  }
}