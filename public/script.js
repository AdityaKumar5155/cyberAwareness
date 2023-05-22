let socket = io();

function clicked(){
    let name = $("#name").val();
    let section = $("#section").val();
    let clas = $("#class").val();
    let roll = $("#roll").val();
    let school = $("#school").val();
    let send = {name:name,class:clas,section:section,roll:roll,school:school}
    console.log(send)
    socket.emit("submitted", send);
}

socket.on("hi!", () => {
    console.log("Woooooooooohooooooooooooooooo!")
})


