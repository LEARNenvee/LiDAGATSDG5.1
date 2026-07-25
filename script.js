/*======================================================
LiDAGAT Version 3.0
SCRIPT.JS
PART 1

Professional Architecture
======================================================*/

"use strict";

/*======================================================
APP
======================================================*/

const App = {

    init(){

        this.cacheDOM();

        this.bindEvents();

        Loader.init();

        Theme.init();

        Navigation.init();

        ProgressBar.init();

        BackToTop.init();

        Counter.init();

        ScrollReveal.init();

    },

    cacheDOM(){

        this.body = document.body;

        this.header = document.getElementById("header");

    },

    bindEvents(){

        document.addEventListener(

            "DOMContentLoaded",

            () => {

                console.log("LiDAGAT Ready");

            }

        );

    }

};

/*======================================================
LOADER
======================================================*/

const Loader = {

    init(){

        const hide = () => {

            const loader = document.getElementById("loader");

            if(!loader) return;

            loader.style.opacity = "0";

            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            },600);

        };

        window.addEventListener("load", hide);

        // Failsafe in case the "load" event never fires
        setTimeout(hide, 4000);

    }

};

/*======================================================
THEME

Toggles a class called "dark" on <body>, which style.css
treats as the ALTERNATE theme (since the default look is
already the dark aurora background). Also swaps the
moon/sun icon so the button reflects current state.
======================================================*/

const Theme = {

    init(){

        this.button = document.getElementById("themeButton");

        if(!this.button) return;

        this.icon = this.button.querySelector("i");

        this.loadTheme();

        this.button.addEventListener(

            "click",

            () => this.toggle()

        );

    },

    loadTheme(){

        const saved = localStorage.getItem("theme");

        if(saved === "dark"){

            document.body.classList.add("dark");

            this.updateIcon(true);

        }

    },

    toggle(){

        document.body.classList.toggle("dark");

        const isAlt = document.body.classList.contains("dark");

        localStorage.setItem(

            "theme",

            isAlt ? "dark" : "light"

        );

        this.updateIcon(isAlt);

    },

    updateIcon(isAlt){

        if(!this.icon) return;

        this.icon.className = isAlt

        ? "ri-sun-fill"

        : "ri-moon-clear-fill";

    }

};

/*======================================================
NAVIGATION
======================================================*/

const Navigation = {

    init(){

        this.menu = document.getElementById("menuButton");

        this.nav = document.getElementById("navbar");

        if(!this.menu || !this.nav) return;

        this.menu.addEventListener(

            "click",

            () => {

                this.nav.classList.toggle("show");

            }

        );

    }

};

/*======================================================
PROGRESS BAR
======================================================*/

const ProgressBar = {

    init(){

        this.bar = document.getElementById("progressBar");

        if(!this.bar) return;

        window.addEventListener(

            "scroll",

            () => this.update()

        );

    },

    update(){

        const total =

        document.documentElement.scrollHeight -

        document.documentElement.clientHeight;

        const current =

        (window.scrollY / total) * 100;

        this.bar.style.width = current + "%";

    }

};

/*======================================================
BACK TO TOP
======================================================*/

const BackToTop = {

    init(){

        this.button = document.getElementById("topButton");

        if(!this.button) return;

        window.addEventListener(

            "scroll",

            () => this.show()

        );

        this.button.addEventListener(

            "click",

            () => {

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    },

    show(){

        this.button.style.display =

        window.scrollY > 500

        ? "flex"

        : "none";

    }

};

/*======================================================
COUNTERS
======================================================*/

const Counter = {

    values:[

        {

            id:"count1",

            target:300

        },

        {

            id:"count2",

            target:120

        },

        {

            id:"count3",

            target:80

        },

        {

            id:"count4",

            target:100

        }

    ],

    init(){

        this.values.forEach(

            counter => this.animate(counter)

        );

    },

    animate(counter){

        const element =

        document.getElementById(counter.id);

        if(!element) return;

        let current = 0;

        const speed =

        Math.ceil(counter.target / 120);

        const update = () => {

            current += speed;

            if(current >= counter.target){

                element.textContent = counter.target;

                return;

            }

            element.textContent = current;

            requestAnimationFrame(update);

        };

        update();

    }

};

/*======================================================
SCROLL REVEAL
======================================================*/

const ScrollReveal = {

    init(){

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        entry.target.classList.add("visible");

                    }

                });

            },

            {

                threshold:.15

            }

        );

        document

        .querySelectorAll(

            ".glass-card,.section-header,.gallery-card"

        )

        .forEach(item => {

            observer.observe(item);

        });

    }

};

/*======================================================
START APP
======================================================*/

App.init();
/*======================================================
LiDAGAT Version 3.0
SCRIPT.JS
PART 2

Community
Reviews
Poll
Reactions
======================================================*/

/*======================================================
COMMENTS
======================================================*/

const Comments = {

    key:"lidagat_comments",

    init(){

        this.button=document.getElementById("commentButton");
        this.input=document.getElementById("commentInput");
        this.container=document.getElementById("commentSection");

        if(!this.button || !this.input || !this.container){

            return;

        }

        this.comments=
        JSON.parse(localStorage.getItem(this.key)) || [];

        this.render();

        this.button.addEventListener(

            "click",

            ()=>this.add()

        );

    },

    add(){

        const text=this.input.value.trim();

        if(text===""){

            alert("Please enter a comment.");

            return;

        }

        this.comments.unshift({

            name:"Anonymous Supporter",

            text:text,

            date:new Date().toLocaleString()

        });

        localStorage.setItem(

            this.key,

            JSON.stringify(this.comments)

        );

        this.input.value="";

        this.render();

    },

    render(){

        this.container.innerHTML="";

        this.comments.forEach(item=>{

            const card=document.createElement("div");

            card.className="comment";

            card.innerHTML=`

                <h4>${item.name}</h4>

                <small>${item.date}</small>

                <p>${item.text}</p>

            `;

            this.container.appendChild(card);

        });

    }

};

/*======================================================
REVIEWS
======================================================*/

const Reviews={

    key:"lidagat_reviews",

    init(){

        this.name=document.getElementById("reviewName");
        this.review=document.getElementById("reviewText");
        this.button=document.getElementById("reviewButton");
        this.container=document.getElementById("reviewContainer");

        if(!this.button) return;

        this.data=
        JSON.parse(localStorage.getItem(this.key)) || [];

        this.render();

        this.button.addEventListener(

            "click",

            ()=>this.add()

        );

    },

    add(){

        const name=this.name.value.trim();

        const review=this.review.value.trim();

        if(name==="" || review===""){

            alert("Please complete both fields.");

            return;

        }

        this.data.unshift({

            name,

            review

        });

        localStorage.setItem(

            this.key,

            JSON.stringify(this.data)

        );

        this.name.value="";

        this.review.value="";

        this.render();

    },

    render(){

        this.container.innerHTML="";

        this.data.forEach(item=>{

            const card=document.createElement("article");

            card.className="review-card";

            card.innerHTML=`

                <h4>${item.name}</h4>

                <p>${item.review}</p>

            `;

            this.container.appendChild(card);

        });

    }

};

/*======================================================
REACTIONS
======================================================*/

const Reactions={

    key:"lidagat_reactions",

    defaults:{

        like:0,

        love:0,

        support:0,

        inspire:0,

        together:0

    },

    init(){

        this.data=

        JSON.parse(localStorage.getItem(this.key))

        || {...this.defaults};

        Object.keys(this.defaults).forEach(type=>{

            const button=document.getElementById(type+"Reaction");

            const count=document.getElementById(type+"Count");

            if(!button || !count) return;

            count.textContent=this.data[type];

            button.addEventListener("click",()=>{

                this.data[type]++;

                count.textContent=this.data[type];

                localStorage.setItem(

                    this.key,

                    JSON.stringify(this.data)

                );

            });

        });

    }

};

/*======================================================
POLL
======================================================*/

const Poll={

    init(){

        this.form=document.getElementById("pollForm");
        this.result=document.getElementById("pollResult");

        if(!this.form) return;

        this.form.addEventListener(

            "submit",

            e=>{

                e.preventDefault();

                this.vote();

            }

        );

    },

    vote(){

        const selected=document.querySelector(

            'input[name="vote"]:checked'

        );

        if(!selected){

            alert("Please select an option.");

            return;

        }

        this.result.innerHTML=`

            <strong>

                Thank you for participating!

            </strong>

            <br><br>

            You voted:

            <strong>

                ${selected.value}

            </strong>

        `;

    }

};

/*======================================================
CONTACT FORM
======================================================*/

const Contact={

    init(){

        const form=document.getElementById("contactForm");

        if(!form) return;

        form.addEventListener("submit",e=>{

            e.preventDefault();

            alert(

                "Thank you! Your message has been received."

            );

            form.reset();

        });

    }

};

/*======================================================
INITIALIZE
======================================================*/

Comments.init();

Reviews.init();

Reactions.init();

Poll.init();

Contact.init();
/*======================================================
LiDAGAT Version 3.0
SCRIPT.JS
PART 3

Gallery
Smooth Scroll
Active Navigation
Parallax
======================================================*/

"use strict";

/*======================================================
GALLERY LIGHTBOX
======================================================*/

const Gallery = {

    init(){

        this.images = document.querySelectorAll(".gallery-card img");

        if(this.images.length === 0){

            return;

        }

        this.createLightbox();

        this.images.forEach(image=>{

            image.addEventListener(

                "click",

                ()=>this.open(image.src,image.alt)

            );

        });

    },

    createLightbox(){

        this.lightbox=document.createElement("div");

        this.lightbox.id="lightbox";

        this.lightbox.innerHTML=`

            <span id="lightboxClose">&times;</span>

            <img id="lightboxImage">

        `;

        document.body.appendChild(this.lightbox);

        this.image=this.lightbox.querySelector("#lightboxImage");

        this.close=this.lightbox.querySelector("#lightboxClose");

        this.close.addEventListener(

            "click",

            ()=>this.hide()

        );

        this.lightbox.addEventListener(

            "click",

            e=>{

                if(e.target===this.lightbox){

                    this.hide();

                }

            }

        );

    },

    open(src,alt){

        this.image.src=src;

        this.image.alt=alt;

        this.lightbox.classList.add("show");

        document.body.style.overflow="hidden";

    },

    hide(){

        this.lightbox.classList.remove("show");

        document.body.style.overflow="";

    }

};

/*======================================================
SMOOTH SCROLL
======================================================*/

const SmoothScroll={

    init(){

        document

        .querySelectorAll('a[href^="#"]')

        .forEach(link=>{

            link.addEventListener("click",e=>{

                const target=

                document.querySelector(

                link.getAttribute("href")

                );

                if(!target){

                    return;

                }

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            });

        });

    }

};

/*======================================================
ACTIVE NAVIGATION
======================================================*/

const ActiveNavigation={

    init(){

        this.sections=

        document.querySelectorAll("section[id]");

        this.links=

        document.querySelectorAll("nav a");

        window.addEventListener(

            "scroll",

            ()=>this.update()

        );

        this.update();

    },

    update(){

        let current="";

        this.sections.forEach(section=>{

            const top=

            section.offsetTop-150;

            if(window.scrollY>=top){

                current=section.id;

            }

        });

        this.links.forEach(link=>{

            link.classList.remove("active");

            if(

                link.getAttribute("href")

                ==="#"+current

            ){

                link.classList.add("active");

            }

        });

    }

};

/*======================================================
HEADER BLUR ON SCROLL
======================================================*/

const Header={

    init(){

        const header=

        document.getElementById("header");

        if(!header){

            return;

        }

        window.addEventListener(

            "scroll",

            ()=>{

                if(window.scrollY>60){

                    header.classList.add("scrolled");

                }else{

                    header.classList.remove("scrolled");

                }

            }

        );

    }

};

/*======================================================
INITIALIZE
======================================================*/

Gallery.init();

SmoothScroll.init();

ActiveNavigation.init();

Header.init();

console.log(

    "LiDAGAT Professional Modules Loaded."

);
/*======================================================
LiDAGAT Version 3.0
SCRIPT.JS
PART 4

Professional Effects
======================================================*/

"use strict";

/*======================================================
LAZY IMAGE LOADING
======================================================*/

const LazyImages={

    init(){

        const images=document.querySelectorAll("img[data-src]");

        if(images.length===0) return;

        const observer=new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                const img=entry.target;

                img.src=img.dataset.src;

                img.removeAttribute("data-src");

                observer.unobserve(img);

            });

        });

        images.forEach(img=>observer.observe(img));

    }

};

/*======================================================
KEYBOARD SHORTCUTS
======================================================*/

const Shortcuts={

    init(){

        document.addEventListener("keydown",e=>{

            if(e.key==="Home"){

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

            if(e.key==="End"){

                window.scrollTo({

                    top:document.body.scrollHeight,

                    behavior:"smooth"

                });

            }

        });

    }

};

/*======================================================
WELCOME MESSAGE
======================================================*/

const Welcome={

    init(){

        if(sessionStorage.getItem("visited")) return;

        sessionStorage.setItem("visited","yes");

        setTimeout(()=>{

            alert(

                "🌊 Welcome to LiDAGAT!\n\nTogether we can build a more equal future."

            );

        },900);

    }

};

/*======================================================
INITIALIZE MODULES
======================================================*/

LazyImages.init();

Shortcuts.init();

Welcome.init();

console.log("LiDAGAT Professional Edition Ready.");