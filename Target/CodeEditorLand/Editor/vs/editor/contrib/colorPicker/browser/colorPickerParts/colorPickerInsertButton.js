import"../colorPicker.css";import*as t from"../../../../../base/browser/dom.js";import{Emitter as n}from"../../../../../base/common/event.js";import{Disposable as o}from"../../../../../base/common/lifecycle.js";class u extends o{_button;_onClicked=this._register(new n);onClicked=this._onClicked.event;constructor(e){super(),this._button=t.append(e,document.createElement("button")),this._button.classList.add("insert-button"),this._button.textContent="Insert",this._register(t.addDisposableListener(this._button,t.EventType.CLICK,()=>{this._onClicked.fire()}))}get button(){return this._button}}export{u as InsertButton};