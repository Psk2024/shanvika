/* =========================================================
   SHANVIKA BIRTHDAY POSTER
   FULL SCRIPT
========================================================= */

(function () {

    "use strict";


    /* =========================================================
       HELPERS
    ========================================================= */

    function $(id) {
        return document.getElementById(id);
    }


    function prefersReducedMotion() {

        return window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

    }


    /* =========================================================
       ELEMENTS
    ========================================================= */

    var preloader = $("preloader");

    var preloaderLoading =
        $("preloader-loading");

    var preloaderCountdown =
        $("preloader-countdown");

    var poster =
        document.querySelector(".poster");

    var fabStack =
        document.querySelector(".fab-stack");

    var birthdayAudio = null;

    var musicPlaying = false;


    /* =========================================================
       COUNTDOWN
       
       Birthday:
       22 August 2026
       00:00:00 IST

       +05:30 = India Standard Time
    ========================================================= */

    var TARGET_DATE =
        new Date(
            "2026-08-22T09:00:00+05:30"
        ).getTime();


    /* =========================================================
       COUNTDOWN ELEMENTS
    ========================================================= */

    var daysEl =
        $("cd-days");

    var hoursEl =
        $("cd-hours");

    var minutesEl =
        $("cd-mins");

    var secondsEl =
        $("cd-secs");


    /* =========================================================
       COUNTDOWN HELPERS
    ========================================================= */

    function padNumber(number) {

        return String(number)
            .padStart(2, "0");

    }


    /* =========================================================
       UPDATE COUNTDOWN
    ========================================================= */

    function updateCountdown() {

        var now =
            Date.now();

        var difference =
            TARGET_DATE - now;


        /*
         * Birthday has arrived.
         */
        if (difference <= 0) {

            if (daysEl) {
                daysEl.textContent = "00";
            }

            if (hoursEl) {
                hoursEl.textContent = "00";
            }

            if (minutesEl) {
                minutesEl.textContent = "00";
            }

            if (secondsEl) {
                secondsEl.textContent = "00";
            }

            return true;
        }


        /*
         * Convert milliseconds
         * into total seconds.
         */
        var totalSeconds =
            Math.floor(
                difference / 1000
            );


        /*
         * Calculate days.
         */
        var days =
            Math.floor(
                totalSeconds / 86400
            );


        /*
         * Calculate hours.
         */
        var hours =
            Math.floor(
                (totalSeconds % 86400) /
                3600
            );


        /*
         * Calculate minutes.
         */
        var minutes =
            Math.floor(
                (totalSeconds % 3600) /
                60
            );


        /*
         * Calculate seconds.
         */
        var seconds =
            totalSeconds % 60;


        /*
         * Update HTML.
         */
        if (daysEl) {

            daysEl.textContent =
                padNumber(days);

        }


        if (hoursEl) {

            hoursEl.textContent =
                padNumber(hours);

        }


        if (minutesEl) {

            minutesEl.textContent =
                padNumber(minutes);

        }


        if (secondsEl) {

            secondsEl.textContent =
                padNumber(seconds);

        }


        return false;

    }


    /* =========================================================
       SHOW COUNTDOWN
    ========================================================= */

    function showCountdown() {

        /*
         * Hide normal loading message.
         */
        if (preloaderLoading) {

            preloaderLoading.hidden =
                true;

        }


        /*
         * Show countdown.
         */
        if (preloaderCountdown) {

            preloaderCountdown.hidden =
                false;

        }

    }


    /* =========================================================
       HIDE PRELOADER
       
       IMPORTANT:
       This function is called ONLY after
       the countdown reaches zero.
    ========================================================= */

    function hidePreloader() {

        if (!preloader) {

            revealPoster();

            return;

        }


        preloader.classList.add(
            "preloader-hidden"
        );


        setTimeout(
            function () {

                if (preloader) {

                    preloader.style.display =
                        "none";

                }

            },
            800
        );

    }


    /* =========================================================
       REVEAL POSTER
    ========================================================= */

    function revealPoster() {

        document.body.classList.add(
            "poster-revealed"
        );


        /*
         * Show audio control only after
         * preloader disappears.
         */
        if (fabStack) {

            setTimeout(
                function () {

                    fabStack.classList.add(
                        "fab-visible"
                    );

                },
                700
            );

        }


        /*
         * Reveal animations.
         */
        setTimeout(
            function () {

                burstSparkles();

                burstBalloons();

            },
            500
        );

    }


    /* =========================================================
       REVEAL SPARKLE BURST
    ========================================================= */

    function burstSparkles() {

        if (!poster) {

            return;

        }


        if (prefersReducedMotion()) {

            return;

        }


        var canvas =
            document.createElement(
                "canvas"
            );


        canvas.id =
            "reveal-burst";


        poster.appendChild(
            canvas
        );


        var rect =
            poster.getBoundingClientRect();


        var dpr =
            window.devicePixelRatio || 1;


        canvas.width =
            Math.floor(
                rect.width * dpr
            );


        canvas.height =
            Math.floor(
                rect.height * dpr
            );


        canvas.style.width =
            rect.width + "px";


        canvas.style.height =
            rect.height + "px";


        var ctx =
            canvas.getContext(
                "2d"
            );


        if (!ctx) {

            return;

        }


        ctx.scale(
            dpr,
            dpr
        );


        var particles = [];

        var particleCount = 90;


        var centerX =
            rect.width / 2;


        var centerY =
            rect.height * 0.45;


        var colors = [

            "#f0c48a",

            "#e3a98f",

            "#d8b4a0",

            "#c9a86b",

            "#ecd9b8",

            "#cbb08a"

        ];


        for (
            var i = 0;
            i < particleCount;
            i++
        ) {

            var angle =
                Math.random() *
                Math.PI *
                2;


            var speed =
                1.5 +
                Math.random() * 4;


            particles.push({

                x: centerX,

                y: centerY,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                size:
                    1.5 +
                    Math.random() * 3,

                life: 1,

                decay:
                    0.008 +
                    Math.random() * 0.012,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ]

            });

        }


        var running = true;


        function tick() {

            if (!running) {

                return;

            }


            ctx.clearRect(

                0,

                0,

                rect.width,

                rect.height

            );


            var alive = false;


            particles.forEach(
                function (p) {

                    if (p.life <= 0) {

                        return;

                    }


                    alive = true;


                    p.x += p.vx;

                    p.y += p.vy;


                    p.vy += 0.025;


                    p.life -= p.decay;


                    ctx.globalAlpha =
                        Math.max(
                            0,
                            p.life
                        );


                    ctx.fillStyle =
                        p.color;


                    ctx.beginPath();


                    ctx.arc(

                        p.x,

                        p.y,

                        p.size,

                        0,

                        Math.PI * 2

                    );


                    ctx.fill();

                }
            );


            ctx.globalAlpha = 1;


            if (alive) {

                requestAnimationFrame(
                    tick
                );

            } else {

                cleanup();

            }

        }


        function cleanup() {

            running = false;


            if (canvas.parentNode) {

                canvas.parentNode.removeChild(
                    canvas
                );

            }

        }


        requestAnimationFrame(
            tick
        );


        setTimeout(
            cleanup,
            8000
        );

    }


    /* =========================================================
       ONE-TIME BALLOON BURST
    ========================================================= */

    function burstBalloons() {

        var container =
            $("extra-balloons");


        if (!container) {

            return;

        }


        if (prefersReducedMotion()) {

            return;

        }


        var colors = [

            "#f0c48a",

            "#e3a98f",

            "#d8b4a0",

            "#c9a86b",

            "#ecd9b8",

            "#cbb08a"

        ];


        var count = 5;


        for (
            var i = 0;
            i < count;
            i++
        ) {

            (function (index) {

                setTimeout(
                    function () {

                        var balloon =
                            document.createElement(
                                "div"
                            );


                        balloon.className =
                            "rise-balloon";


                        var size =
                            46 +
                            Math.random() * 40;


                        balloon.style.left =
                            (
                                8 +
                                Math.random() * 84
                            ) + "%";


                        balloon.style.width =
                            size + "px";


                        balloon.style.height =
                            (
                                size * 1.24
                            ) + "px";


                        balloon.style.background =
                            colors[
                                Math.floor(
                                    Math.random() *
                                    colors.length
                                )
                            ];


                        balloon.style.animationDuration =
                            (
                                4.5 +
                                Math.random() * 1.5
                            ) + "s";


                        container.appendChild(
                            balloon
                        );


                        setTimeout(
                            function () {

                                if (
                                    balloon.parentNode
                                ) {

                                    balloon.parentNode
                                        .removeChild(
                                            balloon
                                        );

                                }

                            },
                            6500
                        );

                    },
                    index * 260
                );

            })(i);

        }

    }


    /* =========================================================
       CUSTOM BACKGROUND MUSIC
       
       Uses music1.mp3 from same folder.
    ========================================================= */

    function wireAudio() {

        var btn =
            $("audioToggle");


        birthdayAudio =
            $("birthdayAudio");


        if (
            !btn ||
            !birthdayAudio
        ) {

            return;

        }


        /*
         * Initial state.
         */
        musicPlaying = false;


        btn.textContent =
            "🔇";


        btn.setAttribute(
            "aria-label",
            "Play background music"
        );


        /*
         * Audio error handling.
         */
        birthdayAudio.addEventListener(
            "error",
            function () {

                musicPlaying = false;


                btn.textContent =
                    "🔇";


                btn.setAttribute(
                    "aria-label",
                    "Play background music"
                );

            }
        );


        /*
         * Audio ended handling.
         */
        birthdayAudio.addEventListener(
            "ended",
            function () {

                musicPlaying = false;


                btn.textContent =
                    "🔇";


                btn.setAttribute(
                    "aria-label",
                    "Play background music"
                );

            }
        );


        /*
         * Audio button.
         */
        btn.addEventListener(
            "click",
            function () {


                /*
                 * Pause music.
                 */
                if (musicPlaying) {

                    birthdayAudio.pause();


                    musicPlaying =
                        false;


                    btn.textContent =
                        "🔇";


                    btn.setAttribute(
                        "aria-label",
                        "Play background music"
                    );


                    return;

                }


                /*
                 * Start music.
                 *
                 * Browser autoplay restrictions
                 * are satisfied because this happens
                 * after a user click.
                 */
                var playPromise =
                    birthdayAudio.play();


                if (
                    playPromise &&
                    typeof playPromise.then ===
                    "function"
                ) {

                    playPromise.then(
                        function () {

                            musicPlaying =
                                true;


                            btn.textContent =
                                "🔊";


                            btn.setAttribute(
                                "aria-label",
                                "Pause background music"
                            );

                        }
                    ).catch(
                        function () {

                            musicPlaying =
                                false;


                            btn.textContent =
                                "🔇";


                            btn.setAttribute(
                                "aria-label",
                                "Play background music"
                            );

                        }
                    );

                } else {

                    musicPlaying =
                        true;


                    btn.textContent =
                        "🔊";

                }

            }
        );

    }


    /* =========================================================
       COUNTDOWN COMPLETION
       
       This is called ONLY when the countdown
       reaches 00 : 00 : 00 : 00.
    ========================================================= */

    function birthdayUnlocked() {

        /*
         * Keep 00:00:00:00 visible briefly.
         */
        setTimeout(
            function () {

                /*
                 * Hide countdown/preloader.
                 */
                hidePreloader();


                /*
                 * Reveal poster after
                 * preloader fade.
                 */
                setTimeout(
                    function () {

                        revealPoster();

                    },
                    250
                );

            },
            700
        );

    }


    /* =========================================================
       PAGE INITIALISATION
    ========================================================= */

    function initialise() {

        /*
         * Connect audio controls.
         */
        wireAudio();


        /*
         * Show countdown immediately.
         */
        showCountdown();


        /*
         * Update countdown immediately.
         */
        var birthdayReached =
            updateCountdown();


        /*
         * If birthday has already arrived,
         * reveal the poster.
         */
        if (birthdayReached) {

            birthdayUnlocked();

            return;

        }


        /*
         * Continue countdown every second.
         *
         * IMPORTANT:
         * There is NO 1.8 second preloader timeout.
         *
         * The preloader remains visible until
         * the target date is reached.
         */
        var countdownTimer =
            setInterval(
                function () {

                    var reached =
                        updateCountdown();


                    /*
                     * Birthday reached.
                     */
                    if (reached) {

                        clearInterval(
                            countdownTimer
                        );


                        birthdayUnlocked();

                    }

                },
                1000
            );

    }


    /* =========================================================
       DOM READY
    ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialise
        );

    } else {

        initialise();

    }


})();
