// Functionality for the Monitorslides section
const slides = [...document.getElementsByClassName('screen')]
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let activeSlide = slides[0]
let idx = slides.indexOf(activeSlide)

const nextSlide = () => {
  activeSlide.classList.toggle('active')
  ++idx

  if(idx >= slides.length){
    idx = 0
  }

  activeSlide = slides[idx]
  activeSlide.classList.toggle('active')
}

const prevSlide = () => {
  activeSlide.classList.toggle('active')
  --idx

  if(idx < 0){
    idx = slides.length - 1
  }

  activeSlide = slides[idx]
  activeSlide.classList.toggle('active')
}

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)



// Navbar big screen with light up effect on viewed section
const deviceHeight = window.innerHeight

const optionsChangeNav = { threshold: 0.15 } 

const switchNavFocus = (entries, observer) => {
  entries.map((entry) => {
    const sectionName = entry.target.id
    if(entry.isIntersecting) {
      const navLink = document.querySelector(`a[href="#${sectionName}"]`)
      navLink.classList.add('active')
    } else {
      const navLink = document.querySelector(`a[href="#${sectionName}"]`)
      navLink.classList.remove('active')
    }
  })
}

const sectionsObserver = new IntersectionObserver(switchNavFocus, optionsChangeNav)

const sections = document.querySelectorAll('section[id]')
sections.forEach(section => {
  sectionsObserver.observe(section)
})

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (winScroll / height) * 100
  document.querySelector('.progress-bar').style.width = scrolled + '%'
})


// Navbar medium screen, open/close functionality
const navLinks = document.querySelectorAll('.nav-link')
const burgerMenu = document.querySelector('#burger-check')

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.checked = false
    setPreventScroll(false)  // Allow scrolling on the page again after clicking a nav-link
  })
})


// Prevent scrolling on page when burger-menu is open
burgerMenu.addEventListener('change', () => {
  const menuIsOpen = burgerMenu.checked
  setPreventScroll(menuIsOpen)
})

const setPreventScroll = (scrollable) => {
  const body = document.querySelector('body')
  body.classList.toggle('noscroll', scrollable)
}


// Make header disappear and reappear on scroll when on smaller devices
const deviceWidth = window.innerWidth

if(deviceWidth <= 1150) {
  let prevScrollPos = window.pageYOffset

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header')
    const currScrollPos = window.pageYOffset
  
    if(prevScrollPos > currScrollPos){
      header.style.top = '0'
    } else {
      header.style.top = '-100px'
    }
  
    prevScrollPos = currScrollPos
  })
}



// Intersection Observer used for the background bubble animation (better than eventlisteners on scroll)
const optionsBgAnim = {
  threshold: 1
}

const animate = (entries, observer) => {
  entries.map((entry) => {
    const target = entry.target.previousElementSibling
    console.log('target', target);
    if(entry.isIntersecting) {
      if(target.className.includes('about-us-bg')){
        target.classList.add('bg-effect')
      }
      if(target.className.includes('projects-bg')){
        target.classList.add('bg-effect')
      }
      if(target.className.includes('contact-bg')){
        const bubbles = document.querySelectorAll('.bubble')
        bubbles.forEach(bubble => {
          bubble.classList.add('bubble-effect')
        })
      }
    }
  })
}

const sectionBgObserver = new IntersectionObserver(animate, optionsBgAnim)

const projectSectionTitle = document.querySelector('section#projects h2')
const aboutSectionTitle = document.querySelector('section#about-us h2')
const contactUsTitle = document.querySelector('section#contact h2')
sectionBgObserver.observe(projectSectionTitle)
sectionBgObserver.observe(aboutSectionTitle)
sectionBgObserver.observe(contactUsTitle)