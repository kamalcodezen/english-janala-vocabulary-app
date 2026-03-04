
const vocabulariesDataLevel = async () => {

    spinnerApiLoader(true);

    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const json = await res.json();
    displayDataLevel(json.data);

    // const url = ("https://openapi.programming-hero.com/api/levels/all");
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((jsonData) => console.log(jsonData.data))

    spinnerApiLoader(false);
}

// sound speech vocabulary
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}


// spinner added function 
const spinnerApiLoader = (status) => {
    if (status == true) {
        document.getElementById("spinner-container").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("spinner-container").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }

}


// synonyms word function
const showSynonymsWord = (arr) => {
    let newSynonyms = arr.map((elem) => `<span class="btn-synonyms p-3 py-2  rounded-lg">${elem}</span>`)
    return newSynonyms.join(" ");
}


// activeBtn remove class
const removeActiveBtn = () => {
    const activeBtn = document.querySelectorAll(".active-btn");
    activeBtn.forEach((btn) => btn.classList.remove("active"));


}

// modal show 
const detailsWord = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const detailsData = await res.json()
    wordDetailsData(detailsData.data);
}

const wordDetailsData = (details) => {
    // console.log(details)

    const wordDetailsContainer = document.getElementById("word_details_container");
    wordDetailsContainer.innerHTML = `
                 <div class="border border-sky-200 rounded-lg modal-word  p-4">
                    <h2 class="font-bangla text-2xl font-semibold mb-4">${details.word} (<i
                            class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
                    <h3 class="font-semibold">Meaning</h3>
                    <p class="font-bangla font-semibold mb-4">${details.meaning}</p>
                    <p class="font-semibold">Example</p>
                    <p class="font-medium mb-4">${details.sentence}</p>
                    <p class="font-bangla font-medium mb-2">সমার্থক শব্দ গুলো</p>
                    <div class="space-y-2">
                      <div class="synonyms flex gap-2">
                        ${showSynonymsWord(details.synonyms)}
                      </div>
                    </div>
                </div>
    
    
    `;

    document.getElementById("word_modal").showModal();

}



// btnclick function 
const btnWordData = (id) => {

    // api loading
    spinnerApiLoader(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            removeActiveBtn();
            clickBtn.classList.add("active")

            displayWordData(json.data)
        })
}

// btnClick and show all word function
const displayWordData = (words) => {
    // console.log(words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div  class="col-span-full text-center space-y-4 py-6">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                    <p class="font-bangla font-semibold text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="text-4xl font-bangla font-semibold">নেক্সট Lesson এ যান</h2>
            </div>
            `;
        spinnerApiLoader(false);
        return;
    }

    for (let word of words) {
        const div = document.createElement("div");
        div.innerHTML = `
        
            <div class="rounded-2xl p-5 bg-base-100 shadow text-center space-y-4 h-full">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning /Pronounciation</p>
                <div class="font-bangla text-2xl font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যায়নি"}</div>
                <div class="flex justify-between pt-4">

                    <button onclick="detailsWord(${word.id})" class="p-3 text-2xl rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"><i class="fa-solid fa-circle-info"></i></button>

                    <button onCLick=pronounceWord('${word.word}') class="p-3 text-2xl rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"><i class="fa-solid fa-volume-high"></i></button>
                    
                </div>

            </div>
        
           `;

        wordContainer.append(div)
    }

    spinnerApiLoader(false);
}


const displayDataLevel = (posts) => {

    // 1.access the section display
    const displayContainer = document.getElementById("display-level");
    displayContainer.innerHTML = "";

    // 2.function create
    posts.forEach(post => {
        // console.log(post)

        // 3.div create and add innerHTML
        const div = document.createElement("div");
        div.innerHTML = `
              <button id="lesson-btn-${post.level_no}" onCLick="btnWordData(${post.level_no})" class="btn btn-outline btn-primary border-2 active-btn">
              <i class="fa-solid fa-book-open"></i>Lesson -${post.level_no}</button>
        
        `;

        // 4.div append in section
        displayContainer.append(div);


    });

}

vocabulariesDataLevel();


// search word input
const searchBtn = document.getElementById("search-btn")
    .addEventListener("click", () => {

        removeActiveBtn(); // search er somoy sob button active remove hobe

        const searchInput = document.getElementById("search-input");
        const inputValue = searchInput.value.trim().toLowerCase();

        const url = "https://openapi.programming-hero.com/api/words/all"
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const allWord = data.data;
                // console.log(allWord)
                const searchData = allWord.filter((word) => word.word.toLowerCase().includes(inputValue));

                displayWordData(searchData);

            });

    });



// dark mode toggle
const html = document.documentElement;
const modeBtn = document.getElementById("theme-toggle");

// default theme fallback
const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

// icon sync on load
if (savedTheme === "dark") {
    modeBtn.innerHTML =
        `<i class="cursor-pointer  fa-regular fa-sun text-[clamp(2rem,5vw,2.75rem)]"></i>`;
} else {
    modeBtn.innerHTML =
        `<i class="cursor-pointer  fa-regular fa-moon text-[clamp(2rem,5vw,2.75rem)] -rotate-30"></i>`;
}

modeBtn.addEventListener("click", () => {

    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "light") {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        modeBtn.innerHTML =
            `<i class="cursor-pointer  fa-regular fa-sun text-[clamp(2rem,5vw,2.75rem)]"></i>`;
    } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        modeBtn.innerHTML =
            `<i class="cursor-pointer  fa-regular fa-moon text-[clamp(2rem,5vw,2.75rem)] -rotate-30"></i>`;
    }

});