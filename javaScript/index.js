
const vocabulariesDataLevel = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const json = await res.json();
    displayDataLevel(json.data);

    // const url = ("https://openapi.programming-hero.com/api/levels/all");
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((jsonData) => console.log(jsonData.data))

}
// activeBtn remove class
const removeActiveBtn = () => {
    const activeBtn = document.querySelectorAll(".active-btn");
    activeBtn.forEach((btn) => btn.classList.remove("active"));


}
removeActiveBtn()

// btnclick function 
const btnWordData = (id) => {
    // console.log(id)
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

                    <button class="p-3 bg-[#e8f3fe] rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"><i class="fa-solid fa-circle-info"></i></button>

                    <button class="p-3 bg-[#e8f3fe] rounded-lg cursor-pointer hover:scale-105 transition-all duration-300"><i class="fa-solid fa-volume-high"></i></button>
                    
                </div>

            </div>
        
           `;

        wordContainer.append(div)
    }


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

vocabulariesDataLevel()