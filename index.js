const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const autioEL = document.getElementById("audio");


async function fetchAPI(word) {
    try {

        infoTextEl.style.display ="block";
        infoTextEl.innerText = `Search the meaning of [${word}]`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

        const result = await fetch(url).then((res)=> res.json());

        if(result.title) { 
            infoTextEl.style.display ="none";
            meaningContainerEl.style.display = "block";    
            titleEl.innerText = word;
            meaningEl.innerHTML = "N/A";
            autioEL.style.display ="none";
        } else {
            infoTextEl.style.display ="none";
            meaningContainerEl.style.display = "block"; 
            autioEL.style.display = "inline-flex" 
            titleEl.innerText = result[0].word;
            meaningEl.innerHTML = result[0].meanings[0].definitions[0].definition;
            autioEL.src= result[0].phonetics[0].audio;
        }

        
    } catch (error) {
        infoTextEl.innerText =`An error happened try again later`;
    }
}
inputEl.addEventListener("keyup", (e)=> {
    if(e.target.value && e.key ==="Enter") {
        fetchAPI(e.target.value);
    }
});