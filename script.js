document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       MOBILE MENU
       ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("show");

            const isOpen = mainNav.classList.contains("show");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Menu मधील link वर click केल्यावर menu बंद करा

        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================
       CURRENT YEAR
       ===================================== */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       ACTIVE MENU
       ===================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();

    const allNavLinks =
        document.querySelectorAll(".main-nav a");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (currentPage === "" &&
             linkPage === "index.html")
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================
       SCROLL REVEAL ANIMATION
       ===================================== */

    const animatedElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".objective-card, " +
            ".poet-card, " +
            ".award-card, " +
            ".honour-card, " +
            ".gallery-card, " +
            ".activity-card, " +
            ".story-box, " +
            ".timeline-item, " +
            ".contact-item"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(function (element) {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }


    /* =====================================
       SMOOTH SCROLL
       ===================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });


    /* =====================================
       CONTACT FORM
       ===================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm && formMessage) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                formMessage.style.display =
                    "block";

                formMessage.textContent =
                    "धन्यवाद! आपला संदेश नोंदवला गेला आहे.";

                contactForm.reset();

                setTimeout(function () {

                    formMessage.style.display =
                        "none";

                }, 5000);

            }
        );

    }


    /* =====================================
       GALLERY IMAGE FALLBACK
       ===================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-card img"
        );

    galleryImages.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                this.style.display = "none";

                const parent =
                    this.parentElement;

                parent.classList.add(
                    "gallery-placeholder"
                );

            }
        );

    });


    /* =====================================
       CLOSE MOBILE MENU WHEN
       CLICKING OUTSIDE
       ===================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                mainNav &&
                menuToggle &&
                mainNav.classList.contains("show") &&
                !mainNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mainNav.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.textContent = "☰";

            }

        }
    );


    /* =====================================
       ESCAPE KEY - CLOSE MENU
       ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mainNav &&
                mainNav.classList.contains("show")
            ) {

                mainNav.classList.remove("show");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.textContent = "☰";

                }

            }

        }
    );

});
