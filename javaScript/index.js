
const vocabulariesDataLevel = async () => {

    const res = await fetch("https://openapi.programming-hero.com/api/levels/all");
    const json = await res.json();
    displayDataLevel(json.data);

    // const url = ("https://openapi.programming-hero.com/api/levels/all");
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((jsonData) => console.log(jsonData.data))

}

const displayDataLevel = (posts) => {

    // 1.access the section display
    const displayContainer = document.getElementById("display-level");
    displayContainer.innerHTML = "";

    // 2.function create
    posts.forEach(post => {
        console.log(post)

        // 3.div create and add innerHTML
        const div = document.createElement("div");
        div.innerHTML = `
              <button class="btn btn-outline btn-primary border-2">
              <i class="fa-solid fa-book-open"></i>Lesson -${post.level_no}</button>
        
        `;
        
        // 4.div append in section
        displayContainer.append(div);


    });




}



vocabulariesDataLevel()