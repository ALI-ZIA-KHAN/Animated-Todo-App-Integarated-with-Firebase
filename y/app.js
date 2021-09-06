// firebase.database().ref('todos').on('child_added', function (data) {
//     var maindiv = document.getElementById('main');var text = document.createTextNode(inp_val);

//     var para = document.createElement('P');


//     var btn_one = document.createElement('BUTTON');
//     btn_one.setAttribute('onclick', 'dltBtn(this)');
//     btn_one.setAttribute('class', 'newdlt');
//     var deleteBtnval = document.createTextNode("Delete")
//     btn_one.appendChild(deleteBtnval)


//     var btn_two = document.createElement('BUTTON');
//     btn_two.setAttribute('onclick', 'editBtn(this)');
//     btn_two.setAttribute('class', 'newedit');
//     var editBtnval = document.createTextNode("Edit");
//     btn_two.appendChild(editBtnval)

//     para.setAttribute('class', 'paraclass')

//     para.appendChild(text);
//     para.appendChild(btn_one);
//     para.appendChild(btn_two);
//     maindiv.appendChild(para)

//     user_input.value = "";




// })

// var maindiv = document.getElementById('main');


// var user_input = document.getElementById('item');



// function addItem() {


//     var inp_val = user_input.value;

        
// }

// function dltBtn(e) {

//     e.parentNode.remove()
// }

// function editBtn(e) {
//     e.parentNode.firstChild.nodeValue = prompt("Edit your item", e.parentNode.firstChild.nodeValue)
// }

// function deleteAll() {
//     maindiv.innerHTML = "";
// }




// // console.log(firebase)



//Loading getting data from database
firebase.database().ref('todos').on('child_added', function (data) {
    var getInput = document.getElementById('item')

    //creating li in html
    var list = document.createElement('li')
    var displayList = document.createTextNode(data.val().value)
    list.appendChild(displayList)
    var getList = document.getElementById('list')
    getList.appendChild(list)
    getList.setAttribute('class', 'paraclass')

    //delete button for specific item
    var dltbtn = document.createElement('button')
    var dltBtnText = document.createTextNode('Delete')
    dltbtn.appendChild(dltBtnText)
    list.appendChild(dltbtn)
    dltbtn.setAttribute('onclick', 'del(this)')
    dltbtn.setAttribute('id', data.val().key)
    dltbtn.setAttribute('class', 'newdlt');

    //edit button
    var editBtn = document.createElement('button')
    var editBtnText = document.createTextNode('Edit')
    editBtn.appendChild(editBtnText)
    list.appendChild(editBtn)
    editBtn.setAttribute('onclick', 'edit(this)')
    editBtn.setAttribute('id', data.val().key)
    editBtn.setAttribute('class', 'newedit');

    //empty value after adding item through input
    getInput.value = " "
})


//adding new items
function addItem() {
    var getInput = document.getElementById('item')

    //sending data to database
    var a = firebase.database().ref('todos')

    //getting key 
    var key = a.push().key
    var obj = {
        value: getInput.value,
        key: key
    }

    //pushing data and key to database
    a.child(key).set(obj)

    //empty value after adding item through input
    getInput.value = " "

}

//delete all
function deleteAll() {
    var list = document.getElementById('list')
    list.innerHTML = " "
}


//delete respective specific item
function del(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}


//updating item
function edit(e) {
    var pr = prompt('Update Item', e.parentNode.firstChild.nodeValue)

    var obj = {
        key: e.id,
        value: pr
    }
    firebase.database().ref('todos').child(e.id).set(obj)
    console.log(e.parentNode.firstChild.nodeValue)
    e.parentNode.firstChild.nodeValue = pr
}






