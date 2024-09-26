function calculateJapanesePercentage(str) {
  // Remove spaces and non-character symbols
  const cleanStr = str.replace(/\s+/g, '').replace(/[^\p{L}\p{N}]/gu, '');

  // Count Japanese characters (kanji, hiragana, and katakana)
  const japaneseCount = (cleanStr.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/g) || []).length;

  // Calculate percentage
  const percentage = (japaneseCount / cleanStr.length) * 100;

  return percentage.toFixed(2);
}

function filterJobs() {
  const jobCards = Array.from(document.getElementsByClassName("jobs-search-results__list-item"));

  jobCards.forEach(card => {
    const titleElement = card.querySelector(".job-card-list__title");
    const title = titleElement?.getAttribute("aria-label") || "";

    const isNew = card.querySelector("time") !== null;
    const japanesePercentage = parseFloat(calculateJapanesePercentage(title));
    const isSelected = card.getElementsByClassName("jobs-search-results-list__list-item--active").length > 0;

    const shouldHide = !isSelected && (!isNew || japanesePercentage > 70);

    if (shouldHide) {
      card.style.opacity = 0.15;
    }
  });
}

function highlightJapaneseWord() {
  $(".highlight").css({ backgroundColor: "red", fontWeight: "bold" });
  $(".jobs-details").highlight(["Japanese", "Japanisch", "Bilingual"]);
}

function init() {
  filterJobs();
  const listObserver = new MutationObserver(filterJobs);

  const listParent =  document.querySelectorAll("ul.scaffold-layout__list-container")[0];
  const descriptionContainer = document.querySelectorAll("div.jobs-description-content")[0];

  if(!listParent || !descriptionContainer) {
    window.setTimeout(init,500);
  }

  listObserver.observe(listParent, { childList: true, subtree: false });
 
  const descriptionObserver = new MutationObserver(highlightJapaneseWord);
  descriptionObserver.observe(descriptionContainer, { childList: true, subtree: true });
}

$(init);