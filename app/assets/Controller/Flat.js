import {Controller} from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    startSectionNodeNumber = 0
    sectionNodeNumber = 0
    maxSites = document.querySelectorAll('section').length
    /**
     *
     */
    connect() {
        const navbarToggle = document.querySelector('.navbar-container')
        const links = document.querySelectorAll('a[href^="#"]');
        const pages = document.querySelectorAll('section');

        //console.log(document.querySelectorAll('section')[1])

        let mousePos = {
            pageX: undefined,
            pageY: undefined
        };

        document.addEventListener("mousemove", (mouseEvent) => {
            //console.log(mouseEvent.screenY);
            mousePos = {
                pageX: mouseEvent.pageX,
                pageY: mouseEvent.pageY,
                //layerX: mouseEvent.layerX,
                //layerY: mouseEvent.layerY
            };
        });

        window.addEventListener("wheel", e => {
            const scrollDirection = e.deltaY < 0 ? 1 : -1;

            if (scrollDirection >= 0) {
                // scroll up
                if (this.sectionNodeNumber !== 0) {
                    let prevSectionNumber = this.sectionNodeNumber-1;
                    this.scrollToSection(prevSectionNumber)
                }
            } else {
                // scroll down
                if (this.startSectionNodeNumber === this.sectionNodeNumber) {
                    // must be #home section, scroll to next section
                    this.scrollToSection(1)
                } else {
                    let nextSectionNumber = this.sectionNodeNumber+1;
                    if (nextSectionNumber !== this.maxSites) {
                        this.scrollToSection(nextSectionNumber)
                    }
                }
            }
        })

        window.onscroll = (event) => {
            if (event.type === 'scroll') {
                //console.log(event)
            }
            if (navbarToggle.classList.contains('show') && event.type === 'scroll') {
                document.getElementsByClassName('navbar-toggler')[0].click();
                //console.log(this.sectionNodeNumber);
            }

            //window.scrollTo(0, 1966);
            //console.log(mousePos)
        }




        links.forEach(link => {
            link.addEventListener('click', function (e) {
                //e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                console.log(targetId)
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    console.log(targetElement.offsetTop)
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'auto'
                    });
                }
            });
        });
    }

    scrollToSection(sectionNodeNumber) {
        window.scrollTo({
            top: document.querySelectorAll('section')[sectionNodeNumber].offsetTop,
            behavior: 'auto'
        });
        this.sectionNodeNumber = sectionNodeNumber;
    }

    /**
     *
     * @param event
     */
    navbar(event) {
        const navbarToggle = document.querySelector('.navbar-container')

        navbarToggle.classList.toggle('show');
        navbarToggle.classList.toggle('column');

        //const contentContainer = document.querySelector('.content-container')
        //contentContainer.classList.toggle('position-relative')

        const navbarGridEffect = document.querySelector('.navbar-grid-effect')
        navbarGridEffect.classList.toggle('grid-effect-show');

        const menuButtonBar = document.querySelectorAll('.menu-button-bar')

        menuButtonBar.forEach((value, key) => {
            if (key === 0) {
                value.classList.toggle('menu-bar-0');
            }
            if (key === 1) {
                value.classList.toggle('menu-bar-1');
            }
            if (key === 2) {
                value.classList.toggle('menu-bar-2');
            }
        });
    }

    navLink(event) {


        const clickedLink = event.target.attributes['data-href'].nodeValue;
        const targetElement = document.getElementById(clickedLink.substring(1));
        //console.log(targetElement)
        if (targetElement) {
            this.currentSiteHash = clickedLink;
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'auto'
            });
        }

        const navLinks = document.querySelectorAll('.navbar-nav li a');
        navLinks.forEach(function(link) {
            document.querySelectorAll('.navbar-nav li > a.active').forEach(function(item) {
                item.classList.remove('active');
            });
            event.target.classList.add('active');
        });
    }
}