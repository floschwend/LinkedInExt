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
          card.style.display = 'none';
      }
  });
}

// Run the filter when the page loads and whenever it changes
filterJobs();
const observerFilter = new MutationObserver(filterJobs);

const listParent = document.getElementsByClassName("jobs-search-results__list-item")[0].parentElement;
observerFilter.observe(listParent, { childList: true, subtree: true });

