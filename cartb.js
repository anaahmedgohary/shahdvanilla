if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

function ready() {
    let timeStampI = document.getElementById('timestamp');
    let timeNow = new Date();
    let timeString = timeNow.toISOString();
    let timesliceA = timeString.slice('0', '10')
    let timesliceB = timeString.slice('11', '19')
    let formlDateTime = timesliceA + " " + timesliceB
    timeStampI.value = formlDateTime

    //
    let orderIdInput = document.getElementById("orderIdInput");
    let orderval = document.getElementById("OrderID")
    //orderIdInput.value = orderval.value

    
}