var containerList = document.getElementsByTagName("ul");
var txt = document.getElementById("textVal");
var form = document.getElementById("form");
var inProgList = document.getElementById("inProgress__list").id;
// var div = document.getElementById("inProgContainer");
var addListBtn = document.getElementById("addBtn");
var count=0;
var listArray = [];


form.addEventListener("submit",function(e){
    e.preventDefault();
})

addListBtn.addEventListener("click",function(){

    count++;
    let id = `listItem ${count}`;
    if (txt.value) 
    {
        addEleToDom(txt.value, inProgList, id)
    }
});

function addEleToDom(val, pUl, id)
{
    var li = document.createElement("li");
    li.innerHTML = val;
    li.id = id;
    li.draggable = "true";
    console.log("liiiii",li);
    document.getElementById(pUl).appendChild(li);
    li.addEventListener("dragstart",dragStartFun);
    let obj = {
        id: li.id,
        value: val,
        parent: li.parentElement.id
    }
    // console.log("Objjjjjjjjjjj",obj);
    // console.log("pareeeeent",obj.parent);
    listArray.push(obj);
    storageData(listArray);
}
function dragStartFun(event)
{
    // console.log("hereeeeeeee",listArray); 
    event.dataTransfer.setData("text",this.id);
}

for(var j=0; j<containerList.length; j++)
{
    containerList[j].addEventListener("dragover",dragOverFun);
    containerList[j].addEventListener("drop",dropFun);
}

function storageData(array)
{
    sessionStorage.setItem("item", JSON.stringify(array))
}

function dragOverFun(event)
{
    event.preventDefault();
}

function dropFun(event)
{
    var draggedData = event.dataTransfer.getData("text");
    this.append(document.getElementById(draggedData));
    console.log("Drageed dataaa",draggedData);
    let li = document.getElementById(draggedData);
    let newItem = this.appendChild(li);
    console.log("new iteeeeeeem",newItem);
    for (let i = 0; i<listArray.length; i++) {
        if (listArray[i].id == newItem.id) 
        {
            listArray[i] = {
                id: newItem.id,
                value: newItem.innerText,
                parent: newItem.parentElement.id
            }
        }
    }
    storageData(listArray);
    // console.log("list arraaaaaaaaaaaaaay",listArray);
}

function getFromStorage()
{
    var returnData = JSON.parse(sessionStorage.getItem("item"));
    // console.log("returrrrrrn",returnData)
    if (returnData) 
    {
        for (let i = 0; i < returnData.length; i++)
        {
            addEleToDom(returnData[i].value, returnData[i].parent, returnData[i].id)
        }
    }
}
getFromStorage();