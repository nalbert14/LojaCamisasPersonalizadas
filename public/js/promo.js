var inputEmail = document.querySelector('#email-promo')
function promo() {
    let sendEmail = {
        email: inputEmail.value
    }
    const body = JSON.stringify(sendEmail)
    fetch('/promos', {
        method: "POST",
        body: body,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((data) => {
            if (data) throw data
           msg()
           inputEmail.value = ""
        })
        .catch(err => msg(err))
}