import {Controller} from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    startSectionNodeNumber = 0
    sectionNodeNumber = 0
    maxSites = document.querySelectorAll('section').length
    isScrolling = false;
    currentScrollY = 0;
    lastScrollPosition = 0;
    scrollTop;
    scrollLeft;
    scrollTimeStamp;
    scrollDirection;
    sectionOffset;
    currentOffsetHeight;

    /**
     *
     */
    connect() {
        const navbarToggle = document.querySelector('.navbar-container')
        const links = document.querySelectorAll('a[href^="#"]');
        const pages = document.querySelectorAll('section');
        const sections = document.querySelectorAll('section');
        const navTop = document.querySelectorAll('.nav-top');
        const body = document.querySelectorAll('body');

        this.sectionOffset = []
        sections.forEach((value, key) => {
            this.sectionOffset.push(sections[key].offsetTop)
        })


        //console.log(document.querySelectorAll('section')[1])

        let mousePos = {
            pageX: undefined,
            pageY: undefined
        };

        this.setSectionHeight();

        document.addEventListener("mousemove", (mouseEvent) => {
            //console.log(mouseEvent.screenY);
            mousePos = {
                pageX: mouseEvent.pageX,
                pageY: mouseEvent.pageY,
                //layerX: mouseEvent.layerX,
                //layerY: mouseEvent.layerY
            };
        });

        window.addEventListener("scroll", (event) => {

        });
        //console.log(this.prevScrollY);

        window.addEventListener("wheel", e => {
            //if (this.isScrolling) return;
            //this.isScrolling = true;

            //const scrollDirection = e.deltaY < 0 ? 1 : -1;
            //console.log('001: '+scrollDirection)
            //const scrollDirection2 = window.scrollY < 0 ? 1 : -1;
            //console.log('window.scrollY: '+window.scrollY)
            //console.log('before: '+this.currentScrollY)
            //let scrollDirection2;

            //console.log('002: '+scrollDirection2)
            //this.prevScrollY = window.scrollY;

/*            if (scrollDirection >= 0) {
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
            }*/

            // Set a timeout to reset isScrolling after a delay (e.g., 500 milliseconds)
/*            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);*/
        })

        const navHeight = navTop[0].offsetHeight;
        this.currentOffsetHeight = window.scrollY + navHeight;

        let lastScrollPosition = 0;

        window.onscroll = (event) => {

            const currentScrollPosition = window.scrollY;

            let scrollDirection;
            if (currentScrollPosition > lastScrollPosition && this.getCurrentSection(sections) === 0) {
                scrollDirection = 1; // Scroll down
            } else if (currentScrollPosition < lastScrollPosition) {
                scrollDirection = -1; // Scroll up
            } else {
                scrollDirection = 0; // No vertical scroll
            }

            // Update the last scroll position for the next comparison
            lastScrollPosition = currentScrollPosition;

            // Output the scroll direction
            console.log("Scroll Direction: ", scrollDirection);

            /*
            if (this.currentOffsetHeight >= navHeight) {
                console.log('scroll down');
                this.currentOffsetHeight = window.scrollY + navHeight;
            } else if (scrollY <= this.lastScrollPosition) {

            }*/


            //if (event) {
                //return
                //console.log('isScrolling')
            //}
            //this.stopScrolling(scrollTop, scrollLeft);
            // Get the current page scroll position


            //this.stopScrolling(scrollTop, scrollLeft);

            if (this.isScrolling) {
/*                window.scrollTo({
                    left: document.querySelectorAll('section')[this.sectionNodeNumber].offsetLeft,
                    top: document.querySelectorAll('section')[this.sectionNodeNumber].offsetTop,
                    behavior: 'instant'
                });
                return*/
            }
            this.isScrolling = true;

            const currentSection = this.getCurrentSection(sections);
            console.log(currentSection)
            //console.log('this.lastScrollPosition Before: '+this.lastScrollPosition)
            let scrollY =  Math.round(window.scrollY);
            if (scrollY >= this.lastScrollPosition) {
                //console.log('scroll down');

                this.scrollDirection = 1; // Scroll down
            } else if (scrollY <= this.lastScrollPosition) {
                this.scrollDirection = -1; // Scroll up
            } else {
                this.scrollDirection = 0; // No vertical scroll
            }
            //console.log('window.scrollY: '+scrollY)
            //console.log('this.lastScrollPosition After: '+this.lastScrollPosition)

            if (window.scrollY <= this.lastScrollPosition) {
                //console.log('scroll up');
            }

            // Update the last scroll position for the next comparison
            this.lastScrollPosition = window.scrollY;


            if (this.scrollDirection >= 0) {
                // Scroll up
                if (this.sectionNodeNumber !== 0) {
                    let prevSectionNumber = this.sectionNodeNumber - 1;
                    //console.log('Scroll up');
                    //this.scrollToSection(prevSectionNumber);
                }
            } else {
                // Scroll down
                if (this.startSectionNodeNumber === this.sectionNodeNumber) {
                    // Must be #home section, scroll to the next section
                    //console.log('Scroll down start');
                    //this.scrollToSection(1);
                } else {
                    let nextSectionNumber = this.sectionNodeNumber + 1;
                    if (nextSectionNumber !== this.maxSites) {
                        //console.log('Scroll down');
                        //this.scrollToSection(nextSectionNumber);
                    }
                }
            }
            if (navbarToggle.classList.contains('show') && event.type === 'scroll') {
                document.getElementsByClassName('navbar-toggler')[0].click();
                //console.log(this.sectionNodeNumber);
            }

            //window.scrollTo(0, 1966);
            //console.log(mousePos)
            // Set a timeout to reset isScrolling after a delay (e.g., 500 milliseconds)
/*            setTimeout(() => {
                this.isScrolling = false;
            }, 1000);*/
        }




        links.forEach(link => {
            link.addEventListener('click', function (e) {
                //e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                //console.log(targetId)
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    //console.log(targetElement.offsetTop)
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'auto'
                    });
                }
            });
        });
    }

    getCurrentSection(sections) {
        const currentScrollPosition = window.scrollY;
        const startSectionOffset = 0

        let section = undefined;
        this.sectionOffset.forEach((value, key) => {
            if (key === 0 &&
                startSectionOffset <= currentScrollPosition &&
                (currentScrollPosition <= sections[key + 1].offsetTop)) {
                section = 0;
            }
            if (startSectionOffset <= currentScrollPosition &&
                currentScrollPosition >= sections[key].offsetTop) {
                section = key;
            }

        })
        return section;

    }
    stopScrolling(scrollTop, scrollLeft) {
        window.scrollTo({
            left: scrollLeft,
            top: scrollTop,
            behavior: 'instant'
        });
    }

    scrollToSection(sectionNodeNumber) {
        console.log('sectionNodeNumber: '+sectionNodeNumber)
        window.scrollTo({
            top: document.querySelectorAll('section')[sectionNodeNumber].offsetTop,
            behavior: 'smooth'
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

    setSectionHeight() {
       // window.
    }
}