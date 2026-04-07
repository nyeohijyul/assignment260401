const list = document.querySelector("#list");
const textInput = document.querySelector("#tasktextInput");
const addBtn = document.querySelector("#addBtn");
const resetBtn = document.querySelector("#resetBtn");

const allBtn = document.querySelector("#all");
const doneBtn = document.querySelector("#done");
const inprogressBtn = document.querySelector("#inprogress");

allBtn.addEventListener( "click", () => { filterType = "all"; loadLI(); } );
doneBtn.addEventListener( "click", () => { filterType = "done"; loadLI(); } );
inprogressBtn.addEventListener( "click", () => { filterType = "in progress"; loadLI(); } );

let tasklist = [{
  title: "공부하기",
  done: false,
}];
let filterType = "all"

function loadLI() {
  [ ...list.children ].forEach( li => li.remove() )
  let targetTasklist = filterTask(tasklist);

  targetTasklist.forEach( task => {
    const LI = document.createElement("li");
    LI.textContent = task.title;
    if ( task.done ) { LI.classList.add("done"); }

    const Btn = document.createElement("button");
    Btn.textContent = "✖";

    LI.appendChild(Btn);
    list.appendChild(LI);
  } );
}

function filterTask(list) {
  switch ( filterType ) {
    case "done":
      return tasklist.filter( task => task.done );

    case "in progress":
      return tasklist.filter( task => !task.done );
    
    default:
      return list;
  }
}

function appendNewLI() {
  if ( getInputValue() ) {
    const newLI = document.createElement("li");
    
    let title = getInputValue();
    newLI.textContent = title;
        
    const newBtn = document.createElement("button");
    newBtn.textContent = "✖";

    newLI.appendChild(newBtn);
    list.appendChild(newLI);
    
    tasklist.push( { title, done: false } );
    
    resetInputValue();
  } else { alert("할 일을 입력하세요."); }
}

function getInputValue() { return textInput.value.trim(); }
function resetInputValue() { textInput.value = ""; }

function getIndex(target) { return [ ...target.parentNode.children ].indexOf(target); }

list.addEventListener("click", event => {
  if ( event.target.tagName == "LI" ) {
    let index = getIndex(event.target);
    tasklist[index].done = !tasklist[index].done;

    event.target.classList.toggle("done");
  }
  if ( event.target.tagName == "BUTTON" ) {
    let index = getIndex(event.target.parentNode);
    tasklist.splice(index,1);

    event.target.parentNode.remove();
  }
});

addBtn.addEventListener( "click", appendNewLI );
resetBtn.addEventListener( "click", resetInputValue );

loadLI();
