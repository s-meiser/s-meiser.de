import {Controller} from '@hotwired/stimulus';

/* stimulusFetch: 'lazy' */
export default class extends Controller {

    scrollTop;
    scrollLeft;
    currentOffsetHeight;

    /**
     *
     */
    connect() {
        const navbarToggle = document.querySelector('.navbar-container')
        const links = document.querySelectorAll('a[href^="#"]');
        const navTop = document.querySelectorAll('.nav-top');

        const navHeight = navTop[0].offsetHeight;
        this.currentOffsetHeight = window.scrollY + navHeight;

        let lastScrollPosition = 0;

        window.onscroll = (event) => {
            if (navbarToggle.classList.contains('show') && event.type === 'scroll') {
                document.getElementsByClassName('navbar-toggler')[0].click();
            }
        }

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                //e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'auto'
                    });
                }
            });
        });
    }

    /**
     *
     * @param event
     */
    navbar(event) {
        const navbarToggle = document.querySelector('.navbar-container')

        navbarToggle.classList.toggle('show');
        navbarToggle.classList.toggle('column');

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