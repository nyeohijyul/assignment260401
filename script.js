const list = document.querySelector("#list");
const textInput = document.querySelector("#tasktextInput");
const addBtn = document.querySelector("#addBtn");
const resetBtn = document.querySelector("#resetBtn");

let tasklist = [{
  title: "공부하기",
  done: false,
}];
let filterType = "all";

function filterTask(list) {
  switch ( filterType ) {
    case "done":
      return tasklist.filter( task => task.done );

    case "in progress":
      return tasklist.filter( task => !task.done );
    
    default: return list;
  }
}

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

const allBtn = document.querySelector("#all");
const doneBtn = document.querySelector("#done");
const inprogressBtn = document.querySelector("#inprogress");

allBtn.addEventListener( "click", () => { filterType = "all"; loadLI(); } );
doneBtn.addEventListener( "click", () => { filterType = "done"; loadLI(); } );
inprogressBtn.addEventListener( "click", () => { filterType = "in progress"; loadLI(); } );

function getInputValue() { return textInput.value.trim(); }

function addtask() {
  return new Promise( (resolve, reject) => {
    if ( getInputValue() ) {
      setTimeout( () => {
        resolve();
      }, 1000 )
    } else { reject("할 일을 입력하세요."); }
  } )
}

function resetInputValue() { textInput.value = ""; }

function appendNewLI() {
  const newLI = document.createElement("li");

  let title = getInputValue();
  newLI.textContent = title;

  const newBtn = document.createElement("button");
  newBtn.textContent = "✖";

  newLI.appendChild(newBtn);
  list.appendChild(newLI);
  
  tasklist.push( { title, done: false } );
  
  resetInputValue();
}

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

addBtn.addEventListener( "click", () => {
  addtask()
    .then(appendNewLI)
    .catch( error => {
      alert(error);
      console.log("할 일 입력 실패: " + error);
    } );
} );
resetBtn.addEventListener( "click", resetInputValue );

loadLI();
