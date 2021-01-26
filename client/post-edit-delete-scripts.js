/* *************************
 *** POST JOURNAL ***
************************** */
function postJournal() {
     let title = document.getElementById('title').value
     let date = document.getElementById('date').value
     let entry = document.getElementById('entry').value
    const accessToken = localStorage.getItem('SessionToken')
     let newEntry = {journal: {title: title, date: date, entry:entry}}
    

    fetch ('http://localhost:3000/journal/create', {
        method:'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }),
        body:JSON.stringify(newEntry)
    })
    .then (response => {
        console.log(response.json())
        displayMine()
    })
    .catch((err) => {
        console.log(err)
    })
}
    
    /* *************************
     *** UPDATE JOURNAL ***
    ************************** */
    function editJournal(postId) {
     console.log('editJournal Function Called')
    }
    
    
    /* *************************
     *** DELETE JOURNAL ***
    ************************** */
    function deleteJournal(postId) {
     console.log('deleteJournal Function Called')
    }