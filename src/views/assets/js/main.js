/*===== SHOW NAVBAR  =====*/
const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId)
    const nav = document.getElementById(navId)
    const bodypd = document.getElementById(bodyId)
    const headerpd = document.getElementById(headerId)

    console.log("set toogle")

    if (toggle && nav && bodypd && headerpd) {
        console.log("toogle -> add listener" )
        toggle.addEventListener('click', () => {
            console.log("tootle ->" )
            nav.classList.toggle('show')
            toggle.classList.toggle('bx-x')
            bodypd.classList.toggle('body-pd')
            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

const linkColor = document.querySelectorAll('.nav__link')

function colorLink() {
    if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }
}

linkColor.forEach(l => l.addEventListener('click', colorLink))